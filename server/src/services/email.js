import "../lib/env.js";
import nodemailer from "nodemailer";

function getEmailConfig() {
  const smtpUser = process.env.SMTP_USER || "";

  return {
    smtpHost: process.env.SMTP_HOST || "",
    smtpPort: Number(process.env.SMTP_PORT || 587),
    smtpUser,
    smtpPass: process.env.SMTP_PASS || "",
    smtpSecure: process.env.SMTP_SECURE === "true",
    mailFrom: process.env.MAIL_FROM || smtpUser || "Sahabat CERDIK DM <no-reply@sahabatcerdikdm.local>",
    publicAppUrl: (process.env.PUBLIC_APP_URL || "http://localhost:5000").replace(/\/$/, "")
  };
}

function isEmailEnabled(config) {
  return Boolean(config.smtpHost && config.smtpUser && config.smtpPass);
}

function createTransporter(config) {
  return nodemailer.createTransport({
    host: config.smtpHost,
    port: config.smtpPort,
    secure: config.smtpSecure,
    auth: {
      user: config.smtpUser,
      pass: config.smtpPass
    }
  });
}

async function deliverEmail({ to, subject, text, html, actionUrl }) {
  const config = getEmailConfig();

  if (!isEmailEnabled(config)) {
    return {
      status: "skipped",
      reason: "SMTP belum dikonfigurasi.",
      ...(process.env.NODE_ENV !== "production" && actionUrl ? { devActionUrl: actionUrl } : {})
    };
  }

  const transporter = createTransporter(config);
  await transporter.sendMail({ from: config.mailFrom, to, subject, text, html });

  return { status: "sent", to };
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildScreeningEmail({ screening, user }) {
  const { publicAppUrl } = getEmailConfig();
  const detailUrl = `${publicAppUrl}/dashboard/skrining/${screening.id}`;
  const name = user.name || "Sahabat";
  const estimate = screening.resultEstimate || "Belum tersedia";
  const bmi = screening.bmi ? Number(screening.bmi).toFixed(1) : "-";
  const waist = screening.waist ? `${screening.waist} cm` : "-";

  const text = [
    `Halo ${name},`,
    "",
    "Hasil skrining Sahabat CERDIK DM Anda sudah tersimpan.",
    `Hasil: ${screening.resultTitle}`,
    `Skor FINDRISC: ${screening.riskScore}/26`,
    `Estimasi risiko: ${estimate}`,
    `IMT: ${bmi}`,
    `Lingkar perut: ${waist}`,
    "",
    "Gunakan hasil ini sebagai arahan awal, bukan diagnosis.",
    `Buka detail: ${detailUrl}`
  ].join("\n");

  const html = `
    <div style="margin:0;background:#f5f6f8;padding:24px;font-family:Arial,sans-serif;color:#172137;">
      <div style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #d8dde5;border-radius:8px;overflow:hidden;">
        <div style="height:8px;background:#365de7;"></div>
        <div style="padding:22px;">
          <div style="width:96px;height:64px;border-radius:6px;background:#e5e7eb;margin-bottom:16px;display:block;"></div>
          <p style="margin:0 0 8px;color:#657086;font-size:14px;">Sahabat CERDIK DM</p>
          <h1 style="margin:0;color:#151b2d;font-size:24px;line-height:1.2;">Hasil skrining sudah tersimpan</h1>
          <p style="margin:12px 0 0;color:#44506a;line-height:1.55;">Halo ${escapeHtml(name)}, berikut ringkasan hasil FINDRISC Anda.</p>

          <div style="margin-top:16px;padding:14px;border-radius:6px;background:#eef0f3;">
            <strong style="display:block;color:#151b2d;font-size:18px;">${escapeHtml(screening.resultTitle)}</strong>
            <p style="margin:8px 0 0;color:#44506a;">Skor FINDRISC: <strong>${screening.riskScore}/26</strong></p>
            <p style="margin:6px 0 0;color:#44506a;">Estimasi risiko: ${escapeHtml(estimate)}</p>
            <p style="margin:6px 0 0;color:#44506a;">IMT: ${escapeHtml(bmi)} · Lingkar perut: ${escapeHtml(waist)}</p>
          </div>

          <p style="margin:16px 0 0;color:#657086;line-height:1.5;">Hasil ini adalah arahan awal, bukan diagnosis. Jika ada keluhan atau faktor risiko, lanjutkan dengan pemeriksaan tenaga kesehatan.</p>

          <a href="${detailUrl}" style="display:inline-block;margin-top:18px;padding:11px 14px;border-radius:6px;background:#365de7;color:#ffffff;text-decoration:none;font-weight:700;">Buka detail hasil</a>
        </div>
      </div>
    </div>
  `;

  return {
    subject: `Ringkasan skrining Sahabat CERDIK DM`,
    text,
    html
  };
}

export async function sendScreeningResultEmail({ screening, user }) {
  if (!user.email) {
    return {
      status: "skipped",
      reason: "Akun belum memiliki email."
    };
  }

  if (!user.emailVerified) {
    return {
      status: "skipped",
      reason: "Email akun belum diverifikasi."
    };
  }

  const email = buildScreeningEmail({
    screening,
    user
  });

  return deliverEmail({
    to: user.email,
    subject: email.subject,
    text: email.text,
    html: email.html
  });
}

export async function sendAccountActionEmail({ type, token, user, email = user.email }) {
  const isVerification = type === "email_verification";
  const { publicAppUrl } = getEmailConfig();
  const actionUrl = `${publicAppUrl}/${isVerification ? "verifikasi-email" : "reset-password"}?token=${encodeURIComponent(token)}`;
  const title = isVerification ? "Verifikasi email Anda" : "Atur ulang password";
  const actionLabel = isVerification ? "Verifikasi email" : "Buat password baru";
  const expiry = isVerification ? "24 jam" : "60 menit";
  const description = isVerification
    ? "Gunakan tautan berikut agar email dapat dipakai untuk menerima hasil skrining dan memulihkan akun."
    : "Kami menerima permintaan untuk mengatur ulang password akun Anda.";
  const name = user.name || "Sahabat";
  const text = [
    `Halo ${name},`,
    "",
    description,
    `${actionLabel}: ${actionUrl}`,
    "",
    `Tautan berlaku selama ${expiry} dan hanya dapat digunakan satu kali.`,
    "Abaikan email ini jika Anda tidak melakukan permintaan tersebut."
  ].join("\n");
  const html = `
    <div style="margin:0;background:#f5f6f8;padding:24px;font-family:Arial,sans-serif;color:#172137;">
      <div style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #d8dde5;border-radius:8px;overflow:hidden;">
        <div style="height:8px;background:#365de7;"></div>
        <div style="padding:22px;">
          <p style="margin:0 0 8px;color:#657086;font-size:14px;">Sahabat CERDIK DM</p>
          <h1 style="margin:0;color:#151b2d;font-size:24px;line-height:1.2;">${title}</h1>
          <p style="margin:12px 0 0;color:#44506a;line-height:1.55;">Halo ${escapeHtml(name)}, ${description}</p>
          <a href="${actionUrl}" style="display:inline-block;margin-top:18px;padding:11px 14px;border-radius:6px;background:#365de7;color:#ffffff;text-decoration:none;font-weight:700;">${actionLabel}</a>
          <p style="margin:16px 0 0;color:#657086;line-height:1.5;">Tautan berlaku selama ${expiry} dan hanya dapat digunakan satu kali. Abaikan pesan ini jika Anda tidak melakukan permintaan tersebut.</p>
        </div>
      </div>
    </div>
  `;

  return deliverEmail({
    to: email,
    subject: `${title} - Sahabat CERDIK DM`,
    text,
    html,
    actionUrl
  });
}
