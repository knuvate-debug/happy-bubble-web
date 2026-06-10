import Link from "next/link";
import { ActivityBubbleGrid } from "@/components/student/ActivityBubbleGrid";
import { TodayBubbleHero } from "@/components/student/TodayBubbleHero";
import { ModeShell } from "@/components/ui/ModeShell";

export default function S01SessionPage() {
  return (
    <ModeShell mode="child">
      <TodayBubbleHero
        title="S, A, T"
        subtitle="소리의 문을 열고 첫 번째 버블을 만나봐요."
        theme="Origin"
        primaryHref="/game/s01"
      />

      <div className="mt-8">
        <ActivityBubbleGrid />
      </div>

      <section className="mt-8 rounded-[36px] bg-white/75 p-6 shadow-bubble">
        <p className="text-sm font-black uppercase tracking-wide text-hbe-green">
          Bubble Links
        </p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <Link className="hbe-focus rounded-full bg-white px-5 py-3 text-center font-black text-hbe-navy shadow-sm" href="/teacher/s01">
            Teacher Bubble Board
          </Link>
          <Link className="hbe-focus rounded-full bg-white px-5 py-3 text-center font-black text-hbe-navy shadow-sm" href="/parent">
            Home Bubble
          </Link>
          <Link className="hbe-focus rounded-full bg-white px-5 py-3 text-center font-black text-hbe-navy shadow-sm" href="/sessions">
            Back to Journey
          </Link>
        </div>
      </section>
    </ModeShell>
  );
}
