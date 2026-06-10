import Link from "next/link";
import { PageShell } from "@/components/PageShell";

export default function S15ReportPage() {
  return (
    <PageShell narrow>
      <section className="hbe-card rounded-[40px] p-8 text-center">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-hbe-green">Smart Report</p>
        <h1 className="mt-4 text-5xl font-black text-hbe-navy">Happy Bubble Smart Report</h1>
        <p className="mt-4 text-lg font-bold text-hbe-navy/70">
          아직 리포트를 만들 활동 기록이 없어요. S1부터 시작하면 비눗방울 여정이 기록됩니다.
        </p>
        <Link
          href="/sessions/s01"
          className="hbe-focus mt-8 inline-flex rounded-full bg-hbe-green px-6 py-3 font-black text-white shadow-bubble"
        >
          Start S1
        </Link>
      </section>
    </PageShell>
  );
}
