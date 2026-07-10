import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { test } from "node:test";

process.env.NODE_ENV = "test";
process.env.AUTH_SECRET = "test-only-sahabat-cerdik-dm-secret";
process.env.WHATSAPP_PROVIDER = "mock";
process.env.SMTP_HOST = "";
process.env.SMTP_USER = "";
process.env.SMTP_PASS = "";
process.env.MAIL_FROM = "";

let app;
let initializeDatabase;
let pool;
let query;
let server;
let baseUrl = "";
let databaseReady = false;
let databaseError = null;
let userSequence = 0;

function nextPhone() {
  userSequence += 1;
  return `62812${String(Date.now()).slice(-8)}${String(userSequence).padStart(2, "0")}`;
}

function authHeader(token) {
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request(method, path, { token, body } = {}) {
  const response = await fetch(`${baseUrl}${path}`, {
    method,
    headers: {
      ...authHeader(token),
      ...(body ? { "Content-Type": "application/json" } : {})
    },
    body: body ? JSON.stringify(body) : undefined
  });
  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  return {
    response,
    status: response.status,
    data
  };
}

function skipWithoutDatabase(t) {
  if (!databaseReady) {
    t.skip(`PostgreSQL test DB belum tersedia: ${databaseError?.message || "unknown error"}`);
    return true;
  }

  return false;
}

async function registerUser(overrides = {}) {
  const marker = `${Date.now()}-${userSequence + 1}`;
  const body = {
    name: "API Test User",
    email: `api-test-${marker}@example.test`,
    phone: nextPhone(),
    password: "password123",
    ...overrides
  };
  const result = await request("POST", "/api/auth/register", { body });

  assert.equal(result.status, 201, result.data?.message);
  assert.ok(result.data.token);
  assert.equal(result.data.user.email, body.email);

  return {
    ...result.data,
    credentials: body
  };
}

function screeningPayload(idempotencyKey = randomUUID()) {
  return {
    idempotencyKey,
    riskScore: 7,
    resultTitle: "Risiko sedikit meningkat",
    resultTone: "safe",
    resultEstimate: "Sekitar 1 dari 25 orang",
    bmi: 25.4,
    waist: 90,
    payload: {
      screeningContext: {
        ageGroup: "adult",
        pregnancyStatus: "not_pregnant",
        diagnosedDm: "no",
        urgentSymptoms: "no"
      },
      age: 46,
      height: 160,
      weight: 65,
      waist: 90,
      findriscAnswers: {
        physicalActivity: "active",
        vegetables: "daily",
        bloodPressureMedication: "no",
        highGlucoseHistory: "no",
        familyHistory: "none"
      }
    }
  };
}

test.before(async () => {
  ({ app } = await import("./index.js"));
  ({ initializeDatabase, pool, query } = await import("./lib/db.js"));

  try {
    await initializeDatabase();
    await query("SELECT 1");
    await query("DELETE FROM users WHERE email LIKE 'api-test-%@example.test'");
    databaseReady = true;
  } catch (error) {
    databaseError = error;
  }

  server = app.listen(0);
  await new Promise((resolve) => {
    server.once("listening", resolve);
  });
  const address = server.address();
  baseUrl = `http://127.0.0.1:${address.port}`;
});

test.after(async () => {
  if (databaseReady) {
    await query("DELETE FROM users WHERE email LIKE 'api-test-%@example.test'");
  }

  if (server) {
    await new Promise((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
    });
  }

  if (pool) {
    await pool.end();
  }
});

test("health endpoint siap tanpa autentikasi", async () => {
  const result = await request("GET", "/api/health");

  assert.equal(result.status, 200);
  assert.equal(result.data.status, "ok");
});

test("route akun menolak request tanpa token", async () => {
  const result = await request("GET", "/api/auth/me");

  assert.equal(result.status, 401);
  assert.equal(result.data.status, "unauthorized");
});

test("register, login, me, dan update fase profil berjalan", async (t) => {
  if (skipWithoutDatabase(t)) return;

  const registration = await registerUser();
  const me = await request("GET", "/api/auth/me", { token: registration.token });

  assert.equal(me.status, 200);
  assert.equal(me.data.user.id, registration.user.id);

  const login = await request("POST", "/api/auth/login", {
    body: {
      identifier: registration.credentials.email,
      password: registration.credentials.password
    }
  });

  assert.equal(login.status, 200);
  assert.ok(login.data.token);

  const profile = await request("PATCH", "/api/auth/profile", {
    token: registration.token,
    body: {
      name: registration.user.name,
      email: registration.user.email,
      phone: registration.user.phone,
      preferredPhaseSlug: "ibu-hamil"
    }
  });

  assert.equal(profile.status, 200);
  assert.equal(profile.data.user.preferredPhaseSlug, "ibu-hamil");
});

test("skrining tersimpan idempotent dan riwayat terpisah antar akun", async (t) => {
  if (skipWithoutDatabase(t)) return;

  const userA = await registerUser();
  const userB = await registerUser();
  const body = screeningPayload();

  const firstSave = await request("POST", "/api/screenings", {
    token: userA.token,
    body
  });

  assert.equal(firstSave.status, 201, firstSave.data?.message);
  assert.equal(firstSave.data.duplicate, false);
  assert.equal(firstSave.data.screening.riskScore, 7);

  const duplicateSave = await request("POST", "/api/screenings", {
    token: userA.token,
    body
  });

  assert.equal(duplicateSave.status, 200);
  assert.equal(duplicateSave.data.duplicate, true);
  assert.equal(duplicateSave.data.screening.id, firstSave.data.screening.id);

  const ownHistory = await request("GET", "/api/screenings", { token: userA.token });
  const otherHistory = await request("GET", "/api/screenings", { token: userB.token });

  assert.equal(ownHistory.status, 200);
  assert.equal(ownHistory.data.screenings.length, 1);
  assert.equal(otherHistory.status, 200);
  assert.equal(otherHistory.data.screenings.length, 0);
});

test("reminder WhatsApp bisa dibuat, dijeda, dan dihapus dari database", async (t) => {
  if (skipWithoutDatabase(t)) return;

  const registration = await registerUser();
  const create = await request("POST", "/api/reminders/whatsapp", {
    token: registration.token,
    body: {
      name: "Sahabat Test",
      phone: registration.user.phone,
      time: "07:30",
      focus: "",
      days: ["senin"]
    }
  });

  assert.equal(create.status, 201, create.data?.message);
  assert.equal(create.data.reminder.enabled, true);
  assert.match(create.data.reminder.focus, /Mulai minggu|CERDIK/i);

  const update = await request("PATCH", `/api/reminders/whatsapp/${create.data.reminder.id}`, {
    token: registration.token,
    body: {
      enabled: false
    }
  });

  assert.equal(update.status, 200);
  assert.equal(update.data.reminder.enabled, false);

  const list = await request("GET", "/api/reminders/whatsapp", { token: registration.token });

  assert.equal(list.status, 200);
  assert.equal(list.data.reminders.length, 1);

  const remove = await request("DELETE", `/api/reminders/whatsapp/${create.data.reminder.id}`, {
    token: registration.token
  });

  assert.equal(remove.status, 200);
});

test("evaluasi, feedback, dan export akun tersimpan per pengguna", async (t) => {
  if (skipWithoutDatabase(t)) return;

  const registration = await registerUser();
  const evaluation = await request("POST", "/api/evaluations", {
    token: registration.token,
    body: {
      type: "pretest",
      answers: {
        "app-purpose": "education",
        cerdik: "steps",
        "findrisc-limit": "screening",
        "pregnancy-flow": "pregnancy-care",
        nutrition: "jumlah-jenis-jadwal",
        "warning-sign": "check"
      }
    }
  });

  assert.equal(evaluation.status, 201, evaluation.data?.message);
  assert.equal(evaluation.data.evaluation.score, 6);
  assert.equal(evaluation.data.evaluation.total, 6);

  const feedback = await request("POST", "/api/feedback", {
    token: registration.token,
    body: {
      topics: ["skrining", "reminder"],
      satisfaction: "cukup jelas",
      message: "Alur utama mudah dipahami."
    }
  });

  assert.equal(feedback.status, 201, feedback.data?.message);
  assert.ok(feedback.data.feedbackId);

  const exportResult = await request("GET", "/api/account/export", { token: registration.token });

  assert.equal(exportResult.status, 200);
  assert.equal(exportResult.data.data.evaluations.length, 1);
  assert.equal(exportResult.data.data.feedback.length, 1);
});

test("hapus akun menghapus data terkait dan sesi lama tidak valid", async (t) => {
  if (skipWithoutDatabase(t)) return;

  const registration = await registerUser();
  const reminder = await request("POST", "/api/reminders/whatsapp", {
    token: registration.token,
    body: {
      name: "Akun Hapus",
      phone: registration.user.phone,
      time: "06:45",
      focus: "Cek kebiasaan hari ini",
      days: ["senin"]
    }
  });
  const screening = await request("POST", "/api/screenings", {
    token: registration.token,
    body: screeningPayload()
  });

  assert.equal(reminder.status, 201, reminder.data?.message);
  assert.equal(screening.status, 201, screening.data?.message);

  const remove = await request("DELETE", "/api/account", { token: registration.token });

  assert.equal(remove.status, 200);
  assert.equal(remove.data.status, "ok");

  const staleSession = await request("GET", "/api/auth/me", { token: registration.token });

  assert.equal(staleSession.status, 401);

  const login = await request("POST", "/api/auth/login", {
    body: {
      identifier: registration.credentials.email,
      password: registration.credentials.password
    }
  });

  assert.equal(login.status, 404);

  const orphanReminders = await query(
    "SELECT count(*)::int AS count FROM whatsapp_reminders WHERE user_id = $1",
    [registration.user.id]
  );
  const orphanScreenings = await query(
    "SELECT count(*)::int AS count FROM screening_results WHERE user_id = $1",
    [registration.user.id]
  );

  assert.equal(orphanReminders.rows[0].count, 0);
  assert.equal(orphanScreenings.rows[0].count, 0);
});
