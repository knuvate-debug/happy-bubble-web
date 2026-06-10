import type { Session } from "@/lib/types";
import { BubbleNode } from "./BubbleNode";

export function BubbleJourneyMap({ sessions }: { sessions: Session[] }) {
  return (
    <section className="relative overflow-hidden rounded-[48px] bg-white/72 p-6 shadow-bubble sm:p-8">
      <div className="absolute left-10 top-10 h-36 w-36 rounded-full bg-hbe-sky/60 blur-xl" />
      <div className="absolute bottom-8 right-10 h-44 w-44 rounded-full bg-hbe-lilac/55 blur-xl" />
      <div className="absolute left-1/2 top-1/3 h-40 w-40 rounded-full bg-hbe-cream/70 blur-2xl" />

      <div className="relative z-10">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-hbe-green">
              Bubble Journey
            </p>
            <h1 className="mt-3 text-4xl font-black text-hbe-navy sm:text-5xl">
              Choose Your Bubble
            </h1>
            <p className="mt-3 max-w-2xl text-base font-bold text-hbe-navy/68 sm:text-lg">
              오늘 열려 있는 비눗방울부터 하나씩 만나봐요. 잠긴 버블은 곧 열릴 예정입니다.
            </p>
          </div>

          <div className="rounded-[28px] bg-hbe-cream px-5 py-4 shadow-sm">
            <p className="text-xs font-black uppercase tracking-wide text-hbe-navy/50">Today</p>
            <p className="mt-1 text-2xl font-black text-hbe-navy">S1 · S, A, T</p>
          </div>
        </div>

        <div className="relative mt-10">
          <div className="absolute left-1/2 top-8 hidden h-[calc(100%-4rem)] w-2 -translate-x-1/2 rounded-full bg-gradient-to-b from-hbe-green/45 via-hbe-sky to-hbe-lilac/60 lg:block" />

          <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {sessions.map((session, index) => {
              const offsetClass =
                index % 3 === 1
                  ? "lg:translate-y-12"
                  : index % 3 === 2
                    ? "lg:translate-y-4"
                    : "";

              return (
                <div key={session.id} className={`relative ${offsetClass}`}>
                  <BubbleNode session={session} index={index} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
