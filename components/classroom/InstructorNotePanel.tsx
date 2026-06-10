import type { ClassroomSlide } from "@/lib/classroomSlides";
import { getInstructorMode, type InstructorModeId } from "@/lib/instructorModes";

export function InstructorNotePanel({
  slide,
  mode
}: {
  slide: ClassroomSlide;
  mode: InstructorModeId;
}) {
  const selectedMode = getInstructorMode(mode);
  const note = slide.teacherNotes?.[mode] ?? slide.teacherNote;

  return (
    <div className="rounded-[32px] bg-hbe-cream p-6">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
        <div>
          <p className="text-xs font-black uppercase tracking-wide text-hbe-navy/50">
            {selectedMode.label}
          </p>
          <p className="mt-1 text-xs font-black text-hbe-green">
            {selectedMode.languageGuide}
          </p>
        </div>
        <span className="rounded-full bg-white/70 px-3 py-1 text-xs font-black text-hbe-navy">
          {selectedMode.bestFor}
        </span>
      </div>
      <p className="mt-4 text-lg font-bold leading-relaxed text-hbe-navy/78">
        {note}
      </p>
    </div>
  );
}
