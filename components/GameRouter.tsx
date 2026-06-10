import { BuildWordPlaceholder } from "./BuildWordPlaceholder";
import { PhaserSoundMatchGame } from "./PhaserSoundMatchGame";
import { UnsupportedGameTemplate } from "./UnsupportedGameTemplate";
import type { BubbleGameSession } from "@/game/data/bubbleGameSessions";

export function GameRouter({ gameSession }: { gameSession: BubbleGameSession }) {
  if (gameSession.template === "SOUND_MATCH") {
    return <PhaserSoundMatchGame gameSession={gameSession} />;
  }

  if (gameSession.template === "BUILD_WORD") {
    return <BuildWordPlaceholder gameSession={gameSession} />;
  }

  return <UnsupportedGameTemplate gameSession={gameSession} />;
}
