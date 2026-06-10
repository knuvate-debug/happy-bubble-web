import { ModeShell } from "@/components/ui/ModeShell";
import { PageTitle } from "@/components/ui/PageTitle";
import { SessionCard } from "@/components/SessionCard";
import { sessions } from "@/lib/sessions";

export default function SessionsPage() {
  return (
    <ModeShell mode="child">
      <section className="py-8">
        <PageTitle
          eyebrow="Happy Bubble English"
          title="Choose Your Bubble"
          description="S1은 지금 바로 열려 있고, S2~S15는 준비 중입니다. 아이는 큰 버블을 누르듯 세션을 선택합니다."
        />
      </section>
      <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {sessions.map((session) => (
          <SessionCard key={session.id} session={session} />
        ))}
      </section>
    </ModeShell>
  );
}
