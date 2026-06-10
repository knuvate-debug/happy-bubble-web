import Link from "next/link";
import type { TeacherStep } from "@/lib/types";
import { Badge } from "./Badge";

export function TeacherStepCard({
  step,
  isPreview = false
}: {
  step: TeacherStep;
  isPreview?: boolean;
}) {
  return (
    <article className="hbe-card rounded-[32px] p-6 transition hover:-translate-y-1">
      <div className="flex items-start justify-between gap-4">
        <div>
          <Badge tone={isPreview ? "ready" : "info"}>Step {step.order}</Badge>
          <h2 className="mt-3 text-2xl font-black text-hbe-navy">{step.title}</h2>
          <p className="mt-1 text-sm font-black text-hbe-navy/55">{step.time}</p>
        </div>
        <Badge tone={isPreview ? "soon" : "open"}>{isPreview ? "Preview" : "Now"}</Badge>
      </div>

      <div className="mt-5 rounded-[24px] bg-hbe-cream/75 p-4">
        <p className="text-xs font-black uppercase tracking-wide text-hbe-navy/50">Teacher Prompt</p>
        <p className="mt-2 font-bold text-hbe-navy/78">{step.teacherPrompt}</p>
      </div>

      <div className="mt-4 rounded-[24px] bg-hbe-sky/70 p-4">
        <p className="text-xs font-black uppercase tracking-wide text-hbe-navy/50">Backup Plan</p>
        <p className="mt-2 text-sm font-bold text-hbe-navy/68">{step.backup}</p>
      </div>

      <Link
        href={step.href}
        className="hbe-focus mt-5 inline-flex w-full justify-center rounded-full bg-hbe-green px-5 py-4 text-center font-black text-white shadow-bubble transition hover:-translate-y-1"
      >
        {step.buttonLabel}
      </Link>
    </article>
  );
}
