import type { TeacherStep } from "./types";

export const teacherFlows: Record<string, { sessionId: string; title: string; totalTime: string; steps: TeacherStep[] }> = {
  s01: {
    sessionId: "s01",
    title: "S, A, T",
    totalTime: "30–45 min",
    steps: [
      {
        id: "hello",
        order: 1,
        title: "Hello Song",
        time: "2–3 min",
        href: "/assets/singing/HBE_SB_Hello.mp3",
        buttonLabel: "Play Hello Song",
        teacherPrompt: "오늘은 Happy Bubble 첫 번째 소리 여행을 시작해볼게요.",
        backup: "음원이 안 나오면 교사가 짧게 Hello chant를 진행합니다."
      },
      {
        id: "theater",
        order: 2,
        title: "Bubble Theater",
        time: "5–7 min",
        href: "/theater/s01",
        buttonLabel: "Open Theater",
        teacherPrompt: "S, A, T 소리가 들리면 조용히 버블을 톡 해보세요.",
        backup: "영상이 안 나오면 Flashcard Drill로 바로 넘어갑니다."
      },
      {
        id: "flashcard",
        order: 3,
        title: "Flashcard Drill",
        time: "5–8 min",
        href: "/assets/flashcards/HBE_FC_S01.pdf",
        buttonLabel: "Open Flash Cards",
        teacherPrompt: "길게 읽지 않아도 괜찮아요. 소리만 톡!",
        backup: "PDF가 안 열리면 칠판에 s, a, t를 크게 적고 진행합니다."
      },
      {
        id: "word-card",
        order: 4,
        title: "Word Card",
        time: "4–6 min",
        href: "/sessions/s01",
        buttonLabel: "Open Session Page",
        teacherPrompt: "s, a, t가 만나면 sat! 소리가 단어로 연결돼요.",
        backup: "Flashcard PDF로 sat, at만 짧게 다시 보여줍니다."
      },
      {
        id: "game",
        order: 5,
        title: "Bubble Game",
        time: "5–8 min",
        href: "/game/s01",
        buttonLabel: "Open Bubble Game",
        teacherPrompt: "소리를 듣고 맞는 버블을 톡 터뜨려볼게요.",
        backup: "게임이 안 열리면 교사가 카드 3지선다 퀴즈로 대체합니다."
      },
      {
        id: "singing",
        order: 6,
        title: "Singing Bubble",
        time: "4–6 min",
        href: "/singing/s01",
        buttonLabel: "Open Singing Bubble",
        teacherPrompt: "잘 부르지 않아도 괜찮아요. 들으면서 따라 해볼까요?",
        backup: "음원이 안 나오면 s, a, t를 박수 리듬으로 반복합니다."
      },
      {
        id: "worksheet",
        order: 7,
        title: "Worksheet",
        time: "7–10 min",
        href: "/assets/worksheets/HBE_WS_S01.pdf",
        buttonLabel: "Open Worksheet",
        teacherPrompt: "오늘 만난 소리를 손으로 한 번 더 확인해볼게요.",
        backup: "시간이 부족하면 가정 활동으로 전환합니다."
      },
      {
        id: "goodbye",
        order: 8,
        title: "Goodbye Song",
        time: "2–3 min",
        href: "/assets/singing/HBE_SB_Goodbye.mp3",
        buttonLabel: "Play Goodbye Song",
        teacherPrompt: "오늘의 첫 번째 비눗방울을 잘 마쳤어요.",
        backup: "교사가 짧게 Goodbye chant를 진행합니다."
      }
    ]
  }
,
  s03: {
    sessionId: "s03",
    title: "M, D",
    totalTime: "30–45 min",
    steps: [
      {
        id: "hello",
        order: 1,
        title: "Hello Song",
        time: "2–3 min",
        href: "/assets/singing/HBE_SB_Hello.mp3",
        buttonLabel: "Play Hello Song",
        teacherPrompt: "오늘은 Bubble Science Lab에서 M, D 소리를 만나볼게요.",
        backup: "음원이 안 나오면 교사가 짧게 Hello chant를 진행합니다."
      },
      {
        id: "theater",
        order: 2,
        title: "Bubble Theater",
        time: "5–7 min",
        href: "/theater/s03",
        buttonLabel: "Open Theater",
        teacherPrompt: "m, d 소리가 들리면 조용히 버블을 톡 해보세요.",
        backup: "영상이 안 나오면 Flashcard Drill로 바로 넘어갑니다."
      },
      {
        id: "flashcard",
        order: 3,
        title: "Flashcard Drill",
        time: "5–8 min",
        href: "/assets/flashcards/HBE_FC_S03.pdf",
        buttonLabel: "Open Flash Cards",
        teacherPrompt: "m, d, mad, map, dad 소리를 짧게 반복해요.",
        backup: "PDF가 안 열리면 칠판에 m, d를 크게 적고 진행합니다."
      },
      {
        id: "game",
        order: 4,
        title: "Bubble Game",
        time: "5–8 min",
        href: "/game/s03?preview=true",
        buttonLabel: "Open Bubble Game Preview",
        teacherPrompt: "소리를 듣고 맞는 실험실 버블을 골라요.",
        backup: "게임이 안 열리면 카드 3지선다 퀴즈로 대체합니다."
      },
      {
        id: "singing",
        order: 5,
        title: "Singing Bubble",
        time: "4–6 min",
        href: "/singing/s03",
        buttonLabel: "Open Singing Bubble",
        teacherPrompt: "m, d 소리를 노래로 다시 만나볼게요.",
        backup: "음원이 안 나오면 m/d를 박수 리듬으로 반복합니다."
      },
      {
        id: "worksheet",
        order: 6,
        title: "Worksheet",
        time: "7–10 min",
        href: "/assets/worksheets/HBE_WS_S03.pdf",
        buttonLabel: "Open Worksheet",
        teacherPrompt: "오늘 만난 소리를 손으로 한 번 더 확인해요.",
        backup: "시간이 부족하면 가정 활동으로 전환합니다."
      }
    ]
  }
};
