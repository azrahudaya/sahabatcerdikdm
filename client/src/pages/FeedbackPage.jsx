import { useState } from "react";
import { useAuth } from "../auth/AuthContext.jsx";
import BackIconLink from "../components/BackIconLink.jsx";
import PageMeta from "../components/PageMeta.jsx";

const satisfactionOptions = ["Jelas", "Cukup", "Perlu diperbaiki"];

export default function FeedbackPage({ page }) {
  const { token } = useAuth();
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [satisfaction, setSatisfaction] = useState("Jelas");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  function toggleTopic(topic) {
    setSelectedTopics((current) =>
      current.includes(topic) ? current.filter((item) => item !== topic) : [...current, topic]
    );
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          topics: selectedTopics,
          satisfaction,
          message
        })
      });

      if (!response.ok) {
        throw new Error("Umpan balik belum bisa dikirim.");
      }

      setIsSubmitted(true);
    } catch (error) {
      setSubmitError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSubmitted) {
    return (
      <section className="content-section content-shell">
        <PageMeta title="Umpan Balik" description={page.intro} />
        <div className="feedback-success-card">
          <span>Terima kasih</span>
          <h1>Masukan Anda sudah tercatat.</h1>
          <p>Masukan Anda membantu kami merapikan materi dan alur aplikasi.</p>
          <div className="feedback-success-actions">
            <button className="button button-secondary" type="button" onClick={() => setIsSubmitted(false)}>
              Isi ulang
            </button>
            <BackIconLink />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="content-section content-shell">
      <PageMeta title="Umpan Balik" description={page.intro} />
      <div className="feedback-layout">
        <div className="feedback-copy">
          <h1>{page.title}</h1>
          <p>{page.intro}</p>
          <div className="feedback-note">
            <strong>Catatan</strong>
            <p>Masukan tersimpan bersama akun yang sedang digunakan.</p>
          </div>
        </div>

        <form className="feedback-card" onSubmit={handleSubmit}>
          <fieldset>
            <legend>Bagian mana yang ingin dinilai?</legend>
            <div className="feedback-topic-grid">
              {page.topics.map((topic) => (
                <label className="feedback-topic" key={topic}>
                  <input
                    checked={selectedTopics.includes(topic)}
                    type="checkbox"
                    onChange={() => toggleTopic(topic)}
                  />
                  <span>{topic}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend>Secara umum, materinya bagaimana?</legend>
            <div className="feedback-rating-grid">
              {satisfactionOptions.map((option) => (
                <label className="feedback-rating" key={option}>
                  <input
                    checked={satisfaction === option}
                    name="satisfaction"
                    type="radio"
                    value={option}
                    onChange={(event) => setSatisfaction(event.target.value)}
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <label className="feedback-message">
            Saran singkat
            <textarea
              placeholder="Contoh: bagian cek risiko sudah jelas, tapi halaman fase ibu hamil perlu contoh yang lebih praktis."
              rows="5"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
            />
          </label>

          <button className="button button-primary feedback-submit" disabled={isSubmitting} type="submit">
            {isSubmitting ? "Mengirim..." : "Kirim evaluasi"}
          </button>
          {submitError ? <p className="feedback-error">{submitError}</p> : null}
        </form>
      </div>
    </section>
  );
}
