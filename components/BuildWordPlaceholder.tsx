import Link from "next/link";
import type { BubbleGameSession } from "@/game/data/bubbleGameSessions";

export function BuildWordPlaceholder({ gameSession }: { gameSession: BubbleGameSession }) {
  return (
    <section className="hbe-card rounded-[40px] p-8 text-center">
      <p className="text-sm font-black uppercase tracking-[0.22em] text-hbe-green">
        Bubble Game · BUILD_WORD
      </p>
      <h1 className="mt-4 text-5xl font-black text-hbe-navy">
        Session {gameSession.number} · {gameSession.title}
      </h1>
      <p className="mx-auto mt-4 max-w-xl text-lg font-bold text-hbe-navy/70">
        글자 버블로 단어를 만드는 게임 템플릿이 준비 중이에요.
      </p>
      <p className="mx-auto mt-3 max-w-xl rounded-[24px] bg-hbe-sky/70 p-4 text-sm font-bold text-hbe-navy/65">
        현재 Production에서는 S2~S15가 coming soon으로 보호되어 있습니다.
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
