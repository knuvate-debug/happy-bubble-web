import { notFound } from "next/navigation";
import { ComingSoonCard } from "@/components/ComingSoonCard";
import { PageShell } from "@/components/PageShell";
import { getClassroomDeck } from "@/lib/classroomSlides";
import { getSession } from "@/lib/sessions";

export default function ClassroomSessionPage({
  params,
  searchParams
}: {
  params: { sessionId: string };
  searchParams?: { preview?: string };
}) {
  const session = getSession(params.sessionId);
  if (!session) notFound();

  const isPreview = searchParams?.preview === "true";
  const deck = getClassroomDeck(params.sessionId);

  if (!deck || (session.status !== "open" && !isPreview)) {
    return (
      <PageShell narrow>
        <ComingSoonCard title={`Classroom Mode · ${session.title}`} />
      </PageShell>
    );
  }

  return (
    <PageShell narrow>
      <ComingSoonCard title="Use the dedicated classroom route for this session." />
    </PageShell>
  );
}
