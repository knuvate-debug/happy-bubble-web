import { GameRouter } from "@/components/GameRouter";
import { PageShell } from "@/components/PageShell";
import { getBubbleGameSession } from "@/game/data/bubbleGameSessions";

export default function S01GamePage() {
  const gameSession = getBubbleGameSession("s01");

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
