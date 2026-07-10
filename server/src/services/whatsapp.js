import "../lib/env.js";
import qrcode from "qrcode-terminal";
import { existsSync } from "node:fs";
import pkg from "whatsapp-web.js";

const { Client, LocalAuth } = pkg;
const provider = process.env.WHATSAPP_PROVIDER || "mock";
const sessionName = process.env.WHATSAPP_SESSION_NAME || "sahabat-cerdik-dm";
const mockMessages = [];

let client = null;
let clientStatus = provider === "webjs" ? "not_started" : "mock";
let latestQrAt = null;

function resolveChromeExecutablePath() {
  const candidates = [
    process.env.PUPPETEER_EXECUTABLE_PATH,
    "/usr/bin/google-chrome",
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser"
  ].filter(Boolean);

  return candidates.find((candidate) => existsSync(candidate));
}

function normalizePhone(phone) {
  const digits = String(phone || "").replace(/\D/g, "");

  if (!digits) {
    return "";
  }

  if (digits.startsWith("0")) {
    return `62${digits.slice(1)}`;
  }

  return digits;
}

export function getWhatsAppStatus() {
  return {
    provider,
    status: clientStatus,
    latestQrAt,
    mockMessages: mockMessages.slice(0, 5)
  };
}

export function startWhatsAppClient() {
  if (provider !== "webjs" || client) {
    return;
  }

  const executablePath = resolveChromeExecutablePath();

  clientStatus = "starting";
  client = new Client({
    authStrategy: new LocalAuth({
      clientId: sessionName,
      dataPath: process.env.WHATSAPP_AUTH_DIR || "storage/whatsapp-session"
    }),
    puppeteer: {
      ...(executablePath ? { executablePath } : {}),
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"]
    }
  });

  if (executablePath) {
    console.log(`WhatsApp client memakai Chrome: ${executablePath}`);
  } else {
    console.log("WhatsApp client memakai Chrome bawaan Puppeteer.");
  }

  client.on("qr", (qr) => {
    latestQrAt = new Date().toISOString();
    clientStatus = "qr";
    console.log("Scan QR WhatsApp berikut untuk mengaktifkan reminder:");
    qrcode.generate(qr, { small: true });
  });

  client.on("ready", () => {
    clientStatus = "ready";
    console.log("WhatsApp client siap mengirim reminder.");
  });

  client.on("authenticated", () => {
    clientStatus = "authenticated";
  });

  client.on("auth_failure", () => {
    clientStatus = "auth_failure";
  });

  client.on("disconnected", () => {
    clientStatus = "disconnected";
    client = null;
  });

  client.initialize().catch((error) => {
    clientStatus = "error";
    console.error("WhatsApp client gagal mulai:", error);
  });
}

export async function sendWhatsAppMessage({ phone, message }) {
  const normalizedPhone = normalizePhone(phone);

  if (!normalizedPhone) {
    throw new Error("Nomor WhatsApp tidak valid.");
  }

  if (provider !== "webjs") {
    const mockMessage = {
      id: `${Date.now()}`,
      phone: normalizedPhone,
      message,
      sentAt: new Date().toISOString()
    };
    mockMessages.unshift(mockMessage);
    return {
      provider,
      status: "mock_sent",
      message: mockMessage
    };
  }

  if (!client || clientStatus !== "ready") {
    throw new Error("WhatsApp client belum siap. Jalankan server dengan WHATSAPP_PROVIDER=webjs lalu scan QR.");
  }

  const chatId = `${normalizedPhone}@c.us`;
  await client.sendMessage(chatId, message);

  return {
    provider,
    status: "sent",
    sentAt: new Date().toISOString()
  };
}
