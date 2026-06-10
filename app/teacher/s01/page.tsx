import Link from "next/link";
import { PageTitle } from "@/components/ui/PageTitle";
import { TeacherStepCard } from "@/components/ui/TeacherStepCard";
import { InstructorModeCards } from "@/components/classroom/InstructorModeCards";
import { ModeShell } from "@/components/ui/ModeShell";
import { teacherFlows } from "@/lib/teacherFlows";

export default function TeacherS01Page() {
  const flow = teacherFlows.s01;

  return (
    <ModeShell mode="teacher">
      <section className="rounded-[44px] bg-white/78 p-8 shadow-bubble">
        <PageTitle
          eyebrow="Teacher Bubble Board"
          title={`Session 1 · ${flow.title}`}
          description={`Total time: ${flow.totalTime}. 수업 중 바로 누를 수 있도록 단계별 실행 버튼과 백업 플랜을 정리했습니다.`}
        />
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/classroom/s01?mode=korean"
            className="hbe-focus inline-flex rounded-full bg-hbe-green px-6 py-4 font-black text-white shadow-bubble transition hover:-translate-y-1"
          >
            Open Classroom Mode
          </Link>
          <Link
            href="/classroom/s01/presenter?mode=korean"
            className="hbe-focus inline-flex rounded-full bg-hbe-cream px-6 py-4 font-black text-hbe-navy shadow-bubble transition hover:-translate-y-1"
          >
            Presenter View
          </Link>
          <Link
            href="/teacher/report/s01"
            className="hbe-focus inline-flex rounded-full bg-white px-6 py-4 font-black text-hbe-navy shadow-bubble transition hover:-translate-y-1"
          >
            Classroom Report
          </Link>
          <Link
            href="/teacher/game-report/s01"
            className="hbe-focus inline-flex rounded-full bg-white px-6 py-4 font-black text-hbe-navy shadow-bubble transition hover:-translate-y-1"
          >
            Game Report
          </Link>
          <Link
            href="/teacher/s1-ready"
            className="hbe-focus inline-flex rounded-full bg-hbe-gold px-6 py-4 font-black text-hbe-navy shadow-bubble transition hover:-translate-y-1"
          >
            S1 Teaching Ready
          </Link>
          <Link
            href="/teacher/s1-assets"
            className="hbe-focus inline-flex rounded-full bg-white px-6 py-4 font-black text-hbe-navy shadow-bubble transition hover:-translate-y-1"
          >
            S1 Asset Guide
          </Link>
          <Link
            href="/sessions/s01"
            className="hbe-focus inline-flex rounded-full bg-white px-6 py-4 font-black text-hbe-navy shadow-bubble transition hover:-translate-y-1"
          >
            Today’s Bubble
          </Link>
        </div>
      </section>

      <section className="mt-8 grid gap-5 lg:grid-cols-2">
        {flow.steps.map((step) => (
          <TeacherStepCard key={step.id} step={step} />
        ))}
      </section>

      <section className="mt-8 flex flex-wrap gap-3">
        <Link className="hbe-focus rounded-full bg-white px-5 py-3 font-black text-hbe-navy shadow-bubble" href="/sessions/s01">
          Student Session
        </Link>
        <Link className="hbe-focus rounded-full bg-white px-5 py-3 font-black text-hbe-navy shadow-bubble" href="/parent">
          Parent Review
        </Link>
        <Link className="hbe-focus rounded-full bg-white px-5 py-3 font-black text-hbe-navy shadow-bubble" href="/admin">
          Admin Check
        </Link>
      </section>
    </ModeShell>
  );
}
