import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { useAuth } from "../auth/AuthContext.jsx";
import BackIconLink from "../components/BackIconLink.jsx";
import PageMeta from "../components/PageMeta.jsx";
import { getFindriscResult, getFindriscSelectedLabels } from "../utils/screening.js";

function formatDate(value) {
  if (!value) {
    return "-";
  }

  return new Date(value).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}

function getSelectedLabels(payload) {
  if (Array.isArray(payload?.selectedLabels) && payload.selectedLabels.length) {
    return payload.selectedLabels;
  }

  return getFindriscSelectedLabels(payload?.findriscAnswers || {});
}

export default function ScreeningDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token, user } = useAuth();
  const [screening, setScreening] = useState(null);
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("Memuat hasil skrining...");

  useEffect(() => {
    if (!token || !id) {
      return;
    }

    let isMounted = true;

    async function loadScreening() {
      setStatus("loading");
      setMessage("Memuat hasil skrining...");

      try {
        const response = await fetch(`/api/screenings/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
          throw new Error(data.message || "Hasil skrining belum bisa dibuka.");
        }

        if (isMounted) {
          setScreening(data.screening);
          setStatus("ready");
          setMessage("");
        }
      } catch (error) {
        if (isMounted) {
          setStatus("error");
          setMessage(error.message);
        }
      }
    }

    loadScreening();

    return () => {
      isMounted = false;
    };
  }, [id, token]);

  const payload = screening?.payload || {};
  const riskScore = Number(screening?.riskScore || payload.riskScore || 0);
  const riskResult = getFindriscResult(riskScore, Boolean(screening));
  const selectedLabels = getSelectedLabels(payload);
  const bmi = screening?.bmi ?? payload.bmi ?? null;
  const waist = screening?.waist ?? payload.waist ?? null;

  function downloadReport() {
    window.print();
  }

  async function deleteScreening() {
    const isConfirmed = window.confirm("Hapus hasil skrining ini dari akun?");

    if (!isConfirmed) {
      return;
    }

    try {
      const response = await fetch(`/api/screenings/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || "Hasil skrining belum bisa dihapus.");
      }

      navigate("/dashboard", {
        replace: true,
        state: { notice: data.message || "Hasil skrining dihapus." }
      });
    } catch (error) {
      setMessage(error.message || "Hasil skrining belum bisa dihapus.");
    }
  }

  return (
    <section className="content-section content-shell screening-detail-page">
      <PageMeta
        title="Detail Hasil Skrining"
        description="Detail hasil skrining FINDRISC yang tersimpan di akun Sahabat CERDIK DM."
      />

      <div className="screening-detail-topbar">
        <BackIconLink />
        <span>{user?.name || user?.phone || "Akun aktif"}</span>
      </div>

      {status === "loading" ? (
        <article className="screening-detail-empty">
          <h1>Memuat hasil skrining.</h1>
          <p>{message}</p>
        </article>
      ) : null}

      {status === "error" ? (
        <article className="screening-detail-empty">
          <h1>Hasil belum ditemukan.</h1>
          <p>{message}</p>
          <Link className="button button-primary" to="/deteksi-dini">
            Buat skrining baru
          </Link>
        </article>
      ) : null}

      {status === "ready" && screening ? (
        <>
          <article className={`screening-detail-hero tone-${riskResult.tone}`}>
            <div>
              <span>Hasil FINDRISC</span>
              <h1>{screening.resultTitle}</h1>
              <p>{riskResult.body}</p>
            </div>

            <div className="screening-detail-score">
              <span>Skor</span>
              <strong>{riskScore}</strong>
              <small>dari 26</small>
            </div>
          </article>

          <section className="screening-detail-grid" aria-label="Ringkasan hasil">
            <article className="screening-detail-card">
              <span>Estimasi 10 tahun</span>
              <strong>{screening.resultEstimate || riskResult.estimate}</strong>
              <p>Bersifat edukatif, bukan diagnosis.</p>
            </article>
            <article className="screening-detail-card">
              <span>IMT</span>
              <strong>{bmi ? Number(bmi).toFixed(1) : "-"}</strong>
              <p>Berat dan tinggi badan saat skrining.</p>
            </article>
            <article className="screening-detail-card">
              <span>Lingkar perut</span>
              <strong>{waist ? `${waist} cm` : "-"}</strong>
              <p>Dicatat sebagai faktor risiko FINDRISC.</p>
            </article>
          </section>

          <section className="screening-detail-layout">
            <article className="screening-detail-section">
              <div className="screening-detail-section-head">
                <h2>Ringkasan jawaban</h2>
                <span>{formatDate(screening.createdAt)}</span>
              </div>
              <div className="screening-answer-list">
                {selectedLabels.map((label) => (
                  <p key={label}>{label}</p>
                ))}
              </div>
            </article>

            <article className="screening-detail-section">
              <div className="screening-detail-section-head">
                <h2>Langkah lanjut</h2>
                <span>CERDIK</span>
              </div>
              <ol className="screening-step-list">
                {riskResult.steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </article>
          </section>

          <div className="screening-detail-actions">
            <Link className="button button-primary" to="/deteksi-dini">
              Cek ulang
            </Link>
            <Link className="button button-secondary" to="/dashboard/reminder-harian">
              Atur reminder
            </Link>
            <button className="button button-secondary" type="button" onClick={downloadReport}>
              Download PDF
            </button>
            <button className="button button-secondary button-danger-soft" type="button" onClick={deleteScreening}>
              Hapus hasil
            </button>
          </div>

          {message ? <p className="screening-save-note">{message}</p> : null}

          <div className="screening-detail-print-report" aria-hidden="true">
            <div className="print-report-sheet">
              <p className="print-report-label">Sahabat CERDIK DM</p>
              <h1>Report FINDRISC</h1>
              <p className="print-report-date">Hasil tersimpan pada {formatDate(screening.createdAt)}</p>

              <div className="print-report-grid">
                <section>
                  <span>Hasil skrining</span>
                  <strong>{screening.resultTitle}</strong>
                  <p>{riskResult.body}</p>
                  <small>Skor FINDRISC: {riskScore} / 26</small>
                </section>

                <section>
                  <span>Estimasi risiko 10 tahun</span>
                  <strong>{screening.resultEstimate || riskResult.estimate}</strong>
                  <p>Estimasi ini berasal dari kategori FINDRISC dan bukan diagnosis medis.</p>
                  <small>
                    IMT {bmi ? Number(bmi).toFixed(1) : "-"}; lingkar perut {waist ? `${waist} cm` : "-"}
                  </small>
                </section>
              </div>

              <section className="print-report-section">
                <h2>Ringkasan jawaban</h2>
                <ul>
                  {selectedLabels.map((label) => (
                    <li key={label}>{label}</li>
                  ))}
                </ul>
              </section>

              <section className="print-report-section">
                <h2>Langkah lanjut</h2>
                <ol>
                  {riskResult.steps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              </section>

              <p className="print-report-note">
                Report ini adalah hasil skrining mandiri awal dengan FINDRISC dan bukan diagnosis.
                Gunakan sebagai bahan diskusi saat berkonsultasi dengan tenaga kesehatan.
              </p>
            </div>
          </div>
        </>
      ) : null}
    </section>
  );
}
