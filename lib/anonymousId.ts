const STORAGE_KEY = "hbe_anonymous_id";

function createId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `hbe_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

export function getAnonymousId() {
  if (typeof window === "undefined") {
    return "server";
  }

  const existing = window.localStorage.getItem(STORAGE_KEY);
  if (existing) return existing;

  const next = createId();
  window.localStorage.setItem(STORAGE_KEY, next);
  return next;
}
