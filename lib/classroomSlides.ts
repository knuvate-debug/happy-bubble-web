export type ClassroomVisualType =
  | "welcome"
  | "audio"
  | "video"
  | "sound_focus"
  | "word_build"
  | "game"
  | "mission"
  | "goodbye";

export type ClassroomSlideAction = {
  label: string;
  href: string;
  tone?: "primary" | "secondary" | "soft" | "warning";
};

export type ClassroomSlide = {
  id: string;
  order: number;
  title: string;
  subtitle: string;
  teacherNote: string;
  visualType: ClassroomVisualType;
  focusText?: string;
  audioSrc?: string;
  videoSrc?: string;
  actions?: ClassroomSlideAction[];
};

export type ClassroomDeck = {
  sessionId: string;
  title: string;
  subtitle: string;
  totalTime: string;
  slides: ClassroomSlide[];
};

export const classroomDecks: Record<string, ClassroomDeck> = {
  s01: {
    sessionId: "s01",
    title: "S1 · S, A, T",
    subtitle: "Classroom Bubble Deck",
    totalTime: "30–45 min",
    slides: [
      {
        id: "hello",
        order: 1,
        title: "Hello Song",
        subtitle: "수업을 부드럽게 시작해요.",
        teacherNote: "아이들이 자리에 앉으면 짧게 Hello Song을 들려주고 손동작으로 참여하게 합니다.",
        visualType: "audio",
        focusText: "Hello",
        audioSrc: "/assets/singing/HBE_SB_Hello.mp3",
        actions: [
          { label: "Play Hello Song", href: "/assets/singing/HBE_SB_Hello.mp3", tone: "primary" }
        ]
      },
      {
        id: "today-bubble",
        order: 2,
        title: "Today’s Bubble",
        subtitle: "오늘 만날 소리는 S, A, T예요.",
        teacherNote: "글자 이름보다 소리 중심으로 짧게 소개합니다. 길게 설명하지 않습니다.",
        visualType: "welcome",
        focusText: "S · A · T",
        actions: [
          { label: "Open Today’s Bubble", href: "/sessions/s01", tone: "primary" }
        ]
      },
      {
        id: "theater",
        order: 3,
        title: "Bubble Theater",
        subtitle: "이야기 속에서 오늘의 소리를 들어요.",
        teacherNote: "영상 중간에 멈춰 설명하기보다, 먼저 한 번 자연스럽게 보게 합니다.",
        visualType: "video",
        videoSrc: "/assets/theater/HBE_BT_S01_FINAL.mp4",
        actions: [
          { label: "Open Theater", href: "/theater/s01", tone: "primary" }
        ]
      },
      {
        id: "sound-s",
        order: 4,
        title: "Sound Focus",
        subtitle: "Listen: /s/",
        teacherNote: "입모양을 크게 과장하지 않고, 짧고 가볍게 /s/ 소리를 반복합니다.",
        visualType: "sound_focus",
        focusText: "s",
        actions: [
          { label: "Go to Game", href: "/game/s01", tone: "soft" }
        ]
      },
      {
        id: "sound-a",
        order: 5,
        title: "Sound Focus",
        subtitle: "Listen: /a/",
        teacherNote: "아이들이 따라 하지 못해도 괜찮습니다. 먼저 듣고 구분하는 경험을 줍니다.",
        visualType: "sound_focus",
        focusText: "a",
        actions: [
          { label: "Go to Game", href: "/game/s01", tone: "soft" }
        ]
      },
      {
        id: "sound-t",
        order: 6,
        title: "Sound Focus",
        subtitle: "Listen: /t/",
        teacherNote: "짧게 터지는 소리를 듣게 하고, 손가락으로 톡 치는 동작과 연결합니다.",
        visualType: "sound_focus",
        focusText: "t",
        actions: [
          { label: "Go to Game", href: "/game/s01", tone: "soft" }
        ]
      },
      {
        id: "word-build",
        order: 7,
        title: "Word Build",
        subtitle: "sat · at",
        teacherNote: "s, a, t가 만나 sat이 되는 흐름을 보여줍니다. 읽기보다 소리 연결이 우선입니다.",
        visualType: "word_build",
        focusText: "sat · at",
        actions: [
          { label: "Open Flash Cards", href: "/assets/flashcards/HBE_FC_S01.pdf", tone: "soft" }
        ]
      },
      {
        id: "game",
        order: 8,
        title: "Bubble Game",
        subtitle: "소리를 듣고 버블을 톡!",
        teacherNote: "정답을 맞히는 것보다 Listen을 다시 눌러 듣는 행동을 칭찬합니다.",
        visualType: "game",
        focusText: "Listen & Pop",
        actions: [
          { label: "Start Game", href: "/game/s01", tone: "primary" }
        ]
      },
      {
        id: "singing",
        order: 9,
        title: "Singing Bubble",
        subtitle: "노래로 소리를 다시 만나봐요.",
        teacherNote: "노래를 완벽하게 따라 부르지 않아도 됩니다. 리듬과 소리 노출이 목적입니다.",
        visualType: "audio",
        focusText: "Sing",
        audioSrc: "/assets/singing/HBE_SB_S01.mp3",
        actions: [
          { label: "Open Singing Bubble", href: "/singing/s01", tone: "primary" }
        ]
      },
      {
        id: "mission",
        order: 10,
        title: "Worksheet Mission",
        subtitle: "손으로 한 번 더 확인해요.",
        teacherNote: "시간이 부족하면 과제로 전환합니다. 수업 중에는 1~2문항만 해도 충분합니다.",
        visualType: "mission",
        focusText: "Mission",
        actions: [
          { label: "Open Worksheet", href: "/assets/worksheets/HBE_WS_S01.pdf", tone: "primary" },
          { label: "Open Mission Page", href: "/mission/s01", tone: "soft" }
        ]
      },
      {
        id: "goodbye",
        order: 11,
        title: "Goodbye Song",
        subtitle: "오늘의 버블을 마무리해요.",
        teacherNote: "짧게 칭찬하고 다음 버블에 대한 기대감을 남깁니다.",
        visualType: "goodbye",
        focusText: "Goodbye",
        audioSrc: "/assets/singing/HBE_SB_Goodbye.mp3",
        actions: [
          { label: "Play Goodbye Song", href: "/assets/singing/HBE_SB_Goodbye.mp3", tone: "primary" }
        ]
      }
    ]
  }
};

export function getClassroomDeck(sessionId: string) {
  return classroomDecks[sessionId];
}
