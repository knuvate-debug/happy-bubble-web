import type { InstructorModeId } from "./instructorModes";

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

export type InstructorNotes = Record<InstructorModeId, string>;

export type ClassroomSlide = {
  id: string;
  order: number;
  title: string;
  subtitle: string;
  teacherNote: string;
  teacherNotes: InstructorNotes;
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

function notes({
  native,
  korean,
  bilingual,
  substitute
}: InstructorNotes): InstructorNotes {
  return { native, korean, bilingual, substitute };
}

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
        teacherNotes: notes({
          native: "Say: “Let’s start with our Hello Song. Listen first, then move with me.” Use a gentle wave. Keep it short and warm.",
          korean: "“우리 Hello Song으로 시작해요. 먼저 듣고, 선생님 동작을 따라 해볼게요.”라고 안내합니다. 길게 설명하지 말고 바로 노래를 재생하세요.",
          bilingual: "Say: “Hello Song. 먼저 들어요. Move with me. 선생님이랑 같이 움직여요.” 영어 지시 후 짧은 한국어 보조만 넣습니다.",
          substitute: "1. 아이들이 앉으면 ‘Hello Song!’이라고 말합니다. 2. 노래를 재생합니다. 3. 손 흔들기 동작만 함께 합니다. 4. 노래가 끝나면 Next를 누릅니다."
        }),
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
        teacherNotes: notes({
          native: "Say: “Today’s bubbles are S, A, and T. Listen to the sounds.” Do not explain letter names for long. Move quickly to listening.",
          korean: "“오늘은 S, A, T 소리를 만나볼 거예요. 글자 이름보다 소리를 먼저 들어볼게요.”라고 말하고 바로 다음 활동으로 넘어갑니다.",
          bilingual: "Say: “Today: S, A, T. 오늘은 S, A, T. Listen first. 먼저 들어요.” 아이가 따라 읽지 않아도 괜찮습니다.",
          substitute: "1. 화면의 S, A, T를 가리킵니다. 2. ‘오늘은 이 세 소리를 들어요.’라고 말합니다. 3. 설명은 30초 안에 끝냅니다. 4. Next를 누릅니다."
        }),
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
        teacherNotes: notes({
          native: "Say: “Let’s watch the story. Listen for S, A, and T.” Play the video once without stopping.",
          korean: "“이야기 속에서 오늘 소리가 들리는지 들어볼게요.”라고 말하고 영상은 먼저 멈추지 않고 보여주세요.",
          bilingual: "Say: “Watch the story. 이야기를 볼게요. Listen for S, A, T. S, A, T 소리를 들어요.”",
          substitute: "1. ‘이제 영상을 볼게요.’라고 말합니다. 2. 영상을 재생합니다. 3. 중간 설명 없이 끝까지 봅니다. 4. 아이 반응을 칭찬하고 Next를 누릅니다."
        }),
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
        teacherNotes: notes({
          native: "Say: “Listen: /s/. Soft and short.” Model the sound two times. Avoid saying a long ‘suh’.",
          korean: "“이번에는 /s/ 소리를 들어요. ‘스’라고 길게 말하지 않고 짧게 /s/.”라고 안내합니다.",
          bilingual: "Say: “Listen: /s/. 먼저 들어요. Soft sound. 가볍게.” 두 번만 모델링합니다.",
          substitute: "1. /s/를 짧게 두 번 들려줍니다. 2. 아이에게 억지로 따라 하게 하지 않습니다. 3. ‘Good listening.’이라고 칭찬합니다."
        }),
        visualType: "sound_focus",
        focusText: "s",
        actions: [
          { label: "Open Game Pack", href: "/game/s01", tone: "soft" }
        ]
      },
      {
        id: "sound-a",
        order: 5,
        title: "Sound Focus",
        subtitle: "Listen: /a/",
        teacherNote: "아이들이 따라 하지 못해도 괜찮습니다. 먼저 듣고 구분하는 경험을 줍니다.",
        teacherNotes: notes({
          native: "Say: “Listen: /a/. Open sound.” Model it naturally. Do not over-correct mouth shape.",
          korean: "“이번에는 /a/ 소리예요. 입모양 설명보다 소리를 먼저 들어볼게요.”라고 말합니다.",
          bilingual: "Say: “Listen: /a/. 먼저 들어요. Open sound. 입을 살짝 열어요.”",
          substitute: "1. /a/ 소리를 두 번 들려줍니다. 2. 잘 못 따라 해도 넘어갑니다. 3. 듣는 행동을 칭찬합니다."
        }),
        visualType: "sound_focus",
        focusText: "a",
        actions: [
          { label: "Open Game Pack", href: "/game/s01", tone: "soft" }
        ]
      },
      {
        id: "sound-t",
        order: 6,
        title: "Sound Focus",
        subtitle: "Listen: /t/",
        teacherNote: "짧게 터지는 소리를 듣게 하고, 손가락으로 톡 치는 동작과 연결합니다.",
        teacherNotes: notes({
          native: "Say: “Listen: /t/. Quick sound.” Use a small tap gesture. Keep the pace quick.",
          korean: "“/t/는 톡 하고 짧게 나는 소리예요. 손으로 톡 해볼게요.”라고 말하고 짧은 동작과 연결합니다.",
          bilingual: "Say: “Listen: /t/. Quick. 톡 하고 짧게.” 아이들과 손가락 톡 동작을 합니다.",
          substitute: "1. /t/ 소리를 짧게 들려줍니다. 2. 손가락으로 톡 동작을 하게 합니다. 3. 두 번 반복 후 Next를 누릅니다."
        }),
        visualType: "sound_focus",
        focusText: "t",
        actions: [
          { label: "Open Game Pack", href: "/game/s01", tone: "soft" }
        ]
      },
      {
        id: "word-build",
        order: 7,
        title: "Word Build",
        subtitle: "sat · at",
        teacherNote: "s, a, t가 만나 sat이 되는 흐름을 보여줍니다. 읽기보다 소리 연결이 우선입니다.",
        teacherNotes: notes({
          native: "Say: “Sounds together: s-a-t, sat.” Keep it playful. Do not turn this into a spelling test.",
          korean: "“소리가 만나면 s-a-t, sat처럼 들려요. 외우는 시간이 아니라 소리가 이어지는 걸 보는 시간이에요.”라고 안내합니다.",
          bilingual: "Say: “Sounds together. 소리가 만나요. s-a-t, sat.” 아이가 부담 없이 듣게 합니다.",
          substitute: "1. 화면의 sat을 가리킵니다. 2. s-a-t를 천천히 말합니다. 3. sat으로 한 번 연결합니다. 4. 정답 확인처럼 만들지 않습니다."
        }),
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
        teacherNotes: notes({
          native: "Say: “Listen and pop the bubble.” Praise listening first: “Good listening.” Use “Try again” gently.",
          korean: "“맞히는 것보다 잘 듣는 게 중요해요. Listen을 다시 눌러도 좋아요.”라고 말해 주세요.",
          bilingual: "Say: “Listen and pop. 듣고 버블 톡! Try again. 다시 해볼게요.”",
          substitute: "1. Start Game을 누릅니다. 2. 아이들이 소리를 듣고 고르게 합니다. 3. 틀려도 ‘다시 들어볼까?’라고 말합니다. 4. 완료 후 돌아옵니다."
        }),
        visualType: "game",
        focusText: "Listen & Pop",
        actions: [
          { label: "Open Game Pack", href: "/game/s01", tone: "primary" }
        ]
      },
      {
        id: "singing",
        order: 9,
        title: "Singing Bubble",
        subtitle: "노래로 소리를 다시 만나봐요.",
        teacherNote: "노래를 완벽하게 따라 부르지 않아도 됩니다. 리듬과 소리 노출이 목적입니다.",
        teacherNotes: notes({
          native: "Say: “Let’s sing with the bubbles.” Encourage movement and rhythm. Do not demand perfect pronunciation.",
          korean: "“노래를 완벽하게 부르지 않아도 괜찮아요. 리듬을 타면서 오늘 소리를 다시 들어볼게요.”라고 안내합니다.",
          bilingual: "Say: “Sing with me. 같이 불러요. Move and listen. 움직이면서 들어요.”",
          substitute: "1. 노래를 재생합니다. 2. 아이들이 리듬을 따라 손동작만 해도 칭찬합니다. 3. 발음을 고치느라 흐름을 끊지 않습니다."
        }),
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
        teacherNotes: notes({
          native: "Say: “Now, bubble mission.” If time is short, choose only one task and send the rest home.",
          korean: "“이제 손으로 한 번 더 확인해요. 시간이 부족하면 나머지는 집에서 해도 괜찮아요.”라고 안내합니다.",
          bilingual: "Say: “Mission time. 미션 시간이에요. One or two is okay. 한두 개만 해도 괜찮아요.”",
          substitute: "1. Worksheet를 엽니다. 2. 1~2문항만 진행합니다. 3. 시간이 부족하면 과제로 전환합니다. 4. 아이에게 속도를 강요하지 않습니다."
        }),
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
        teacherNotes: notes({
          native: "Say: “Great bubble learning today. Let’s sing Goodbye.” Finish with praise and a warm goodbye.",
          korean: "“오늘 S, A, T 버블을 잘 들었어요. Goodbye Song으로 마무리할게요.”라고 말합니다.",
          bilingual: "Say: “Great job today. 오늘 잘했어요. Goodbye Song!”",
          substitute: "1. 오늘 들은 소리를 짧게 칭찬합니다. 2. Goodbye Song을 재생합니다. 3. 끝나면 Complete를 누릅니다."
        }),
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
