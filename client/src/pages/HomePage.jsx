import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../auth/AuthContext.jsx";
import PageMeta from "../components/PageMeta.jsx";

export default function HomePage({ content, phases, cerdik, entryModules }) {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  function handleModuleEntry(module) {
    if (isAuthenticated) {
      navigate("/dashboard", {
        state: {
          focus: module.id,
          moduleLabel: module.label,
          targetTo: module.to
        }
      });
      return;
    }

    navigate("/login", {
      state: {
        next: "/dashboard",
        focus: module.id,
        moduleLabel: module.label,
        targetTo: module.to
      }
    });
  }

  function handleProtectedRoute(to) {
    if (isAuthenticated) {
      navigate(to);
      return;
    }

    navigate("/login", {
      state: {
        next: to
      }
    });
  }

  return (
    <>
      <PageMeta title="Beranda" description={content.description} />
      <section className="hero-stage">
        <div className="hero-shell">
          <div className="hero-layout">
            <div className="hero-copy">
              <h1>{content.title}</h1>
              <p className="hero-text">{content.description}</p>

              <div className="hero-actions">
                <Link className="button button-primary" to={content.secondaryCta.to}>
                  {content.secondaryCta.label}
                </Link>
              </div>
            </div>

            <div className="hero-media">
              <img
                alt="Preview dashboard aplikasi Sahabat CERDIK DM"
                className="hero-image"
                decoding="async"
                fetchPriority="high"
                src="/herosection.webp"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="content-section content-shell app-menu-section">
        <div className="entry-grid">
          {entryModules.map((module) => (
            <button
              className="entry-tile"
              key={module.id}
              type="button"
              onClick={() => handleModuleEntry(module)}
            >
              <span className={`entry-icon tone-${module.tone}${module.iconSrc ? " has-image" : ""}`}>
                {module.iconSrc ? <img src={module.iconSrc} alt="" aria-hidden="true" /> : module.icon}
              </span>
              <span className="entry-copy">
                <strong>{module.label}</strong>
                <p>{module.description}</p>
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="content-section content-shell" id="fase-kehidupan">
        <div className="section-heading">
          <h2>Materi mengikuti fase kehidupan.</h2>
          <p>Pilih fase yang paling dekat dengan kondisi Anda.</p>
        </div>

        <div className="phase-list">
          {phases.map((phase) => (
            <article className={`phase-list-item tone-${phase.accent}`} key={phase.slug}>
              <div className="phase-list-copy">
                <h3>{phase.label}</h3>
                <p>{phase.summary}</p>
                <Link className="inline-link" to={`/fase/${phase.slug}`}>
                  Lihat halaman fase
                </Link>
              </div>
              <div className="phase-list-visual" aria-hidden="true">
                <span className="phase-visual-orb phase-visual-orb-main" />
                <span className="phase-visual-orb phase-visual-orb-soft" />
                <span className="phase-visual-card" />
                <span className="phase-visual-line phase-visual-line-long" />
                <span className="phase-visual-line phase-visual-line-short" />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section content-shell">
        <div className="cerdik-strip">
          <div className="cerdik-strip-copy">
            <h2>CERDIK jadi pegangan harian.</h2>
            <p>
              Pakai CERDIK sebagai checklist kecil. Tidak harus langsung semua; pilih satu kebiasaan
              yang paling mungkin dilakukan minggu ini.
            </p>
            <div className="cerdik-actions">
              <Link className="button button-light" to="/pencegahan-dm">
                Pelajari CERDIK
              </Link>
              <button
                className="button button-ghost-light"
                type="button"
                onClick={() => handleProtectedRoute("/dashboard/reminder-harian")}
              >
                Atur reminder
              </button>
            </div>
          </div>

          <div className="cerdik-chip-list">
            {cerdik.map((item) => (
              <div className="cerdik-chip" key={item.letter}>
                <strong>{item.letter}</strong>
                <span className="cerdik-chip-copy">
                  <span className="cerdik-chip-title">{item.title}</span>
                  <span className="cerdik-chip-desc">{item.description}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
