import Link from "next/link";

export function ComingSoonCard({ title = "Coming Soon" }: { title?: string }) {
  return (
    <div className="hbe-card rounded-[36px] p-8 text-center">
      <p className="text-sm font-black text-hbe-green">Happy Bubble English</p>
      <h1 className="mt-3 text-4xl font-black text-hbe-navy">{title}</h1>
      <p className="mx-auto mt-4 max-w-xl text-lg font-bold text-hbe-navy/70">
        다음 비눗방울이 준비 중이에요. 지금은 Session 1부터 시작해 주세요.
      </p>
      <Link
        href="/sessions"
        className="hbe-focus mt-8 inline-flex rounded-full bg-hbe-green px-6 py-3 font-black text-white shadow-bubble"
      >
        Back to Sessions
      </Link>
    </div>
  );
}
