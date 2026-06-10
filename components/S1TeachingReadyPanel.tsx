"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { s1ClassroomRunbook } from "@/lib/s1TeachingReady";

type AssetItem = {
  id: string;
  title: string;
  description: string;
  filePath: string;
  required: boolean;
  exists: boolean;
};

type RouteItem = {
  id: string;
  title: string;
  description: string;
  route: string;
  group: string;
};

type ReadyResponse = {
  ok: boolean;
  sessionId: string;
  ready: boolean;
  assets: AssetItem[];
  routes: RouteItem[];
  summary: {
    requiredAssets: number;
    missingRequiredAssets: number;
    routeChecks: number;
  };
};

export function S1TeachingReadyPanel() {
  const [data, setData] = useState<ReadyResponse | null>(null);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      const response = await fetch("/api/s1-teaching-ready", { cache: "no-store" });
      const json = (await response.json()) as ReadyResponse;
      setData(json);
    } catch {
      setData(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  const ready = Boolean(data?.ready);

  return (
    <section className="space-y-7">
      <header className="rounded-[48px] bg-white/78 p-7 shadow-bubble">
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-hbe-green">
              S1 Teaching Ready
            </p>
            <h1 className="mt-3 text-5xl font-black text-hbe-navy">
              Session 1 수업 준비 상태
            </h1>
            <p className="mt-3 max-w-3xl text-lg font-bold text-hbe-navy/68">
              S1을 실제 수업에 사용할 수 있는지 Classroom, Game, Report, Asset 상태를 한 번에 확인합니다.
            </p>
          </div>
          <div className={`rounded-[32px] p-6 text-center shadow-bubble ${ready ? "bg-hbe-green text-white" : "bg-hbe-gold/80 text-hbe-navy"}`}>
            <p className="text-xs font-black uppercase tracking-wide opacity-75">Status</p>
            <p className="mt-2 text-3xl font-black">{ready ? "Ready" : "Assets Needed"}</p>
            <p className="mt-1 text-sm font-bold opacity-80">
              {data ? `${data.summary.missingRequiredAssets} missing` : "checking"}
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            onClick={load}
            className="hbe-focus rounded-full bg-hbe-green px-5 py-3 font-black text-white shadow-bubble"
          >
            Refresh
          </button>
          <Link href="/teacher/s01" className="hbe-focus rounded-full bg-white px-5 py-3 font-black text-hbe-navy shadow-bubble">
            Teacher Board
          </Link>
          <Link href="/classroom/s01/presenter?mode=korean" className="hbe-focus rounded-full bg-hbe-cream px-5 py-3 font-black text-hbe-navy shadow-bubble">
            Presenter
          </Link>
          <Link href="/game/s01" className="hbe-focus rounded-full bg-white px-5 py-3 font-black text-hbe-navy shadow-bubble">
            Game Pack
          </Link>
        </div>
      </header>

      {loading ? (
        <section className="hbe-card rounded-[36px] p-6">
          <p className="font-bold text-hbe-navy/70">S1 준비 상태를 확인하고 있어요.</p>
        </section>
      ) : null}

      <section className="grid gap-5 xl:grid-cols-[1fr_380px]">
        <div className="rounded-[40px] bg-white/78 p-6 shadow-bubble">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-hbe-green">
            Required S1 Assets
          </p>
          <div className="mt-5 grid gap-3">
            {(data?.assets ?? []).map((asset) => (
              <article key={asset.id} className="flex flex-col justify-between gap-3 rounded-[26px] bg-hbe-bg p-4 sm:flex-row sm:items-center">
                <div>
                  <h2 className="text-lg font-black text-hbe-navy">{asset.title}</h2>
                  <p className="mt-1 text-sm font-bold text-hbe-navy/60">{asset.description}</p>
                  <p className="mt-1 text-xs font-bold text-hbe-navy/42">{asset.filePath}</p>
                </div>
                <span className={`rounded-full px-4 py-2 text-sm font-black ${asset.exists ? "bg-hbe-green text-white" : "bg-hbe-gold text-hbe-navy"}`}>
                  {asset.exists ? "Ready" : "Missing"}
                </span>
              </article>
            ))}
          </div>
        </div>

        <aside className="rounded-[40px] bg-hbe-cream p-6 shadow-bubble">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-hbe-navy/55">
            Decision
          </p>
          <p className="mt-4 text-xl font-black leading-relaxed text-hbe-navy">
            {ready
              ? "S1 필수 asset이 모두 확인되었습니다. 이제 Vercel Preview에서 실제 기기 수업 검수를 진행하세요."
              : "코드와 수업 흐름은 준비되었습니다. 실제 수업 전에는 missing으로 표시된 S1 영상·음원·PDF 파일을 넣어야 합니다."}
          </p>
          <div className="mt-6 rounded-[24px] bg-white/70 p-4">
            <p className="text-xs font-black uppercase tracking-wide text-hbe-navy/50">
              Required before real class
            </p>
            <p className="mt-2 text-sm font-bold text-hbe-navy/70">
              Bubble Theater mp4, Hello/S1/Goodbye mp3, Worksheet PDF, Flashcards PDF
            </p>
          </div>
        </aside>
      </section>

      <section className="rounded-[40px] bg-white/78 p-6 shadow-bubble">
        <p className="text-sm font-black uppercase tracking-[0.18em] text-hbe-green">
          S1 Classroom Runbook
        </p>
        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          {s1ClassroomRunbook.map((step) => (
            <article key={step.step} className="rounded-[28px] bg-hbe-bg p-5">
              <p className="text-xs font-black text-hbe-green">Step {step.step} · {step.time}</p>
              <h2 className="mt-2 text-2xl font-black text-hbe-navy">{step.title}</h2>
              <p className="mt-2 text-sm font-bold leading-relaxed text-hbe-navy/68">
                {step.teacherAction}
              </p>
              <Link href={step.route} className="mt-4 inline-flex rounded-full bg-white px-4 py-2 text-sm font-black text-hbe-navy shadow-sm">
                Open
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-[40px] bg-white/78 p-6 shadow-bubble">
        <p className="text-sm font-black uppercase tracking-[0.18em] text-hbe-green">
          Required Screens
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {(data?.routes ?? []).map((route) => (
            <Link
              key={route.id}
              href={route.route}
              className="hbe-focus rounded-[28px] bg-hbe-bg p-5 transition hover:-translate-y-1 hover:bg-hbe-cream"
            >
              <p className="text-xs font-black uppercase tracking-wide text-hbe-green">{route.group}</p>
              <h2 className="mt-2 text-xl font-black text-hbe-navy">{route.title}</h2>
              <p className="mt-2 text-sm font-bold text-hbe-navy/62">{route.description}</p>
              <p className="mt-3 text-xs font-black text-hbe-navy/42">{route.route}</p>
            </Link>
          ))}
        </div>
      </section>
    </section>
  );
}
