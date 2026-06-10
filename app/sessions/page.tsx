import Link from "next/link";
import { BubbleJourneyMap } from "@/components/student/BubbleJourneyMap";
import { BubbleStatusLegend } from "@/components/student/BubbleStatusLegend";
import { ModeShell } from "@/components/ui/ModeShell";
import { sessions } from "@/lib/sessions";

export default function SessionsPage() {
  return (
    <ModeShell mode="child">
      <section className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.22em] text-hbe-green">
            Happy Bubble English
          </p>
          <h1 className="mt-3 text-4xl font-black text-hbe-navy sm:text-5xl">
            Bubble Journey
          </h1>
        </div>
        <Link
          href="/sessions/s01"
          className="hbe-focus inline-flex rounded-full bg-hbe-green px-6 py-4 text-center font-black text-white shadow-bubble transition hover:-translate-y-1"
        >
          Start Today’s Bubble
        </Link>
      </section>

      <BubbleJourneyMap sessions={sessions} />

      <div className="mt-8">
        <BubbleStatusLegend />
      </div>

      <section className="mt-8 flex flex-col gap-3 rounded-[32px] bg-white/65 p-5 shadow-bubble sm:flex-row">
        <Link className="hbe-focus rounded-full bg-white px-5 py-3 text-center font-black text-hbe-navy shadow-sm" href="/teacher/s01">
          Teacher Bubble Board
        </Link>
        <Link className="hbe-focus rounded-full bg-white px-5 py-3 text-center font-black text-hbe-navy shadow-sm" href="/parent">
          Home Bubble
        </Link>
      </section>
    </ModeShell>
  );
}
