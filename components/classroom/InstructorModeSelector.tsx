"use client";

import Link from "next/link";
import { instructorModes, type InstructorModeId } from "@/lib/instructorModes";

export function InstructorModeSelector({
  currentMode,
  baseHref,
  compact = false
}: {
  currentMode: InstructorModeId;
  baseHref: string;
  compact?: boolean;
}) {
  return (
    <section className={compact ? "space-y-2" : "rounded-[32px] bg-white/78 p-5 shadow-bubble"}>
      {!compact ? (
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-hbe-green">
            Instructor Mode
          </p>
          <p className="mt-2 text-sm font-bold text-hbe-navy/60">
            강사 유형에 맞는 진행 노트를 선택하세요.
          </p>
        </div>
      ) : null}

      <div className={compact ? "flex flex-wrap gap-2" : "mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4"}>
        {instructorModes.map((mode) => {
          const active = mode.id === currentMode;
          const href = `${baseHref}?mode=${mode.id}`;

          return (
            <Link
              key={mode.id}
              href={href}
              className={`hbe-focus rounded-[24px] p-4 transition ${
                active
                  ? "bg-hbe-green text-white shadow-bubble"
                  : "bg-hbe-bg text-hbe-navy hover:bg-hbe-cream"
              }`}
            >
              <p className={`text-base font-black ${active ? "text-white" : "text-hbe-navy"}`}>
                {mode.shortLabel}
              </p>
              {!compact ? (
                <>
                  <p className={`mt-2 text-xs font-black uppercase tracking-wide ${active ? "text-white/72" : "text-hbe-green"}`}>
                    {mode.languageGuide}
                  </p>
                  <p className={`mt-2 text-sm font-bold ${active ? "text-white/76" : "text-hbe-navy/62"}`}>
                    {mode.description}
                  </p>
                </>
              ) : null}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
