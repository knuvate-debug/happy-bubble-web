"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type GameSummary = {
  id: string;
  title: string;
  route: string;
  learningGoal: string;
  starts: number;
  completes: number;
  correct: number;
  incorrect: number;
  totalAnswers: number;
  accuracy: number;
  lastEventAt: string | null;
  status: "complete" | "started" | "not_started";
};

type GamePackSummary = {
  sessionId: string;
  packTitle: string;
  totalGames: number;
  completedGames: number;
  progressPercent: number;
  totalStarts: number;
  totalCompletes: number;
  totalCorrect: number;
  totalIncorrect: number;
  totalEvents: number;
  games: GameSummary[];
};

type GameEvent = {
  id: string;
  anonymous_id: string;
  event_name: string;
  round_id: string | null;
  value: string | null;
  created_at: string;
  metadata: Record<string, unknown> | null;
};

type GameReportResponse = {
  ok: boolean;
  configured: boolean;
  sessionId: string;
  summary: GamePackSummary;
  events: GameEvent[];
};

function formatTime(value: string | null) {
  if (!value) return "—";
  try {
    return new Date(value).toLocaleString();
  } catch {
    return value;
  }
}

function getGameId(event: GameEvent) {
  const raw = event.metadata?.gameId;
  if (typeof raw === "string") return raw;
  if (event.round_id?.includes("bubble-pop")) return "bubble-pop";
  if (event.round_id?.includes("build-sat")) return "build-sat";
  return "sound-match";
}

function shortId(id: string) {
  if (!id) return "—";
  if (id.length <= 10) return id;
  return `${id.slice(0, 6)}...${id.slice(-4)}`;
}

const statusClass = {
  complete: "bg-hbe-green text-white",
  started: "bg-hbe-gold/70 text-hbe-navy",
  not_started: "bg-white text-hbe-navy/55"
};

export function GameReportPanel({ sessionId = "s01", audience = "teacher" }: { sessionId?: string; audience?: "teacher" | "parent" | "admin" }) {
  const [data, setData] = useState<GameReportResponse | null>(null);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      const response = await fetch(`/api/game-report?sessionId=${encodeURIComponent(sessionId)}`, {
        cache: "no-store"
      });
      const json = (await response.json()) as GameReportResponse;
      setData(json);
    } catch {
      setData(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, [sessionId]);

  const summary = data?.summary;

  const recommendation = useMemo(() => {
    if (!data?.configured) {
      return "Supabase 연결 후 게임 기록을 확인할 수 있습니다.";
    }

    if (!summary || summary.totalEvents === 0) {
      return "아직 기록된 게임 이벤트가 없습니다. S1 Game Pack을 먼저 실행해 주세요.";
    }

    if (summary.completedGames >= summary.totalGames) {
      return "S1 Game Pack을 모두 완료했습니다. Parent Review와 Classroom Report 연결을 확인하세요.";
    }

    if (summary.completedGames === 0) {
      return "게임을 시작했지만 완료 기록이 없습니다. 짧게 한 게임부터 끝내도록 안내하세요.";
    }

    return "일부 게임이 완료되었습니다. 남은 게임은 다음 수업이나 가정 연계 활동으로 이어가면 좋습니다.";
  }, [data?.configured, summary]);

  return (
    <section className="space-y-6">
      <header className="rounded-[44px] bg-white/78 p-7 shadow-bubble">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-hbe-green">
              Game Report
            </p>
            <h1 className="mt-3 text-4xl font-black text-hbe-navy">
              {summary?.packTitle ?? "S1 Game Pack"}
            </h1>
            <p className="mt-3 max-w-3xl text-lg font-bold text-hbe-navy/68">
              Sound Match, Bubble Pop, Build SAT 진행 결과를 요약합니다.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={load}
              className="hbe-focus rounded-full bg-hbe-green px-5 py-3 text-sm font-black text-white shadow-sm"
            >
              Refresh
            </button>
            <Link
              href="/game/s01"
              className="hbe-focus rounded-full bg-hbe-cream px-5 py-3 text-sm font-black text-hbe-navy shadow-sm"
            >
              Game Pack
            </Link>
            <Link
              href={audience === "parent" ? "/parent" : "/teacher/s01"}
              className="hbe-focus rounded-full bg-white px-5 py-3 text-sm font-black text-hbe-navy shadow-sm"
            >
              Back
            </Link>
          </div>
        </div>
      </header>

      {loading ? (
        <section className="hbe-card rounded-[40px] p-8">
          <p className="font-bold text-hbe-navy/70">Game report를 불러오고 있어요.</p>
        </section>
      ) : null}

      {!loading && !data?.configured ? (
        <section className="rounded-[36px] bg-hbe-cream p-6 shadow-bubble">
          <h2 className="text-2xl font-black text-hbe-navy">Supabase not configured</h2>
          <p className="mt-3 font-bold text-hbe-navy/70">
            Game Report UI는 사용할 수 있지만, 실제 게임 기록은 Supabase 환경변수 연결 후 저장됩니다.
          </p>
        </section>
      ) : null}

      {summary ? (
        <>
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
            <div className="rounded-[32px] bg-hbe-sky p-5 shadow-bubble">
              <p className="text-xs font-black uppercase tracking-wide text-hbe-navy/55">Progress</p>
              <p className="mt-3 text-4xl font-black text-hbe-navy">{summary.progressPercent}%</p>
              <p className="mt-1 text-sm font-bold text-hbe-navy/60">
                {summary.completedGames} / {summary.totalGames} games
              </p>
            </div>
            <div className="rounded-[32px] bg-hbe-cream p-5 shadow-bubble">
              <p className="text-xs font-black uppercase tracking-wide text-hbe-navy/55">Starts</p>
              <p className="mt-3 text-4xl font-black text-hbe-navy">{summary.totalStarts}</p>
              <p className="mt-1 text-sm font-bold text-hbe-navy/60">game starts</p>
            </div>
            <div className="rounded-[32px] bg-hbe-lilac p-5 shadow-bubble">
              <p className="text-xs font-black uppercase tracking-wide text-hbe-navy/55">Correct</p>
              <p className="mt-3 text-4xl font-black text-hbe-navy">{summary.totalCorrect}</p>
              <p className="mt-1 text-sm font-bold text-hbe-navy/60">responses</p>
            </div>
            <div className="rounded-[32px] bg-hbe-peach p-5 shadow-bubble">
              <p className="text-xs font-black uppercase tracking-wide text-hbe-navy/55">Try Again</p>
              <p className="mt-3 text-4xl font-black text-hbe-navy">{summary.totalIncorrect}</p>
              <p className="mt-1 text-sm font-bold text-hbe-navy/60">responses</p>
            </div>
            <div className="rounded-[32px] bg-hbe-gold/80 p-5 shadow-bubble">
              <p className="text-xs font-black uppercase tracking-wide text-hbe-navy/55">Events</p>
              <p className="mt-3 text-4xl font-black text-hbe-navy">{summary.totalEvents}</p>
              <p className="mt-1 text-sm font-bold text-hbe-navy/60">logs</p>
            </div>
          </section>

          <section className="grid gap-5 xl:grid-cols-[1fr_360px]">
            <div className="rounded-[40px] bg-white/78 p-6 shadow-bubble">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-hbe-green">
                Game Pack Progress
              </p>
              <div className="mt-5 h-5 overflow-hidden rounded-full bg-hbe-lilac/70">
                <div
                  className="h-full rounded-full bg-hbe-green transition-all"
                  style={{ width: `${summary.progressPercent}%` }}
                />
              </div>

              <div className="mt-6 grid gap-4 lg:grid-cols-3">
                {summary.games.map((game) => (
                  <article key={game.id} className="rounded-[32px] bg-hbe-bg p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h2 className="text-2xl font-black text-hbe-navy">{game.title}</h2>
                        <p className="mt-2 text-sm font-bold text-hbe-navy/60">{game.learningGoal}</p>
                      </div>
                      <span className={`rounded-full px-3 py-1 text-xs font-black ${statusClass[game.status]}`}>
                        {game.status.replace("_", " ")}
                      </span>
                    </div>

                    <div className="mt-5 grid grid-cols-2 gap-3">
                      <div className="rounded-[22px] bg-white/75 p-3">
                        <p className="text-xs font-black text-hbe-navy/45">Complete</p>
                        <p className="mt-1 text-2xl font-black text-hbe-navy">{game.completes}</p>
                      </div>
                      <div className="rounded-[22px] bg-white/75 p-3">
                        <p className="text-xs font-black text-hbe-navy/45">Accuracy</p>
                        <p className="mt-1 text-2xl font-black text-hbe-navy">{game.accuracy}%</p>
                      </div>
                      <div className="rounded-[22px] bg-white/75 p-3">
                        <p className="text-xs font-black text-hbe-navy/45">Correct</p>
                        <p className="mt-1 text-2xl font-black text-hbe-navy">{game.correct}</p>
                      </div>
                      <div className="rounded-[22px] bg-white/75 p-3">
                        <p className="text-xs font-black text-hbe-navy/45">Try Again</p>
                        <p className="mt-1 text-2xl font-black text-hbe-navy">{game.incorrect}</p>
                      </div>
                    </div>

                    <p className="mt-4 text-xs font-bold text-hbe-navy/52">
                      Last: {formatTime(game.lastEventAt)}
                    </p>

                    <Link
                      href={game.route}
                      className="mt-4 inline-flex rounded-full bg-white px-4 py-2 text-sm font-black text-hbe-navy shadow-sm"
                    >
                      Open Game
                    </Link>
                  </article>
                ))}
              </div>
            </div>

            <aside className="rounded-[40px] bg-hbe-cream p-6 shadow-bubble">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-hbe-navy/55">
                Recommendation
              </p>
              <p className="mt-4 text-xl font-black leading-relaxed text-hbe-navy">
                {recommendation}
              </p>
            </aside>
          </section>

          {audience !== "parent" ? (
            <section className="overflow-x-auto rounded-[40px] bg-white/78 p-5 shadow-bubble">
              <h2 className="px-3 py-3 text-2xl font-black text-hbe-navy">Recent Game Events</h2>
              <table className="w-full min-w-[900px] border-separate border-spacing-y-3 text-left">
                <thead>
                  <tr className="text-xs font-black uppercase tracking-wide text-hbe-navy/55">
                    <th className="px-3">Time</th>
                    <th className="px-3">User</th>
                    <th className="px-3">Game</th>
                    <th className="px-3">Event</th>
                    <th className="px-3">Round</th>
                    <th className="px-3">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {(data?.events ?? []).slice(0, 40).map((event) => (
                    <tr key={event.id} className="bg-hbe-bg">
                      <td className="px-3 py-4 text-sm">{formatTime(event.created_at)}</td>
                      <td className="px-3 py-4 font-black">{shortId(event.anonymous_id)}</td>
                      <td className="px-3 py-4 font-black">{getGameId(event)}</td>
                      <td className="px-3 py-4 font-black">{event.event_name}</td>
                      <td className="px-3 py-4">{event.round_id ?? "—"}</td>
                      <td className="px-3 py-4">{event.value ?? "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {data?.events.length === 0 ? (
                <p className="px-3 py-6 font-bold text-hbe-navy/65">아직 Game 이벤트가 없습니다.</p>
              ) : null}
            </section>
          ) : null}
        </>
      ) : null}
    </section>
  );
}
