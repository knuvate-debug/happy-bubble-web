import Link from "next/link";
import type { GamePack } from "@/game/data/gamePacks";

const toneClass = {
  "sound-match": "bg-hbe-sky",
  "bubble-pop": "bg-hbe-cream",
  "build-sat": "bg-hbe-lilac"
} as const;

export function GamePackLanding({ pack }: { pack: GamePack }) {
  return (
    <main className="hbe-page min-h-screen p-4 sm:p-6">
      <header className="rounded-[48px] bg-white/78 p-7 shadow-bubble">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-hbe-green">
          Bubble Game Pack
        </p>
        <h1 className="mt-3 text-5xl font-black text-hbe-navy">{pack.title}</h1>
        <p className="mt-3 max-w-3xl text-xl font-bold text-hbe-navy/68">
          {pack.subtitle}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/sessions/s01"
            className="hbe-focus rounded-full bg-white px-5 py-3 font-black text-hbe-navy shadow-bubble"
          >
            Today’s Bubble
          </Link>
          <Link
            href="/teacher/s01"
            className="hbe-focus rounded-full bg-hbe-cream px-5 py-3 font-black text-hbe-navy shadow-bubble"
          >
            Teacher Board
          </Link>
        </div>
      </header>

      <section className="mt-8 grid gap-5 lg:grid-cols-3">
        {pack.games.map((game, index) => (
          <Link
            key={game.id}
            href={game.route}
            className={`hbe-focus group relative min-h-[360px] overflow-hidden rounded-[46px] p-7 shadow-bubble transition hover:-translate-y-2 ${
              toneClass[game.id as keyof typeof toneClass] ?? "bg-white"
            }`}
          >
            <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/38" />
            <div className="absolute bottom-10 right-10 h-20 w-20 rounded-full bg-white/35" />
            <div className="relative z-10 flex h-full flex-col justify-between">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.18em] text-hbe-green">
                  Game {index + 1}
                </p>
                <h2 className="mt-4 text-4xl font-black text-hbe-navy">{game.title}</h2>
                <p className="mt-4 text-lg font-bold leading-relaxed text-hbe-navy/68">
                  {game.description}
                </p>
              </div>

              <div className="mt-8 space-y-3">
                <div className="rounded-[24px] bg-white/60 p-4">
                  <p className="text-xs font-black uppercase tracking-wide text-hbe-navy/50">
                    Goal
                  </p>
                  <p className="mt-1 text-sm font-bold text-hbe-navy/70">
                    {game.learningGoal}
                  </p>
                </div>
                <div className="rounded-[24px] bg-white/60 p-4">
                  <p className="text-xs font-black uppercase tracking-wide text-hbe-navy/50">
                    Child Action
                  </p>
                  <p className="mt-1 text-sm font-bold text-hbe-navy/70">
                    {game.childAction}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-white/70 px-4 py-2 text-sm font-black text-hbe-navy">
                    {game.estimatedTime}
                  </span>
                  <span className="text-4xl font-black text-hbe-navy transition group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}
