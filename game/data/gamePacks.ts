export type GamePackStatus = "open" | "preview" | "coming_soon";

export type GamePackGameType = "sound_match" | "bubble_pop" | "build_word";

export type GamePackItem = {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  route: string;
  gameType: GamePackGameType;
  status: GamePackStatus;
  estimatedTime: string;
  learningGoal: string;
  childAction: string;
  teacherCue: string;
};

export type GamePack = {
  sessionId: string;
  title: string;
  subtitle: string;
  games: GamePackItem[];
};

export const gamePacks: Record<string, GamePack> = {
  s01: {
    sessionId: "s01",
    title: "S1 Game Pack",
    subtitle: "S, A, T 소리를 세 가지 방식으로 반복해요.",
    games: [
      {
        id: "sound-match",
        title: "Sound Match",
        shortTitle: "Match",
        description: "소리를 듣고 맞는 버블을 선택합니다.",
        route: "/game/s01/sound-match",
        gameType: "sound_match",
        status: "open",
        estimatedTime: "2–3 min",
        learningGoal: "s, a, t 소리를 듣고 구분하기",
        childAction: "Listen → Touch the matching bubble",
        teacherCue: "정답보다 다시 듣는 행동을 칭찬합니다."
      },
      {
        id: "bubble-pop",
        title: "Bubble Pop",
        shortTitle: "Pop",
        description: "목표 소리와 같은 버블만 톡톡 터뜨립니다.",
        route: "/game/s01/bubble-pop",
        gameType: "bubble_pop",
        status: "open",
        estimatedTime: "2–3 min",
        learningGoal: "목표 소리를 여러 번 반복해서 듣기",
        childAction: "Find → Pop matching bubbles",
        teacherCue: "빠르게 누르기보다 정확히 듣고 누르게 합니다."
      },
      {
        id: "build-sat",
        title: "Build SAT",
        shortTitle: "Build",
        description: "s, a, t 버블을 순서대로 모아 sat을 완성합니다.",
        route: "/game/s01/build-sat",
        gameType: "build_word",
        status: "open",
        estimatedTime: "2–4 min",
        learningGoal: "소리 순서와 단어 형성 경험하기",
        childAction: "Tap s → a → t",
        teacherCue: "철자 시험이 아니라 소리 연결 놀이로 안내합니다."
      }
    ]
  }
};

export function getGamePack(sessionId: string) {
  return gamePacks[sessionId];
}

export function getGamePackItem(sessionId: string, gameId: string) {
  return gamePacks[sessionId]?.games.find((game) => game.id === gameId);
}
