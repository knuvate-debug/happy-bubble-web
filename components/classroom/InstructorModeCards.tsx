import Link from "next/link";
import { instructorModes } from "@/lib/instructorModes";

export function InstructorModeCards({ hrefBase = "/classroom/s01/presenter" }: { hrefBase?: string }) {
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {instructorModes.map((mode) => (
        <Link
          key={mode.id}
          href={`${hrefBase}?mode=${mode.id}`}
          className="hbe-focus rounded-[34px] bg-white/78 p-6 shadow-bubble transition hover:-translate-y-1 hover:bg-hbe-cream"
        >
          <p className="text-sm font-black uppercase tracking-[0.18em] text-hbe-green">
            {mode.shortLabel}
          </p>
          <h3 className="mt-3 text-2xl font-black text-hbe-navy">{mode.label}</h3>
          <p className="mt-3 text-sm font-bold leading-relaxed text-hbe-navy/64">
            {mode.description}
          </p>
          <p className="mt-5 rounded-full bg-hbe-sky px-4 py-2 text-xs font-black text-hbe-navy">
            {mode.languageGuide}
          </p>
        </Link>
      ))}
    </section>
  );
}
