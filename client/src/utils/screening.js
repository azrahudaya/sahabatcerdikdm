export const findriscQuestions = [
  {
    id: "physicalActivity",
    title: "Aktivitas fisik",
    description: "Apakah Anda rutin bergerak minimal 30 menit per hari atau sekitar 4 jam per minggu?",
    options: [
      { value: "active", label: "Ya, cukup rutin", points: 0 },
      { value: "inactive", label: "Belum rutin", points: 2 }
    ]
  },
  {
    id: "vegetables",
    title: "Sayur dan buah",
    description: "Apakah Anda makan sayur, buah, atau beri setiap hari?",
    options: [
      { value: "daily", label: "Ya, hampir setiap hari", points: 0 },
      { value: "not_daily", label: "Belum setiap hari", points: 1 }
    ]
  },
  {
    id: "bloodPressureMedication",
    title: "Obat tekanan darah",
    description: "Apakah Anda pernah atau sedang rutin minum obat tekanan darah tinggi?",
    options: [
      { value: "no", label: "Tidak", points: 0 },
      { value: "yes", label: "Ya", points: 2 }
    ]
  },
  {
    id: "highGlucoseHistory",
    title: "Riwayat gula darah tinggi",
    description: "Apakah Anda pernah diberi tahu kadar gula darah Anda tinggi, termasuk saat hamil?",
    options: [
      { value: "no", label: "Tidak / belum pernah", points: 0 },
      { value: "yes", label: "Ya, pernah", points: 5 }
    ]
  },
  {
    id: "familyHistory",
    title: "Riwayat keluarga DM",
    description: "Apakah ada keluarga yang memiliki diabetes?",
    options: [
      { value: "none", label: "Tidak ada / tidak tahu", points: 0 },
      { value: "second_degree", label: "Kakek/nenek, paman, bibi, atau sepupu", points: 3 },
      { value: "first_degree", label: "Orang tua, saudara kandung, atau anak", points: 5 }
    ]
  }
];

export const defaultFindriscAnswers = findriscQuestions.reduce((answers, question) => {
  answers[question.id] = "";
  return answers;
}, {});

export const defaultScreeningContext = {
  ageGroup: "",
  pregnancyStatus: "",
  diagnosedDm: "",
  urgentSymptoms: ""
};

export const screeningGateQuestions = [
  {
    id: "ageGroup",
    title: "Usia pengguna",
    description: "FINDRISC di aplikasi ini hanya diarahkan untuk pengguna dewasa.",
    options: [
      { value: "adult", label: "18 tahun atau lebih" },
      { value: "under18", label: "Di bawah 18 tahun" }
    ]
  },
  {
    id: "pregnancyStatus",
    title: "Status kehamilan",
    description: "Ibu hamil membutuhkan jalur informasi diabetes gestasional.",
    options: [
      { value: "not_pregnant", label: "Tidak sedang hamil" },
      { value: "pregnant", label: "Sedang hamil" }
    ]
  },
  {
    id: "diagnosedDm",
    title: "Riwayat diagnosis",
    description: "Jika sudah didiagnosis DM, fokusnya bukan lagi skor risiko awal.",
    options: [
      { value: "no", label: "Belum pernah didiagnosis DM" },
      { value: "yes", label: "Sudah pernah didiagnosis DM" }
    ]
  },
  {
    id: "urgentSymptoms",
    title: "Keluhan saat ini",
    description: "Keluhan yang menetap sebaiknya diperiksa langsung.",
    options: [
      { value: "no", label: "Tidak ada keluhan berat/menetap" },
      { value: "yes", label: "Ada keluhan yang mengganggu atau menetap" }
    ]
  }
];

export function isScreeningGateComplete(context) {
  return screeningGateQuestions.every((question) => Boolean(context?.[question.id]));
}

export function getScreeningGateBlock(context) {
  if (!isScreeningGateComplete(context)) {
    return null;
  }

  if (context.urgentSymptoms === "yes") {
    return {
      tone: "danger",
      title: "Keluhan perlu diperiksa langsung.",
      body:
        "Jika keluhan seperti sering haus, sering buang air kecil, lelah berat, luka sulit sembuh, atau penglihatan kabur terasa menetap, lebih aman lanjut cek ke tenaga kesehatan.",
      primaryAction: { label: "Baca tanda DM", to: "/tentang-dm" },
      secondaryAction: { label: "Kembali ke dashboard", to: "/dashboard" }
    };
  }

  if (context.pregnancyStatus === "pregnant") {
    return {
      tone: "warning",
      title: "Gunakan jalur ibu hamil.",
      body:
        "FINDRISC memperkirakan risiko DM tipe 2 pada orang dewasa, bukan diagnosis diabetes gestasional. Untuk kehamilan, fokus utama adalah edukasi DM gestasional dan pemeriksaan sesuai arahan tenaga kesehatan.",
      primaryAction: { label: "Buka fase ibu hamil", to: "/fase/ibu-hamil" },
      secondaryAction: { label: "Baca gizi seimbang", to: "/gizi-seimbang" }
    };
  }

  if (context.diagnosedDm === "yes") {
    return {
      tone: "warning",
      title: "Fokus pada pemantauan, bukan skor risiko.",
      body:
        "Jika sudah pernah didiagnosis DM, hasil FINDRISC tidak diperlukan untuk menentukan ada atau tidaknya DM. Gunakan aplikasi untuk materi, gizi, reminder, dan tindak lanjut bersama tenaga kesehatan.",
      primaryAction: { label: "Baca pencegahan", to: "/pencegahan-dm" },
      secondaryAction: { label: "Atur reminder", to: "/dashboard/reminder-harian" }
    };
  }

  if (context.ageGroup === "under18") {
    return {
      tone: "neutral",
      title: "Untuk remaja, mulai dari edukasi.",
      body:
        "Remaja tetap bisa membaca materi kebiasaan sehat, tetapi skor FINDRISC di aplikasi ini tidak dipakai untuk pengguna di bawah 18 tahun.",
      primaryAction: { label: "Buka fase remaja", to: "/fase/remaja" },
      secondaryAction: { label: "Baca pencegahan", to: "/pencegahan-dm" }
    };
  }

  return null;
}

export function isFindriscEligible(context) {
  return isScreeningGateComplete(context) && !getScreeningGateBlock(context);
}

export const findriscBaselineFields = {
  age: {
    label: "Usia",
    min: 18,
    max: 120,
    integer: true,
    message: "Masukkan usia 18-120 tahun."
  },
  height: {
    label: "Tinggi badan",
    min: 100,
    max: 250,
    message: "Masukkan tinggi badan 100-250 cm."
  },
  weight: {
    label: "Berat badan",
    min: 25,
    max: 350,
    message: "Masukkan berat badan 25-350 kg."
  },
  waist: {
    label: "Lingkar perut",
    min: 40,
    max: 200,
    message: "Masukkan lingkar perut 40-200 cm."
  }
};

export function getFindriscBaselineErrors(values, { showEmpty = false } = {}) {
  return Object.entries(findriscBaselineFields).reduce((errors, [field, rules]) => {
    const rawValue = String(values?.[field] ?? "").trim();

    if (!rawValue) {
      if (showEmpty) {
        errors[field] = `${rules.label} wajib diisi.`;
      }
      return errors;
    }

    const value = Number(rawValue);
    const isInvalidNumber = !Number.isFinite(value) || (rules.integer && !Number.isInteger(value));

    if (isInvalidNumber || value < rules.min || value > rules.max) {
      errors[field] = rules.message;
    }

    return errors;
  }, {});
}

export function isFindriscBaselineValid(values) {
  const hasEveryValue = Object.keys(findriscBaselineFields).every((field) =>
    String(values?.[field] ?? "").trim()
  );

  return hasEveryValue && Object.keys(getFindriscBaselineErrors(values)).length === 0;
}

export function calculateBmi(height, weight) {
  const heightMeter = Number(height) / 100;

  if (Number(weight) <= 0 || heightMeter <= 0) {
    return null;
  }

  return Number(weight) / (heightMeter * heightMeter);
}

export function getBmiResult(bmi) {
  if (!bmi) return null;
  if (bmi < 18.5) return "Berat badan kurang. Tetap evaluasi pola makan dan kondisi tubuh.";
  if (bmi < 23) return "IMT berada pada rentang sehat untuk populasi Asia.";
  if (bmi < 25) return "Mulai waspada menurut ambang lokal Asia. FINDRISC standar mulai memberi poin pada IMT 25.";
  if (bmi < 30) return "FINDRISC memberi 1 poin pada rentang ini. Mulai rapikan berat badan dan kebiasaan harian.";
  return "FINDRISC memberi 3 poin pada rentang ini. Pertimbangkan cek lanjutan dan pendampingan tenaga kesehatan.";
}

export function getAgePoints(age) {
  const ageNumber = Number(age);

  if (!Number.isFinite(ageNumber) || ageNumber < 45) return 0;
  if (ageNumber < 55) return 2;
  if (ageNumber < 65) return 3;
  return 4;
}

export function getBmiPoints(bmi) {
  if (!bmi || bmi < 25) return 0;
  if (bmi < 30) return 1;
  return 3;
}

export function getWaistPoints(waist) {
  const waistNumber = Number(waist);

  if (!Number.isFinite(waistNumber) || waistNumber < 80) return 0;
  if (waistNumber <= 88) return 3;
  return 4;
}

export function getQuestionPoints(answers) {
  return findriscQuestions.reduce((total, question) => {
    const selectedOption = question.options.find((option) => option.value === answers?.[question.id]);
    return total + (selectedOption?.points || 0);
  }, 0);
}

export function getFindriscScore({ age, height, weight, waist, answers }) {
  const bmi = calculateBmi(height, weight);

  return getAgePoints(age) + getBmiPoints(bmi) + getWaistPoints(waist) + getQuestionPoints(answers);
}

export function getFindriscBreakdown({ age, height, weight, waist, answers }) {
  const bmi = calculateBmi(height, weight);

  return [
    {
      label: "Usia",
      value: age ? `${age} tahun` : "Belum diisi",
      points: getAgePoints(age)
    },
    {
      label: "IMT",
      value: bmi ? bmi.toFixed(1) : "Belum lengkap",
      points: getBmiPoints(bmi)
    },
    {
      label: "Lingkar perut",
      value: waist ? `${waist} cm` : "Belum diisi",
      points: getWaistPoints(waist)
    },
    ...findriscQuestions.map((question) => {
      const selectedOption = question.options.find((option) => option.value === answers?.[question.id]);

      return {
        label: question.title,
        value: selectedOption?.label || "Belum dipilih",
        points: selectedOption?.points || 0
      };
    })
  ];
}

export function isFindriscComplete({ age, height, weight, waist, answers }) {
  const hasRequiredNumbers = isFindriscBaselineValid({ age, height, weight, waist });
  const hasAllAnswers = findriscQuestions.every((question) => Boolean(answers?.[question.id]));

  return hasRequiredNumbers && hasAllAnswers;
}

export function getFindriscResult(score, isComplete = true) {
  if (!isComplete) {
    return {
      tone: "neutral",
      title: "Lengkapi skrining",
      body: "Isi data dasar dan jawaban FINDRISC untuk melihat estimasi risiko.",
      estimate: "Belum dihitung",
      steps: [
        "Isi usia, tinggi, berat badan, dan lingkar perut.",
        "Jawab semua pertanyaan kebiasaan dan riwayat kesehatan.",
        "Gunakan hasil akhir sebagai pengarah cek lanjutan, bukan diagnosis."
      ]
    };
  }

  if (score < 7) {
    return {
      tone: "safe",
      title: "Risiko rendah",
      body: "Skor FINDRISC menunjukkan risiko 10 tahun yang rendah. Tetap jaga pola CERDIK.",
      estimate: "Sekitar 1 dari 100 orang",
      steps: [
        "Pertahankan aktivitas fisik dan pola makan seimbang.",
        "Pantau IMT dan lingkar perut secara berkala.",
        "Ulangi skrining jika kondisi tubuh atau riwayat kesehatan berubah."
      ]
    };
  }

  if (score < 12) {
    return {
      tone: "safe",
      title: "Risiko sedikit meningkat",
      body: "Mulai rapikan kebiasaan harian agar risiko tidak bertambah.",
      estimate: "Sekitar 1 dari 25 orang",
      steps: [
        "Kurangi faktor yang bisa diubah seperti kurang gerak dan pola makan tidak seimbang.",
        "Pantau berat badan dan lingkar perut.",
        "Pertimbangkan cek gula darah bila ada gejala atau faktor risiko tambahan."
      ]
    };
  }

  if (score < 15) {
    return {
      tone: "warning",
      title: "Risiko sedang",
      body: "Hasil menunjukkan perlunya perhatian lebih dan pemantauan kesehatan.",
      estimate: "Sekitar 1 dari 6 orang",
      steps: [
        "Jadwalkan cek gula darah di fasilitas kesehatan.",
        "Bawa hasil skrining ini saat konsultasi.",
        "Mulai target perubahan CERDIK yang paling mudah dilakukan minggu ini."
      ]
    };
  }

  if (score <= 20) {
    return {
      tone: "danger",
      title: "Risiko tinggi",
      body: "Skor FINDRISC tinggi. Sebaiknya lakukan pemeriksaan gula darah lanjutan.",
      estimate: "Sekitar 1 dari 3 orang",
      steps: [
        "Lakukan pemeriksaan gula darah di fasilitas kesehatan.",
        "Diskusikan faktor risiko yang mendapat poin tertinggi.",
        "Minta arahan tenaga kesehatan untuk rencana perubahan gaya hidup."
      ]
    };
  }

  return {
    tone: "danger",
    title: "Risiko sangat tinggi",
    body: "Skor FINDRISC sangat tinggi. Pemeriksaan lanjutan sebaiknya tidak ditunda.",
    estimate: "Sekitar 1 dari 2 orang",
    steps: [
      "Segera jadwalkan pemeriksaan gula darah.",
      "Bawa laporan saat bertemu tenaga kesehatan.",
      "Mulai pendampingan perubahan gaya hidup dengan target yang realistis."
    ]
  };
}

export function getFindriscSelectedLabels(answers) {
  return findriscQuestions.map((question) => {
    const selectedOption = question.options.find((option) => option.value === answers?.[question.id]);
    return `${question.title}: ${selectedOption?.label || "Belum dipilih"}`;
  });
}
