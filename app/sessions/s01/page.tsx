import Link from "next/link";
import { ChildHero } from "@/components/ui/ChildHero";
import { FeatureTile } from "@/components/ui/FeatureTile";
import { ModeShell } from "@/components/ui/ModeShell";

export default function S01SessionPage() {
  return (
    <ModeShell mode="child">
      <ChildHero
        sessionNumber={1}
        title="S, A, T"
        subtitle="소리의 문을 열고 첫 번째 버블을 만나봐요."
        theme="Origin"
        primaryHref="/game/s01"
      />

      <section className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <FeatureTile href="/theater/s01" label="Watch" subLabel="이야기로 먼저 만나기" action="P1 Theater" tone="sky" />
        <FeatureTile href="/game/s01" label="Play" subLabel="소리 듣고 버블 톡!" action="P2 Game" tone="cream" />
        <FeatureTile href="/singing/s01" label="Sing" subLabel="노래로 다시 반복하기" action="P3 Singing" tone="lilac" />
        <FeatureTile href="/mission/s01" label="Mission" subLabel="Worksheet와 카드 보기" action="P4 Mission" tone="peach" />
      </section>

      <section className="mt-8 rounded-[36px] bg-white/75 p-6 shadow-bubble">
        <p className="text-sm font-black uppercase tracking-wide text-hbe-green">For class</p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <Link className="hbe-focus rounded-full bg-white px-5 py-3 text-center font-black text-hbe-navy shadow-sm" href="/teacher/s01">
            Teacher Mode
          </Link>
          <Link className="hbe-focus rounded-full bg-white px-5 py-3 text-center font-black text-hbe-navy shadow-sm" href="/parent">
            Parent Review
          </Link>
          <Link className="hbe-focus rounded-full bg-white px-5 py-3 text-center font-black text-hbe-navy shadow-sm" href="/sessions">
            Back to Sessions
          </Link>
        </div>
      </section>
    </ModeShell>
  );
}
