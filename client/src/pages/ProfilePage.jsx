import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../auth/AuthContext.jsx";
import BackIconLink from "../components/BackIconLink.jsx";
import PageMeta from "../components/PageMeta.jsx";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const isDevelopment = import.meta.env.DEV;
const isLocalhost =
  typeof window !== "undefined" && ["localhost", "127.0.0.1"].includes(window.location.hostname);

function createProfileForm(user) {
  return {
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    preferredPhaseSlug: user?.preferredPhaseSlug || ""
  };
}

function validateProfile(form) {
  const errors = {};
  const normalizedPhone = form.phone.replace(/[^\d+]/g, "");

  if (form.name.trim().length < 2) {
    errors.name = "Nama minimal 2 karakter.";
  }

  if (form.email && !emailPattern.test(form.email.trim())) {
    errors.email = "Masukkan alamat email yang valid.";
  }

  if (form.phone && !/^\+?\d{8,18}$/.test(normalizedPhone)) {
    errors.phone = "Masukkan nomor WhatsApp yang valid.";
  }

  if (!form.email.trim() && !normalizedPhone) {
    errors.contact = "Isi minimal email atau nomor WhatsApp.";
  }

  return errors;
}

export default function ProfilePage({ phases = [] }) {
  const navigate = useNavigate();
  const {
    token,
    user,
    updateProfile,
    changePassword,
    requestEmailVerification,
    deleteAccount,
    logout
  } = useAuth();
  const [form, setForm] = useState(() => createProfileForm(user));
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmation: ""
  });
  const [passwordStatus, setPasswordStatus] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState("");
  const [verificationUrl, setVerificationUrl] = useState("");
  const [isSendingVerification, setIsSendingVerification] = useState(false);
  const [dataStatus, setDataStatus] = useState("");
  const [isExportingData, setIsExportingData] = useState(false);
  const [isDeletingScreenings, setIsDeletingScreenings] = useState(false);
  const [deleteAccountText, setDeleteAccountText] = useState("");
  const [deleteAccountStatus, setDeleteAccountStatus] = useState("");
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);

  useEffect(() => {
    setForm(createProfileForm(user));
  }, [user]);

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: "", contact: "" }));
    setStatus("");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validateProfile(form);

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      setStatus("");
      return;
    }

    setIsSaving(true);
    setErrors({});
    setStatus("");

    try {
      const emailChanged = form.email.trim().toLowerCase() !== String(user?.email || "").toLowerCase();
      await updateProfile({
        name: form.name,
        email: form.email,
        phone: form.phone,
        preferredPhaseSlug: form.preferredPhaseSlug
      });
      setStatus(
        emailChanged && form.email
          ? "Profil tersimpan. Verifikasi alamat email baru Anda."
          : "Perubahan profil sudah tersimpan."
      );
    } catch (error) {
      setErrors({ form: error.message || "Profil belum bisa diperbarui." });
    } finally {
      setIsSaving(false);
    }
  }

  async function handleVerificationRequest() {
    setIsSendingVerification(true);
    setVerificationStatus("");
    setVerificationUrl("");

    try {
      const result = await requestEmailVerification();
      setVerificationStatus(result.message);
      setVerificationUrl(result.devActionUrl || "");
    } catch (error) {
      setVerificationStatus(error.message || "Tautan verifikasi belum bisa dibuat.");
    } finally {
      setIsSendingVerification(false);
    }
  }

  async function handlePasswordSubmit(event) {
    event.preventDefault();
    setPasswordError("");
    setPasswordStatus("");

    if (passwordForm.newPassword.length < 8) {
      setPasswordError("Password baru minimal 8 karakter.");
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmation) {
      setPasswordError("Konfirmasi password belum sama.");
      return;
    }

    setIsChangingPassword(true);
    try {
      const result = await changePassword({
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword
      });
      setPasswordStatus(result.message);
      logout();
      navigate("/login", {
        replace: true,
        state: { notice: "Password diperbarui. Silakan masuk kembali." }
      });
    } catch (error) {
      setPasswordError(error.message || "Password belum bisa diperbarui.");
    } finally {
      setIsChangingPassword(false);
    }
  }

  function handleLogout() {
    logout();
    navigate("/", { replace: true });
  }

  async function handleExportData() {
    setIsExportingData(true);
    setDataStatus("");

    try {
      const response = await fetch("/api/account/export", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.message || "Data akun belum bisa diekspor.");
      }

      const blob = new Blob([JSON.stringify(result, null, 2)], {
        type: "application/json"
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = `sahabat-cerdik-dm-data-${new Date().toISOString().slice(0, 10)}.json`;
      link.click();
      URL.revokeObjectURL(url);
      setDataStatus("Data akun siap diunduh.");
    } catch (error) {
      setDataStatus(error.message || "Data akun belum bisa diekspor.");
    } finally {
      setIsExportingData(false);
    }
  }

  async function handleDeleteScreenings() {
    const isConfirmed = window.confirm(
      "Riwayat skrining akan dihapus permanen. Lanjutkan?"
    );

    if (!isConfirmed) {
      return;
    }

    setIsDeletingScreenings(true);
    setDataStatus("");

    try {
      const response = await fetch("/api/screenings", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.message || "Riwayat skrining belum bisa dihapus.");
      }

      setDataStatus(result.message || "Riwayat skrining sudah dihapus.");
    } catch (error) {
      setDataStatus(error.message || "Riwayat skrining belum bisa dihapus.");
    } finally {
      setIsDeletingScreenings(false);
    }
  }

  async function handleDeleteAccount(event) {
    event.preventDefault();
    setDeleteAccountStatus("");

    if (deleteAccountText.trim().toUpperCase() !== "HAPUS") {
      setDeleteAccountStatus("Ketik HAPUS untuk mengonfirmasi penghapusan akun.");
      return;
    }

    const isConfirmed = window.confirm(
      "Hapus akun Sahabat CERDIK DM ini beserta data terkait? Tindakan ini tidak bisa dibatalkan."
    );

    if (!isConfirmed) {
      return;
    }

    setIsDeletingAccount(true);

    try {
      await deleteAccount();
      navigate("/", {
        replace: true,
        state: { notice: "Akun dan data terkait sudah dihapus." }
      });
    } catch (error) {
      setDeleteAccountStatus(error.message || "Akun belum bisa dihapus.");
    } finally {
      setIsDeletingAccount(false);
    }
  }

  return (
    <section className="content-section content-shell profile-page">
      <PageMeta
        title="Profil Akun"
        description="Kelola kontak, fase, password, dan data akun."
      />

      <BackIconLink className="profile-back-control" />

      <header className="profile-heading">
        <h1>Profil akun</h1>
        <p>Pastikan kontak dan fase Anda sudah sesuai.</p>
      </header>

      <form className="profile-form" noValidate onSubmit={handleSubmit}>
        <label className="profile-field">
          <span>Nama</span>
          <input
            aria-invalid={Boolean(errors.name)}
            autoComplete="name"
            maxLength="120"
            value={form.name}
            onChange={(event) => updateField("name", event.target.value)}
          />
          {errors.name ? <small className="field-error">{errors.name}</small> : null}
        </label>

        <label className="profile-field">
          <span>Email</span>
          <input
            aria-invalid={Boolean(errors.email || errors.contact)}
            autoComplete="email"
            inputMode="email"
            maxLength="254"
            placeholder="nama@email.com"
            type="email"
            value={form.email}
            onChange={(event) => updateField("email", event.target.value)}
          />
          <small>Dipakai untuk hasil skrining dan pemulihan akun.</small>
          {errors.email ? <small className="field-error">{errors.email}</small> : null}
        </label>

        <label className="profile-field">
          <span>Nomor WhatsApp</span>
          <input
            aria-invalid={Boolean(errors.phone || errors.contact)}
            autoComplete="tel"
            inputMode="tel"
            maxLength="20"
            placeholder="Contoh: 081234567890"
            value={form.phone}
            onChange={(event) => updateField("phone", event.target.value)}
          />
          <small>Dipakai untuk reminder WhatsApp.</small>
          {errors.phone ? <small className="field-error">{errors.phone}</small> : null}
        </label>

        {errors.contact ? <p className="profile-form-error">{errors.contact}</p> : null}

        <label className="profile-field">
          <span>Fase kehidupan</span>
          <select
            value={form.preferredPhaseSlug}
            onChange={(event) => updateField("preferredPhaseSlug", event.target.value)}
          >
            <option value="">Belum dipilih</option>
            {phases.map((phase) => (
              <option key={phase.slug} value={phase.slug}>{phase.label}</option>
            ))}
          </select>
          <small>Membantu menampilkan materi yang lebih pas.</small>
        </label>

        {errors.form ? <p className="profile-form-error" role="alert">{errors.form}</p> : null}
        {status ? <p className="profile-form-success" role="status">{status}</p> : null}

        <div className="profile-form-actions">
          <button className="button button-primary" disabled={isSaving} type="submit">
            {isSaving ? "Menyimpan..." : "Simpan perubahan"}
          </button>
          <Link className="button button-secondary" to="/dashboard">Batal</Link>
        </div>
      </form>

      {user?.email ? (
        <section className="profile-security-section">
          <div>
            <h2>Status email</h2>
            <p>
              {user.emailVerified
                ? "Email sudah siap dipakai."
                : "Verifikasi email untuk pemulihan akun."}
            </p>
          </div>
          <div className="profile-verification-actions">
            <span className={`profile-verification-badge${user.emailVerified ? " is-verified" : ""}`}>
              {user.emailVerified ? "Terverifikasi" : "Belum terverifikasi"}
            </span>
            {!user.emailVerified ? (
              <button
                className="button button-secondary"
                disabled={isSendingVerification}
                type="button"
                onClick={handleVerificationRequest}
              >
                {isSendingVerification ? "Mengirim..." : "Kirim tautan verifikasi"}
              </button>
            ) : null}
            {verificationStatus ? <small>{verificationStatus}</small> : null}
            {isDevelopment && isLocalhost && verificationUrl ? (
              <a className="local-action-link" href={verificationUrl}>Buka tautan verifikasi lokal</a>
            ) : null}
          </div>
        </section>
      ) : null}

      <section className="profile-security-section profile-data-section">
        <div>
          <h2>Data akun dan skrining</h2>
          <p>Unduh data akun atau hapus riwayat skrining.</p>
        </div>
        <div className="profile-verification-actions">
          <button
            className="button button-secondary"
            disabled={isExportingData}
            type="button"
            onClick={handleExportData}
          >
            {isExportingData ? "Menyiapkan..." : "Export data"}
          </button>
          <button
            className="button button-secondary button-danger-soft"
            disabled={isDeletingScreenings}
            type="button"
            onClick={handleDeleteScreenings}
          >
            {isDeletingScreenings ? "Menghapus..." : "Hapus riwayat skrining"}
          </button>
          {dataStatus ? <small>{dataStatus}</small> : null}
        </div>
      </section>

      <form className="profile-danger-section" onSubmit={handleDeleteAccount}>
        <div>
          <h2>Hapus akun</h2>
          <p>
            Menghapus akun juga menghapus profil, hasil skrining, evaluasi, reminder, dan feedback.
          </p>
        </div>
        <label className="profile-field profile-delete-confirm">
          <span>Ketik HAPUS untuk konfirmasi</span>
          <input
            autoComplete="off"
            value={deleteAccountText}
            onChange={(event) => setDeleteAccountText(event.target.value)}
          />
        </label>
        {deleteAccountStatus ? <p className="profile-form-error" role="alert">{deleteAccountStatus}</p> : null}
        <button
          className="button button-danger-soft"
          disabled={isDeletingAccount}
          type="submit"
        >
          {isDeletingAccount ? "Menghapus..." : "Hapus akun"}
        </button>
      </form>

      <form className="profile-form profile-password-form" onSubmit={handlePasswordSubmit}>
        <div className="profile-form-title">
          <h2>Ubah password</h2>
          <p>Setelah diubah, sesi lama akan keluar otomatis.</p>
        </div>
        <label className="profile-field">
          <span>Password saat ini</span>
          <input
            autoComplete="current-password"
            required
            type="password"
            value={passwordForm.currentPassword}
            onChange={(event) => setPasswordForm((current) => ({ ...current, currentPassword: event.target.value }))}
          />
        </label>
        <label className="profile-field">
          <span>Password baru</span>
          <input
            autoComplete="new-password"
            minLength="8"
            required
            type="password"
            value={passwordForm.newPassword}
            onChange={(event) => setPasswordForm((current) => ({ ...current, newPassword: event.target.value }))}
          />
        </label>
        <label className="profile-field">
          <span>Ulangi password baru</span>
          <input
            autoComplete="new-password"
            minLength="8"
            required
            type="password"
            value={passwordForm.confirmation}
            onChange={(event) => setPasswordForm((current) => ({ ...current, confirmation: event.target.value }))}
          />
        </label>
        {passwordError ? <p className="profile-form-error" role="alert">{passwordError}</p> : null}
        {passwordStatus ? <p className="profile-form-success" role="status">{passwordStatus}</p> : null}
        <div className="profile-form-actions">
          <button className="button button-primary" disabled={isChangingPassword} type="submit">
            {isChangingPassword ? "Menyimpan..." : "Ubah password"}
          </button>
        </div>
      </form>

      <section className="profile-logout-section">
        <div>
          <h2>Keluar dari akun</h2>
          <p>Gunakan jika perangkat dipakai bersama.</p>
        </div>
        <button className="button button-secondary" type="button" onClick={handleLogout}>Keluar</button>
      </section>
    </section>
  );
}
