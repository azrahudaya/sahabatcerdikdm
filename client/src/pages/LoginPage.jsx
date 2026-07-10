import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../auth/AuthContext.jsx";
import PageMeta from "../components/PageMeta.jsx";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, login, register } = useAuth();
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    identifier: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const notice = location.state?.notice || "";

  const nextPath = location.state?.next || "/dashboard";
  const focus = location.state?.focus || null;
  const moduleLabel = location.state?.moduleLabel || null;
  const targetTo = location.state?.targetTo || null;

  useEffect(() => {
    if (isAuthenticated) {
      navigate(nextPath, {
        replace: true,
        state: {
          focus,
          moduleLabel,
          targetTo
        }
      });
    }
  }, [focus, isAuthenticated, moduleLabel, navigate, nextPath, targetTo]);

  function updateField(field, value) {
    setForm((current) => ({
      ...current,
      [field]: value
    }));
  }

  function moveIdentifierToRegister(identifier) {
    const value = identifier.trim();

    setForm((current) => ({
      ...current,
      email: value.includes("@") ? value : current.email,
      phone: value.includes("@") ? current.phone : value
    }));
    setMode("register");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      if (mode === "register") {
        await register({
          name: form.name,
          phone: form.phone,
          email: form.email,
          password: form.password
        });
      } else {
        await login({
          identifier: form.identifier,
          password: form.password
        });
      }

      navigate(nextPath, {
        replace: true,
        state: {
          focus,
          moduleLabel,
          targetTo
        }
      });
    } catch (submitError) {
      if (mode === "login" && submitError.status === "not_registered") {
        moveIdentifierToRegister(form.identifier);
        setError("Akun belum terdaftar. Lengkapi data untuk membuat akun.");
      } else {
        setError(submitError.message || "Auth gagal diproses.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  const isRegisterMode = mode === "register";

  return (
    <section className="content-section content-shell">
      <PageMeta
        title="Masuk"
        description="Masuk ke dashboard Sahabat CERDIK DM untuk membuka menu aplikasi."
      />
      <div className="auth-shell">
        <div className="auth-copy">
          <h1>{isRegisterMode ? "Daftar akun Sahabat CERDIK DM" : "Masuk ke Sahabat CERDIK DM"}</h1>
          <p>{isRegisterMode ? "Buat akun dengan nomor WhatsApp." : "Lanjutkan ke dashboard aplikasi."}</p>
          {moduleLabel ? <p className="auth-hint">Menu yang dipilih: {moduleLabel}</p> : null}
        </div>

        <form className="auth-card" onSubmit={handleSubmit}>
          <div className="auth-mode-switch" aria-label="Pilih mode autentikasi">
            <button
              className={mode === "login" ? "is-active" : ""}
              type="button"
              onClick={() => {
                setMode("login");
                setError("");
              }}
            >
              Masuk
            </button>
            <button
              className={mode === "register" ? "is-active" : ""}
              type="button"
              onClick={() => {
                setMode("register");
                setError("");
              }}
            >
              Daftar
            </button>
          </div>

          {isRegisterMode ? (
            <>
              <label className="auth-field">
                <span>Nama</span>
                <input
                  autoComplete="name"
                  name="name"
                  placeholder="Nama Anda"
                  required
                  type="text"
                  value={form.name}
                  onChange={(event) => updateField("name", event.target.value)}
                />
              </label>

              <label className="auth-field">
                <span>Nomor WhatsApp</span>
                <input
                  autoComplete="tel"
                  name="phone"
                  placeholder="081234567890"
                  required
                  type="tel"
                  value={form.phone}
                  onChange={(event) => updateField("phone", event.target.value)}
                />
              </label>

              <label className="auth-field">
                <span>Email opsional</span>
                <input
                  autoComplete="email"
                  name="email"
                  placeholder="nama@email.com"
                  type="email"
                  value={form.email}
                  onChange={(event) => updateField("email", event.target.value)}
                />
              </label>
            </>
          ) : (
            <label className="auth-field">
              <span>Nomor WhatsApp atau email</span>
              <input
                autoComplete="username"
                name="identifier"
                placeholder="081234567890 atau nama@email.com"
                required
                type="text"
                value={form.identifier}
                onChange={(event) => updateField("identifier", event.target.value)}
              />
            </label>
          )}

          <label className="auth-field">
            <span>Password</span>
            <input
              autoComplete={isRegisterMode ? "new-password" : "current-password"}
              minLength={8}
              name="password"
              placeholder="Minimal 8 karakter"
              required
              type="password"
              value={form.password}
              onChange={(event) => updateField("password", event.target.value)}
            />
          </label>

          {error ? <p className="auth-error">{error}</p> : null}
          {notice && !error ? <p className="profile-form-success">{notice}</p> : null}

          {!isRegisterMode ? (
            <Link className="auth-forgot-link" to="/lupa-password">Lupa password?</Link>
          ) : null}

          <button className="button button-primary auth-submit" disabled={isSubmitting} type="submit">
            {isSubmitting ? "Memproses..." : isRegisterMode ? "Daftar dan masuk" : "Masuk"}
          </button>

        </form>
      </div>
    </section>
  );
}
