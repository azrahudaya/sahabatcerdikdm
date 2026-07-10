import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import { useAuth } from "../auth/AuthContext.jsx";
import PageMeta from "../components/PageMeta.jsx";

export default function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const actionToken = searchParams.get("token") || "";
  const { isAuthenticated, refreshUser } = useAuth();
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function verifyEmail() {
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/auth/email-verification/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: actionToken })
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || "Email belum bisa diverifikasi.");
      }

      if (isAuthenticated) {
        await refreshUser();
      }
      setStatus(data.message);
    } catch (verifyError) {
      setError(verifyError.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="content-section content-shell account-action-page">
      <PageMeta title="Verifikasi Email" description="Verifikasi alamat email akun Sahabat CERDIK DM." />
      <header className="profile-heading">
        <h1>Verifikasi email</h1>
        <p>Konfirmasi agar email dapat dipakai untuk hasil skrining dan pemulihan akun.</p>
      </header>

      <div className="account-action-form">
        {!actionToken ? <p className="profile-form-error">Tautan verifikasi tidak lengkap.</p> : null}
        {status ? <p className="profile-form-success" role="status">{status}</p> : null}
        {error ? <p className="profile-form-error" role="alert">{error}</p> : null}
        {actionToken && !status ? (
          <button className="button button-primary" disabled={isSubmitting} type="button" onClick={verifyEmail}>
            {isSubmitting ? "Memverifikasi..." : "Verifikasi email"}
          </button>
        ) : null}
        <Link className="button button-secondary" to={isAuthenticated ? "/dashboard/profil" : "/login"}>
          {isAuthenticated ? "Kembali ke profil" : "Kembali ke halaman masuk"}
        </Link>
      </div>
    </section>
  );
}
