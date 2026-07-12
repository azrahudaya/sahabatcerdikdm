import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../auth/AuthContext.jsx";
import PageMeta from "../components/PageMeta.jsx";

export default function DashboardPage({ dashboard, phases = [] }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { token, user, updateProfile } = useAuth();
  const [latestScreenings, setLatestScreenings] = useState([]);
  const [screeningStatus, setScreeningStatus] = useState("Memuat riwayat akun...");
  const [phaseStatus, setPhaseStatus] = useState("");
  const [isUpdatingPhase, setIsUpdatingPhase] = useState(false);
  const moduleLabel = location.state?.moduleLabel || null;
  const notice = location.state?.notice || "";
  const targetTo = location.state?.targetTo || null;

  const latestScreening = latestScreenings[0] || null;
  const selectedPhase = phases.find((phase) => phase.slug === user?.preferredPhaseSlug) || null;
  const dashboardSections = dashboard?.sections || [];
  const dashboardItems = dashboardSections.flatMap((section) =>
    section.items.map((item) => ({
      ...item,
      sectionTitle: section.title
    }))
  );
  const findDashboardItem = (id) => dashboardItems.find((item) => item.id === id);
  const riskItem = findDashboardItem("deteksi-dini");
  const reminderItem = findDashboardItem("reminder-harian");
  const focusActions = [
    riskItem
      ? {
          ...riskItem,
          label: "Cek risiko",
          description: latestScreening
            ? "Buka hasil terakhir atau isi ulang skrining."
            : "Isi skrining singkat untuk mulai mengenali risiko."
        }
      : null,
    {
      id: "materi-fase",
      label: selectedPhase ? selectedPhase.label : "Materi sesuai fase",
      icon: "FK",
      iconSrc: "/menu-icons/fk.png",
      tone: "sage-soft",
      description: selectedPhase ? selectedPhase.summary : "Pilih fase agar materi lebih dekat dengan kondisi Anda.",
      to: selectedPhase ? `/fase/${selectedPhase.slug}` : "/dashboard#pilih-fase"
    },
    reminderItem
      ? {
          ...reminderItem,
          label: "Reminder",
          description: "Atur pengingat WhatsApp untuk kebiasaan CERDIK."
        }
      : null
  ].filter(Boolean);
  const secondaryItems = dashboardItems.filter(
    (item) => !["deteksi-dini", "reminder-harian"].includes(item.id)
  );

  async function handlePhaseChange(phaseSlug) {
    setIsUpdatingPhase(true);
    setPhaseStatus("");

    try {
      await updateProfile({
        preferredPhaseSlug: phaseSlug
      });
      setPhaseStatus(phaseSlug ? "Jalur materi tersimpan di akun." : "Pilihan fase dikosongkan.");
    } catch (error) {
      setPhaseStatus(error.message || "Pilihan fase belum bisa disimpan.");
    } finally {
      setIsUpdatingPhase(false);
    }
  }

  useEffect(() => {
    if (!targetTo || targetTo === "/dashboard") {
      return;
    }

    if (targetTo.startsWith("#")) {
      window.setTimeout(() => {
        document.querySelector(targetTo)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 80);
      return;
    }

    navigate(targetTo, { replace: true });
  }, [navigate, targetTo]);

  useEffect(() => {
    if (!token) {
      return;
    }

    let isMounted = true;

    async function loadScreenings() {
      try {
        const response = await fetch("/api/screenings", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error("Riwayat skrining belum bisa dimuat.");
        }

        const data = await response.json();

        if (isMounted) {
          setLatestScreenings((data.screenings || []).slice(0, 3));
          setScreeningStatus("Hasil tersimpan bisa dibuka lagi dari akun ini.");
        }
      } catch (_error) {
        if (isMounted) {
          setScreeningStatus("Riwayat skrining akun belum bisa dimuat.");
        }
      }
    }

    loadScreenings();

    return () => {
      isMounted = false;
    };
  }, [token]);

  return (
    <section className="content-section content-shell">
      <PageMeta
        title="Dashboard"
        description="Pusat menu aplikasi Sahabat CERDIK DM untuk edukasi, fase kehidupan, dan skrining."
      />

      <div className="dashboard-shell dashboard-app-shell">
        <div className="dashboard-welcome">
          <div>
            <span>Dashboard</span>
            <h1>Halo{user?.name ? `, ${user.name}` : ""}.</h1>
            <p>
              Mulai dari satu langkah kecil: cek risiko, baca materi yang sesuai fase, atau aktifkan reminder.
            </p>
            {moduleLabel ? <p className="dashboard-hint">Anda tadi memilih menu {moduleLabel}.</p> : null}
            {notice ? <p className="profile-form-success">{notice}</p> : null}
          </div>
        </div>

        <section className="dashboard-current-card">
          <div>
            <span>Hasil terakhir</span>
            {latestScreening ? (
              <>
                <h2>{latestScreening.resultTitle}</h2>
                <p>
                  Skor FINDRISC {latestScreening.riskScore}
                  {latestScreening.bmi ? `, IMT ${latestScreening.bmi}` : ""}
                  {latestScreening.waist ? `, lingkar perut ${latestScreening.waist} cm` : ""}.
                </p>
              </>
            ) : (
              <>
                <h2>Belum ada hasil skrining.</h2>
                <p>{screeningStatus}</p>
              </>
            )}
          </div>

          <Link
            className="button button-light"
            to={latestScreening ? `/dashboard/skrining/${latestScreening.id}` : "/deteksi-dini"}
          >
            {latestScreening ? "Lihat detail" : "Mulai cek"}
          </Link>
        </section>

        <section className="dashboard-focus-section">
          <div className="dashboard-menu-heading">
            <h2>Mulai dari sini</h2>
          </div>
          <div className="entry-grid dashboard-entry-grid dashboard-focus-grid">
            {focusActions.map((action) => (
              <Link className="entry-tile" key={action.id} to={action.to}>
                <span className={`entry-icon tone-${action.tone}${action.iconSrc ? " has-image" : ""}`}>
                  {action.iconSrc ? <img src={action.iconSrc} alt="" aria-hidden="true" /> : action.icon}
                </span>
                <span className="entry-copy">
                  <strong>{action.label}</strong>
                  <p>{action.description}</p>
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="dashboard-phase-card" id="pilih-fase">
          <div className="dashboard-phase-copy">
            <span>Jalur materi</span>
            <h2>{selectedPhase ? selectedPhase.label : "Pilih fase kehidupan."}</h2>
            <p>
              {selectedPhase
                ? selectedPhase.summary
                : "Agar materi yang muncul terasa lebih dekat dengan kondisi pengguna saat ini."}
            </p>
          </div>

          <div className="dashboard-phase-control">
            <label>
              Fase saat ini
              <select
                disabled={isUpdatingPhase}
                value={user?.preferredPhaseSlug || ""}
                onChange={(event) => handlePhaseChange(event.target.value)}
              >
                <option value="">Belum dipilih</option>
                {phases.map((phase) => (
                  <option key={phase.slug} value={phase.slug}>
                    {phase.label}
                  </option>
                ))}
              </select>
            </label>

            {selectedPhase ? (
              <Link className="button button-secondary" to={`/fase/${selectedPhase.slug}`}>
                Buka materi fase
              </Link>
            ) : null}

            {phaseStatus ? <p>{phaseStatus}</p> : null}
          </div>
        </section>

        <details className="dashboard-more-panel">
          <summary>Menu lainnya</summary>
          <div className="entry-grid dashboard-entry-grid dashboard-secondary-grid">
            {secondaryItems.map((action) => (
              <Link className="entry-tile" key={action.id} to={action.to}>
                <span className={`entry-icon tone-${action.tone}${action.iconSrc ? " has-image" : ""}`}>
                  {action.iconSrc ? <img src={action.iconSrc} alt="" aria-hidden="true" /> : action.icon}
                </span>
                <span className="entry-copy">
                  <strong>{action.label}</strong>
                  <p>{action.description}</p>
                </span>
              </Link>
            ))}
          </div>
        </details>

        <section className="dashboard-history-panel dashboard-history-compact">
          <div>
            <h2>Riwayat skrining</h2>
            <p>{screeningStatus}</p>
          </div>

          {latestScreenings.length ? (
            <div className="dashboard-history-list">
              {latestScreenings.map((item) => (
                <Link className="dashboard-history-item" key={item.id} to={`/dashboard/skrining/${item.id}`}>
                  <span>{new Date(item.createdAt).toLocaleDateString("id-ID")}</span>
                  <strong>{item.resultTitle}</strong>
                  <p>
                    Skor {item.riskScore}
                    {item.bmi ? `, IMT ${item.bmi}` : ""}
                    {item.waist ? `, lingkar ${item.waist} cm` : ""}
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            <Link className="button button-primary" to="/deteksi-dini">
              Simpan hasil pertama
            </Link>
          )}
        </section>
      </div>
    </section>
  );
}
