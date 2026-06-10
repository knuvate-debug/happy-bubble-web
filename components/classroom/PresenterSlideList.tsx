import type { ClassroomDeck } from "@/lib/classroomSlides";

export function PresenterSlideList({
  deck,
  currentIndex,
  onSelect
}: {
  deck: ClassroomDeck;
  currentIndex: number;
  onSelect: (index: number) => void;
}) {
  return (
    <section className="rounded-[32px] bg-white/80 p-4 shadow-bubble">
      <p className="px-2 text-xs font-black uppercase tracking-[0.18em] text-hbe-green">
        Slide Overview
      </p>
      <div className="mt-4 max-h-[560px] space-y-2 overflow-y-auto pr-1">
        {deck.slides.map((slide, index) => {
          const active = index === currentIndex;
          return (
            <button
              key={slide.id}
              onClick={() => onSelect(index)}
              className={`hbe-focus w-full rounded-[24px] p-4 text-left transition ${
                active ? "bg-hbe-green text-white shadow-bubble" : "bg-hbe-bg text-hbe-navy hover:bg-hbe-cream"
              }`}
            >
              <p className={`text-xs font-black ${active ? "text-white/80" : "text-hbe-green"}`}>
                Slide {index + 1}
              </p>
              <p className="mt-1 text-base font-black">{slide.title}</p>
              <p className={`mt-1 line-clamp-2 text-xs font-bold ${active ? "text-white/72" : "text-hbe-navy/58"}`}>
                {slide.subtitle}
              </p>
            </button>
          );
        })}
      </div>
    </section>
  );
}
