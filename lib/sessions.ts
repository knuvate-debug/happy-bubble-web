import type { Session } from "./types";

export const sessions: Session[] = [
  {
    id: "s01",
    number: 1,
    title: "S, A, T",
    theme: "Origin",
    subtitle: "소리의 문을 열다",
    status: "open"
  },
  {
    id: "s02",
    number: 2,
    title: "P, I, N",
    theme: "Alphabet Explorer",
    subtitle: "글자 버블로 단어 만들기",
    status: "coming_soon"
  },
  {
    id: "s03",
    number: 3,
    title: "M, D",
    theme: "Bubble Science Lab",
    subtitle: "실험실에서 소리 찾기",
    status: "coming_soon"
  },
  {
    id: "s04",
    number: 4,
    title: "Build CVC",
    theme: "Clay Workshop",
    subtitle: "찰흙처럼 단어 만들기",
    status: "coming_soon"
  },
  {
    id: "s05",
    number: 5,
    title: "K, E, U, R",
    theme: "Fishing Pond",
    subtitle: "낚시터에서 소리 찾기",
    status: "coming_soon"
  },
  {
    id: "s06",
    number: 6,
    title: "H, B",
    theme: "Baseball",
    subtitle: "야구장에서 소리 잡기",
    status: "coming_soon"
  },
  {
    id: "s07",
    number: 7,
    title: "F, L",
    theme: "Detective",
    subtitle: "탐정처럼 빠르게 찾기",
    status: "coming_soon"
  },
  {
    id: "s08",
    number: 8,
    title: "J, V, W",
    theme: "Mirror",
    subtitle: "거울 속 소리 찾기",
    status: "coming_soon"
  },
  {
    id: "s09",
    number: 9,
    title: "Y, Z, X, Q",
    theme: "Space",
    subtitle: "우주에서 점프하며 소리 찾기",
    status: "coming_soon"
  },
  {
    id: "s10",
    number: 10,
    title: "CVC Review I",
    theme: "Card Lab",
    subtitle: "카드를 열고 단어 찾기",
    status: "coming_soon"
  },
  {
    id: "s11",
    number: 11,
    title: "Phonics Racing",
    theme: "Phonics Racing",
    subtitle: "단어 자동차를 움직여요",
    status: "coming_soon"
  },
  {
    id: "s12",
    number: 12,
    title: "Ocean Guardians",
    theme: "Ocean Guardians",
    subtitle: "바다 단어를 만들어요",
    status: "coming_soon"
  },
  {
    id: "s13",
    number: 13,
    title: "Little Doctor",
    theme: "Little Doctor",
    subtitle: "소리 처방전을 찾아요",
    status: "coming_soon"
  },
  {
    id: "s14",
    number: 14,
    title: "Festival Review",
    theme: "Festival",
    subtitle: "축제에서 소리 복습",
    status: "coming_soon"
  },
  {
    id: "s15",
    number: 15,
    title: "Graduation",
    theme: "Graduation",
    subtitle: "문장 버블을 완성해요",
    status: "coming_soon"
  }
];

export function getSession(sessionId: string) {
  return sessions.find((session) => session.id === sessionId);
}
