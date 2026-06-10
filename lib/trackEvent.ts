import { getAnonymousId } from "./anonymousId";

export type LearningEventName =
  | "theater_open"
  | "singing_open"
  | "mission_open"
  | "game_start"
  | "listen_click"
  | "choice_tap"
  | "round_correct"
  | "round_wrong"
  | "game_complete"
  | "restart"
  | "classroom_open"
  | "classroom_presenter_open"
  | "classroom_overview_open"
  | "classroom_slide_view"
  | "classroom_next"
  | "classroom_prev"
  | "classroom_complete"
  | "classroom_timer_start"
  | "classroom_timer_pause"
  | "classroom_timer_reset";

export type TrackEventPayload = {
  sessionId: string;
  eventName: LearningEventName;
  activityType?: "theater" | "game" | "singing" | "mission" | "teacher" | "parent" | "classroom";
  roundId?: string;
  value?: string;
  isCorrect?: boolean;
  metadata?: Record<string, unknown>;
};

export async function trackEvent(payload: TrackEventPayload) {
  try {
    const anonymousId = getAnonymousId();

    await fetch("/api/learning-events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        anonymousId,
        ...payload
      })
    });
  } catch (error) {
    console.warn("trackEvent failed", error);
  }
}
