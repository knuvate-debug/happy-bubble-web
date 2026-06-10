export type SessionStatus = "locked" | "coming_soon" | "preview" | "open";
export type ContentStatus = "empty" | "draft" | "ready" | "published";

export type Session = {
  id: string;
  number: number;
  title: string;
  theme: string;
  subtitle: string;
  status: SessionStatus;
};

export type ContentType =
  | "theater"
  | "game"
  | "singing"
  | "mission"
  | "worksheet"
  | "flashcard"
  | "report";

export type SessionContent = {
  sessionId: string;
  contentType: ContentType;
  status: ContentStatus;
  url: string;
  assetUrl?: string;
  label: string;
};

export type TeacherStep = {
  id: string;
  order: number;
  title: string;
  time: string;
  href: string;
  buttonLabel: string;
  teacherPrompt: string;
  backup: string;
};
