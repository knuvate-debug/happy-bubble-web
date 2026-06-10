import { PageShell } from "@/components/PageShell";
import { SessionCard } from "@/components/SessionCard";
import { sessions } from "@/lib/sessions";

export default function SessionsPage() {
  return (
    <PageShell>
      <section className="py-8">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-hbe-green">Happy Bubble English</p>
        <h1 className="mt-4 text-5xl font-black text-hbe-navy">Sessions</h1>
        <p className="mt-4 max-w-2xl text-lg font-bold text-hbe-navy/70">
          S1은 지금 바로 열려 있고, S2~S15는 준비 중입니다.
        </p>
      </section>
      <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {sessions.map((session) => (
          <SessionCard key={session.id} session={session} />
        ))}
      </section>
    </PageShell>
  );
}
