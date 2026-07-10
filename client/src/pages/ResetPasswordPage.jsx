import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import PageMeta from "../components/PageMeta.jsx";

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";
  const [form, setForm] = useState({ password: "", confirmation: "" });
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setStatus("");

    if (form.password.length < 8) {
      setError("Password baru minimal 8 karakter.");
      return;
    }

    if (form.password !== form.confirmation) {
      setError("Konfirmasi password belum sama.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/auth/password/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword: form.password })
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || "Password belum bisa diubah.");
      }

      setStatus(data.message);
      setForm({ password: "", confirmation: "" });
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="content-section content-shell account-action-page">
      <PageMeta title="Reset Password" description="Buat password baru untuk akun Sahabat CERDIK DM." />
      <header className="profile-heading">
        <h1>Buat password baru</h1>
        <p>Tautan ini hanya dapat digunakan satu kali.</p>
      </header>

      {!token ? (
        <div className="account-action-form">
          <p className="profile-form-error">Tautan reset tidak lengkap.</p>
          <Link className="button button-primary" to="/lupa-password">Minta tautan baru</Link>
        </div>
      ) : (
        <form className="account-action-form" onSubmit={handleSubmit}>
          <label className="profile-field">
            <span>Password baru</span>
            <input
              autoComplete="new-password"
              minLength="8"
              required
              type="password"
              value={form.password}
              onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
            />
          </label>
          <label className="profile-field">
            <span>Ulangi password baru</span>
            <input
              autoComplete="new-password"
              minLength="8"
              required
              type="password"
              value={form.confirmation}
              onChange={(event) => setForm((current) => ({ ...current, confirmation: event.target.value }))}
            />
          </label>
          {status ? <p className="profile-form-success" role="status">{status}</p> : null}
          {error ? <p className="profile-form-error" role="alert">{error}</p> : null}
          {status ? (
            <Link className="button button-primary" to="/login">Masuk dengan password baru</Link>
          ) : (
            <button className="button button-primary" disabled={isSubmitting} type="submit">
              {isSubmitting ? "Menyimpan..." : "Simpan password baru"}
            </button>
          )}
        </form>
      )}
    </section>
  );
}
