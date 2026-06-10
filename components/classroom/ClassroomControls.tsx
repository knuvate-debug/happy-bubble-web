export function ClassroomControls({
  currentIndex,
  total,
  onPrev,
  onNext,
  onFullscreen,
  onComplete
}: {
  currentIndex: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  onFullscreen: () => void;
  onComplete: () => void;
}) {
  return (
    <div className="mt-5 flex flex-col gap-3 rounded-[32px] bg-white/72 p-4 shadow-bubble sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <button
          onClick={onPrev}
          disabled={currentIndex === 0}
          className="hbe-focus rounded-full bg-white px-5 py-3 font-black text-hbe-navy shadow-sm disabled:opacity-40"
        >
          Back
        </button>
        <button
          onClick={onNext}
          disabled={currentIndex === total - 1}
          className="hbe-focus rounded-full bg-hbe-green px-5 py-3 font-black text-white shadow-sm disabled:opacity-40"
        >
          Next
        </button>
      </div>

      <div className="flex items-center gap-3">
        <div className="rounded-full bg-hbe-sky px-4 py-2 text-sm font-black text-hbe-navy">
          {currentIndex + 1} / {total}
        </div>
        <button
          onClick={onComplete}
          className="hbe-focus rounded-full bg-hbe-gold px-5 py-3 font-black text-hbe-navy shadow-sm"
        >
          Complete
        </button>
        <button
          onClick={onFullscreen}
          className="hbe-focus rounded-full bg-hbe-navy px-5 py-3 font-black text-white shadow-sm"
        >
          Fullscreen
        </button>
      </div>
    </div>
  );
}
