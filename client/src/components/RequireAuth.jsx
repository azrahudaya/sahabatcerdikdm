import { Navigate, useLocation } from "react-router-dom";

import { useAuth } from "../auth/AuthContext.jsx";

export default function RequireAuth({ children }) {
  const { isAuthReady, isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthReady) {
    return (
      <section className="content-section content-shell">
        <div className="auth-card">
          <p className="auth-note">Memeriksa sesi login...</p>
        </div>
      </section>
    );
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        replace
        state={{
          next: location.pathname,
          focus: location.state?.focus || null,
          moduleLabel: location.state?.moduleLabel || null,
          targetTo: location.state?.targetTo || null
        }}
        to="/login"
      />
    );
  }

  return children;
}
