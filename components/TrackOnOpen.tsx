"use client";

import { useEffect } from "react";
import { trackEvent, type LearningEventName } from "@/lib/trackEvent";

export function TrackOnOpen({
  sessionId,
  eventName,
  activityType
}: {
  sessionId: string;
  eventName: LearningEventName;
  activityType: "theater" | "singing" | "mission" | "teacher" | "parent";
}) {
  useEffect(() => {
    trackEvent({
      sessionId,
      eventName,
      activityType
    });
  }, [activityType, eventName, sessionId]);

  return null;
}
