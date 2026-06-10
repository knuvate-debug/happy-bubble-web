import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { TrackOnOpen } from "@/components/TrackOnOpen";
import { VideoPlayer } from "@/components/VideoPlayer";

export default function S01TheaterPage() {
  return (
    <><TrackOnOpen sessionId="s01" eventName="theater_open" activityType="theater" />\n    <PageShell narrow>
      <section className="hbe-card rounded-[40px] p-8">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-hbe-green">Bubble Theater</p>
        <h1 className="mt-4 text-5xl font-black text-hbe-navy">S1 · S, A, T</h1>
        <p className="mt-4 text-lg font-bold text-hbe-navy/70">이야기로 오늘의 소리를 먼저 만나보세요.</p>
        <div className="mt-8">
          <VideoPlayer src="/assets/theater/HBE_BT_S01_FINAL.mp4" title="S1 Bubble Theater" />
        </div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link className="hbe-focus rounded-full bg-hbe-green px-6 py-3 text-center font-black text-white shadow-bubble" href="/game/s01">
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
