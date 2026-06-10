import { GamePlayShell } from "@/components/game/GamePlayShell";
import { PhaserSoundMatchGame } from "@/components/PhaserSoundMatchGame";
import { getGamePackItem } from "@/game/data/gamePacks";

export default function S01SoundMatchPage() {
  const game = getGamePackItem("s01", "sound-match");

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
      <PhaserSoundMatchGame sessionId="s01" />
    </GamePlayShell>
  );
}
