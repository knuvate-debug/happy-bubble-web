"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type ReportSummary = {
  sessionId: string;
  deckTitle: string;
  totalSlides: number;
  viewedSlides: number;
  viewedSlideIds: string[];
  progressPercent: number;
  totalEvents: number;
  nextCount: number;
  prevCount: number;
  completeCount: number;
  timer: {
    starts: number;
    pauses: number;
    resets: number;
  };
  instructorModes?: Record<string, number>;
  topInstructorMode?: string | null;
  firstEventAt: string | null;
  lastEventAt: string | null;
  lastSlideId: string | null;
  lastSlideTitle: string | null;
};

type ClassroomEvent = {
  id: string;
  anonymous_id: string;
  session_id: string;
  event_name: string;
  round_id: string | null;
  value: string | null;
  created_at: string;
};

type ReportResponse = {
  ok: boolean;
  configured: boolean;
  sessionId: string;
  summary: ReportSummary;
  events: ClassroomEvent[];
  warning?: string;
};

function formatTime(value: string | null) {
  if (!value) return "—";
  try {
    return new Date(value).toLocaleString();
  } catch {
    return value;
  }
}

function shortId(id: string) {
  if (!id) return "—";
  if (id.length <= 10) return id;
  return `${id.slice(0, 6)}...${id.slice(-4)}`;
}

export function ClassroomReportPanel({ sessionId = "s01" }: { sessionId?: string }) {
  const [data, setData] = useState<ReportResponse | null>(null);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      const response = await fetch(`/api/classroom-report?sessionId=${encodeURIComponent(sessionId)}`, {
        cache: "no-store"
      });
      const json = (await response.json()) as ReportResponse;
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
      return "Supabase 연결 후 수업 진행 기록을 확인할 수 있습니다.";
    }

    if (!summary || summary.totalEvents === 0) {
      return "아직 기록된 Classroom 수업 이벤트가 없습니다. /classroom/s01 또는 Presenter View를 실행해 주세요.";
    }

    if (summary.completeCount > 0) {
      return "수업 완료 이벤트가 기록되었습니다. 다음 단계로 Parent Review 또는 Smart Report 연결을 확인하세요.";
    }

    if (summary.progressPercent < 50) {
      return "아직 절반 이하만 진행되었습니다. Presenter View에서 이어서 진행해 주세요.";
    }

    return "수업이 상당 부분 진행되었습니다. Complete 버튼으로 마무리 기록을 남겨주세요.";
  }, [data?.configured, summary]);

  return (
    <section className="space-y-6">
      <header className="rounded-[44px] bg-white/78 p-7 shadow-bubble">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-hbe-green">
              Classroom Report
            </p>
            <h1 className="mt-3 text-4xl font-black text-hbe-navy">
              {summary?.deckTitle ?? "Classroom Summary"}
            </h1>
            <p className="mt-3 max-w-3xl text-lg font-bold text-hbe-navy/68">
              슬라이드 진행, 타이머 사용, 완료 여부를 요약합니다.
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
              href="/classroom/s01/presenter"
              className="hbe-focus rounded-full bg-hbe-cream px-5 py-3 text-sm font-black text-hbe-navy shadow-sm"
            >
              Presenter
            </Link>
            <Link
              href="/classroom/s01"
              className="hbe-focus rounded-full bg-white px-5 py-3 text-sm font-black text-hbe-navy shadow-sm"
            >
              Deck
            </Link>
          </div>
        </div>
      </header>

      {loading ? (
        <section className="hbe-card rounded-[40px] p-8">
          <p className="font-bold text-hbe-navy/70">Classroom report를 불러오고 있어요.</p>
        </section>
      ) : null}

      {!loading && !data?.configured ? (
        <section className="rounded-[36px] bg-hbe-cream p-6 shadow-bubble">
          <h2 className="text-2xl font-black text-hbe-navy">Supabase not configured</h2>
          <p className="mt-3 font-bold text-hbe-navy/70">
            Classroom Report UI는 사용할 수 있지만, 실제 수업 기록은 Supabase 환경변수 연결 후 저장됩니다.
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
                {summary.viewedSlides} / {summary.totalSlides} slides
              </p>
            </div>
            <div className="rounded-[32px] bg-hbe-cream p-5 shadow-bubble">
              <p className="text-xs font-black uppercase tracking-wide text-hbe-navy/55">Events</p>
              <p className="mt-3 text-4xl font-black text-hbe-navy">{summary.totalEvents}</p>
              <p className="mt-1 text-sm font-bold text-hbe-navy/60">classroom logs</p>
            </div>
            <div className="rounded-[32px] bg-hbe-lilac p-5 shadow-bubble">
              <p className="text-xs font-black uppercase tracking-wide text-hbe-navy/55">Movement</p>
              <p className="mt-3 text-4xl font-black text-hbe-navy">{summary.nextCount}</p>
              <p className="mt-1 text-sm font-bold text-hbe-navy/60">next clicks</p>
            </div>
            <div className="rounded-[32px] bg-hbe-peach p-5 shadow-bubble">
              <p className="text-xs font-black uppercase tracking-wide text-hbe-navy/55">Timer</p>
              <p className="mt-3 text-4xl font-black text-hbe-navy">{summary.timer.starts}</p>
              <p className="mt-1 text-sm font-bold text-hbe-navy/60">starts</p>
            </div>
            <div className="rounded-[32px] bg-hbe-gold/80 p-5 shadow-bubble">
              <p className="text-xs font-black uppercase tracking-wide text-hbe-navy/55">Mode</p>
              <p className="mt-3 text-3xl font-black text-hbe-navy">{summary.topInstructorMode ?? "—"}</p>
              <p className="mt-1 text-sm font-bold text-hbe-navy/60">instructor</p>
            </div>
          </section>

          <section className="grid gap-5 lg:grid-cols-[1fr_360px]">
            <div className="rounded-[40px] bg-white/78 p-6 shadow-bubble">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-hbe-green">
                Classroom Flow
              </p>
              <div className="mt-5 h-5 overflow-hidden rounded-full bg-hbe-lilac/70">
                <div
                  className="h-full rounded-full bg-hbe-green transition-all"
                  style={{ width: `${summary.progressPercent}%` }}
                />
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-[24px] bg-hbe-bg p-4">
                  <p className="text-xs font-black uppercase tracking-wide text-hbe-navy/50">First Event</p>
                  <p className="mt-2 text-sm font-bold text-hbe-navy/70">{formatTime(summary.firstEventAt)}</p>
                </div>
                <div className="rounded-[24px] bg-hbe-bg p-4">
                  <p className="text-xs font-black uppercase tracking-wide text-hbe-navy/50">Last Event</p>
                  <p className="mt-2 text-sm font-bold text-hbe-navy/70">{formatTime(summary.lastEventAt)}</p>
                </div>
                <div className="rounded-[24px] bg-hbe-bg p-4">
                  <p className="text-xs font-black uppercase tracking-wide text-hbe-navy/50">Last Slide</p>
                  <p className="mt-2 text-sm font-bold text-hbe-navy/70">
                    {summary.lastSlideTitle ?? summary.lastSlideId ?? "—"}
                  </p>
                </div>
                <div className="rounded-[24px] bg-hbe-bg p-4">
                  <p className="text-xs font-black uppercase tracking-wide text-hbe-navy/50">Timer Actions</p>
                  <p className="mt-2 text-sm font-bold text-hbe-navy/70">
                    Start {summary.timer.starts} · Pause {summary.timer.pauses} · Reset {summary.timer.resets}
                  </p>
                </div>
                <div className="rounded-[24px] bg-hbe-bg p-4 sm:col-span-2">
                  <p className="text-xs font-black uppercase tracking-wide text-hbe-navy/50">Instructor Modes</p>
                  <p className="mt-2 text-sm font-bold text-hbe-navy/70">
                    {Object.entries(summary.instructorModes ?? {}).length
                      ? Object.entries(summary.instructorModes ?? {})
                          .map(([mode, count]) => `${mode} ${count}`)
                          .join(" · ")
                      : "—"}
                  </p>
                </div>
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

          <section className="overflow-x-auto rounded-[40px] bg-white/78 p-5 shadow-bubble">
            <h2 className="px-3 py-3 text-2xl font-black text-hbe-navy">Recent Classroom Events</h2>
            <table className="w-full min-w-[900px] border-separate border-spacing-y-3 text-left">
              <thead>
                <tr className="text-xs font-black uppercase tracking-wide text-hbe-navy/55">
                  <th className="px-3">Time</th>
                  <th className="px-3">User</th>
                  <th className="px-3">Event</th>
                  <th className="px-3">Slide</th>
                  <th className="px-3">Value</th>
                </tr>
              </thead>
              <tbody>
                {(data?.events ?? []).slice(0, 30).map((event) => (
                  <tr key={event.id} className="bg-hbe-bg">
                    <td className="px-3 py-4 text-sm">{formatTime(event.created_at)}</td>
                    <td className="px-3 py-4 font-black">{shortId(event.anonymous_id)}</td>
                    <td className="px-3 py-4 font-black">{event.event_name}</td>
                    <td className="px-3 py-4">{event.round_id ?? "—"}</td>
                    <td className="px-3 py-4">{event.value ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {data?.events.length === 0 ? (
              <p className="px-3 py-6 font-bold text-hbe-navy/65">아직 Classroom 이벤트가 없습니다.</p>
            ) : null}
          </section>
        </>
      ) : null}
    </section>
  );
}
