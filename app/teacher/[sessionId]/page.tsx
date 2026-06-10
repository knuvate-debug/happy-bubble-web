import Link from "next/link";
import { notFound } from "next/navigation";
import { ComingSoonCard } from "@/components/ComingSoonCard";
import { PageShell } from "@/components/PageShell";
import { ModeShell } from "@/components/ui/ModeShell";
import { PageTitle } from "@/components/ui/PageTitle";
import { TeacherStepCard } from "@/components/ui/TeacherStepCard";
import { teacherFlows } from "@/lib/teacherFlows";
import { getSession } from "@/lib/sessions";

export default function TeacherSessionPage({
  params,
  searchParams
}: {
  params: { sessionId: string };
  searchParams?: { preview?: string };
}) {
  const session = getSession(params.sessionId);
  if (!session) notFound();

  const isPreview = searchParams?.preview === "true";
  const flow = teacherFlows[params.sessionId];

  if (session.status !== "open" && !isPreview) {
    return (
      <PageShell narrow>
        <ComingSoonCard title={`Teacher Mode · ${session.title}`} />
      </PageShell>
    );
  }

  if (!flow) {
    return (
      <PageShell narrow>
        <section className="hbe-card rounded-[40px] p-8 text-center">
          <h1 className="text-4xl font-black text-hbe-navy">Teacher flow not found</h1>
        </section>
      </PageShell>
    );
  }

  return (
    <ModeShell mode="teacher">
      <section className="rounded-[44px] bg-white/78 p-8 shadow-bubble">
        <PageTitle
          eyebrow={`Teacher Mode ${isPreview ? "· Preview" : ""}`}
          title={`Session ${session.number} · ${flow.title}`}
          description={`Total time: ${flow.totalTime}. 단계별 실행 버튼과 백업 플랜을 확인합니다.`}
        />
      </section>

      <section className="mt-8 grid gap-5 lg:grid-cols-2">
        {flow.steps.map((step) => (
          <TeacherStepCard key={step.id} step={step} isPreview={isPreview} />
        ))}
      </section>

      <section className="mt-8 flex flex-wrap gap-3">
        <Link className="hbe-focus rounded-full bg-white px-5 py-3 font-black text-hbe-navy shadow-bubble" href={`/sessions/${params.sessionId}`}>
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
