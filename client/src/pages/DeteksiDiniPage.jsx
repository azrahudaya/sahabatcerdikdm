import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../auth/AuthContext.jsx";
import PageMeta from "../components/PageMeta.jsx";
import {
  calculateBmi,
  defaultFindriscAnswers,
  defaultScreeningContext,
  findriscQuestions,
  getFindriscBreakdown,
  getFindriscBaselineErrors,
  getFindriscResult,
  getScreeningGateBlock,
  getFindriscScore,
  getFindriscSelectedLabels,
  isFindriscEligible,
  isFindriscBaselineValid,
  isFindriscComplete,
  isScreeningGateComplete,
  screeningGateQuestions
} from "../utils/screening.js";
import {
  clearScreeningDraft,
  createScreeningSessionId,
  readScreeningDraft,
  writeScreeningDraft
} from "../utils/screeningStorage.js";

export default function DeteksiDiniPage({ page }) {
  const { token, user } = useAuth();
  const userScope = user?.id || user?.email || user?.phone || "active-user";
  const savedDraft = readScreeningDraft(userScope);
  const progressRef = useRef(null);
  const autoSaveSessionRef = useRef("");

  const [screeningContext, setScreeningContext] = useState(savedDraft.screeningContext);
  const [findriscAnswers, setFindriscAnswers] = useState(savedDraft.findriscAnswers);
  const [age, setAge] = useState(savedDraft.age);
  const [height, setHeight] = useState(savedDraft.height);
  const [weight, setWeight] = useState(savedDraft.weight);
  const [waist, setWaist] = useState(savedDraft.waist);
  const [screeningSessionId, setScreeningSessionId] = useState(savedDraft.screeningSessionId);
  const [baselineTouched, setBaselineTouched] = useState({});
  const [history, setHistory] = useState([]);
  const [savedMessage, setSavedMessage] = useState("");
  const [savedScreeningId, setSavedScreeningId] = useState("");
  const [activeStep, setActiveStep] = useState(0);

  const screeningSteps = [
    { id: "gate", title: "Cek awal" },
    { id: "baseline", title: "Data dasar" },
    ...findriscQuestions.map((question) => ({
      id: question.id,
      title: question.title
    })),
    { id: "result", title: "Hasil skrining" }
  ];
  const resultStepIndex = screeningSteps.length - 1;
  const currentQuestion =
    activeStep > 1 && activeStep < resultStepIndex ? findriscQuestions[activeStep - 2] : null;
  const currentStep = screeningSteps[activeStep];
  const progressValue = Math.round(((activeStep + 1) / screeningSteps.length) * 100);
  const gateBlock = getScreeningGateBlock(screeningContext);
  const isGateComplete = isScreeningGateComplete(screeningContext);
  const isEligibleForFindrisc = isFindriscEligible(screeningContext);

  const screeningPayload = {
    age,
    height,
    weight,
    waist,
    answers: findriscAnswers
  };
  const baselineValues = { age, height, weight, waist };
  const baselineErrors = getFindriscBaselineErrors(baselineValues);
  const isBaselineComplete = isFindriscBaselineValid(baselineValues);
  const isScreeningComplete = isFindriscComplete(screeningPayload);
  const isCurrentStepComplete = currentQuestion
    ? Boolean(findriscAnswers[currentQuestion.id])
    : activeStep === 0
      ? isGateComplete && isEligibleForFindrisc
      : activeStep === 1
      ? isBaselineComplete
      : isScreeningComplete;

  const riskScore = getFindriscScore(screeningPayload);
  const riskResult = getFindriscResult(riskScore, isScreeningComplete);
  const scoreBreakdown = getFindriscBreakdown(screeningPayload);
  const selectedLabels = getFindriscSelectedLabels(findriscAnswers);
  const bmi = calculateBmi(height, weight);
  const bmiText = bmi ? bmi.toFixed(1) : "--";
  const waistNumber = Number(waist);

  useEffect(() => {
    const draft = readScreeningDraft(userScope);

    setFindriscAnswers(draft.findriscAnswers);
    setScreeningContext(draft.screeningContext);
    setAge(draft.age);
    setHeight(draft.height);
    setWeight(draft.weight);
    setWaist(draft.waist);
    setScreeningSessionId(draft.screeningSessionId);
    setBaselineTouched({});
    setHistory([]);
    setSavedMessage("");
    setSavedScreeningId("");
    autoSaveSessionRef.current = "";
    setActiveStep(0);
  }, [userScope]);

  useEffect(() => {
    if (!token) {
      return;
    }

    let isMounted = true;

    async function loadScreeningHistory() {
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
          setHistory(data.screenings || []);
        }
      } catch (_error) {
        if (isMounted) {
          setSavedMessage("Riwayat akun belum bisa dimuat.");
        }
      }
    }

    loadScreeningHistory();

    return () => {
      isMounted = false;
    };
  }, [token]);

  useEffect(() => {
    writeScreeningDraft(
      {
        screeningContext,
        findriscAnswers,
        age,
        height,
        weight,
        waist,
        screeningSessionId
      },
      userScope
    );
  }, [age, findriscAnswers, height, screeningContext, screeningSessionId, userScope, waist, weight]);

  useEffect(() => {
    progressRef.current?.scrollIntoView({
      block: "start",
      behavior: "smooth"
    });
  }, [activeStep]);

  useEffect(() => {
    if (
      activeStep !== resultStepIndex ||
      !isScreeningComplete ||
      !isEligibleForFindrisc ||
      !token ||
      autoSaveSessionRef.current === screeningSessionId
    ) {
      return;
    }

    autoSaveSessionRef.current = screeningSessionId;
    saveScreeningResult();
  }, [activeStep, isEligibleForFindrisc, isScreeningComplete, screeningSessionId, token]);

  function markScreeningChanged() {
    setSavedMessage("");
    if (savedScreeningId || autoSaveSessionRef.current === screeningSessionId) {
      setScreeningSessionId(createScreeningSessionId());
    }
    setSavedScreeningId("");
  }

  function updateFindriscAnswer(questionId, value) {
    markScreeningChanged();
    setFindriscAnswers((current) => ({
      ...current,
      [questionId]: value
    }));
  }

  function updateScreeningContext(questionId, value) {
    markScreeningChanged();
    setScreeningContext((current) => ({
      ...current,
      [questionId]: value
    }));
  }

  function goToNextStep() {
    if (activeStep === 0 && gateBlock) {
      return;
    }

    if (!isCurrentStepComplete) {
      if (activeStep === 1) {
        setBaselineTouched({ age: true, height: true, weight: true, waist: true });
      }
      return;
    }

    setSavedMessage("");
    setActiveStep((current) => Math.min(current + 1, resultStepIndex));
  }

  function goToPreviousStep() {
    setSavedMessage("");
    setActiveStep((current) => Math.max(current - 1, 0));
  }

  async function saveScreeningResult() {
    if (!isEligibleForFindrisc) {
      setSavedMessage("Skrining FINDRISC tidak tersedia untuk kondisi yang dipilih.");
      return;
    }

    if (!isScreeningComplete) {
      setSavedMessage("Lengkapi semua data sebelum menyimpan hasil.");
      return;
    }

    if (!token) {
      setSavedMessage("Sesi login tidak ditemukan. Silakan masuk ulang.");
      return;
    }

    setSavedMessage("");

    try {
      const response = await fetch("/api/screenings", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          riskScore,
          resultTitle: riskResult.title,
          resultTone: riskResult.tone,
          resultEstimate: riskResult.estimate,
          idempotencyKey: screeningSessionId,
          bmi: bmi ? Number(bmi.toFixed(1)) : null,
          waist: waistNumber > 0 ? waistNumber : null,
          payload: {
            screeningContext,
            age,
            height,
            weight,
            waist,
            bmi: bmi ? Number(bmi.toFixed(1)) : null,
            riskScore,
            result: {
              title: riskResult.title,
              tone: riskResult.tone,
              estimate: riskResult.estimate
            },
            findriscAnswers,
            selectedLabels
          }
        })
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || "Hasil skrining belum bisa disimpan.");
      }

      setHistory((current) => [data.screening, ...current.filter((item) => item.id !== data.screening.id)].slice(0, 10));
      setSavedScreeningId(data.screening.id);
    } catch (error) {
      setSavedMessage(error.message);
    }
  }

  function downloadScreeningReport() {
    if (!isScreeningComplete) {
      setSavedMessage("Lengkapi semua data sebelum download report.");
      return;
    }

    setSavedMessage("Pilih Save as PDF pada dialog cetak untuk menyimpan report.");
    window.setTimeout(() => window.print(), 80);
  }

  function resetDraft() {
    clearScreeningDraft(userScope);
    setScreeningContext({ ...defaultScreeningContext });
    setFindriscAnswers({ ...defaultFindriscAnswers });
    setAge("");
    setHeight("");
    setWeight("");
    setWaist("");
    setScreeningSessionId(createScreeningSessionId());
    autoSaveSessionRef.current = "";
    setBaselineTouched({});
    setSavedScreeningId("");
    setActiveStep(0);
    setSavedMessage("Draft skrining dikosongkan.");
  }

  function renderGateStep() {
    return (
      <>
        <div className="panel-head">
          <span>01</span>
          <div>
            <h2>Sebelum mulai</h2>
            <p>Pastikan skrining yang dipakai sesuai kondisi pengguna.</p>
          </div>
        </div>

        <div className="screening-gate-list">
          {screeningGateQuestions.map((question) => (
            <fieldset className="screening-gate-group" key={question.id}>
              <legend>
                <strong>{question.title}</strong>
                <span>{question.description}</span>
              </legend>
              <div className="findrisc-option-grid">
                {question.options.map((option) => (
                  <label className="risk-option" key={option.value}>
                    <input
                      checked={screeningContext[question.id] === option.value}
                      name={question.id}
                      type="radio"
                      value={option.value}
                      onChange={() => updateScreeningContext(question.id, option.value)}
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          ))}
        </div>

        {gateBlock ? (
          <div className={`screening-gate-result tone-${gateBlock.tone}`}>
            <strong>{gateBlock.title}</strong>
            <p>{gateBlock.body}</p>
            <div className="screening-gate-actions">
              <Link className="button button-primary" to={gateBlock.primaryAction.to}>
                {gateBlock.primaryAction.label}
              </Link>
              <Link className="button button-secondary" to={gateBlock.secondaryAction.to}>
                {gateBlock.secondaryAction.label}
              </Link>
            </div>
          </div>
        ) : null}
      </>
    );
  }

  function renderBaselineStep() {
    function updateBaselineField(field, value, setter) {
      const normalizedValue = field === "age"
        ? value.replace(/\D/g, "")
        : value.replace(",", ".").replace(/[^\d.]/g, "").replace(/(\..*)\./g, "$1");

      markScreeningChanged();
      setter(normalizedValue);
    }

    function renderFieldError(field) {
      return baselineTouched[field] && baselineErrors[field] ? (
        <small className="field-error" id={`${field}-error`}>{baselineErrors[field]}</small>
      ) : null;
    }

    return (
      <>
        <div className="panel-head panel-head-baseline">
          <span>{String(activeStep + 1).padStart(2, "0")}</span>
          <div>
            <h2>Data dasar</h2>
            <p>Isi angka yang dibutuhkan FINDRISC.</p>
          </div>
        </div>

        <div className="metric-form screening-baseline-form">
          <label>
            Usia dalam tahun
            <input
              aria-describedby={baselineTouched.age && baselineErrors.age ? "age-error" : undefined}
              aria-invalid={Boolean(baselineTouched.age && baselineErrors.age)}
              inputMode="numeric"
              maxLength="3"
              placeholder="Contoh: 32"
              value={age}
              onBlur={() => setBaselineTouched((current) => ({ ...current, age: true }))}
              onChange={(event) => updateBaselineField("age", event.target.value, setAge)}
            />
            {renderFieldError("age")}
          </label>
          <label>
            Tinggi badan dalam cm
            <input
              aria-describedby={baselineTouched.height && baselineErrors.height ? "height-error" : undefined}
              aria-invalid={Boolean(baselineTouched.height && baselineErrors.height)}
              inputMode="decimal"
              maxLength="5"
              placeholder="Contoh: 158"
              value={height}
              onBlur={() => setBaselineTouched((current) => ({ ...current, height: true }))}
              onChange={(event) => updateBaselineField("height", event.target.value, setHeight)}
            />
            {renderFieldError("height")}
          </label>
          <label>
            Berat badan dalam kg
            <input
              aria-describedby={baselineTouched.weight && baselineErrors.weight ? "weight-error" : undefined}
              aria-invalid={Boolean(baselineTouched.weight && baselineErrors.weight)}
              inputMode="decimal"
              maxLength="6"
              placeholder="Contoh: 60"
              value={weight}
              onBlur={() => setBaselineTouched((current) => ({ ...current, weight: true }))}
              onChange={(event) => updateBaselineField("weight", event.target.value, setWeight)}
            />
            {renderFieldError("weight")}
          </label>
          <label>
            Lingkar perut dalam cm
            <input
              aria-describedby={baselineTouched.waist && baselineErrors.waist ? "waist-error" : undefined}
              aria-invalid={Boolean(baselineTouched.waist && baselineErrors.waist)}
              inputMode="decimal"
              maxLength="6"
              placeholder="Contoh: 82"
              value={waist}
              onBlur={() => setBaselineTouched((current) => ({ ...current, waist: true }))}
              onChange={(event) => updateBaselineField("waist", event.target.value, setWaist)}
            />
            {renderFieldError("waist")}
          </label>
        </div>
      </>
    );
  }

  function renderQuestionStep() {
    return (
      <>
        <div className="panel-head">
          <span>{String(activeStep + 1).padStart(2, "0")}</span>
          <div>
            <h2 id={`findrisc-${currentQuestion.id}`}>{currentQuestion.title}</h2>
            <p>{currentQuestion.description}</p>
          </div>
        </div>

        <div
          aria-labelledby={`findrisc-${currentQuestion.id}`}
          className="findrisc-question"
          role="radiogroup"
        >
          <div className="findrisc-option-grid">
            {currentQuestion.options.map((option) => (
              <label className="risk-option" key={option.value}>
                <input
                  checked={findriscAnswers[currentQuestion.id] === option.value}
                  name={currentQuestion.id}
                  type="radio"
                  value={option.value}
                  onChange={() => updateFindriscAnswer(currentQuestion.id, option.value)}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        </div>
      </>
    );
  }

  function renderScreeningHistory(limit = history.length) {
    if (!history.length) {
      return null;
    }

    return (
      <section className="screening-account-history" aria-label="Riwayat skrining">
        <div className="screening-history-heading">
          <h3>Riwayat skrining</h3>
          <span>{history.length} hasil tersimpan</span>
        </div>
        <div className="screening-history-list">
          {history.slice(0, limit).map((item) => (
            <Link className="screening-history-item" key={item.id} to={`/dashboard/skrining/${item.id}`}>
              <span>{new Date(item.createdAt).toLocaleDateString("id-ID")}</span>
              <strong>{item.resultTitle}</strong>
              <p>
                Skor FINDRISC {item.riskScore}
                {item.bmi ? `, IMT ${item.bmi}` : ""}
                {item.waist ? `, lingkar perut ${item.waist} cm` : ""}
              </p>
            </Link>
          ))}
        </div>
      </section>
    );
  }

  function renderResultStep() {
    return (
      <>
        <div className="panel-head">
          <span>{String(activeStep + 1).padStart(2, "0")}</span>
          <div>
            <h2>Hasil skrining</h2>
            <p>Gunakan hasil ini sebagai pengarah tindak lanjut, bukan diagnosis.</p>
          </div>
        </div>

        <div className={`screening-result tone-${riskResult.tone}`}>
          <span>Skor FINDRISC</span>
          <strong>{riskResult.title}</strong>
          <p>{riskResult.body}</p>
          <small>Skor: {riskScore} / 26</small>
        </div>

        <div className="followup-layout">
          <ol className="followup-list">
            {riskResult.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>

          <div className="followup-actions-panel">
            <div className="followup-action-list">
              {savedScreeningId ? (
                <Link className="followup-action-card" to={`/dashboard/skrining/${savedScreeningId}`}>
                  <span>DD</span>
                  <strong>Lihat detail hasil</strong>
                  <small>Buka hasil di akun.</small>
                </Link>
              ) : null}
              <button className="followup-action-card" type="button" onClick={downloadScreeningReport}>
                <span>PDF</span>
                <strong>Download report</strong>
                <small>Simpan ringkasan hasil.</small>
              </button>
              <Link className="followup-action-card" to="/gizi-seimbang">
                <span>3J</span>
                <strong>Baca gizi seimbang</strong>
                <small>Lanjut ke panduan makan.</small>
              </Link>
            </div>

            <div className="followup-footer-actions">
              <button className="button button-secondary" type="button" onClick={goToPreviousStep}>
                Kembali
              </button>
              <button className="button button-secondary" type="button" onClick={resetDraft}>
                Reset
              </button>
            </div>
          </div>
        </div>

        {renderScreeningHistory()}
      </>
    );
  }

  return (
    <section className="content-section content-shell screening-page">
      <PageMeta title="Deteksi Dini" description={page.intro} />
      {activeStep === 0 ? (
        <>
          <article className="screening-intro-card">
            <div className="screening-intro-bar" />
            <div className="screening-intro-content">
              <h1>Skrining awal risiko DM.</h1>
              <p>
                Isi beberapa data dasar dan pertanyaan singkat. Hasilnya membantu menentukan apakah
                perlu cek lanjutan.
              </p>
              <p className="screening-intro-notice">
                Kami cek dulu apakah FINDRISC sesuai untuk kondisi Anda.
              </p>
            </div>
          </article>
          {renderScreeningHistory(3)}
        </>
      ) : null}

      <div className={`screening-progress-card${activeStep > 0 ? " is-compact" : ""}`} ref={progressRef}>
        <div className="screening-progress-head">
          <div>
            <span>
              Langkah {activeStep + 1} dari {screeningSteps.length}
            </span>
            <strong>{currentStep.title}</strong>
          </div>
          <small>{progressValue}%</small>
        </div>
        <div className="screening-progress-track" aria-hidden="true">
          <span style={{ width: `${progressValue}%` }} />
        </div>
      </div>

      <div className="screening-shell">
        <article className="screening-panel">
          {activeStep === 0 ? renderGateStep() : null}
          {activeStep === 1 ? renderBaselineStep() : null}
          {currentQuestion ? renderQuestionStep() : null}
          {activeStep === resultStepIndex ? renderResultStep() : null}

          {activeStep < resultStepIndex && !gateBlock ? (
            <div className={`screening-step-actions${activeStep === 0 ? " is-stacked" : ""}`}>
              {activeStep > 0 ? (
                <button
                  className="button button-secondary"
                  type="button"
                  onClick={goToPreviousStep}
                >
                  Kembali
                </button>
              ) : null}
              <button
                className="button button-primary"
                disabled={!isCurrentStepComplete}
                type="button"
                onClick={goToNextStep}
              >
                Lanjut
              </button>
            </div>
          ) : null}

          {activeStep === 0 && gateBlock ? (
            <div className="screening-step-actions is-stacked">
              <button className="button button-secondary" type="button" onClick={resetDraft}>
                Reset pilihan
              </button>
            </div>
          ) : null}

          {savedMessage ? <p className="screening-save-note">{savedMessage}</p> : null}
        </article>
      </div>

      <div className="screening-print-report" aria-hidden="true">
        <div className="print-report-sheet">
          <p className="print-report-label">Sahabat CERDIK DM</p>
          <h1>Report FINDRISC</h1>
          <p className="print-report-date">
            Dibuat pada{" "}
            {new Date().toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric"
            })}
          </p>

          <div className="print-report-grid">
            <section>
              <span>Hasil skrining</span>
              <strong>{riskResult.title}</strong>
              <p>{riskResult.body}</p>
              <small>Skor FINDRISC: {riskScore} / 26</small>
            </section>

            <section>
              <span>Estimasi risiko 10 tahun</span>
              <strong>{riskResult.estimate}</strong>
              <p>Estimasi ini berasal dari kategori FINDRISC dan bukan diagnosis medis.</p>
              <small>IMT {bmiText}; lingkar perut {waistNumber > 0 ? `${waistNumber} cm` : "belum diisi"}</small>
            </section>
          </div>

          <section className="print-report-section">
            <h2>Ringkasan data</h2>
            <ul>
              {scoreBreakdown.map((item) => (
                <li key={item.label}>
                  {item.label}: {item.value}
                </li>
              ))}
            </ul>
          </section>

          <section className="print-report-section">
            <h2>Langkah berikutnya</h2>
            <ol>
              {riskResult.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </section>

          <p className="print-report-note">
            Report ini adalah hasil skrining mandiri awal dengan FINDRISC dan bukan diagnosis. Gunakan
            sebagai bahan diskusi saat berkonsultasi dengan tenaga kesehatan.
          </p>
        </div>
      </div>
    </section>
  );
}
