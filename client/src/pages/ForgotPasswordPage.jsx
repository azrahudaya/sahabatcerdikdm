import { useState } from "react";
import { Link } from "react-router-dom";

import PageMeta from "../components/PageMeta.jsx";

const isDevelopment = import.meta.env.DEV;
const isLocalhost =
  typeof window !== "undefined" && ["localhost", "127.0.0.1"].includes(window.location.hostname);

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [devActionUrl, setDevActionUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus("");
    setError("");
    setDevActionUrl("");

    try {
      const response = await fetch("/api/auth/password/forgot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || "Permintaan belum bisa diproses.");
      }

      setStatus(data.message);
      setDevActionUrl(data.devActionUrl || "");
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="content-section content-shell account-action-page">
      <PageMeta title="Lupa Password" description="Minta tautan untuk mengatur ulang password akun." />
      <Link className="account-back-link" to="/login">Kembali ke halaman masuk</Link>
      <header className="profile-heading">
        <h1>Lupa password</h1>
        <p>Masukkan email akun. Jika terdaftar, kami akan mengirim tautan reset.</p>
      </header>

      <form className="account-action-form" onSubmit={handleSubmit}>
        <label className="profile-field">
          <span>Email</span>
          <input
            autoComplete="email"
            placeholder="nama@email.com"
            required
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
        {status ? <p className="profile-form-success" role="status">{status}</p> : null}
        {error ? <p className="profile-form-error" role="alert">{error}</p> : null}
        {isDevelopment && isLocalhost && devActionUrl ? (
          <a className="local-action-link" href={devActionUrl}>Buka tautan reset lokal</a>
        ) : null}
        <button className="button button-primary" disabled={isSubmitting} type="submit">
          {isSubmitting ? "Memproses..." : "Kirim tautan reset"}
        </button>
      </form>
    </section>
  );
}
