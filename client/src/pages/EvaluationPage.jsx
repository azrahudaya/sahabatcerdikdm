import { useEffect, useMemo, useState } from "react";

import { useAuth } from "../auth/AuthContext.jsx";
import BackIconLink from "../components/BackIconLink.jsx";
import PageMeta from "../components/PageMeta.jsx";

function formatDate(value) {
  if (!value) {
    return "-";
  }

  return new Date(value).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
}

export default function EvaluationPage({ page }) {
  const { token } = useAuth();
  const [mode, setMode] = useState(page.modes[0]?.id || "pretest");
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [status, setStatus] = useState("Memuat riwayat evaluasi...");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedMode = page.modes.find((item) => item.id === mode) || page.modes[0];
  const answeredCount = Object.keys(answers).length;
  const isComplete = answeredCount === page.questions.length;
  const score = useMemo(
    () =>
      page.questions.reduce(
        (total, question) => total + (answers[question.id] === question.answer ? 1 : 0),
        0
      ),
    [answers, page.questions]
  );

  useEffect(() => {
    if (!token) {
      return;
    }

    let isMounted = true;

    async function loadHistory() {
      try {
        const response = await fetch("/api/evaluations", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
          throw new Error(data.message || "Riwayat evaluasi belum bisa dimuat.");
        }

        if (isMounted) {
          setHistory(data.evaluations || []);
          setStatus(data.evaluations?.length ? "Riwayat evaluasi siap dibuka." : "Belum ada hasil evaluasi.");
        }
      } catch (error) {
        if (isMounted) {
          setStatus(error.message || "Riwayat evaluasi belum bisa dimuat.");
        }
      }
    }

    loadHistory();

    return () => {
      isMounted = false;
    };
  }, [token]);

  function updateMode(nextMode) {
    setMode(nextMode);
    setAnswers({});
    setResult(null);
  }

  function updateAnswer(questionId, value) {
    setAnswers((current) => ({
      ...current,
      [questionId]: value
    }));
    setResult(null);
  }

  async function submitEvaluation(event) {
    event.preventDefault();

    if (!isComplete) {
      setResult({
        tone: "warning",
        message: "Lengkapi semua pertanyaan dulu."
      });
      return;
    }

    setIsSubmitting(true);
    setResult(null);

    try {
      const response = await fetch("/api/evaluations", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          type: mode,
          answers
        })
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || "Hasil evaluasi belum bisa disimpan.");
      }

      setHistory((current) => [data.evaluation, ...current].slice(0, 10));
      setResult({
        tone: "success",
        message: `Skor ${data.evaluation.score}/${data.evaluation.total}. Hasil tersimpan di akun.`
      });
    } catch (error) {
      setResult({
        tone: "error",
        message: error.message || "Hasil evaluasi belum bisa disimpan."
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="content-section content-shell evaluation-page">
      <PageMeta title={page.title} description={page.intro} />

      <BackIconLink className="profile-back-control" />

      <header className="evaluation-heading">
        <div>
          <h1>{page.title}</h1>
          <p>{page.intro}</p>
        </div>
        <div className="evaluation-score-preview">
          <span>Progress</span>
          <strong>{answeredCount}/{page.questions.length}</strong>
        </div>
      </header>

      <div className="evaluation-mode-grid" aria-label="Pilih jenis evaluasi">
        {page.modes.map((item) => (
          <button
            className={item.id === mode ? "is-active" : ""}
            key={item.id}
            type="button"
            onClick={() => updateMode(item.id)}
          >
            <strong>{item.label}</strong>
            <span>{item.description}</span>
          </button>
        ))}
      </div>

      <form className="evaluation-card" onSubmit={submitEvaluation}>
        <div className="evaluation-card-head">
          <span>{selectedMode.label}</span>
          <h2>Jawab pertanyaan singkat ini.</h2>
          <p>Hasilnya dipakai untuk evaluasi pemahaman, bukan penilaian medis.</p>
        </div>

        <div className="evaluation-question-list">
          {page.questions.map((question, index) => (
            <fieldset className="evaluation-question" key={question.id}>
              <legend>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {question.question}
              </legend>
              <div className="evaluation-option-grid">
                {question.options.map((option) => (
                  <label className="evaluation-option" key={option.value}>
                    <input
                      checked={answers[question.id] === option.value}
                      name={question.id}
                      type="radio"
                      value={option.value}
                      onChange={() => updateAnswer(question.id, option.value)}
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
              {result?.tone === "success" ? (
                <p className="evaluation-explanation">{question.explanation}</p>
              ) : null}
            </fieldset>
          ))}
        </div>

        <div className="evaluation-actions">
          <button className="button button-primary" disabled={isSubmitting} type="submit">
            {isSubmitting ? "Menyimpan..." : "Lihat hasil"}
          </button>
          <button
            className="button button-secondary"
            type="button"
            onClick={() => {
              setAnswers({});
              setResult(null);
            }}
          >
            Reset jawaban
          </button>
        </div>

        {result ? <p className={`evaluation-result tone-${result.tone}`}>{result.message}</p> : null}
      </form>

      <section className="evaluation-history">
        <div>
          <h2>Riwayat evaluasi</h2>
          <p>{status}</p>
        </div>

        {history.length ? (
          <div className="evaluation-history-list">
            {history.map((item) => (
              <article className="evaluation-history-item" key={item.id}>
                <span>{formatDate(item.createdAt)}</span>
                <strong>{item.label}</strong>
                <p>Skor {item.score}/{item.total}</p>
              </article>
            ))}
          </div>
        ) : null}
      </section>
    </section>
  );
}
