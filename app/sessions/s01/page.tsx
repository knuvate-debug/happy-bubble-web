import Link from "next/link";
import { ActivityButton } from "@/components/ActivityButton";
import { PageShell } from "@/components/PageShell";

export default function S01SessionPage() {
  return (
    <PageShell>
      <section className="hbe-card rounded-[40px] p-8">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-hbe-green">Session 1 · Origin</p>
        <h1 className="mt-4 text-6xl font-black text-hbe-navy">S, A, T</h1>
        <p className="mt-4 max-w-2xl text-xl font-bold text-hbe-navy/70">
          소리의 문을 열고, S/A/T 버블을 만나보세요.
        </p>
      </section>

      <section className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <ActivityButton href="/theater/s01" label="Bubble Theater" subLabel="이야기로 먼저 만나기" />
        <ActivityButton href="/game/s01" label="Bubble Game" subLabel="소리 듣고 톡!" />
        <ActivityButton href="/singing/s01" label="Singing Bubble" subLabel="노래로 반복하기" />
        <ActivityButton href="/mission/s01" label="Mission" subLabel="Worksheet / Flash Cards" />
        <ActivityButton href="/assets/worksheets/HBE_WS_S01.pdf" label="Worksheet" subLabel="PDF 열기" />
        <ActivityButton href="/assets/flashcards/HBE_FC_S01.pdf" label="Flash Cards" subLabel="PDF 열기" />
      </section>

      <div className="mt-8">
        <Link className="hbe-focus inline-flex rounded-full bg-white px-6 py-3 font-black text-hbe-navy shadow-bubble" href="/sessions">
          Back to Sessions
        </Link>
      </div>
    </PageShell>
  );
}
