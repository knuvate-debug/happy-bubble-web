export type QrPart = "P1" | "P2" | "P3" | "P4";

export type QrTarget = {
  sessionId: string;
  sessionNumber: number;
  part: QrPart;
  label: string;
  productionPath: string;
  previewPath: string;
  fileName: string;
  previewFileName: string;
};

export function getQrPath(sessionId: string, part: QrPart) {
  if (part === "P1") return `/theater/${sessionId}`;
  if (part === "P2") return `/game/${sessionId}`;
  if (part === "P3") return `/singing/${sessionId}`;
  if (sessionId === "s15" && part === "P4") return "/report/s15";
  return `/mission/${sessionId}`;
}

export function getPreviewPath(sessionId: string, part: QrPart) {
  const path = getQrPath(sessionId, part);

  if (path.includes("?")) {
    return `${path}&preview=true`;
  }

  return `${path}?preview=true`;
}

export function getQrLabel(part: QrPart) {
  if (part === "P1") return "Bubble Theater";
  if (part === "P2") return "Bubble Game";
  if (part === "P3") return "Singing Bubble";
  return "Mission / Report";
}

export function getQrFileName(sessionNumber: number, part: QrPart) {
  return `HBE_QR_S${String(sessionNumber).padStart(2, "0")}_${part}.png`;
}

export function getPreviewQrFileName(sessionNumber: number, part: QrPart) {
  return `HBE_QR_S${String(sessionNumber).padStart(2, "0")}_${part}_preview.png`;
}

export function buildQrTargets(sessionId: string, sessionNumber: number): QrTarget[] {
  const parts: QrPart[] = ["P1", "P2", "P3", "P4"];

  return parts.map((part) => ({
    sessionId,
    sessionNumber,
    part,
    label: getQrLabel(part),
    productionPath: getQrPath(sessionId, part),
    previewPath: getPreviewPath(sessionId, part),
    fileName: getQrFileName(sessionNumber, part),
    previewFileName: getPreviewQrFileName(sessionNumber, part)
  }));
}
