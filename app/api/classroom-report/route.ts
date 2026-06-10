import { NextResponse } from "next/server";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabaseServer";
import { getClassroomDeck } from "@/lib/classroomSlides";

type LearningEvent = {
  id: string;
  anonymous_id: string;
  session_id: string;
  event_name: string;
  round_id: string | null;
  value: string | null;
  metadata: Record<string, unknown> | null;
  created_at: string;
};

function summarizeClassroomEvents(events: LearningEvent[], sessionId: string) {
  const deck = getClassroomDeck(sessionId);
  const slideIds = deck?.slides.map((slide) => slide.id) ?? [];

  const slideViews = events.filter((event) => event.event_name === "classroom_slide_view");
  const viewedSlideIds = Array.from(new Set(slideViews.map((event) => event.round_id).filter(Boolean))) as string[];

  const timerStarts = events.filter((event) => event.event_name === "classroom_timer_start").length;
  const timerPauses = events.filter((event) => event.event_name === "classroom_timer_pause").length;
  const timerResets = events.filter((event) => event.event_name === "classroom_timer_reset").length;
  const completes = events.filter((event) => event.event_name === "classroom_complete").length;

  const instructorModes = events.reduce<Record<string, number>>((acc, event) => {
    const rawMode = event.metadata?.instructorMode;
    if (typeof rawMode === "string") {
      acc[rawMode] = (acc[rawMode] ?? 0) + 1;
    }
    return acc;
  }, {});
  const topInstructorMode =
    Object.entries(instructorModes).sort((a, b) => b[1] - a[1])[0]?.[0] ?? null;

  const lastEvent = events[0] ?? null;
  const firstEvent = events[events.length - 1] ?? null;

  return {
    sessionId,
    deckTitle: deck?.title ?? sessionId,
    totalSlides: slideIds.length,
    viewedSlides: viewedSlideIds.length,
    viewedSlideIds,
    progressPercent: slideIds.length ? Math.round((viewedSlideIds.length / slideIds.length) * 100) : 0,
    totalEvents: events.length,
    nextCount: events.filter((event) => event.event_name === "classroom_next").length,
    prevCount: events.filter((event) => event.event_name === "classroom_prev").length,
    completeCount: completes,
    timer: {
      starts: timerStarts,
      pauses: timerPauses,
      resets: timerResets
    },
    instructorModes,
    topInstructorMode,
    firstEventAt: firstEvent?.created_at ?? null,
    lastEventAt: lastEvent?.created_at ?? null,
    lastSlideId: slideViews[0]?.round_id ?? null,
    lastSlideTitle: slideViews[0]?.value ?? null
  };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get("sessionId") ?? "s01";

  if (!isSupabaseConfigured()) {
    return NextResponse.json({
      ok: true,
      configured: false,
      sessionId,
      summary: summarizeClassroomEvents([], sessionId),
      events: []
    });
  }

  const supabase = getSupabaseAdmin();

  if (!supabase) {
    return NextResponse.json({
      ok: true,
      configured: false,
      sessionId,
      summary: summarizeClassroomEvents([], sessionId),
      events: []
    });
  }

  const { data, error } = await supabase
    .from("learning_events")
    .select("*")
    .eq("activity_type", "classroom")
    .eq("session_id", sessionId)
    .order("created_at", { ascending: false })
    .limit(200);

  if (error) {
    return NextResponse.json({
      ok: true,
      configured: true,
      sessionId,
      summary: summarizeClassroomEvents([], sessionId),
      events: [],
      warning: "Could not load classroom report events"
    });
  }

  const events = (data ?? []) as LearningEvent[];

  return NextResponse.json({
    ok: true,
    configured: true,
    sessionId,
    summary: summarizeClassroomEvents(events, sessionId),
    events
  });
}
