import { trackEvent } from "./trackEvent";

export function trackClassroomEvent({
  sessionId,
  eventName,
  slideId,
  value,
  metadata
}: {
  sessionId: string;
  eventName:
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
  slideId?: string;
  value?: string;
  metadata?: Record<string, unknown>;
}) {
  return trackEvent({
    sessionId,
    eventName,
    activityType: "classroom",
    roundId: slideId,
    value,
    metadata
  });
}
