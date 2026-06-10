import { NextResponse } from "next/server";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabaseServer";

type LearningEventRequest = {
  anonymousId?: string;
  sessionId?: string;
  eventName?: string;
  activityType?: string;
  roundId?: string;
  value?: string;
  isCorrect?: boolean;
  metadata?: Record<string, unknown>;
};

async function updateSessionProgress(body: LearningEventRequest) {
  const supabase = getSupabaseAdmin();
  if (!supabase || !body.anonymousId || !body.sessionId) return;

  const isGameComplete = body.eventName === "game_complete";
  const isWrong = body.eventName === "round_wrong";
  const isCorrect = body.eventName === "round_correct";

  const { data: existing } = await supabase
    .from("session_progress")
    .select("*")
    .eq("anonymous_id", body.anonymousId)
    .eq("session_id", body.sessionId)
    .maybeSingle();

  const next = {
    anonymous_id: body.anonymousId,
    session_id: body.sessionId,
    theater_viewed: existing?.theater_viewed ?? body.eventName === "theater_open",
    singing_played: existing?.singing_played ?? body.eventName === "singing_open",
    mission_opened: existing?.mission_opened ?? body.eventName === "mission_open",
    game_completed: existing?.game_completed ?? isGameComplete,
    total_correct: (existing?.total_correct ?? 0) + (isCorrect ? 1 : 0),
    total_mistakes: (existing?.total_mistakes ?? 0) + (isWrong ? 1 : 0),
    last_played_at: new Date().toISOString()
  };

  await supabase
    .from("session_progress")
    .upsert(next, {
      onConflict: "anonymous_id,session_id"
    });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as LearningEventRequest;

    if (!body.anonymousId || !body.sessionId || !body.eventName) {
      return NextResponse.json(
        { ok: false, error: "anonymousId, sessionId, and eventName are required" },
        { status: 400 }
      );
    }

    if (!isSupabaseConfigured()) {
      return NextResponse.json({
        ok: true,
        stored: false,
        reason: "Supabase is not configured. Event ignored safely."
      });
    }

    const supabase = getSupabaseAdmin();
    if (!supabase) {
      return NextResponse.json({
        ok: true,
        stored: false,
        reason: "Supabase client unavailable. Event ignored safely."
      });
    }

    const { error } = await supabase.from("learning_events").insert({
      anonymous_id: body.anonymousId,
      session_id: body.sessionId,
      event_name: body.eventName,
      activity_type: body.activityType ?? null,
      round_id: body.roundId ?? null,
      value: body.value ?? null,
      is_correct: body.isCorrect ?? null,
      metadata: body.metadata ?? {}
    });

    if (error) {
      console.warn("learning_events insert failed", error);
      return NextResponse.json({
        ok: true,
        stored: false,
        reason: "Supabase insert failed. Event ignored safely."
      });
    }

    await updateSessionProgress(body);

    return NextResponse.json({ ok: true, stored: true });
  } catch (error) {
    console.warn("learning event API failed", error);
    return NextResponse.json({
      ok: true,
      stored: false,
      reason: "Unexpected error. Event ignored safely."
    });
  }
}
