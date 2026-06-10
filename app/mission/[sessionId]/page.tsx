import { notFound } from "next/navigation";
import { ComingSoonCard } from "@/components/ComingSoonCard";
import { PageShell } from "@/components/PageShell";
import { getSession } from "@/lib/sessions";

export default function GenericMissionPage({
  params
}: {
  params: { sessionId: string };
}) {
  const session = getSession(params.sessionId);
  if (!session) notFound();

  return (
    <PageShell narrow>
      <ComingSoonCard title={`Mission · ${session.title}`} />
    </PageShell>
  );
}
