import type { SessionContent } from "./types";

export const sessionContents: SessionContent[] = [
  {
    sessionId: "s01",
    contentType: "theater",
    status: "published",
    url: "/theater/s01",
    assetUrl: "/assets/theater/HBE_BT_S01_FINAL.mp4",
    label: "Bubble Theater"
  },
  {
    sessionId: "s01",
    contentType: "game",
    status: "published",
    url: "/game/s01",
    label: "Bubble Game"
  },
  {
    sessionId: "s01",
    contentType: "singing",
    status: "published",
    url: "/singing/s01",
    assetUrl: "/assets/singing/HBE_SB_S01.mp3",
    label: "Singing Bubble"
  },
  {
    sessionId: "s01",
    contentType: "mission",
    status: "published",
    url: "/mission/s01",
    label: "Mission"
  },
  {
    sessionId: "s01",
    contentType: "worksheet",
    status: "ready",
    url: "/assets/worksheets/HBE_WS_S01.pdf",
    assetUrl: "/assets/worksheets/HBE_WS_S01.pdf",
    label: "Worksheet"
  },
  {
    sessionId: "s01",
    contentType: "flashcard",
    status: "ready",
    url: "/assets/flashcards/HBE_FC_S01.pdf",
    assetUrl: "/assets/flashcards/HBE_FC_S01.pdf",
    label: "Flash Cards"
  }
];

export function getSessionContents(sessionId: string) {
  return sessionContents.filter((content) => content.sessionId === sessionId);
}

export function getSessionContent(sessionId: string, contentType: SessionContent["contentType"]) {
  return sessionContents.find(
    (content) => content.sessionId === sessionId && content.contentType === contentType
  );
}
