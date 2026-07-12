import { createContext, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "sahabat-cerdik-dm-auth";
const AuthContext = createContext(null);

function readStoredAuth() {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      return null;
    }

    return JSON.parse(stored);
  } catch (_error) {
    return null;
  }
}

async function authRequest(path, { body, method, token } = {}) {
  const response = await fetch(path, {
    method: method || (body ? "POST" : "GET"),
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    body: body ? JSON.stringify(body) : undefined
  });
  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = new Error(payload.message || "Permintaan belum berhasil.");
    error.status = payload.status || "error";
    error.responseStatus = response.status;
    throw error;
  }

  return payload;
}

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(() => readStoredAuth());
  const [isCheckingSession, setIsCheckingSession] = useState(Boolean(auth?.token));

  function persistAuth(nextAuth) {
    setAuth(nextAuth);

    if (typeof window !== "undefined") {
      if (nextAuth) {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextAuth));
        return;
      }

      window.localStorage.removeItem(STORAGE_KEY);
    }
  }

  useEffect(() => {
    let isMounted = true;

    async function verifyStoredSession() {
      if (!auth?.token) {
        setIsCheckingSession(false);
        return;
      }

      try {
        const payload = await authRequest("/api/auth/me", {
          token: auth.token
        });

        if (isMounted) {
          persistAuth({
            token: auth.token,
            user: payload.user
          });
        }
      } catch (_error) {
        if (isMounted) {
          persistAuth(null);
        }
      } finally {
        if (isMounted) {
          setIsCheckingSession(false);
        }
      }
    }

    verifyStoredSession();

    return () => {
      isMounted = false;
    };
  }, []);

  async function login(payload) {
    const result = await authRequest("/api/auth/login", {
      body: payload
    });

    persistAuth({
      token: result.token,
      user: result.user
    });

    return result.user;
  }

  async function register(payload) {
    const result = await authRequest("/api/auth/register", {
      body: payload
    });

    persistAuth({
      token: result.token,
      user: result.user
    });

    return result.user;
  }

  async function updateProfile(payload) {
    if (!auth?.token) {
      throw new Error("Sesi login tidak ditemukan.");
    }

    const result = await authRequest("/api/auth/profile", {
      method: "PATCH",
      body: payload,
      token: auth.token
    });

    persistAuth({
      token: auth.token,
      user: result.user
    });

    return result.user;
  }

  async function refreshUser() {
    if (!auth?.token) {
      return null;
    }

    const result = await authRequest("/api/auth/me", { token: auth.token });
    persistAuth({ token: auth.token, user: result.user });
    return result.user;
  }

  async function changePassword(payload) {
    if (!auth?.token) {
      throw new Error("Sesi login tidak ditemukan.");
    }

    return authRequest("/api/auth/password", {
      method: "PATCH",
      body: payload,
      token: auth.token
    });
  }

  async function requestEmailVerification() {
    if (!auth?.token) {
      throw new Error("Sesi login tidak ditemukan.");
    }

    return authRequest("/api/auth/email-verification/request", {
      method: "POST",
      body: {},
      token: auth.token
    });
  }

  async function deleteAccount() {
    if (!auth?.token) {
      throw new Error("Sesi login tidak ditemukan.");
    }

    const result = await authRequest("/api/account", {
      method: "DELETE",
      token: auth.token
    });

    persistAuth(null);
    return result;
  }

  function logout() {
    persistAuth(null);
    authRequest("/api/auth/logout", {
      body: {}
    }).catch(() => {});
  }

  return (
    <AuthContext.Provider
      value={{
        user: auth?.user || null,
        token: auth?.token || null,
        isAuthReady: !isCheckingSession,
        isAuthenticated: Boolean(auth?.user && auth?.token),
        login,
        register,
        updateProfile,
        refreshUser,
        changePassword,
        requestEmailVerification,
        deleteAccount,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth harus dipakai di dalam AuthProvider.");
  }

  return context;
}
