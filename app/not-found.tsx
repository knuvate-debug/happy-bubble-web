import Link from "next/link";
import { PageShell } from "@/components/PageShell";

export default function NotFound() {
  return (
    <PageShell narrow>
      <section className="hbe-card rounded-[40px] p-8 text-center">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-hbe-green">Happy Bubble English</p>
        <h1 className="mt-4 text-5xl font-black text-hbe-navy">Page not found</h1>
        <p className="mt-4 text-lg font-bold text-hbe-navy/70">
          요청한 비눗방울을 찾을 수 없어요. Sessions로 돌아가 주세요.
        </p>
        <Link
          href="/sessions"
          className="hbe-focus mt-8 inline-flex rounded-full bg-hbe-green px-6 py-3 font-black text-white shadow-bubble"
        >
          Back to Sessions
        </Link>
      </section>
    </PageShell>
  );
}
