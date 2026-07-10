import { defaultFindriscAnswers, defaultScreeningContext } from "./screening.js";

const DRAFT_KEY = "sahabat-cerdik-dm-screening-draft";

export function createScreeningSessionId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (character) => {
    const random = Math.floor(Math.random() * 16);
    const value = character === "x" ? random : (random & 0x3) | 0x8;
    return value.toString(16);
  });
}

function getScopedKey(key, scope) {
  return scope ? `${key}:${scope}` : key;
}

function readJson(key, fallback) {
  if (typeof window === "undefined") {
    return fallback;
  }

  try {
    const stored = window.localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch (_error) {
    return fallback;
  }
}

function writeJson(key, value) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(key, JSON.stringify(value));
}

export function readScreeningDraft(scope) {
  const draft = readJson(getScopedKey(DRAFT_KEY, scope), {});

  return {
    screeningContext: {
      ...defaultScreeningContext,
      ...(draft.screeningContext || {})
    },
    findriscAnswers: {
      ...defaultFindriscAnswers,
      ...(draft.findriscAnswers || {})
    },
    age: draft.age || "",
    height: draft.height || "",
    weight: draft.weight || "",
    waist: draft.waist || "",
    screeningSessionId: draft.screeningSessionId || createScreeningSessionId()
  };
}

export function writeScreeningDraft(draft, scope) {
  writeJson(getScopedKey(DRAFT_KEY, scope), draft);
}

export function clearScreeningDraft(scope) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(getScopedKey(DRAFT_KEY, scope));
}
