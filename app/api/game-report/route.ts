import { NextResponse } from "next/server";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabaseServer";
import { getGamePack } from "@/game/data/gamePacks";

type LearningEvent = {
  id: string;
  anonymous_id: string;
  session_id: string;
  activity_type: string;
  event_name: string;
  round_id: string | null;
  value: string | null;
  metadata: Record<string, unknown> | null;
  created_at: string;
};

function getGameId(event: LearningEvent) {
  const raw = event.metadata?.gameId;
  if (typeof raw === "string") return raw;
  if (event.round_id?.includes("bubble-pop")) return "bubble-pop";
  if (event.round_id?.includes("build-sat")) return "build-sat";
  return "sound-match";
}

function summarizeGameEvents(events: LearningEvent[], sessionId: string) {
  const pack = getGamePack(sessionId);
  const packGames = pack?.games ?? [];

  const byGame = packGames.map((game) => {
    const gameEvents = events.filter((event) => getGameId(event) === game.id);
    const starts = gameEvents.filter((event) => event.event_name === "start").length;
    const completes = gameEvents.filter((event) => event.event_name === "complete").length;
    const correct = gameEvents.filter((event) => event.event_name === "correct").length;
    const incorrect = gameEvents.filter((event) => event.event_name === "incorrect").length;
    const totalAnswers = correct + incorrect;
    const accuracy = totalAnswers ? Math.round((correct / totalAnswers) * 100) : 0;
    const lastEvent = gameEvents[0] ?? null;

    return {
      id: game.id,
      title: game.title,
      route: game.route,
      learningGoal: game.learningGoal,
      starts,
      completes,
      correct,
      incorrect,
      totalAnswers,
      accuracy,
      lastEventAt: lastEvent?.created_at ?? null,
      status: completes > 0 ? "complete" : starts > 0 ? "started" : "not_started"
    };
  });

  const totalStarts = byGame.reduce((sum, game) => sum + game.starts, 0);
  const totalCompletes = byGame.reduce((sum, game) => sum + game.completes, 0);
  const totalCorrect = byGame.reduce((sum, game) => sum + game.correct, 0);
  const totalIncorrect = byGame.reduce((sum, game) => sum + game.incorrect, 0);
  const completedGames = byGame.filter((game) => game.completes > 0).length;

  return {
    sessionId,
    packTitle: pack?.title ?? sessionId,
    totalGames: byGame.length,
    completedGames,
    progressPercent: byGame.length ? Math.round((completedGames / byGame.length) * 100) : 0,
    totalStarts,
    totalCompletes,
    totalCorrect,
    totalIncorrect,
    totalEvents: events.length,
    games: byGame
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
      summary: summarizeGameEvents([], sessionId),
      events: []
    });
  }

  const supabase = getSupabaseAdmin();

  if (!supabase) {
    return NextResponse.json({
      ok: true,
      configured: false,
      sessionId,
      summary: summarizeGameEvents([], sessionId),
      events: []
    });
  }

  const { data, error } = await supabase
    .from("learning_events")
    .select("*")
    .eq("activity_type", "game")
    .eq("session_id", sessionId)
    .order("created_at", { ascending: false })
    .limit(300);

  if (error) {
    return NextResponse.json({
      ok: true,
      configured: true,
      sessionId,
      summary: summarizeGameEvents([], sessionId),
      events: [],
      warning: "Could not load game report events"
    });
  }

  const events = (data ?? []) as LearningEvent[];

  return NextResponse.json({
    ok: true,
    configured: true,
    sessionId,
    summary: summarizeGameEvents(events, sessionId),
    events
  });
}
