import { notFound } from "next/navigation";
import { ComingSoonCard } from "@/components/ComingSoonCard";
import { GameRouter } from "@/components/GameRouter";
import { PageShell } from "@/components/PageShell";
import { getBubbleGameSession } from "@/game/data/bubbleGameSessions";
import { getSession } from "@/lib/sessions";

export default function GamePage({
  params
}: {
  params: { sessionId: string };
}) {
  const session = getSession(params.sessionId);
  if (!session) notFound();

  const gameSession = getBubbleGameSession(params.sessionId);

  if (session.status !== "open") {
    return (
      <PageShell narrow>
        <ComingSoonCard title={`Bubble Game · ${session.title}`} />
      </PageShell>
    );
  }

  if (!gameSession) {
    return (
      <PageShell narrow>
        <section className="hbe-card rounded-[40px] p-8 text-center">
          <h1 className="text-4xl font-black text-hbe-navy">Game data not found</h1>
        </section>
      </PageShell>
    );
  }

  return (
    <PageShell narrow>
      <GameRouter gameSession={gameSession} />
    </PageShell>
  );
}
