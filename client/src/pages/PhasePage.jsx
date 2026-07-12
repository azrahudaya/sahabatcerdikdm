import { Link, useParams } from "react-router-dom";

import PageMeta from "../components/PageMeta.jsx";

export default function PhasePage({ phases }) {
  const { slug } = useParams();
  const phase = phases.find((item) => item.slug === slug);

  if (!phase) {
    return (
      <section className="content-section">
        <div className="article-hero card">
          <h1>Halaman fase belum ditemukan.</h1>
          <Link className="button button-primary" to="/">
            Kembali ke beranda
          </Link>
        </div>
      </section>
    );
  }

  const screeningActionLabel =
    phase.slug === "ibu-hamil" || phase.slug === "remaja" ? "Cek jalur sesuai" : "Cek risiko awal";

  return (
    <section className="content-section">
      <PageMeta title={phase.label} description={phase.summary} />
      <div className={`phase-hero tone-${phase.accent}`}>
        <div>
          <p className="card-label">{phase.label}</p>
          <h1>{phase.summary}</h1>
          <p>Temukan poin penting yang paling relevan untuk fase ini.</p>
          <div className="phase-hero-actions">
            <Link className="button button-light" to="/deteksi-dini">
              {screeningActionLabel}
            </Link>
            <Link className="button button-ghost-light" to="/gizi-seimbang">
              Baca gizi
            </Link>
          </div>
        </div>

      </div>

      {phase.sourceNote ? (
        <div className="phase-source-note">
          <strong>Catatan materi</strong>
          <p>{phase.sourceNote}</p>
        </div>
      ) : null}

      <div className="article-grid">
        <article className="article-panel">
          <h2>Fokus utama fase ini</h2>
          <ul className="bullet-list">
            {phase.focusPoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </article>

        <article className="article-panel">
          <h2>CERDIK untuk fase ini</h2>
          <div className="tip-list">
            {phase.cerdikTips.map((tip) => (
              <div className="tip-item" key={tip.title}>
                <h3>{tip.title}</h3>
                <p>{tip.text}</p>
              </div>
            ))}
          </div>
        </article>
      </div>

      {phase.modules?.length ? (
        <section className="phase-module-section">
          <div className="section-heading">
            <h2>Yang perlu diperhatikan.</h2>
            <p>Pilih poin yang paling dekat dengan kondisi Anda sekarang.</p>
          </div>
          <div className="phase-module-list">
            {phase.modules.map((module) => (
              <article className="phase-module-card" key={module.title}>
                <div>
                  <span>{module.label}</span>
                  <h3>{module.title}</h3>
                  <p>{module.body}</p>
                </div>
                <ul className="topic-point-list">
                  {module.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <div className="phase-bottom-grid">
        <article className="article-panel">
          <h2>Tanda yang perlu diwaspadai</h2>
          <ul className="bullet-list">
            {phase.warningSigns.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="article-panel">
          <h2>Kapan perlu cek</h2>
          <ul className="bullet-list">
            {phase.careMoments.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <Link className="inline-link" to="/deteksi-dini">
            {screeningActionLabel}
          </Link>
        </article>
      </div>
    </section>
  );
}
