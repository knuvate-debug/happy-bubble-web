"use client";

import { useEffect, useState } from "react";
import { ModeShell } from "@/components/ui/ModeShell";
import { PageTitle } from "@/components/ui/PageTitle";
import { ParentReviewCard } from "@/components/ui/ParentReviewCard";
import { ProgressPill } from "@/components/ui/ProgressPill";
import { Button } from "@/components/ui/Button";
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
    <ModeShell mode="parent">
      <section className="rounded-[48px] bg-white/80 p-8 shadow-bubble">
        <PageTitle
          eyebrow="Parent Mode"
          title="Happy Bubble Home Review"
          description="집에서는 길게 하지 않아도 됩니다. 오늘 만난 버블을 3분만 다시 열어보세요."
        />

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px] lg:items-stretch">
          <div className="rounded-[36px] bg-hbe-sky/75 p-6">
            <p className="text-sm font-black uppercase tracking-wide text-hbe-green">Today&apos;s Bubble</p>
            <h2 className="mt-3 text-5xl font-black text-hbe-navy">S, A, T</h2>
            <p className="mt-4 text-lg font-bold text-hbe-navy/70">
              오늘은 소리를 듣고 같은 버블을 고르는 활동을 했어요. 집에서는 정답보다 “다시 듣기” 경험이 더 중요합니다.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <ProgressPill label="Theater" active={Boolean(s1Progress?.theater_viewed)} />
              <ProgressPill label="Game" active={Boolean(s1Progress?.game_completed)} />
              <ProgressPill label="Singing" active={Boolean(s1Progress?.singing_played)} />
              <ProgressPill label="Mission" active={Boolean(s1Progress?.mission_opened)} />
            </div>
          </div>

          <div className="rounded-[36px] bg-hbe-cream p-6">
            <p className="text-sm font-black uppercase tracking-wide text-hbe-navy/55">Review Guide</p>
            <h3 className="mt-3 text-2xl font-black text-hbe-navy">오늘은 이렇게 해주세요</h3>
            <ol className="mt-4 space-y-3 text-sm font-bold text-hbe-navy/72">
              <li>1. Game을 한 번 다시 열어주세요.</li>
              <li>2. Listen을 아이가 직접 눌러보게 해주세요.</li>
              <li>3. 틀려도 바로 정답을 말하지 말고 다시 듣게 해주세요.</li>
              <li>4. 마지막에 Singing을 짧게 들어주세요.</li>
            </ol>
          </div>
        </div>

        {configured === false ? (
          <div className="mt-6 rounded-[28px] bg-hbe-lilac/75 p-5">
            <h3 className="text-xl font-black text-hbe-navy">기록 연결 전입니다</h3>
            <p className="mt-2 font-bold text-hbe-navy/70">
              Supabase가 아직 연결되지 않아 활동 기록은 표시되지 않을 수 있습니다. 복습 링크는 정상적으로 사용할 수 있습니다.
            </p>
          </div>
        ) : null}
      </section>

      <section className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <ParentReviewCard
          title="Watch"
          description="짧은 이야기로 S, A, T 소리를 다시 만나요."
          href="/theater/s01"
          action="Theater"
          tone="info"
        />
        <ParentReviewCard
          title="Play"
          description="소리를 듣고 맞는 버블을 터치해요."
          href="/game/s01"
          action="Game"
          tone="open"
        />
        <ParentReviewCard
          title="Sing"
          description="노래로 소리를 부담 없이 반복해요."
          href="/singing/s01"
          action="Singing"
          tone="soon"
        />
        <ParentReviewCard
          title="Mission"
          description="Worksheet와 Flash Cards를 확인해요."
          href="/mission/s01"
          action="Mission"
          tone="ready"
        />
      </section>

      <section className="mt-8 rounded-[40px] bg-white/78 p-7 shadow-bubble">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-wide text-hbe-green">Smart Report</p>
            <h2 className="mt-2 text-3xl font-black text-hbe-navy">아직은 준비 단계입니다</h2>
            <p className="mt-2 max-w-2xl font-bold text-hbe-navy/68">
              15개의 비눗방울 여정이 쌓이면, 점수가 아니라 아이가 다시 들어보면 좋은 소리와 활동 흐름을 알려드립니다.
            </p>
          </div>
          <Button href="/report/s15" variant="soft">
            View Report
          </Button>
        </div>
      </section>
      <section className="mt-8">
        <GameReportPanel sessionId="s01" audience="parent" />
      </section>
    </ModeShell>
  );
}
