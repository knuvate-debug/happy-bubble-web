"use client";

import { useEffect, useState } from "react";

type SessionProgress = {
  anonymous_id: string;
  session_id: string;
  theater_viewed: boolean;
  singing_played: boolean;
  mission_opened: boolean;
  game_completed: boolean;
  total_correct: number;
  total_mistakes: number;
  total_play_time_ms: number;
  last_played_at: string;
};

type LearningEvent = {
  id: string;
  anonymous_id: string;
  session_id: string;
  event_name: string;
  activity_type: string | null;
  round_id: string | null;
  value: string | null;
  is_correct: boolean | null;
  created_at: string;
};

type AdminSummary = {
  ok: boolean;
  configured: boolean;
  progress: SessionProgress[];
  recentEvents: LearningEvent[];
  counts: {
    learningEvents: number;
    sessionProgress: number;
  };
  warnings?: string[];
};

function shortId(id: string) {
  if (!id) return "—";
  if (id.length <= 10) return id;
  return `${id.slice(0, 6)}...${id.slice(-4)}`;
}

function formatTime(value?: string) {
  if (!value) return "—";
  try {
    return new Date(value).toLocaleString();
  } catch {
    return value;
  }
}

export function AdminDashboard() {
  const [summary, setSummary] = useState<AdminSummary | null>(null);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      const response = await fetch("/api/admin-summary", { cache: "no-store" });
      const data = (await response.json()) as AdminSummary;
      setSummary(data);
    } catch {
      setSummary({
        ok: false,
        configured: false,
        progress: [],
        recentEvents: [],
        counts: {
          learningEvents: 0,
          sessionProgress: 0
        },
        warnings: ["Admin summary API could not be loaded"]
      });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <section className="mt-8 space-y-6">
      <div className="hbe-card rounded-[32px] p-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-hbe-green">
              Supabase Dashboard
            </p>
            <h2 className="mt-2 text-3xl font-black text-hbe-navy">Learning Records</h2>
            <p className="mt-2 font-bold text-hbe-navy/65">
              learning_events와 session_progress 최근 기록을 확인합니다.
            </p>
          </div>
          <button
            onClick={load}
            className="hbe-focus rounded-full bg-hbe-green px-5 py-3 font-black text-white shadow-bubble"
          >
            Refresh
          </button>
        </div>

        {loading ? (
          <p className="mt-6 font-bold text-hbe-navy/70">기록을 불러오고 있어요.</p>
        ) : null}

        {!loading && summary?.configured === false ? (
          <div className="mt-6 rounded-[24px] bg-hbe-cream p-5">
            <h3 className="text-xl font-black text-hbe-navy">Supabase not configured</h3>
            <p className="mt-2 font-bold text-hbe-navy/70">
              아직 Supabase 환경변수가 등록되지 않았어요. 게임은 작동하지만 기록은 저장되지 않습니다.
            </p>
            <p className="mt-3 text-sm font-black text-hbe-navy/60">
              필요한 환경변수: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY
            </p>
          </div>
        ) : null}

        {!loading && summary?.warnings?.length ? (
          <div className="mt-6 rounded-[24px] bg-hbe-peach p-5">
            <h3 className="text-xl font-black text-hbe-navy">Warnings</h3>
            <ul className="mt-2 list-inside list-disc font-bold text-hbe-navy/70">
              {summary.warnings.map((warning) => (
                <li key={warning}>{warning}</li>
              ))}
            </ul>
          </div>
        ) : null}

        {!loading && summary?.configured ? (
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[24px] bg-hbe-sky p-5">
              <p className="text-sm font-black text-hbe-navy/60">learning_events</p>
              <p className="mt-2 text-4xl font-black text-hbe-navy">{summary.counts.learningEvents}</p>
            </div>
            <div className="rounded-[24px] bg-hbe-lilac p-5">
              <p className="text-sm font-black text-hbe-navy/60">session_progress</p>
              <p className="mt-2 text-4xl font-black text-hbe-navy">{summary.counts.sessionProgress}</p>
            </div>
          </div>
        ) : null}
      </div>

      {!loading && summary?.configured ? (
        <>
          <div className="overflow-x-auto rounded-[32px] bg-white/80 p-4 shadow-bubble">
            <h3 className="px-3 py-3 text-2xl font-black text-hbe-navy">Recent Session Progress</h3>
            <table className="w-full min-w-[900px] border-separate border-spacing-y-3 text-left">
              <thead>
                <tr className="text-sm text-hbe-navy/60">
                  <th className="px-3">User</th>
                  <th className="px-3">Session</th>
                  <th className="px-3">Theater</th>
                  <th className="px-3">Game</th>
                  <th className="px-3">Singing</th>
                  <th className="px-3">Mission</th>
                  <th className="px-3">Correct</th>
                  <th className="px-3">Review</th>
                  <th className="px-3">Last</th>
                </tr>
              </thead>
              <tbody>
                {summary.progress.map((item) => (
                  <tr key={`${item.anonymous_id}-${item.session_id}`} className="bg-hbe-bg">
                    <td className="px-3 py-4 font-black">{shortId(item.anonymous_id)}</td>
                    <td className="px-3 py-4 font-black">{item.session_id}</td>
                    <td className="px-3 py-4">{item.theater_viewed ? "Viewed" : "Ready"}</td>
                    <td className="px-3 py-4">{item.game_completed ? "Done" : "Ready"}</td>
                    <td className="px-3 py-4">{item.singing_played ? "Played" : "Ready"}</td>
                    <td className="px-3 py-4">{item.mission_opened ? "Opened" : "Ready"}</td>
                    <td className="px-3 py-4">{item.total_correct}</td>
                    <td className="px-3 py-4">{item.total_mistakes ? "Try again" : "Good flow"}</td>
                    <td className="px-3 py-4 text-sm">{formatTime(item.last_played_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {!summary.progress.length ? (
              <p className="px-3 py-6 font-bold text-hbe-navy/65">아직 session_progress 기록이 없습니다.</p>
            ) : null}
          </div>

          <div className="overflow-x-auto rounded-[32px] bg-white/80 p-4 shadow-bubble">
            <h3 className="px-3 py-3 text-2xl font-black text-hbe-navy">Recent Learning Events</h3>
            <table className="w-full min-w-[900px] border-separate border-spacing-y-3 text-left">
              <thead>
                <tr className="text-sm text-hbe-navy/60">
                  <th className="px-3">Time</th>
                  <th className="px-3">User</th>
                  <th className="px-3">Session</th>
                  <th className="px-3">Event</th>
                  <th className="px-3">Activity</th>
                  <th className="px-3">Round</th>
                  <th className="px-3">Value</th>
                  <th className="px-3">Result</th>
                </tr>
              </thead>
              <tbody>
                {summary.recentEvents.map((event) => (
                  <tr key={event.id} className="bg-hbe-bg">
                    <td className="px-3 py-4 text-sm">{formatTime(event.created_at)}</td>
                    <td className="px-3 py-4 font-black">{shortId(event.anonymous_id)}</td>
                    <td className="px-3 py-4 font-black">{event.session_id}</td>
                    <td className="px-3 py-4 font-black">{event.event_name}</td>
                    <td className="px-3 py-4">{event.activity_type ?? "—"}</td>
                    <td className="px-3 py-4">{event.round_id ?? "—"}</td>
                    <td className="px-3 py-4">{event.value ?? "—"}</td>
                    <td className="px-3 py-4">
                      {event.is_correct === null ? "—" : event.is_correct ? "Correct" : "Review"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {!summary.recentEvents.length ? (
              <p className="px-3 py-6 font-bold text-hbe-navy/65">아직 learning_events 기록이 없습니다.</p>
            ) : null}
          </div>
        </>
      ) : null}
    </section>
  );
}
