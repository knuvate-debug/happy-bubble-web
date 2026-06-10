export type S1AssetKind = "video" | "audio" | "pdf" | "optional_image" | "optional_sfx";

export type S1AssetManifestItem = {
  id: string;
  label: string;
  kind: S1AssetKind;
  required: boolean;
  path: string;
  usedIn: string[];
  note: string;
};

export const s1AssetManifest: S1AssetManifestItem[] = [
  {
    id: "theater-video",
    label: "Bubble Theater Video",
    kind: "video",
    required: true,
    path: "/assets/theater/HBE_BT_S01_FINAL.mp4",
    usedIn: ["Classroom Deck", "Bubble Theater", "Teacher Mode"],
    note: "S1 이야기 영상. 실제 수업 전 반드시 필요합니다."
  },
  {
    id: "hello-song",
    label: "Hello Song",
    kind: "audio",
    required: true,
    path: "/assets/singing/HBE_SB_Hello.mp3",
    usedIn: ["Classroom Slide 1", "Singing Bubble"],
    note: "수업 시작 루틴 음원입니다."
  },
  {
    id: "s1-song",
    label: "S1 Singing Bubble",
    kind: "audio",
    required: true,
    path: "/assets/singing/HBE_SB_S01.mp3",
    usedIn: ["Classroom Slide 9", "Singing Bubble"],
    note: "S1 본 수업 노래 음원입니다."
  },
  {
    id: "goodbye-song",
    label: "Goodbye Song",
    kind: "audio",
    required: true,
    path: "/assets/singing/HBE_SB_Goodbye.mp3",
    usedIn: ["Classroom Final Slide", "Singing Bubble"],
    note: "수업 마무리 루틴 음원입니다."
  },
  {
    id: "worksheet",
    label: "S1 Worksheet",
    kind: "pdf",
    required: true,
    path: "/assets/worksheets/HBE_WS_S01.pdf",
    usedIn: ["Mission", "Classroom Mission Slide", "Parent Mode"],
    note: "수업 중 또는 가정 연계용 워크시트입니다."
  },
  {
    id: "flashcards",
    label: "S1 Flashcards",
    kind: "pdf",
    required: true,
    path: "/assets/flashcards/HBE_FC_S01.pdf",
    usedIn: ["Word Build", "Mission", "Teacher Mode"],
    note: "수업 제시 및 복습용 카드입니다."
  },
  {
    id: "bubble-blue",
    label: "Bubble Blue Sprite",
    kind: "optional_image",
    required: false,
    path: "/assets/game/common/bubble_blue.png",
    usedIn: ["Game Pack Polish"],
    note: "Phaser 기본 그래픽을 브랜드 sprite로 교체할 때 사용합니다."
  },
  {
    id: "bubble-gold",
    label: "Bubble Gold Sprite",
    kind: "optional_image",
    required: false,
    path: "/assets/game/common/bubble_gold.png",
    usedIn: ["Game Pack Polish"],
    note: "정답 또는 완료 버블 효과용 선택 asset입니다."
  },
  {
    id: "correct-sfx",
    label: "Correct Pop SFX",
    kind: "optional_sfx",
    required: false,
    path: "/assets/game/sfx/pop_correct.mp3",
    usedIn: ["Game Pack Polish"],
    note: "정답 pop 효과음입니다. 현재는 없어도 게임이 작동합니다."
  }
];

export const s1RequiredAssetPaths = s1AssetManifest
  .filter((asset) => asset.required)
  .map((asset) => asset.path);
