import assert from "node:assert/strict";
import test from "node:test";

import {
  calculateBmi,
  defaultFindriscAnswers,
  getBmiResult,
  getFindriscBaselineErrors,
  getFindriscResult,
  getFindriscScore,
  getScreeningGateBlock,
  isFindriscEligible,
  isFindriscBaselineValid
} from "./screening.js";

test("getFindriscScore menghitung skor FINDRISC lengkap", () => {
  const score = getFindriscScore({
    age: "58",
    height: "160",
    weight: "80",
    waist: "90",
    answers: {
      ...defaultFindriscAnswers,
      physicalActivity: "inactive",
      vegetables: "not_daily",
      bloodPressureMedication: "yes",
      highGlucoseHistory: "yes",
      familyHistory: "first_degree"
    }
  });

  assert.equal(score, 25);
});

test("getFindriscResult membagi kategori risiko", () => {
  assert.equal(getFindriscResult(0, false).title, "Lengkapi skrining");
  assert.equal(getFindriscResult(0).title, "Risiko rendah");
  assert.equal(getFindriscResult(12).title, "Risiko sedang");
  assert.equal(getFindriscResult(16).title, "Risiko tinggi");
  assert.equal(getFindriscResult(21).title, "Risiko sangat tinggi");
});

test("calculateBmi menghitung IMT dan menolak input kosong", () => {
  assert.equal(calculateBmi("", 60), null);
  assert.equal(calculateBmi(160, 60).toFixed(1), "23.4");
});

test("getBmiResult memberi pesan kategori IMT", () => {
  assert.match(getBmiResult(22), /rentang sehat/);
  assert.match(getBmiResult(26), /FINDRISC memberi 1 poin/);
});

test("validasi data dasar menolak angka di luar rentang", () => {
  assert.equal(isFindriscBaselineValid({ age: "32", height: "158", weight: "60", waist: "82" }), true);
  assert.deepEqual(getFindriscBaselineErrors({ age: "12", height: "300", weight: "10", waist: "20" }), {
    age: "Masukkan usia 18-120 tahun.",
    height: "Masukkan tinggi badan 100-250 cm.",
    weight: "Masukkan berat badan 25-350 kg.",
    waist: "Masukkan lingkar perut 40-200 cm."
  });
});

test("gate skrining hanya meloloskan pengguna dewasa non-hamil tanpa diagnosis dan keluhan menetap", () => {
  const eligibleContext = {
    ageGroup: "adult",
    pregnancyStatus: "not_pregnant",
    diagnosedDm: "no",
    urgentSymptoms: "no"
  };

  assert.equal(isFindriscEligible(eligibleContext), true);
  assert.equal(getScreeningGateBlock(eligibleContext), null);

  assert.equal(
    isFindriscEligible({
      ...eligibleContext,
      pregnancyStatus: "pregnant"
    }),
    false
  );
});
