import Link from "next/link";
import { ActivityButton } from "@/components/ActivityButton";
import { PageShell } from "@/components/PageShell";
import { TrackOnOpen } from "@/components/TrackOnOpen";

export default function S01MissionPage() {
  return (
    <><TrackOnOpen sessionId="s01" eventName="mission_open" activityType="mission" />
      <PageShell>
      <section className="hbe-card rounded-[40px] p-8">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-hbe-green">Mission</p>
        <h1 className="mt-4 text-5xl font-black text-hbe-navy">S1 Worksheet & Cards</h1>
        <p className="mt-4 text-lg font-bold text-hbe-navy/70">
          오늘 만난 S, A, T 소리를 손으로 한 번 더 확인해요.
        </p>
      </section>
      <section className="mt-8 grid gap-5 sm:grid-cols-2">
        <ActivityButton href="/assets/worksheets/HBE_WS_S01.pdf" label="Worksheet" subLabel="HBE_WS_S01.pdf" />
        <ActivityButton href="/assets/flashcards/HBE_FC_S01.pdf" label="Flash Cards" subLabel="HBE_FC_S01.pdf" />
      </section>
      <div className="mt-8">
        <Link className="hbe-focus inline-flex rounded-full bg-white px-6 py-3 font-black text-hbe-navy shadow-bubble" href="/sessions/s01">
          Back to Session
        </Link>
      </div>
    </PageShell>
    </>
  );
}
