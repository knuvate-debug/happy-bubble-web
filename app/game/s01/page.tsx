import { GamePackLanding } from "@/components/game/GamePackLanding";
import { getGamePack } from "@/game/data/gamePacks";

export default function S01GamePackPage() {
  const pack = getGamePack("s01");

  if (!pack) {
    return (
      <main className="hbe-page min-h-screen p-8">
        <section className="hbe-card rounded-[40px] p-8 text-center">
          <h1 className="text-4xl font-black text-hbe-navy">Game Pack not found</h1>
        </section>
      </main>
    );
  }

  return <GamePackLanding pack={pack} />;
}
