import { Link } from "react-router-dom";

import PageMeta from "../components/PageMeta.jsx";

export default function MitosFaktaPage({ page }) {
  return (
    <section className="content-section content-shell">
      <PageMeta title="Mitos & Fakta" description={page.intro} />
      <div className="article-hero myth-hero">
        <div>
          <h1>{page.title}</h1>
          <p>{page.intro}</p>
        </div>
      </div>

      <div className="myth-grid">
        {page.items.map((item, index) => (
          <article className="myth-card" key={item.myth}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <div>
              <p className="myth-label">Mitos</p>
              <h2>{item.myth}</h2>
            </div>
            <div>
              <p className="fact-label">Fakta</p>
              <p>{item.fact}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="myth-next-card">
        <div>
          <h2>Masih ragu dengan risiko pribadi?</h2>
          <p>Gunakan skrining awal untuk melihat faktor risiko yang paling dekat dengan kondisi Anda.</p>
        </div>
        <Link className="button button-primary" to="/deteksi-dini">
          Mulai cek risiko
        </Link>
      </div>
    </section>
  );
}
