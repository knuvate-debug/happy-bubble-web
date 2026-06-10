export type S1TeachingReadyItem = {
  id: string;
  group: "assets" | "classroom" | "game" | "teacher" | "parent" | "admin";
  title: string;
  description: string;
  required: boolean;
  route?: string;
  filePath?: string;
};

export const s1RequiredAssets: S1TeachingReadyItem[] = [
  {
    id: "asset-theater-video",
    group: "assets",
    title: "Bubble Theater Video",
    description: "S1 Bubble Theater 최종 영상 파일입니다.",
    required: true,
    filePath: "public/assets/theater/HBE_BT_S01_FINAL.mp4"
  },
  {
    id: "asset-hello-song",
    group: "assets",
    title: "Hello Song",
    description: "수업 시작용 Hello Song 음원입니다.",
    required: true,
    filePath: "public/assets/singing/HBE_SB_Hello.mp3"
  },
  {
    id: "asset-singing-bubble",
    group: "assets",
    title: "S1 Singing Bubble",
    description: "S1 본 수업용 Singing Bubble 음원입니다.",
    required: true,
    filePath: "public/assets/singing/HBE_SB_S01.mp3"
  },
  {
    id: "asset-goodbye-song",
    group: "assets",
    title: "Goodbye Song",
    description: "수업 마무리용 Goodbye Song 음원입니다.",
    required: true,
    filePath: "public/assets/singing/HBE_SB_Goodbye.mp3"
  },
  {
    id: "asset-worksheet",
    group: "assets",
    title: "S1 Worksheet",
    description: "수업 중 또는 가정 연계용 S1 워크시트 PDF입니다.",
    required: true,
    filePath: "public/assets/worksheets/HBE_WS_S01.pdf"
  },
  {
    id: "asset-flashcards",
    group: "assets",
    title: "S1 Flashcards",
    description: "수업 중 제시하거나 복습용으로 사용할 S1 플래시카드 PDF입니다.",
    required: true,
    filePath: "public/assets/flashcards/HBE_FC_S01.pdf"
  }
];

export const s1TeachingReadyRoutes: S1TeachingReadyItem[] = [
  {
    id: "route-student",
    group: "classroom",
    title: "Student Today’s Bubble",
    description: "아이용 S1 메인 화면입니다.",
    required: true,
    route: "/sessions/s01"
  },
  {
    id: "route-classroom",
    group: "classroom",
    title: "Classroom Deck",
    description: "프로젝터 또는 전자칠판에 띄우는 S1 수업 슬라이드입니다.",
    required: true,
    route: "/classroom/s01"
  },
  {
    id: "route-presenter-korean",
    group: "teacher",
    title: "Korean Teacher Presenter",
    description: "한국인 강사용 S1 Presenter View입니다.",
    required: true,
    route: "/classroom/s01/presenter?mode=korean"
  },
  {
    id: "route-presenter-native",
    group: "teacher",
    title: "Native Teacher Presenter",
    description: "원어민 강사용 S1 Presenter View입니다.",
    required: true,
    route: "/classroom/s01/presenter?mode=native"
  },
  {
    id: "route-game-pack",
    group: "game",
    title: "S1 Game Pack",
    description: "Sound Match, Bubble Pop, Build SAT 3종 게임팩입니다.",
    required: true,
    route: "/game/s01"
  },
  {
    id: "route-game-sound-match",
    group: "game",
    title: "Sound Match",
    description: "소리를 듣고 맞는 버블을 선택하는 게임입니다.",
    required: true,
    route: "/game/s01/sound-match"
  },
  {
    id: "route-game-bubble-pop",
    group: "game",
    title: "Bubble Pop",
    description: "목표 소리와 같은 버블만 터뜨리는 게임입니다.",
    required: true,
    route: "/game/s01/bubble-pop"
  },
  {
    id: "route-game-build-sat",
    group: "game",
    title: "Build SAT",
    description: "s, a, t를 순서대로 모아 sat을 완성하는 게임입니다.",
    required: true,
    route: "/game/s01/build-sat"
  },
  {
    id: "route-teacher-board",
    group: "teacher",
    title: "Teacher Bubble Board",
    description: "수업 전 강사가 S1 흐름과 모드를 선택하는 화면입니다.",
    required: true,
    route: "/teacher/s01"
  },
  {
    id: "route-classroom-report",
    group: "teacher",
    title: "Classroom Report",
    description: "수업 슬라이드 진행 기록 요약입니다.",
    required: true,
    route: "/teacher/report/s01"
  },
  {
    id: "route-game-report",
    group: "teacher",
    title: "Game Report",
    description: "S1 게임팩 진행 결과 요약입니다.",
    required: true,
    route: "/teacher/game-report/s01"
  },
  {
    id: "route-parent",
    group: "parent",
    title: "Home Bubble",
    description: "학부모가 수업/게임 결과를 확인하는 화면입니다.",
    required: true,
    route: "/parent"
  },
  {
    id: "route-admin-qa",
    group: "admin",
    title: "Launch QA",
    description: "운영자가 S1 런칭 전 라우트/asset 상태를 확인하는 화면입니다.",
    required: true,
    route: "/admin/qa"
  }
];

export const s1ClassroomRunbook = [
  {
    step: 1,
    title: "Before Class",
    time: "3–5 min",
    teacherAction: "Teacher Bubble Board에서 Instructor Mode를 선택합니다.",
    route: "/teacher/s01"
  },
  {
    step: 2,
    title: "Open Presenter",
    time: "1 min",
    teacherAction: "강사용 기기에는 Presenter View, 화면 공유/전자칠판에는 Classroom Deck을 엽니다.",
    route: "/classroom/s01/presenter?mode=korean"
  },
  {
    step: 3,
    title: "Hello Song",
    time: "2 min",
    teacherAction: "Hello Song으로 착석과 참여 분위기를 만듭니다.",
    route: "/classroom/s01"
  },
  {
    step: 4,
    title: "Bubble Theater",
    time: "3–5 min",
    teacherAction: "영상을 먼저 한 번 자연스럽게 보여줍니다. 중간 설명은 최소화합니다.",
    route: "/classroom/s01"
  },
  {
    step: 5,
    title: "Sound Focus",
    time: "5–7 min",
    teacherAction: "s, a, t 소리를 짧게 듣고 반응하게 합니다.",
    route: "/classroom/s01"
  },
  {
    step: 6,
    title: "Game Pack",
    time: "8–12 min",
    teacherAction: "Sound Match → Bubble Pop → Build SAT 중 수업 시간에 맞춰 1~3개를 진행합니다.",
    route: "/game/s01"
  },
  {
    step: 7,
    title: "Singing Bubble",
    time: "3–5 min",
    teacherAction: "노래로 오늘 소리를 다시 반복합니다. 완벽한 발음을 요구하지 않습니다.",
    route: "/classroom/s01"
  },
  {
    step: 8,
    title: "Mission",
    time: "5–10 min",
    teacherAction: "워크시트는 1~2문항만 수업 중 진행하고 나머지는 가정 연계로 전환할 수 있습니다.",
    route: "/classroom/s01"
  },
  {
    step: 9,
    title: "Goodbye Song",
    time: "2 min",
    teacherAction: "칭찬 후 Goodbye Song으로 마무리하고 Complete를 누릅니다.",
    route: "/classroom/s01"
  },
  {
    step: 10,
    title: "After Class",
    time: "3 min",
    teacherAction: "Classroom Report와 Game Report를 확인합니다.",
    route: "/teacher/report/s01"
  }
];
