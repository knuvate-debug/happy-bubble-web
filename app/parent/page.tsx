import { ActivityButton } from "@/components/ActivityButton";
import { PageShell } from "@/components/PageShell";

export default function ParentPage() {
  return (
    <PageShell>
      <section className="hbe-card rounded-[40px] p-8">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-hbe-green">Parent Mode</p>
        <h1 className="mt-4 text-5xl font-black text-hbe-navy">Happy Bubble Review</h1>
        <p className="mt-4 max-w-2xl text-xl font-bold text-hbe-navy/70">
          오늘의 비눗방울을 집에서 다시 만나보세요.
        </p>
      </section>

      <section className="mt-8 hbe-card rounded-[32px] p-6">
        <p className="text-sm font-black text-hbe-green">Session 1</p>
        <h2 className="mt-2 text-3xl font-black text-hbe-navy">S, A, T</h2>
        <p className="mt-3 font-bold text-hbe-navy/70">
          노래를 한 번 듣고, 게임을 한 번 다시 해보세요. 집에서는 3분이면 충분합니다.
        </p>
      </section>

      <section className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <ActivityButton href="/theater/s01" label="Watch Theater" subLabel="영상 다시 보기" />
        <ActivityButton href="/game/s01" label="Play Game" subLabel="게임 다시 하기" />
        <ActivityButton href="/singing/s01" label="Sing Again" subLabel="노래 듣기" />
        <ActivityButton href="/mission/s01" label="Open Mission" subLabel="자료 보기" />
      </section>

      <section className="mt-8 hbe-card rounded-[32px] p-6">
        <h2 className="text-2xl font-black text-hbe-navy">Smart Report</h2>
        <p className="mt-3 font-bold text-hbe-navy/70">
          15개의 비눗방울 여정이 쌓이면 Smart Report가 열려요. 점수가 아니라, 아이가 다시 들어보면 좋은 소리와 활동 흐름을 알려드립니다.
        </p>
      </section>
    </PageShell>
  );
}
