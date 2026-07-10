import { randomUUID } from "node:crypto";

import { query } from "./db.js";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^\+?\d{8,18}$/;

export function normalizeEmail(email) {
  const value = String(email || "").trim().toLowerCase();

  return value || null;
}

export function normalizePhone(phone) {
  const value = String(phone || "")
    .trim()
    .replace(/[^\d+]/g, "");

  return value || null;
}

export function validateRegistrationPayload(payload) {
  const name = String(payload.name || "").trim().replace(/\s+/g, " ").slice(0, 120);
  const email = normalizeEmail(payload.email);
  const phone = normalizePhone(payload.phone);
  const password = String(payload.password || "");

  if (!name) {
    return {
      error: "Nama wajib diisi."
    };
  }

  if (!email && !phone) {
    return {
      error: "Isi minimal nomor WhatsApp atau email."
    };
  }

  if (email && !emailPattern.test(email)) {
    return {
      error: "Format email belum valid."
    };
  }

  if (phone && !phonePattern.test(phone)) {
    return {
      error: "Format nomor WhatsApp belum valid."
    };
  }

  if (password.length < 8) {
    return {
      error: "Password minimal 8 karakter."
    };
  }

  return {
    value: {
      name,
      email,
      phone,
      password
    }
  };
}

export function validateProfilePayload(payload, currentUser) {
  const hasField = (field) => Object.prototype.hasOwnProperty.call(payload, field);
  const name = hasField("name")
    ? String(payload.name || "").trim().replace(/\s+/g, " ").slice(0, 120)
    : currentUser.name;
  const email = hasField("email") ? normalizeEmail(payload.email) : currentUser.email;
  const phone = hasField("phone") ? normalizePhone(payload.phone) : currentUser.phone;

  if (!name) {
    return { error: "Nama wajib diisi." };
  }

  if (hasField("name") && name.length < 2) {
    return { error: "Nama minimal 2 karakter." };
  }

  if (!email && !phone) {
    return { error: "Isi minimal nomor WhatsApp atau email." };
  }

  if (email && !emailPattern.test(email)) {
    return { error: "Format email belum valid." };
  }

  if (phone && !phonePattern.test(phone)) {
    return { error: "Format nomor WhatsApp belum valid." };
  }

  return {
    value: { name, email, phone }
  };
}

export function normalizeLoginIdentifier(identifier) {
  const value = String(identifier || "").trim();

  if (value.includes("@")) {
    return {
      email: normalizeEmail(value),
      phone: null
    };
  }

  return {
    email: null,
    phone: normalizePhone(value)
  };
}

export function toPublicUser(row) {
  if (!row) {
    return null;
  }

  return {
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone,
    preferredPhaseSlug: row.preferred_phase_slug || null,
    emailVerified: Boolean(row.email_verified_at),
    authVersion: Number(row.auth_version || 0),
    createdAt: row.created_at
  };
}

export async function createUser({ name, email, phone, passwordHash }) {
  const result = await query(
    `INSERT INTO users (id, name, email, phone, password_hash)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id, name, email, phone, preferred_phase_slug, email_verified_at, auth_version, created_at`,
    [randomUUID(), name, email, phone, passwordHash]
  );

  return toPublicUser(result.rows[0]);
}

export async function findUserByIdentifier(identifier) {
  const { email, phone } = normalizeLoginIdentifier(identifier);

  if (!email && !phone) {
    return null;
  }

  const result = await query(
    `SELECT id, name, email, phone, preferred_phase_slug, email_verified_at, auth_version, password_hash, created_at
     FROM users
     WHERE ($1::text IS NOT NULL AND lower(email) = $1)
        OR ($2::text IS NOT NULL AND phone = $2)
     LIMIT 1`,
    [email, phone]
  );

  return result.rows[0] || null;
}

export async function findUserById(id) {
  const result = await query(
    `SELECT id, name, email, phone, preferred_phase_slug, email_verified_at, auth_version, created_at
     FROM users
     WHERE id = $1
     LIMIT 1`,
    [id]
  );

  return toPublicUser(result.rows[0]);
}
