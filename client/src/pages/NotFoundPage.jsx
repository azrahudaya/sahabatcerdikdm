import { Link } from "react-router-dom";

import PageMeta from "../components/PageMeta.jsx";

export default function NotFoundPage() {
  return (
    <section className="content-section">
      <PageMeta
        title="Halaman tidak ditemukan"
        description="Halaman yang dicari belum tersedia di Sahabat CERDIK DM."
      />
      <div className="article-hero card">
        <h1>Halaman tidak ditemukan.</h1>
        <p>Halaman yang Anda cari belum tersedia. Silakan kembali ke beranda.</p>
        <Link className="button button-primary" to="/">
          Kembali ke beranda
        </Link>
      </div>
    </section>
  );
}
