import type { ClassroomSlide } from "@/lib/classroomSlides";

export function ClassroomVisual({ slide }: { slide: ClassroomSlide }) {
  if (slide.visualType === "video") {
    return (
      <div className="flex h-full min-h-[340px] items-center justify-center rounded-[44px] bg-black p-3 shadow-bubble">
        <video
          className="aspect-video w-full rounded-[32px] bg-black"
          controls
          playsInline
          src={slide.videoSrc}
        />
      </div>
    );
  }

  if (slide.visualType === "audio") {
    return (
      <div className="flex h-full min-h-[340px] flex-col items-center justify-center rounded-[44px] bg-hbe-sky p-8 text-center shadow-bubble">
        <div className="flex h-48 w-48 items-center justify-center rounded-full border-8 border-white/70 bg-hbe-cream shadow-bubble">
          <p className="text-5xl font-black text-hbe-navy">{slide.focusText}</p>
        </div>
        {slide.audioSrc ? (
          <audio className="mt-8 w-full max-w-lg" controls src={slide.audioSrc} />
        ) : null}
      </div>
    );
  }

  if (slide.visualType === "sound_focus") {
    return (
      <div className="flex h-full min-h-[340px] items-center justify-center rounded-[44px] bg-hbe-cream p-8 shadow-bubble">
        <div className="relative flex h-72 w-72 items-center justify-center rounded-full border-8 border-white bg-hbe-sky shadow-bubble">
          <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-hbe-gold/80" />
          <div className="absolute bottom-10 left-6 h-14 w-14 rounded-full bg-white/60" />
          <p className="relative text-9xl font-black text-hbe-navy">{slide.focusText}</p>
        </div>
      </div>
    );
  }

  if (slide.visualType === "word_build") {
    const parts = slide.focusText?.split(" · ") ?? [];
    return (
      <div className="flex h-full min-h-[340px] flex-col items-center justify-center rounded-[44px] bg-hbe-lilac p-8 shadow-bubble">
        <p className="text-sm font-black uppercase tracking-[0.2em] text-hbe-navy/55">Build the sound</p>
        <div className="mt-8 flex flex-wrap justify-center gap-5">
          {parts.map((part) => (
            <div key={part} className="flex h-36 w-36 items-center justify-center rounded-full bg-white/78 shadow-bubble">
              <p className="text-5xl font-black text-hbe-navy">{part}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (slide.visualType === "game") {
    return (
      <div className="flex h-full min-h-[340px] flex-col items-center justify-center rounded-[44px] bg-hbe-peach p-8 text-center shadow-bubble">
        <div className="flex h-56 w-56 items-center justify-center rounded-full bg-white/78 shadow-bubble">
          <p className="text-center text-4xl font-black text-hbe-navy">Listen<br />& Pop</p>
        </div>
        <p className="mt-6 text-xl font-black text-hbe-navy/70">소리를 듣고 버블을 톡!</p>
      </div>
    );
  }

  if (slide.visualType === "mission") {
    return (
      <div className="flex h-full min-h-[340px] flex-col items-center justify-center rounded-[44px] bg-white/78 p-8 shadow-bubble">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-[32px] bg-hbe-cream p-8 text-center shadow-sm">
            <p className="text-3xl font-black text-hbe-navy">Worksheet</p>
            <p className="mt-2 font-bold text-hbe-navy/60">손으로 확인하기</p>
          </div>
          <div className="rounded-[32px] bg-hbe-sky p-8 text-center shadow-sm">
            <p className="text-3xl font-black text-hbe-navy">Cards</p>
            <p className="mt-2 font-bold text-hbe-navy/60">소리 다시 보기</p>
          </div>
        </div>
      </div>
    );
  }

  if (slide.visualType === "goodbye") {
    return (
      <div className="flex h-full min-h-[340px] flex-col items-center justify-center rounded-[44px] bg-hbe-gold/85 p-8 text-center shadow-bubble">
        <div className="flex h-48 w-48 items-center justify-center rounded-full bg-white/75 shadow-bubble">
          <p className="text-5xl font-black text-hbe-navy">★</p>
        </div>
        <p className="mt-6 text-4xl font-black text-hbe-navy">Bubble Complete</p>
        {slide.audioSrc ? (
          <audio className="mt-8 w-full max-w-lg" controls src={slide.audioSrc} />
        ) : null}
      </div>
    );
  }

  return (
    <div className="flex h-full min-h-[340px] items-center justify-center rounded-[44px] bg-hbe-sky p-8 shadow-bubble">
      <div className="text-center">
        <p className="text-sm font-black uppercase tracking-[0.2em] text-hbe-green">Happy Bubble</p>
        <p className="mt-4 text-7xl font-black text-hbe-navy">{slide.focusText}</p>
      </div>
    </div>
  );
}
