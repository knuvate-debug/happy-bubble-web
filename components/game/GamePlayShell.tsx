import Link from "next/link";
import type { GamePackItem } from "@/game/data/gamePacks";

export function GamePlayShell({
  game,
  children
}: {
  game: GamePackItem;
  children: React.ReactNode;
}) {
  return (
    <main className="hbe-page min-h-screen p-4 sm:p-6">
      <header className="mb-5 rounded-[40px] bg-white/78 p-5 shadow-bubble">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-hbe-green">
              S1 Game Pack
            </p>
            <h1 className="mt-2 text-4xl font-black text-hbe-navy">{game.title}</h1>
            <p className="mt-2 text-base font-bold text-hbe-navy/65">{game.description}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/game/s01"
              className="hbe-focus rounded-full bg-white px-5 py-3 text-sm font-black text-hbe-navy shadow-sm"
            >
              Game Pack
            </Link>
            <Link
              href="/sessions/s01"
              className="hbe-focus rounded-full bg-hbe-cream px-5 py-3 text-sm font-black text-hbe-navy shadow-sm"
            >
              Today’s Bubble
            </Link>
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <div className="rounded-[24px] bg-hbe-sky p-4">
            <p className="text-xs font-black uppercase tracking-wide text-hbe-navy/50">Goal</p>
            <p className="mt-1 text-sm font-bold text-hbe-navy/70">{game.learningGoal}</p>
          </div>
          <div className="rounded-[24px] bg-hbe-cream p-4">
            <p className="text-xs font-black uppercase tracking-wide text-hbe-navy/50">Action</p>
            <p className="mt-1 text-sm font-bold text-hbe-navy/70">{game.childAction}</p>
          </div>
          <div className="rounded-[24px] bg-hbe-lilac p-4">
            <p className="text-xs font-black uppercase tracking-wide text-hbe-navy/50">Teacher Cue</p>
            <p className="mt-1 text-sm font-bold text-hbe-navy/70">{game.teacherCue}</p>
          </div>
        </div>
      </header>

      {children}
    </main>
  );
}
