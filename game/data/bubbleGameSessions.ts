export type SoundMatchRound = {
  id: string;
  type: "letter" | "word";
  audioText: string;
  correctAnswer: string;
  choices: string[];
};

export type BubbleGameSession = {
  id: string;
  sessionId: string;
  number: number;
  title: string;
  subtitle: string;
  theme: string;
  template: "SOUND_MATCH" | "BUILD_WORD" | "REVEAL_FLAP" | "SLIDE_CAR" | "SPEED_QUIZ";
  status: "open" | "coming_soon" | "preview";
  rounds: SoundMatchRound[];
};

export const bubbleGameSessions: BubbleGameSession[] = [
  {
    id: "HBE_BG_S01",
    sessionId: "s01",
    number: 1,
    title: "S, A, T",
    subtitle: "소리를 듣고 버블을 톡!",
    theme: "Origin",
    template: "SOUND_MATCH",
    status: "open",
    rounds: [
      {
        id: "s01-r1",
        type: "letter",
        audioText: "s",
        correctAnswer: "s",
        choices: ["s", "a", "t"]
      },
      {
        id: "s01-r2",
        type: "letter",
        audioText: "a",
        correctAnswer: "a",
        choices: ["s", "a", "t"]
      },
      {
        id: "s01-r3",
        type: "letter",
        audioText: "t",
        correctAnswer: "t",
        choices: ["s", "a", "t"]
      },
      {
        id: "s01-r4",
        type: "word",
        audioText: "sat",
        correctAnswer: "sat",
        choices: ["sat", "at"]
      },
      {
        id: "s01-r5",
        type: "word",
        audioText: "at",
        correctAnswer: "at",
        choices: ["sat", "at"]
      }
    ]
  },
  {
    id: "HBE_BG_S02",
    sessionId: "s02",
    number: 2,
    title: "P, I, N",
    subtitle: "글자 버블로 단어 만들기",
    theme: "Alphabet Explorer",
    template: "BUILD_WORD",
    status: "coming_soon",
    rounds: []
  },
  {
    id: "HBE_BG_S03",
    sessionId: "s03",
    number: 3,
    title: "M, D",
    subtitle: "실험실에서 소리 찾기",
    theme: "Bubble Science Lab",
    template: "SOUND_MATCH",
    status: "coming_soon",
    rounds: [
      {
        id: "s03-r1",
        type: "letter",
        audioText: "m",
        correctAnswer: "m",
        choices: ["m", "d", "s"]
      },
      {
        id: "s03-r2",
        type: "letter",
        audioText: "d",
        correctAnswer: "d",
        choices: ["m", "d", "t"]
      },
      {
        id: "s03-r3",
        type: "word",
        audioText: "mad",
        correctAnswer: "mad",
        choices: ["mad", "sad", "dad"]
      },
      {
        id: "s03-r4",
        type: "word",
        audioText: "map",
        correctAnswer: "map",
        choices: ["map", "man", "mad"]
      }
    ]
  }
];

export function getBubbleGameSession(sessionId: string) {
  return bubbleGameSessions.find((session) => session.sessionId === sessionId);
}
