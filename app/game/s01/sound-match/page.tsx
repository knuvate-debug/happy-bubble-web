import { GamePlayShell } from "@/components/game/GamePlayShell";
import { PhaserSoundMatchGame } from "@/components/PhaserSoundMatchGame";
import { getBubbleGameSession } from "@/game/data/bubbleGameSessions";
import { getGamePackItem } from "@/game/data/gamePacks";

export default function S01SoundMatchPage() {
  const game = getGamePackItem("s01", "sound-match");
  const gameSession = getBubbleGameSession("s01");

  if (!game || !gameSession) {
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
      <PhaserSoundMatchGame gameSession={gameSession} />
    </GamePlayShell>
  );
}
