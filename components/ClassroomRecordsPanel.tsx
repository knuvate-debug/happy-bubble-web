"use client";

import { useEffect, useState } from "react";

type ClassroomEvent = {
  id: string;
  anonymous_id: string;
  session_id: string;
  event_name: string;
  round_id: string | null;
  value: string | null;
  created_at: string;
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

export function ClassroomRecordsPanel() {
  const [configured, setConfigured] = useState<boolean | null>(null);
  const [events, setEvents] = useState<ClassroomEvent[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      const response = await fetch("/api/classroom-summary", { cache: "no-store" });
      const data = await response.json();
      setConfigured(Boolean(data.configured));
      setEvents(data.classroomEvents ?? []);
    } catch {
      setConfigured(false);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <section className="mt-8 hbe-card rounded-[40px] p-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.2em] text-hbe-green">
            Classroom Records
          </p>
          <h2 className="mt-2 text-3xl font-black text-hbe-navy">Classroom Event Log</h2>
          <p className="mt-2 font-bold text-hbe-navy/65">
            Classroom Deck, Presenter View, Timer 이벤트를 확인합니다.
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
        <p className="mt-6 font-bold text-hbe-navy/70">Classroom 기록을 불러오고 있어요.</p>
      ) : null}

      {!loading && configured === false ? (
        <div className="mt-6 rounded-[24px] bg-hbe-cream p-5">
          <h3 className="text-xl font-black text-hbe-navy">Supabase not configured</h3>
          <p className="mt-2 font-bold text-hbe-navy/70">
            Supabase 환경변수가 없어 Classroom 이벤트는 저장되지 않습니다.
          </p>
        </div>
      ) : null}

      {!loading && configured ? (
        <div className="mt-6 overflow-x-auto rounded-[32px] bg-white/80 p-4 shadow-bubble">
          <table className="w-full min-w-[900px] border-separate border-spacing-y-3 text-left">
            <thead>
              <tr className="text-xs font-black uppercase tracking-wide text-hbe-navy/55">
                <th className="px-3">Time</th>
                <th className="px-3">User</th>
                <th className="px-3">Session</th>
                <th className="px-3">Event</th>
                <th className="px-3">Slide</th>
                <th className="px-3">Value</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.id} className="bg-hbe-bg">
                  <td className="px-3 py-4 text-sm">{formatTime(event.created_at)}</td>
                  <td className="px-3 py-4 font-black">{shortId(event.anonymous_id)}</td>
                  <td className="px-3 py-4 font-black">{event.session_id}</td>
                  <td className="px-3 py-4 font-black">{event.event_name}</td>
                  <td className="px-3 py-4">{event.round_id ?? "—"}</td>
                  <td className="px-3 py-4">{event.value ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {!events.length ? (
            <p className="px-3 py-6 font-bold text-hbe-navy/65">아직 Classroom 이벤트가 없습니다.</p>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
