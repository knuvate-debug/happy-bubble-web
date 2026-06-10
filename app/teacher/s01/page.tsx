import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { teacherFlows } from "@/lib/teacherFlows";

export default function TeacherS01Page() {
  const flow = teacherFlows.s01;

  return (
    <PageShell>
      <section className="hbe-card rounded-[40px] p-8">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-hbe-green">Teacher Mode</p>
        <h1 className="mt-4 text-5xl font-black text-hbe-navy">Session 1 · {flow.title}</h1>
        <p className="mt-4 text-xl font-bold text-hbe-navy/70">Total time: {flow.totalTime}</p>
      </section>

      <section className="mt-8 grid gap-5 lg:grid-cols-2">
        {flow.steps.map((step) => (
          <article key={step.id} className="hbe-card rounded-[32px] p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-black text-hbe-green">Step {step.order}</p>
                <h2 className="mt-2 text-2xl font-black text-hbe-navy">{step.title}</h2>
                <p className="mt-1 text-sm font-black text-hbe-navy/55">{step.time}</p>
              </div>
              <span className="rounded-full bg-hbe-cream px-4 py-2 text-sm font-black text-hbe-navy">Now</span>
            </div>
            <p className="mt-4 font-bold text-hbe-navy/75">{step.teacherPrompt}</p>
            <p className="mt-3 rounded-[22px] bg-hbe-sky/70 p-4 text-sm font-bold text-hbe-navy/65">
              Backup: {step.backup}
            </p>
            <Link
              href={step.href}
              className="hbe-focus mt-5 inline-flex rounded-full bg-hbe-green px-5 py-3 font-black text-white shadow-bubble"
            >
              {step.buttonLabel}
            </Link>
          </article>
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
    </PageShell>
  );
}
