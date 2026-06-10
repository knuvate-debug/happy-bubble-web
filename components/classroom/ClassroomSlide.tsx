import type { ClassroomDeck, ClassroomSlide as ClassroomSlideType } from "@/lib/classroomSlides";
import type { InstructorModeId } from "@/lib/instructorModes";
import { ClassroomVisual } from "./ClassroomVisual";
import { InstructorNotePanel } from "./InstructorNotePanel";
import { SlideActionButton } from "./SlideActionButton";

export function ClassroomSlide({
  deck,
  slide,
  currentIndex,
  instructorMode = "korean"
}: {
  deck: ClassroomDeck;
  slide: ClassroomSlideType;
  currentIndex: number;
  instructorMode?: InstructorModeId;
}) {
  return (
    <section className="grid min-h-[calc(100vh-180px)] gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-stretch">
      <aside className="flex flex-col justify-between rounded-[44px] bg-white/78 p-7 shadow-bubble">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.22em] text-hbe-green">
            {deck.subtitle}
          </p>
          <p className="mt-3 text-sm font-black text-hbe-navy/50">
            Slide {currentIndex + 1} / {deck.slides.length}
          </p>
          <h1 className="mt-5 text-5xl font-black leading-tight text-hbe-navy">
            {slide.title}
          </h1>
          <p className="mt-4 text-2xl font-black text-hbe-navy/72">
            {slide.subtitle}
          </p>

          <div className="mt-8">
            <InstructorNotePanel slide={slide} mode={instructorMode} />
          </div>
        </div>

        {slide.actions?.length ? (
          <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col">
            {slide.actions.map((action) => (
              <SlideActionButton key={`${slide.id}-${action.label}`} action={action} />
            ))}
          </div>
        ) : null}
      </aside>

      <ClassroomVisual slide={slide} />
    </section>
  );
}
