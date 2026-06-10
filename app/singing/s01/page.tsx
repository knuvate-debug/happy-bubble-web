import Link from "next/link";
import { AudioPlayer } from "@/components/AudioPlayer";
import { PageShell } from "@/components/PageShell";
import { TrackOnOpen } from "@/components/TrackOnOpen";

export default function S01SingingPage() {
  return (
    <><TrackOnOpen sessionId="s01" eventName="singing_open" activityType="singing" />\n    <PageShell narrow>
      <section className="hbe-card rounded-[40px] p-8">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-hbe-green">Singing Bubble</p>
        <h1 className="mt-4 text-5xl font-black text-hbe-navy">S1 Chant</h1>
        <p className="mt-4 text-lg font-bold text-hbe-navy/70">S, A, T 소리를 노래로 다시 만나보세요.</p>
        <div className="mt-8">
          <AudioPlayer src="/assets/singing/HBE_SB_S01.mp3" title="HBE_SB_S01.mp3" />
        </div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link className="hbe-focus rounded-full bg-hbe-green px-6 py-3 text-center font-black text-white shadow-bubble" href="/mission/s01">
            Next Activity
          </Link>
          <Link className="hbe-focus rounded-full bg-white px-6 py-3 text-center font-black text-hbe-navy shadow-bubble" href="/sessions/s01">
            Back to Session
          </Link>
        </div>
      </section>
    </PageShell></>
  );
}
