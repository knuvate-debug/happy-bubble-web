import Link from "next/link";
import { PageTitle } from "@/components/ui/PageTitle";
import { TeacherStepCard } from "@/components/ui/TeacherStepCard";
import { ModeShell } from "@/components/ui/ModeShell";
import { teacherFlows } from "@/lib/teacherFlows";

export default function TeacherS01Page() {
  const flow = teacherFlows.s01;

  return (
    <ModeShell mode="teacher">
      <section className="rounded-[44px] bg-white/78 p-8 shadow-bubble">
        <PageTitle
          eyebrow="Teacher Mode"
          title={`Session 1 · ${flow.title}`}
          description={`Total time: ${flow.totalTime}. 수업 중 바로 누를 수 있도록 단계별 실행 버튼과 백업 플랜을 정리했습니다.`}
        />
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
