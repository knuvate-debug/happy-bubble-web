import { sessionContents } from "./sessionContents";
import { sessions } from "./sessions";

export type AssetCheckItem = {
  sessionId: string;
  sessionNumber: number;
  sessionTitle: string;
  sessionStatus: string;
  contentType: string;
  contentStatus: string;
  label: string;
  url: string;
  assetUrl: string | null;
  requiredForPilot: boolean;
  note: string;
};

export function buildAssetManifest(): AssetCheckItem[] {
  return sessionContents.map((content) => {
    const session = sessions.find((item) => item.id === content.sessionId);
    const isS1 = content.sessionId === "s01";

    return {
      sessionId: content.sessionId,
      sessionNumber: session?.number ?? 0,
      sessionTitle: session?.title ?? content.sessionId,
      sessionStatus: session?.status ?? "unknown",
      contentType: content.contentType,
      contentStatus: content.status,
      label: content.label,
      url: content.url,
      assetUrl: content.assetUrl ?? null,
      requiredForPilot:
        isS1 &&
        ["theater", "singing", "worksheet", "flashcard"].includes(content.contentType),
      note: content.assetUrl
        ? "Check asset URL"
        : content.contentType === "game" || content.contentType === "mission"
          ? "Route based content"
          : "No asset URL"
    };
  });
}

export const requiredS1Assets = [
  {
    label: "S1 Theater",
    localPath: "public/assets/theater/HBE_BT_S01_FINAL.mp4",
    webUrl: "/assets/theater/HBE_BT_S01_FINAL.mp4",
    type: "video"
  },
  {
    label: "S1 Singing",
    localPath: "public/assets/singing/HBE_SB_S01.mp3",
    webUrl: "/assets/singing/HBE_SB_S01.mp3",
    type: "audio"
  },
  {
    label: "Hello Song",
    localPath: "public/assets/singing/HBE_SB_Hello.mp3",
    webUrl: "/assets/singing/HBE_SB_Hello.mp3",
    type: "audio"
  },
  {
    label: "Goodbye Song",
    localPath: "public/assets/singing/HBE_SB_Goodbye.mp3",
    webUrl: "/assets/singing/HBE_SB_Goodbye.mp3",
    type: "audio"
  },
  {
    label: "S1 Worksheet",
    localPath: "public/assets/worksheets/HBE_WS_S01.pdf",
    webUrl: "/assets/worksheets/HBE_WS_S01.pdf",
    type: "pdf"
  },
  {
    label: "S1 Flashcards",
    localPath: "public/assets/flashcards/HBE_FC_S01.pdf",
    webUrl: "/assets/flashcards/HBE_FC_S01.pdf",
    type: "pdf"
  }
] as const;
