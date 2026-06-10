import { NextResponse } from "next/server";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabaseServer";

export async function GET() {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({
      ok: true,
      configured: false,
      progress: [],
      recentEvents: [],
      counts: {
        learningEvents: 0,
        sessionProgress: 0
      }
    });
  }

  const supabase = getSupabaseAdmin();

  if (!supabase) {
    return NextResponse.json({
      ok: true,
      configured: false,
      progress: [],
      recentEvents: [],
      counts: {
        learningEvents: 0,
        sessionProgress: 0
      }
    });
  }

  const [
    progressResult,
    eventsResult,
    eventCountResult,
    progressCountResult
  ] = await Promise.all([
    supabase
      .from("session_progress")
      .select("*")
      .order("last_played_at", { ascending: false })
      .limit(20),
    supabase
      .from("learning_events")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(30),
    supabase
      .from("learning_events")
      .select("id", { count: "exact", head: true }),
    supabase
      .from("session_progress")
      .select("anonymous_id", { count: "exact", head: true })
  ]);

  return NextResponse.json({
    ok: true,
    configured: true,
    progress: progressResult.data ?? [],
    recentEvents: eventsResult.data ?? [],
    counts: {
      learningEvents: eventCountResult.count ?? 0,
      sessionProgress: progressCountResult.count ?? 0
    },
    warnings: [
      progressResult.error ? "session_progress could not be loaded" : null,
      eventsResult.error ? "learning_events could not be loaded" : null
    ].filter(Boolean)
  });
}
