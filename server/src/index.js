import cors from "cors";
import express from "express";
import { createHash, randomBytes, randomUUID } from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import "./lib/env.js";
import { overview } from "./data/overview.js";
import { hashPassword, signAuthToken, verifyAuthToken, verifyPassword } from "./lib/auth.js";
import { initializeDatabase, query } from "./lib/db.js";
import {
  createUser,
  findUserById,
  findUserByIdentifier,
  toPublicUser,
  validateProfilePayload,
  validateRegistrationPayload
} from "./lib/users.js";
import {
  getWhatsAppStatus,
  sendWhatsAppMessage,
  startWhatsAppClient
} from "./services/whatsapp.js";
import { sendAccountActionEmail, sendScreeningResultEmail } from "./services/email.js";

export const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientDist = path.resolve(__dirname, "../../client/dist");
const storageDir = path.resolve(__dirname, "../storage");
const feedbackFile = path.join(storageDir, "feedback.json");
const whatsappReminderFile = path.join(storageDir, "whatsapp-reminders.json");
const port = Number(process.env.PORT) || 5000;
const reminderTimezone = process.env.REMINDER_TIMEZONE || "Asia/Jakarta";
const allowedOrigins = (process.env.CORS_ORIGIN || "http://localhost:5173,http://localhost:5000")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);
const rateLimitStore = new Map();
const authRateLimitStore = new Map();
const allowedPhaseSlugs = new Set([
  "remaja",
  "reproduksi-dewasa",
  "ibu-hamil",
  "ibu-nifas-menyusui",
  "usia-lanjut"
]);
const reminderDays = new Set(["senin", "selasa", "rabu", "kamis", "jumat", "sabtu", "minggu"]);
const screeningAnswerPoints = {
  physicalActivity: { active: 0, inactive: 2 },
  vegetables: { daily: 0, not_daily: 1 },
  bloodPressureMedication: { no: 0, yes: 2 },
  highGlucoseHistory: { no: 0, yes: 5 },
  familyHistory: { none: 0, second_degree: 3, first_degree: 5 }
};
const evaluationTypeLabels = {
  pretest: "Pre-test",
  posttest: "Post-test",
  quiz: "Kuis CERDIK"
};
const evaluationAnswerKey = {
  "app-purpose": "education",
  cerdik: "steps",
  "findrisc-limit": "screening",
  "pregnancy-flow": "pregnancy-care",
  nutrition: "jumlah-jenis-jadwal",
  "warning-sign": "check"
};
const cerdikFocusByDay = {
  senin: "Mulai minggu dengan cek tubuh sederhana atau jadwal kontrol yang perlu diingat.",
  selasa: "Jaga diri dan rumah dari paparan asap rokok aktif maupun pasif.",
  rabu: "Sisihkan waktu untuk bergerak ringan sesuai kemampuan tubuh.",
  kamis: "Rapikan pilihan makan dengan prinsip jumlah, jenis, dan jadwal.",
  jumat: "Beri tubuh waktu istirahat yang cukup dan lebih teratur.",
  sabtu: "Luangkan waktu untuk relaksasi sederhana agar stres lebih terkendali.",
  minggu: "Catat perubahan tubuh atau keluhan yang perlu ditanyakan saat pemeriksaan."
};
const phaseReminderFocus = {
  remaja: "Bangun kebiasaan aktif dan pilihan makan yang lebih baik sejak dini.",
  "reproduksi-dewasa": "Jaga ritme makan, aktivitas, tidur, dan pemeriksaan saat ada faktor risiko.",
  "ibu-hamil": "Ikuti kontrol kehamilan dan diskusikan pemeriksaan gula darah dengan tenaga kesehatan.",
  "ibu-nifas-menyusui": "Utamakan pemulihan, menyusui, makan teratur, dan tindak lanjut pascapersalinan.",
  "usia-lanjut": "Jaga gerak aman, pemeriksaan rutin, serta perawatan kaki dan keluhan harian."
};
const whatsappReminderSelect = `
  id, user_id, name, phone, time, focus, days, enabled,
  last_sent_date, last_sent_at, last_error, created_at, updated_at
`;
const feedbackEntrySelect = "id, user_id, topics, satisfaction, message, created_at";

function assertRuntimeConfig() {
  const defaultSecrets = new Set([
    "change-this-secret-before-production",
    "dev-docker-sahabat-cerdik-dm-secret",
    "dev-only-sahabat-cerdik-dm-secret"
  ]);

  if (process.env.NODE_ENV === "production" && defaultSecrets.has(process.env.AUTH_SECRET || "")) {
    throw new Error("AUTH_SECRET production belum aman. Set AUTH_SECRET unik melalui environment.");
  }
}

function securityHeaders(_req, res, next) {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  next();
}

function enforceHttps(req, res, next) {
  const forwardedProto = req.headers["x-forwarded-proto"];

  if (process.env.NODE_ENV === "production" && forwardedProto && forwardedProto !== "https") {
    res.redirect(301, `https://${req.headers.host}${req.originalUrl}`);
    return;
  }

  next();
}

function rateLimit(req, res, next) {
  if (!req.path.startsWith("/api")) {
    next();
    return;
  }

  const windowMs = 60_000;
  const maxRequests = 90;
  const key = req.ip || req.headers["x-forwarded-for"] || "unknown";
  const now = Date.now();
  const record = rateLimitStore.get(key) || { count: 0, resetAt: now + windowMs };

  if (now > record.resetAt) {
    record.count = 0;
    record.resetAt = now + windowMs;
  }

  record.count += 1;
  rateLimitStore.set(key, record);

  if (record.count > maxRequests) {
    res.status(429).json({
      status: "rate_limited",
      message: "Terlalu banyak permintaan. Coba lagi beberapa saat."
    });
    return;
  }

  next();
}

function authRateLimit(req, res, next) {
  const windowMs = 15 * 60_000;
  const maxRequests = 10;
  const key = `${req.ip || req.headers["x-forwarded-for"] || "unknown"}:${req.path}`;
  const now = Date.now();
  const record = authRateLimitStore.get(key) || { count: 0, resetAt: now + windowMs };

  if (now > record.resetAt) {
    record.count = 0;
    record.resetAt = now + windowMs;
  }

  record.count += 1;
  authRateLimitStore.set(key, record);

  if (record.count > maxRequests) {
    res.status(429).json({
      status: "rate_limited",
      message: "Terlalu banyak percobaan. Coba lagi beberapa saat."
    });
    return;
  }

  next();
}

function getBearerToken(req) {
  const authorization = req.headers.authorization || "";
  const [scheme, token] = authorization.split(" ");

  if (scheme?.toLowerCase() !== "bearer" || !token) {
    return null;
  }

  return token;
}

async function requireAuth(req, res, next) {
  try {
    const token = getBearerToken(req);
    const payload = verifyAuthToken(token);

    if (!payload) {
      res.status(401).json({
        status: "unauthorized",
        message: "Sesi tidak valid. Silakan login kembali."
      });
      return;
    }

    const user = await findUserById(payload.sub);

    if (!user || Number(payload.ver || 0) !== user.authVersion) {
      res.status(401).json({
        status: "unauthorized",
        message: "User tidak ditemukan. Silakan login kembali."
      });
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}

function hashActionToken(token) {
  return createHash("sha256").update(token).digest("hex");
}

async function issueAccountActionToken({ type, user, email = user.email }) {
  const token = randomBytes(32).toString("hex");
  const ttlMinutes = type === "email_verification"
    ? Number(process.env.EMAIL_VERIFICATION_TTL_HOURS || 24) * 60
    : Number(process.env.PASSWORD_RESET_TTL_MINUTES || 60);

  await query(
    `UPDATE account_action_tokens
     SET used_at = now()
     WHERE user_id = $1 AND type = $2 AND used_at IS NULL`,
    [user.id, type]
  );
  await query(
    `INSERT INTO account_action_tokens
      (id, user_id, type, token_hash, target_email, expires_at)
     VALUES ($1, $2, $3, $4, $5, now() + ($6 * interval '1 minute'))`,
    [randomUUID(), user.id, type, hashActionToken(token), email, ttlMinutes]
  );

  try {
    return await sendAccountActionEmail({ type, token, user, email });
  } catch (error) {
    return { status: "failed", reason: error.message };
  }
}

async function readJsonFile(filePath, fallback) {
  try {
    const content = await fs.readFile(filePath, "utf8");
    return JSON.parse(content);
  } catch (_error) {
    return fallback;
  }
}

function getReminderClock() {
  const parts = new Intl.DateTimeFormat("id-ID", {
    timeZone: reminderTimezone,
    weekday: "long",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  })
    .formatToParts(new Date())
    .reduce((accumulator, part) => {
      accumulator[part.type] = part.value;
      return accumulator;
    }, {});

  return {
    dateKey: `${parts.year}-${parts.month}-${parts.day}`,
    time: `${parts.hour}:${parts.minute}`,
    weekday: parts.weekday?.toLowerCase()
  };
}

function buildReminderMessage(reminder) {
  return [
    `Halo ${reminder.name || "Sahabat"}, ini reminder CERDIK DM.`,
    `Fokus hari ini: ${reminder.focus || "jaga kebiasaan sehat"}.`,
    "Luangkan waktu sebentar untuk cek tubuh, makan seimbang, bergerak, dan istirahat cukup.",
    "Pesan ini bersifat edukatif dan bukan pengganti saran tenaga kesehatan."
  ].join("\n");
}

function getAutoReminderFocus({ days = [], user = {} } = {}) {
  const firstDay = days.find((day) => reminderDays.has(day));
  const phaseFocus = phaseReminderFocus[user?.preferredPhaseSlug] || "";
  const dayFocus = firstDay ? cerdikFocusByDay[firstDay] : "";
  const focus = [phaseFocus, dayFocus].filter(Boolean).join(" ");

  return (focus || "Lanjutkan satu langkah CERDIK kecil hari ini.").slice(0, 180);
}

function resolveReminderFocus({ focus, days, user }) {
  const customFocus = String(focus || "").trim().slice(0, 180);
  return customFocus || getAutoReminderFocus({ days, user });
}

function toScreeningResult(row) {
  return {
    id: row.id,
    riskScore: row.risk_score,
    resultTitle: row.result_title,
    resultTone: row.result_tone,
    resultEstimate: row.result_estimate,
    bmi: row.bmi === null ? null : Number(row.bmi),
    waist: row.waist === null ? null : Number(row.waist),
    payload: row.payload,
    createdAt: row.created_at
  };
}

function toEvaluationResult(row) {
  return {
    id: row.id,
    type: row.type,
    label: evaluationTypeLabels[row.type] || row.type,
    answers: row.answers,
    score: row.score,
    total: row.total,
    createdAt: row.created_at
  };
}

function toWhatsappReminder(row) {
  return {
    id: row.id,
    userId: row.user_id,
    name: row.name || "",
    phone: row.phone,
    time: row.time,
    focus: row.focus,
    days: Array.isArray(row.days) ? row.days : [],
    enabled: row.enabled,
    lastSentDate: row.last_sent_date,
    lastSentAt: row.last_sent_at,
    lastError: row.last_error,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

function toFeedbackEntry(row) {
  return {
    id: row.id,
    userId: row.user_id,
    topics: Array.isArray(row.topics) ? row.topics : [],
    satisfaction: row.satisfaction,
    message: row.message || "",
    createdAt: row.created_at
  };
}

function parseOptionalNumber(value) {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function getScreeningValidationError({ payload, riskScore, bmi, waist }) {
  const context = payload.screeningContext;
  if (!context || typeof context !== "object" || Array.isArray(context)) {
    return "Konteks skrining belum lengkap.";
  }

  if (
    context.ageGroup !== "adult" ||
    context.pregnancyStatus !== "not_pregnant" ||
    context.diagnosedDm !== "no" ||
    context.urgentSymptoms !== "no"
  ) {
    return "FINDRISC hanya disimpan untuk pengguna dewasa, tidak sedang hamil, belum didiagnosis DM, dan tanpa keluhan yang perlu pemeriksaan langsung.";
  }

  const numericFields = {
    age: { min: 18, max: 120, integer: true, label: "Usia" },
    height: { min: 100, max: 250, label: "Tinggi badan" },
    weight: { min: 25, max: 350, label: "Berat badan" },
    waist: { min: 40, max: 200, label: "Lingkar perut" }
  };
  const values = Object.fromEntries(
    Object.keys(numericFields).map((field) => [field, Number(payload[field])])
  );

  for (const [field, rules] of Object.entries(numericFields)) {
    const value = values[field];
    if (
      !Number.isFinite(value) ||
      value < rules.min ||
      value > rules.max ||
      (rules.integer && !Number.isInteger(value))
    ) {
      return `${rules.label} berada di luar rentang yang dapat diterima.`;
    }
  }

  const answers = payload.findriscAnswers;
  if (!answers || typeof answers !== "object" || Array.isArray(answers)) {
    return "Jawaban FINDRISC belum lengkap.";
  }

  let questionScore = 0;
  for (const [question, options] of Object.entries(screeningAnswerPoints)) {
    if (!(answers[question] in options)) {
      return "Jawaban FINDRISC belum lengkap atau tidak valid.";
    }
    questionScore += options[answers[question]];
  }

  const calculatedBmi = values.weight / ((values.height / 100) ** 2);
  const ageScore = values.age < 45 ? 0 : values.age < 55 ? 2 : values.age < 65 ? 3 : 4;
  const bmiScore = calculatedBmi < 25 ? 0 : calculatedBmi < 30 ? 1 : 3;
  const waistScore = values.waist < 80 ? 0 : values.waist <= 88 ? 3 : 4;
  const expectedScore = ageScore + bmiScore + waistScore + questionScore;

  if (!Number.isInteger(riskScore) || riskScore !== expectedScore) {
    return "Skor FINDRISC tidak sesuai dengan data yang diisi.";
  }

  if (bmi === null || Math.abs(bmi - Number(calculatedBmi.toFixed(1))) > 0.1) {
    return "Nilai IMT tidak sesuai dengan tinggi dan berat badan.";
  }

  if (waist === null || Math.abs(waist - values.waist) > 0.01) {
    return "Nilai lingkar perut tidak sesuai dengan data yang diisi.";
  }

  return null;
}

function parseReminderPayload(body) {
  const name = String(body.name || "").trim().slice(0, 80);
  const phone = String(body.phone || "").trim().slice(0, 32);
  const time = String(body.time || "").trim();
  const focus = String(body.focus || "").trim().slice(0, 180);
  const days = Array.isArray(body.days)
    ? [...new Set(body.days.map((day) => String(day).toLowerCase()))].filter((day) => reminderDays.has(day))
    : [];
  const phoneDigits = phone.replace(/\D/g, "");
  const [hour, minute] = time.split(":").map(Number);

  if (phoneDigits.length < 9 || phoneDigits.length > 15) {
    return { error: "Masukkan nomor WhatsApp yang valid." };
  }

  if (!/^\d{2}:\d{2}$/.test(time) || hour > 23 || minute > 59) {
    return { error: "Pilih jam reminder yang valid." };
  }

  if (!days.length) {
    return { error: "Pilih minimal satu hari aktif." };
  }

  return { name, phone, time, focus, days };
}

function isUuid(value) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    String(value || "")
  );
}

async function runReminderScheduler() {
  const clock = getReminderClock();
  const result = await query(
    `SELECT ${whatsappReminderSelect}
     FROM whatsapp_reminders
     WHERE enabled = true AND time = $1`,
    [clock.time]
  );

  await Promise.all(
    result.rows.map(async (row) => {
      const reminder = toWhatsappReminder(row);
      const isDue =
        reminder.lastSentDate !== clock.dateKey &&
        (!reminder.days.length || reminder.days.includes(clock.weekday));

      if (!isDue) {
        return;
      }

      try {
        await sendWhatsAppMessage({
          phone: reminder.phone,
          message: buildReminderMessage(reminder)
        });
        await query(
          `UPDATE whatsapp_reminders
           SET last_sent_date = $2, last_sent_at = now(), last_error = NULL, updated_at = now()
           WHERE id = $1`,
          [reminder.id, clock.dateKey]
        );
      } catch (error) {
        await query(
          `UPDATE whatsapp_reminders
           SET last_error = $2, updated_at = now()
           WHERE id = $1`,
          [reminder.id, error.message]
        );
      }
    })
  );
}

function toDateParam(value, fallback = null) {
  if (!value) {
    return fallback;
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? fallback : date.toISOString();
}

async function migrateJsonStorageToDatabase() {
  const [legacyReminders, legacyFeedback] = await Promise.all([
    readJsonFile(whatsappReminderFile, []),
    readJsonFile(feedbackFile, [])
  ]);
  const reminderItems = Array.isArray(legacyReminders) ? legacyReminders : [];
  const feedbackItems = Array.isArray(legacyFeedback) ? legacyFeedback : [];

  await Promise.all(
    reminderItems.map(async (item) => {
      if (!isUuid(item.id) || !isUuid(item.userId)) {
        return;
      }

      const parsed = parseReminderPayload(item);

      if (parsed.error) {
        return;
      }

      await query(
        `INSERT INTO whatsapp_reminders
          (id, user_id, name, phone, time, focus, days, enabled,
           last_sent_date, last_sent_at, last_error, created_at, updated_at)
         SELECT $1, $2, $3, $4, $5, $6, $7::jsonb, $8, $9, $10::timestamptz, $11, $12::timestamptz, $13::timestamptz
         WHERE EXISTS (SELECT 1 FROM users WHERE id = $2)
         ON CONFLICT (id) DO NOTHING`,
        [
          item.id,
          item.userId,
          parsed.name || null,
          parsed.phone,
          parsed.time,
          resolveReminderFocus({ focus: parsed.focus, days: parsed.days }),
          JSON.stringify(parsed.days),
          item.enabled !== false,
          item.lastSentDate || null,
          toDateParam(item.lastSentAt),
          item.lastError ? String(item.lastError).slice(0, 500) : null,
          toDateParam(item.createdAt, new Date().toISOString()),
          toDateParam(item.updatedAt || item.createdAt, new Date().toISOString())
        ]
      );
    })
  );

  await Promise.all(
    feedbackItems.map(async (item) => {
      if (!isUuid(item.id) || !isUuid(item.userId)) {
        return;
      }

      const topics = Array.isArray(item.topics)
        ? item.topics.map((topic) => String(topic).trim()).filter(Boolean).slice(0, 8)
        : [];
      const satisfaction = String(item.satisfaction || "").trim().slice(0, 80);
      const message = String(item.message || "").trim().slice(0, 1200);

      if (!satisfaction) {
        return;
      }

      await query(
        `INSERT INTO feedback_entries
          (id, user_id, topics, satisfaction, message, created_at)
         SELECT $1, $2, $3::jsonb, $4, $5, $6::timestamptz
         WHERE EXISTS (SELECT 1 FROM users WHERE id = $2)
         ON CONFLICT (id) DO NOTHING`,
        [
          item.id,
          item.userId,
          JSON.stringify(topics),
          satisfaction,
          message || null,
          toDateParam(item.createdAt, new Date().toISOString())
        ]
      );
    })
  );
}

app.use(securityHeaders);
app.use(enforceHttps);
app.use(rateLimit);
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error("Origin tidak diizinkan oleh CORS."));
    }
  })
);
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    message: "API Sahabat CERDIK DM siap dipakai.",
    timestamp: new Date().toISOString()
  });
});

app.get("/api/overview", (_req, res) => {
  res.json(overview);
});

app.post("/api/auth/register", authRateLimit, async (req, res, next) => {
  try {
    const parsed = validateRegistrationPayload(req.body);

    if (parsed.error) {
      res.status(400).json({
        status: "invalid",
        message: parsed.error
      });
      return;
    }

    const passwordHash = await hashPassword(parsed.value.password);
    const user = await createUser({
      name: parsed.value.name,
      email: parsed.value.email,
      phone: parsed.value.phone,
      passwordHash
    });
    const token = signAuthToken(user);
    const emailVerification = user.email
      ? await issueAccountActionToken({ type: "email_verification", user })
      : { status: "skipped", reason: "Akun belum memiliki email." };

    res.status(201).json({
      status: "ok",
      message: "Registrasi berhasil.",
      user,
      token,
      emailVerification
    });
  } catch (error) {
    if (error.code === "23505") {
      res.status(409).json({
        status: "conflict",
        message: "Nomor WhatsApp atau email sudah terdaftar."
      });
      return;
    }

    next(error);
  }
});

app.post("/api/auth/login", authRateLimit, async (req, res, next) => {
  try {
    const identifier = String(req.body.identifier || "").trim();
    const password = String(req.body.password || "");

    if (!identifier || !password) {
      res.status(400).json({
        status: "invalid",
        message: "Nomor WhatsApp/email dan password wajib diisi."
      });
      return;
    }

    const userRecord = await findUserByIdentifier(identifier);
    if (!userRecord) {
      res.status(404).json({
        status: "not_registered",
        message: "Akun belum terdaftar. Silakan daftar dulu."
      });
      return;
    }

    const isPasswordValid = await verifyPassword(password, userRecord.password_hash);

    if (!isPasswordValid) {
      res.status(401).json({
        status: "unauthorized",
        message: "Password salah."
      });
      return;
    }

    const user = toPublicUser(userRecord);
    const token = signAuthToken(user);

    res.json({
      status: "ok",
      message: "Login berhasil.",
      user,
      token
    });
  } catch (error) {
    next(error);
  }
});

app.get("/api/auth/me", requireAuth, (req, res) => {
  res.json({
    status: "ok",
    user: req.user
  });
});

app.patch("/api/auth/password", authRateLimit, requireAuth, async (req, res, next) => {
  try {
    const currentPassword = String(req.body.currentPassword || "");
    const newPassword = String(req.body.newPassword || "");

    if (!currentPassword || newPassword.length < 8 || newPassword.length > 128) {
      res.status(400).json({
        status: "invalid",
        message: "Password lama dan password baru minimal 8 karakter wajib diisi."
      });
      return;
    }

    const result = await query(
      `SELECT password_hash FROM users WHERE id = $1 LIMIT 1`,
      [req.user.id]
    );
    const isCurrentPasswordValid = await verifyPassword(currentPassword, result.rows[0]?.password_hash);

    if (!isCurrentPasswordValid) {
      res.status(401).json({ status: "unauthorized", message: "Password lama tidak sesuai." });
      return;
    }

    if (await verifyPassword(newPassword, result.rows[0].password_hash)) {
      res.status(400).json({ status: "invalid", message: "Password baru harus berbeda." });
      return;
    }

    const passwordHash = await hashPassword(newPassword);
    await query(
      `UPDATE users
       SET password_hash = $1, auth_version = auth_version + 1, updated_at = now()
       WHERE id = $2`,
      [passwordHash, req.user.id]
    );
    await query(
      `UPDATE account_action_tokens SET used_at = now()
       WHERE user_id = $1 AND type = 'password_reset' AND used_at IS NULL`,
      [req.user.id]
    );

    res.json({ status: "ok", message: "Password diperbarui. Silakan masuk kembali." });
  } catch (error) {
    next(error);
  }
});

app.post("/api/auth/password/forgot", authRateLimit, async (req, res, next) => {
  try {
    const email = String(req.body.email || "").trim().toLowerCase();
    const genericResponse = {
      status: "ok",
      message: "Jika email terdaftar, tautan reset akan dikirim."
    };

    if (!email || !email.includes("@")) {
      res.json(genericResponse);
      return;
    }

    const userRecord = await findUserByIdentifier(email);
    if (!userRecord?.email || !userRecord.email_verified_at) {
      res.json(genericResponse);
      return;
    }

    const delivery = await issueAccountActionToken({
      type: "password_reset",
      user: toPublicUser(userRecord)
    });

    res.json({
      ...genericResponse,
      ...(delivery.devActionUrl ? { devActionUrl: delivery.devActionUrl } : {})
    });
  } catch (error) {
    next(error);
  }
});

app.post("/api/auth/password/reset", authRateLimit, async (req, res, next) => {
  try {
    const tokenHash = hashActionToken(String(req.body.token || ""));
    const newPassword = String(req.body.newPassword || "");

    if (!req.body.token || newPassword.length < 8 || newPassword.length > 128) {
      res.status(400).json({ status: "invalid", message: "Tautan atau password baru belum valid." });
      return;
    }

    const tokenResult = await query(
      `UPDATE account_action_tokens
       SET used_at = now()
       WHERE token_hash = $1
         AND type = 'password_reset'
         AND used_at IS NULL
         AND expires_at > now()
       RETURNING user_id`,
      [tokenHash]
    );

    if (!tokenResult.rows[0]) {
      res.status(400).json({
        status: "invalid_token",
        message: "Tautan reset tidak valid atau sudah kedaluwarsa."
      });
      return;
    }

    const passwordHash = await hashPassword(newPassword);
    await query(
      `UPDATE users
       SET password_hash = $1, auth_version = auth_version + 1, updated_at = now()
       WHERE id = $2`,
      [passwordHash, tokenResult.rows[0].user_id]
    );

    res.json({ status: "ok", message: "Password baru tersimpan. Silakan masuk." });
  } catch (error) {
    next(error);
  }
});

app.post("/api/auth/email-verification/request", authRateLimit, requireAuth, async (req, res, next) => {
  try {
    if (!req.user.email) {
      res.status(400).json({ status: "invalid", message: "Tambahkan email terlebih dahulu." });
      return;
    }

    if (req.user.emailVerified) {
      res.json({ status: "ok", message: "Email sudah terverifikasi." });
      return;
    }

    const delivery = await issueAccountActionToken({
      type: "email_verification",
      user: req.user
    });

    res.json({
      status: "ok",
      message: delivery.status === "sent"
        ? "Tautan verifikasi dikirim ke email Anda."
        : "Tautan verifikasi dibuat.",
      ...(delivery.devActionUrl ? { devActionUrl: delivery.devActionUrl } : {})
    });
  } catch (error) {
    next(error);
  }
});

app.post("/api/auth/email-verification/confirm", authRateLimit, async (req, res, next) => {
  try {
    const rawToken = String(req.body.token || "");
    if (!rawToken) {
      res.status(400).json({ status: "invalid_token", message: "Tautan verifikasi tidak valid." });
      return;
    }

    const tokenResult = await query(
      `UPDATE account_action_tokens
       SET used_at = now()
       WHERE token_hash = $1
         AND type = 'email_verification'
         AND used_at IS NULL
         AND expires_at > now()
       RETURNING user_id, target_email`,
      [hashActionToken(rawToken)]
    );
    const action = tokenResult.rows[0];

    if (!action) {
      res.status(400).json({
        status: "invalid_token",
        message: "Tautan verifikasi tidak valid atau sudah kedaluwarsa."
      });
      return;
    }

    const userResult = await query(
      `UPDATE users
       SET email_verified_at = now(), updated_at = now()
       WHERE id = $1 AND lower(email) = lower($2)
       RETURNING id`,
      [action.user_id, action.target_email]
    );

    if (!userResult.rows[0]) {
      res.status(400).json({
        status: "invalid_token",
        message: "Email akun telah berubah. Minta tautan verifikasi baru."
      });
      return;
    }

    res.json({ status: "ok", message: "Email berhasil diverifikasi." });
  } catch (error) {
    next(error);
  }
});

app.patch("/api/auth/profile", requireAuth, async (req, res, next) => {
  try {
    const parsed = validateProfilePayload(req.body, req.user);
    const emailChanged = parsed.value?.email !== req.user.email;
    const hasPreferredPhase = Object.prototype.hasOwnProperty.call(req.body, "preferredPhaseSlug");
    const preferredPhaseSlug = hasPreferredPhase
      ? String(req.body.preferredPhaseSlug || "").trim() || null
      : req.user.preferredPhaseSlug;

    if (parsed.error) {
      res.status(400).json({
        status: "invalid",
        message: parsed.error
      });
      return;
    }

    if (preferredPhaseSlug && !allowedPhaseSlugs.has(preferredPhaseSlug)) {
      res.status(400).json({
        status: "invalid",
        message: "Fase kehidupan belum valid."
      });
      return;
    }

    const result = await query(
      `UPDATE users
       SET name = $1,
           email = $2,
           phone = $3,
           preferred_phase_slug = $4,
           email_verified_at = CASE WHEN $6::boolean THEN NULL ELSE email_verified_at END,
           updated_at = now()
       WHERE id = $5
       RETURNING id, name, email, phone, preferred_phase_slug, email_verified_at, auth_version, created_at`,
      [
        parsed.value.name,
        parsed.value.email,
        parsed.value.phone,
        preferredPhaseSlug,
        req.user.id,
        emailChanged
      ]
    );

    if (emailChanged) {
      await query(
        `UPDATE account_action_tokens
         SET used_at = now()
         WHERE user_id = $1 AND used_at IS NULL`,
        [req.user.id]
      );
    }

    res.json({
      status: "ok",
      message: "Profil akun diperbarui.",
      user: toPublicUser(result.rows[0])
    });
  } catch (error) {
    if (error.code === "23505") {
      res.status(409).json({
        status: "conflict",
        message: "Email atau nomor WhatsApp sudah dipakai akun lain."
      });
      return;
    }

    next(error);
  }
});

app.post("/api/auth/logout", (_req, res) => {
  res.json({
    status: "ok",
    message: "Logout berhasil."
  });
});

app.delete("/api/account", requireAuth, async (req, res, next) => {
  try {
    const result = await query(
      `DELETE FROM users
       WHERE id = $1
       RETURNING id`,
      [req.user.id]
    );

    if (!result.rowCount) {
      res.status(404).json({
        status: "not_found",
        message: "Akun tidak ditemukan."
      });
      return;
    }

    res.json({
      status: "ok",
      message: "Akun dan data terkait sudah dihapus."
    });
  } catch (error) {
    next(error);
  }
});

app.get("/api/account/export", requireAuth, async (req, res, next) => {
  try {
    const [screeningResult, evaluationResult, reminders, feedback] = await Promise.all([
      query(
        `SELECT id, risk_score, result_title, result_tone, result_estimate, bmi, waist, payload, created_at
         FROM screening_results
         WHERE user_id = $1
         ORDER BY created_at DESC`,
        [req.user.id]
      ),
      query(
        `SELECT id, type, answers, score, total, created_at
         FROM evaluation_results
         WHERE user_id = $1
         ORDER BY created_at DESC`,
        [req.user.id]
      ),
      query(
        `SELECT ${whatsappReminderSelect}
         FROM whatsapp_reminders
         WHERE user_id = $1
         ORDER BY created_at DESC`,
        [req.user.id]
      ),
      query(
        `SELECT ${feedbackEntrySelect}
         FROM feedback_entries
         WHERE user_id = $1
         ORDER BY created_at DESC`,
        [req.user.id]
      )
    ]);

    res.json({
      status: "ok",
      exportedAt: new Date().toISOString(),
      data: {
        user: req.user,
        screenings: screeningResult.rows.map(toScreeningResult),
        evaluations: evaluationResult.rows.map(toEvaluationResult),
        whatsappReminders: reminders.rows.map(toWhatsappReminder),
        feedback: feedback.rows.map(toFeedbackEntry)
      }
    });
  } catch (error) {
    next(error);
  }
});

app.get("/api/screenings", requireAuth, async (req, res, next) => {
  try {
    const result = await query(
      `SELECT id, risk_score, result_title, result_tone, result_estimate, bmi, waist, payload, created_at
       FROM screening_results
       WHERE user_id = $1
       ORDER BY created_at DESC
       LIMIT 10`,
      [req.user.id]
    );

    res.json({
      status: "ok",
      screenings: result.rows.map(toScreeningResult)
    });
  } catch (error) {
    next(error);
  }
});

app.delete("/api/screenings", requireAuth, async (req, res, next) => {
  try {
    const result = await query(
      `DELETE FROM screening_results
       WHERE user_id = $1
       RETURNING id`,
      [req.user.id]
    );

    res.json({
      status: "ok",
      message: "Seluruh riwayat skrining di akun ini sudah dihapus.",
      deleted: result.rowCount
    });
  } catch (error) {
    next(error);
  }
});

app.get("/api/screenings/:id", requireAuth, async (req, res, next) => {
  try {
    const screeningId = String(req.params.id || "").trim();

    if (!isUuid(screeningId)) {
      res.status(404).json({
        status: "not_found",
        message: "Hasil skrining tidak ditemukan."
      });
      return;
    }

    const result = await query(
      `SELECT id, risk_score, result_title, result_tone, result_estimate, bmi, waist, payload, created_at
       FROM screening_results
       WHERE id = $1 AND user_id = $2
       LIMIT 1`,
      [screeningId, req.user.id]
    );

    if (!result.rows[0]) {
      res.status(404).json({
        status: "not_found",
        message: "Hasil skrining tidak ditemukan."
      });
      return;
    }

    res.json({
      status: "ok",
      screening: toScreeningResult(result.rows[0])
    });
  } catch (error) {
    next(error);
  }
});

app.delete("/api/screenings/:id", requireAuth, async (req, res, next) => {
  try {
    const screeningId = String(req.params.id || "").trim();

    if (!isUuid(screeningId)) {
      res.status(404).json({
        status: "not_found",
        message: "Hasil skrining tidak ditemukan."
      });
      return;
    }

    const result = await query(
      `DELETE FROM screening_results
       WHERE id = $1 AND user_id = $2
       RETURNING id`,
      [screeningId, req.user.id]
    );

    if (!result.rows[0]) {
      res.status(404).json({
        status: "not_found",
        message: "Hasil skrining tidak ditemukan."
      });
      return;
    }

    res.json({
      status: "ok",
      message: "Hasil skrining dihapus."
    });
  } catch (error) {
    next(error);
  }
});

app.post("/api/screenings", requireAuth, async (req, res, next) => {
  try {
    const riskScore = Number(req.body.riskScore);
    const resultTitle = String(req.body.resultTitle || "").trim().slice(0, 120);
    const resultTone = String(req.body.resultTone || "").trim().slice(0, 40);
    const resultEstimate = String(req.body.resultEstimate || "").trim().slice(0, 120) || null;
    const bmi = parseOptionalNumber(req.body.bmi);
    const waist = parseOptionalNumber(req.body.waist);
    const idempotencyKey = String(req.body.idempotencyKey || "").trim();
    const payload =
      req.body.payload && typeof req.body.payload === "object" && !Array.isArray(req.body.payload)
        ? req.body.payload
        : {};

    if (!Number.isFinite(riskScore) || !resultTitle || !resultTone || !isUuid(idempotencyKey)) {
      res.status(400).json({
        status: "invalid",
        message: "Hasil skrining belum lengkap."
      });
      return;
    }

    const validationError = getScreeningValidationError({ payload, riskScore, bmi, waist });
    if (validationError) {
      res.status(400).json({
        status: "invalid",
        message: validationError
      });
      return;
    }

    const result = await query(
      `INSERT INTO screening_results
        (id, user_id, payload, risk_score, result_title, result_tone, result_estimate, bmi, waist, idempotency_key)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       ON CONFLICT (user_id, idempotency_key) DO NOTHING
       RETURNING id, risk_score, result_title, result_tone, result_estimate, bmi, waist, payload, created_at`,
      [
        randomUUID(),
        req.user.id,
        payload,
        riskScore,
        resultTitle,
        resultTone,
        resultEstimate,
        bmi,
        waist,
        idempotencyKey
      ]
    );
    const duplicate = !result.rows[0];
    const existingResult = duplicate
      ? await query(
          `SELECT id, risk_score, result_title, result_tone, result_estimate, bmi, waist, payload, created_at
           FROM screening_results
           WHERE user_id = $1 AND idempotency_key = $2
           LIMIT 1`,
          [req.user.id, idempotencyKey]
        )
      : result;
    const screening = toScreeningResult(existingResult.rows[0]);
    let emailStatus = {
      status: "skipped",
      reason: "Email belum diproses."
    };

    try {
      if (duplicate) {
        emailStatus = {
          status: "skipped",
          reason: "Hasil yang sama sudah pernah disimpan."
        };
      } else {
        emailStatus = await sendScreeningResultEmail({
          screening,
          user: req.user
        });
      }
    } catch (emailError) {
      emailStatus = {
        status: "failed",
        reason: emailError.message
      };
    }

    res.status(duplicate ? 200 : 201).json({
      status: "ok",
      message: duplicate ? "Hasil ini sudah tersimpan sebelumnya." : "Hasil skrining tersimpan di akun.",
      duplicate,
      screening,
      email: emailStatus
    });
  } catch (error) {
    next(error);
  }
});

app.get("/api/whatsapp/status", (_req, res) => {
  res.json(getWhatsAppStatus());
});

app.get("/api/reminders/whatsapp", requireAuth, async (req, res, next) => {
  try {
    const result = await query(
      `SELECT ${whatsappReminderSelect}
       FROM whatsapp_reminders
       WHERE user_id = $1
       ORDER BY created_at DESC`,
      [req.user.id]
    );
    res.json({
      status: "ok",
      reminders: result.rows.map(toWhatsappReminder)
    });
  } catch (error) {
    next(error);
  }
});

app.post("/api/reminders/whatsapp", requireAuth, async (req, res, next) => {
  try {
    const parsed = parseReminderPayload(req.body);

    if (parsed.error) {
      res.status(400).json({
        status: "invalid",
        message: parsed.error
      });
      return;
    }

    const { name, phone, time, focus, days } = parsed;
    const nextReminderId = randomUUID();
    const reminderFocus = resolveReminderFocus({ focus, days, user: req.user });

    const result = await query(
      `INSERT INTO whatsapp_reminders
        (id, user_id, name, phone, time, focus, days, enabled)
       VALUES ($1, $2, $3, $4, $5, $6, $7::jsonb, true)
       RETURNING ${whatsappReminderSelect}`,
      [
        nextReminderId,
        req.user.id,
        name || null,
        phone,
        time,
        reminderFocus,
        JSON.stringify(days)
      ]
    );
    const nextReminder = toWhatsappReminder(result.rows[0]);

    res.status(201).json({
      status: "ok",
      message: "Reminder WhatsApp tersimpan.",
      reminder: nextReminder
    });
  } catch (error) {
    next(error);
  }
});

app.patch("/api/reminders/whatsapp/:id", requireAuth, async (req, res, next) => {
  try {
    const reminderId = String(req.params.id || "").trim();

    if (!isUuid(reminderId)) {
      res.status(404).json({ status: "not_found", message: "Reminder tidak ditemukan." });
      return;
    }

    const currentResult = await query(
      `SELECT ${whatsappReminderSelect}
       FROM whatsapp_reminders
       WHERE id = $1 AND user_id = $2`,
      [reminderId, req.user.id]
    );

    if (!currentResult.rowCount) {
      res.status(404).json({ status: "not_found", message: "Reminder tidak ditemukan." });
      return;
    }

    const currentReminder = toWhatsappReminder(currentResult.rows[0]);
    const parsed = parseReminderPayload({ ...currentReminder, ...req.body });

    if (parsed.error) {
      res.status(400).json({ status: "invalid", message: parsed.error });
      return;
    }

    const enabled = typeof req.body.enabled === "boolean" ? req.body.enabled : currentReminder.enabled;
    const result = await query(
      `UPDATE whatsapp_reminders
       SET name = $3,
           phone = $4,
           time = $5,
           focus = $6,
           days = $7::jsonb,
           enabled = $8,
           last_error = NULL,
           updated_at = now()
       WHERE id = $1 AND user_id = $2
       RETURNING ${whatsappReminderSelect}`,
      [
        reminderId,
        req.user.id,
        parsed.name || null,
        parsed.phone,
        parsed.time,
        resolveReminderFocus({ focus: parsed.focus, days: parsed.days, user: req.user }),
        JSON.stringify(parsed.days),
        enabled
      ]
    );
    const updatedReminder = toWhatsappReminder(result.rows[0]);

    res.json({
      status: "ok",
      message: updatedReminder.enabled ? "Reminder diperbarui." : "Reminder dinonaktifkan.",
      reminder: updatedReminder
    });
  } catch (error) {
    next(error);
  }
});

app.delete("/api/reminders/whatsapp/:id", requireAuth, async (req, res, next) => {
  try {
    const reminderId = String(req.params.id || "").trim();

    if (!isUuid(reminderId)) {
      res.status(404).json({ status: "not_found", message: "Reminder tidak ditemukan." });
      return;
    }

    const result = await query(
      `DELETE FROM whatsapp_reminders
       WHERE id = $1 AND user_id = $2
       RETURNING id`,
      [reminderId, req.user.id]
    );

    if (!result.rowCount) {
      res.status(404).json({ status: "not_found", message: "Reminder tidak ditemukan." });
      return;
    }

    res.json({ status: "ok", message: "Reminder dihapus." });
  } catch (error) {
    next(error);
  }
});

app.post("/api/reminders/whatsapp/test", requireAuth, async (req, res, next) => {
  try {
    const phone = String(req.body.phone || "").trim();
    const name = String(req.body.name || "").trim().slice(0, 80);
    const days = Array.isArray(req.body.days)
      ? req.body.days.map((day) => String(day).toLowerCase()).filter((day) => reminderDays.has(day))
      : [];
    const focus = resolveReminderFocus({
      focus: req.body.focus,
      days,
      user: req.user
    });

    if (!phone) {
      res.status(400).json({
        status: "invalid",
        message: "Nomor WhatsApp wajib diisi."
      });
      return;
    }

    const result = await sendWhatsAppMessage({
      phone,
      message: buildReminderMessage({
        name,
        focus
      })
    });

    res.json({
      status: "ok",
      message: "Pesan test diproses.",
      result
    });
  } catch (error) {
    next(error);
  }
});

app.get("/api/evaluations", requireAuth, async (req, res, next) => {
  try {
    const result = await query(
      `SELECT id, type, answers, score, total, created_at
       FROM evaluation_results
       WHERE user_id = $1
       ORDER BY created_at DESC
       LIMIT 10`,
      [req.user.id]
    );

    res.json({
      status: "ok",
      evaluations: result.rows.map(toEvaluationResult)
    });
  } catch (error) {
    next(error);
  }
});

app.post("/api/evaluations", requireAuth, async (req, res, next) => {
  try {
    const type = String(req.body.type || "").trim();
    const answers =
      req.body.answers && typeof req.body.answers === "object" && !Array.isArray(req.body.answers)
        ? req.body.answers
        : {};

    if (!evaluationTypeLabels[type]) {
      res.status(400).json({
        status: "invalid",
        message: "Jenis evaluasi tidak valid."
      });
      return;
    }

    const answerEntries = Object.entries(evaluationAnswerKey);
    const hasAllAnswers = answerEntries.every(([questionId]) => typeof answers[questionId] === "string");

    if (!hasAllAnswers) {
      res.status(400).json({
        status: "invalid",
        message: "Jawaban evaluasi belum lengkap."
      });
      return;
    }

    const normalizedAnswers = answerEntries.reduce((result, [questionId]) => {
      result[questionId] = String(answers[questionId]).slice(0, 80);
      return result;
    }, {});
    const score = answerEntries.reduce(
      (total, [questionId, correctAnswer]) =>
        total + (normalizedAnswers[questionId] === correctAnswer ? 1 : 0),
      0
    );
    const total = answerEntries.length;

    const result = await query(
      `INSERT INTO evaluation_results (id, user_id, type, answers, score, total)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, type, answers, score, total, created_at`,
      [randomUUID(), req.user.id, type, normalizedAnswers, score, total]
    );

    res.status(201).json({
      status: "ok",
      message: "Hasil evaluasi tersimpan.",
      evaluation: toEvaluationResult(result.rows[0])
    });
  } catch (error) {
    next(error);
  }
});

app.post("/api/feedback", requireAuth, async (req, res, next) => {
  try {
    const topics = Array.isArray(req.body.topics)
      ? req.body.topics.map((topic) => String(topic).trim()).filter(Boolean).slice(0, 8)
      : [];
    const satisfaction = String(req.body.satisfaction || "").trim().slice(0, 80);
    const message = String(req.body.message || "").trim().slice(0, 1200);

    if (!satisfaction) {
      res.status(400).json({
        status: "invalid",
        message: "Penilaian umum wajib diisi."
      });
      return;
    }

    const result = await query(
      `INSERT INTO feedback_entries (id, user_id, topics, satisfaction, message)
       VALUES ($1, $2, $3::jsonb, $4, $5)
       RETURNING id`,
      [randomUUID(), req.user.id, JSON.stringify(topics), satisfaction, message || null]
    );

    res.status(201).json({
      status: "ok",
      message: "Umpan balik tersimpan.",
      feedbackId: result.rows[0].id
    });
  } catch (error) {
    next(error);
  }
});

app.use(express.static(clientDist));

app.get("*", (req, res, next) => {
  if (req.path.startsWith("/api")) {
    next();
    return;
  }

  res.sendFile(path.join(clientDist, "index.html"), (error) => {
    if (error) {
      next();
    }
  });
});

app.use((req, res) => {
  if (req.path.startsWith("/api")) {
    res.status(404).json({
      status: "not_found",
      message: "Endpoint tidak ditemukan."
    });
    return;
  }

  res.status(404).send("Build frontend belum tersedia. Jalankan proses build client terlebih dahulu.");
});

app.use((error, req, res, _next) => {
  const statusCode = error.status || 500;

  if (req.path.startsWith("/api")) {
    res.status(statusCode).json({
      status: "error",
      message: statusCode === 500 ? "Terjadi kesalahan server." : error.message
    });
    return;
  }

  res.status(statusCode).send(statusCode === 500 ? "Terjadi kesalahan server." : error.message);
});

async function initializeDatabaseWithRetry(maxAttempts = 10) {
  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      await initializeDatabase();
      return;
    } catch (error) {
      if (attempt === maxAttempts) {
        throw error;
      }

      const waitMs = Math.min(500 * (2 ** (attempt - 1)), 5000);
      console.warn(`Database belum siap, mencoba lagi dalam ${waitMs}ms (${attempt}/${maxAttempts}).`);
      await new Promise((resolve) => setTimeout(resolve, waitMs));
    }
  }
}

export async function startServer() {
  assertRuntimeConfig();
  await initializeDatabaseWithRetry();
  await migrateJsonStorageToDatabase();

  app.listen(port, () => {
    startWhatsAppClient();
    setInterval(() => {
      runReminderScheduler().catch((error) => {
        console.error("Scheduler reminder WhatsApp gagal:", error);
      });
    }, 60_000);

    console.log(`Sahabat CERDIK DM API berjalan di http://localhost:${port}`);
  });
}

if (process.argv[1] === __filename) {
  startServer().catch((error) => {
    console.error("Sahabat CERDIK DM API gagal mulai:", error);
    process.exit(1);
  });
}
