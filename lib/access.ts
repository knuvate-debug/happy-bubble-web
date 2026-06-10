import { getSession } from "./sessions";
import { getSessionContent } from "./sessionContents";
import type { ContentType } from "./types";

export function canAccessSession(sessionId: string) {
  const session = getSession(sessionId);
  return session?.status === "open";
}

export function canAccessContent(sessionId: string, contentType: ContentType) {
  const session = getSession(sessionId);
  const content = getSessionContent(sessionId, contentType);

  if (!session || session.status !== "open") return false;
  if (!content) return false;

  return content.status === "published" || content.status === "ready";
}
