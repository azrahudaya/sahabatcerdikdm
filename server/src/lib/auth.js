import { createHmac, randomBytes, scrypt, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

const scryptAsync = promisify(scrypt);
const tokenTtlHours = Number(process.env.AUTH_TOKEN_TTL_HOURS || 24);

function base64UrlEncode(value) {
  return Buffer.from(value).toString("base64url");
}

function base64UrlJson(value) {
  return base64UrlEncode(JSON.stringify(value));
}

function getAuthSecret() {
  if (process.env.AUTH_SECRET) {
    return process.env.AUTH_SECRET;
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error("AUTH_SECRET wajib diisi di production.");
  }

  return "dev-only-sahabat-cerdik-dm-secret";
}

function signPart(value) {
  return createHmac("sha256", getAuthSecret()).update(value).digest("base64url");
}

function safeCompare(left, right) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return timingSafeEqual(leftBuffer, rightBuffer);
}

export async function hashPassword(password) {
  const salt = randomBytes(16).toString("base64url");
  const derivedKey = await scryptAsync(password, salt, 64);

  return `scrypt:${salt}:${derivedKey.toString("base64url")}`;
}

export async function verifyPassword(password, storedHash) {
  const [algorithm, salt, hash] = String(storedHash || "").split(":");

  if (algorithm !== "scrypt" || !salt || !hash) {
    return false;
  }

  const derivedKey = await scryptAsync(password, salt, 64);
  return safeCompare(derivedKey.toString("base64url"), hash);
}

export function signAuthToken(user) {
  const now = Math.floor(Date.now() / 1000);
  const header = base64UrlJson({
    alg: "HS256",
    typ: "JWT"
  });
  const payload = base64UrlJson({
    sub: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    ver: Number(user.authVersion ?? user.auth_version ?? 0),
    iat: now,
    exp: now + tokenTtlHours * 60 * 60
  });
  const unsignedToken = `${header}.${payload}`;

  return `${unsignedToken}.${signPart(unsignedToken)}`;
}

export function verifyAuthToken(token) {
  const [header, payload, signature] = String(token || "").split(".");

  if (!header || !payload || !signature) {
    return null;
  }

  const unsignedToken = `${header}.${payload}`;
  const expectedSignature = signPart(unsignedToken);

  if (!safeCompare(signature, expectedSignature)) {
    return null;
  }

  try {
    const parsedPayload = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    const now = Math.floor(Date.now() / 1000);

    if (!parsedPayload.sub || !parsedPayload.exp || parsedPayload.exp < now) {
      return null;
    }

    return parsedPayload;
  } catch (_error) {
    return null;
  }
}
