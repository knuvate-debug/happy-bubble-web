import { GamePlayShell } from "@/components/game/GamePlayShell";
import { PhaserBubblePopGame } from "@/components/PhaserBubblePopGame";
import { getGamePackItem } from "@/game/data/gamePacks";

export default function S01BubblePopPage() {
  const game = getGamePackItem("s01", "bubble-pop");

  if (!game) {
    return (
      <main className="hbe-page min-h-screen p-8">
        <section className="hbe-card rounded-[40px] p-8 text-center">
          <h1 className="text-4xl font-black text-hbe-navy">Game not found</h1>
        </section>
      </main>
    );
  }

  return (
    <GamePlayShell game={game}>
      <PhaserBubblePopGame sessionId="s01" />
    </GamePlayShell>
  );
}
