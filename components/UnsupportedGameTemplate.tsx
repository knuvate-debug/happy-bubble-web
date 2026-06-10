import Link from "next/link";
import type { BubbleGameSession } from "@/game/data/bubbleGameSessions";

export function UnsupportedGameTemplate({ gameSession }: { gameSession: BubbleGameSession }) {
  return (
    <section className="hbe-card rounded-[40px] p-8 text-center">
      <p className="text-sm font-black uppercase tracking-[0.22em] text-hbe-green">
        Bubble Game
      </p>
      <h1 className="mt-4 text-5xl font-black text-hbe-navy">
        {gameSession.template}
      </h1>
      <p className="mx-auto mt-4 max-w-xl text-lg font-bold text-hbe-navy/70">
        이 게임 템플릿은 아직 구현 준비 중입니다.
      </p>
      <Link
        href="/sessions"
        className="hbe-focus mt-8 inline-flex rounded-full bg-hbe-green px-6 py-3 font-black text-white shadow-bubble"
      >
        Back to Sessions
      </Link>
    </section>
  );
}
