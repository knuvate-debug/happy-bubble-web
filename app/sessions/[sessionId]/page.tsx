import { notFound } from "next/navigation";
import { ComingSoonCard } from "@/components/ComingSoonCard";
import { PageShell } from "@/components/PageShell";
import { getSession } from "@/lib/sessions";

export default function GenericSessionPage({
  params
}: {
  params: { sessionId: string };
}) {
  const session = getSession(params.sessionId);
  if (!session) notFound();

  return (
    <PageShell narrow>
      <ComingSoonCard title={`Session ${session.number} · ${session.title}`} />
    </PageShell>
  );
}
