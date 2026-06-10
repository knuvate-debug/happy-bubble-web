"use client";

import { useEffect, useState } from "react";
import { ActivityButton } from "@/components/ActivityButton";
import { PageShell } from "@/components/PageShell";
import { getAnonymousId } from "@/lib/anonymousId";

type Progress = {
  session_id: string;
  theater_viewed: boolean;
  singing_played: boolean;
  mission_opened: boolean;
  game_completed: boolean;
  total_correct: number;
  total_mistakes: number;
  last_played_at: string;
};

export default function ParentPage() {
  const [progress, setProgress] = useState<Progress[]>([]);
  const [configured, setConfigured] = useState<boolean | null>(null);

  useEffect(() => {
    const anonymousId = getAnonymousId();

    fetch(`/api/parent-summary?anonymousId=${encodeURIComponent(anonymousId)}`)
      .then((response) => response.json())
      .then((data) => {
        setConfigured(Boolean(data.configured));
        setProgress(data.progress ?? []);
      })
      .catch(() => {
        setConfigured(false);
        setProgress([]);
      });
  }, []);

  const s1Progress = progress.find((item) => item.session_id === "s01");

  return (
    <PageShell>
      <section className="hbe-card rounded-[40px] p-8">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-hbe-green">Parent Mode</p>
        <h1 className="mt-4 text-5xl font-black text-hbe-navy">Happy Bubble Review</h1>
        <p className="mt-4 max-w-2xl text-xl font-bold text-hbe-navy/70">
          오늘의 비눗방울을 집에서 다시 만나보세요.
        </p>
      </section>

      <section className="mt-8 hbe-card rounded-[32px] p-6">
        <p className="text-sm font-black text-hbe-green">Session 1</p>
        <h2 className="mt-2 text-3xl font-black text-hbe-navy">S, A, T</h2>
        <p className="mt-3 font-bold text-hbe-navy/70">
          노래를 한 번 듣고, 게임을 한 번 다시 해보세요. 집에서는 3분이면 충분합니다.
        </p>

        <div className="mt-5 rounded-[24px] bg-hbe-sky/70 p-4">
          {configured === null ? (
            <p className="font-bold text-hbe-navy/70">기록을 확인하고 있어요.</p>
          ) : configured === false ? (
            <p className="font-bold text-hbe-navy/70">
              Supabase가 아직 연결되지 않았어요. 그래도 복습 링크는 사용할 수 있습니다.
            </p>
          ) : s1Progress ? (
            <div className="grid gap-2 text-sm font-black text-hbe-navy sm:grid-cols-2">
              <p>Game: {s1Progress.game_completed ? "Done" : "Try again"}</p>
              <p>Theater: {s1Progress.theater_viewed ? "Viewed" : "Ready"}</p>
              <p>Singing: {s1Progress.singing_played ? "Played" : "Ready"}</p>
              <p>Mission: {s1Progress.mission_opened ? "Opened" : "Ready"}</p>
            </div>
          ) : (
            <p className="font-bold text-hbe-navy/70">
              아직 이 기기에서 활동 기록이 없어요. S1을 먼저 해보면 이곳에 표시됩니다.
            </p>
          )}
        </div>
      </section>

      <section className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <ActivityButton href="/theater/s01" label="Watch Theater" subLabel="영상 다시 보기" />
        <ActivityButton href="/game/s01" label="Play Game" subLabel="게임 다시 하기" />
        <ActivityButton href="/singing/s01" label="Sing Again" subLabel="노래 듣기" />
        <ActivityButton href="/mission/s01" label="Open Mission" subLabel="자료 보기" />
      </section>

      <section className="mt-8 hbe-card rounded-[32px] p-6">
        <h2 className="text-2xl font-black text-hbe-navy">Smart Report</h2>
        <p className="mt-3 font-bold text-hbe-navy/70">
          15개의 비눗방울 여정이 쌓이면 Smart Report가 열려요. 점수가 아니라, 아이가 다시 들어보면 좋은 소리와 활동 흐름을 알려드립니다.
        </p>
      </section>
    </PageShell>
  );
}
