export type InstructorModeId = "native" | "korean" | "bilingual" | "substitute";

export type InstructorMode = {
  id: InstructorModeId;
  label: string;
  shortLabel: string;
  description: string;
  languageGuide: string;
  bestFor: string;
};

export const instructorModes: InstructorMode[] = [
  {
    id: "native",
    label: "Native Teacher Mode",
    shortLabel: "Native",
    description: "영어 중심으로 짧고 명확하게 수업을 진행합니다.",
    languageGuide: "English 90–100%",
    bestFor: "원어민 강사, 영어 몰입 수업"
  },
  {
    id: "korean",
    label: "Korean Teacher Mode",
    shortLabel: "Korean",
    description: "한국어 안내로 안정감을 주고 핵심 영어 표현만 반복합니다.",
    languageGuide: "Korean 60–70% / English 30–40%",
    bestFor: "한국인 강사, 첫 영어 학습반"
  },
  {
    id: "bilingual",
    label: "Bilingual Support Mode",
    shortLabel: "Bilingual",
    description: "영어 지시문과 짧은 한국어 보조를 함께 제공합니다.",
    languageGuide: "English 50–60% / Korean 40–50%",
    bestFor: "협업 수업, 영어 노출을 늘리는 수업"
  },
  {
    id: "substitute",
    label: "Substitute Teacher Mode",
    shortLabel: "Substitute",
    description: "처음 들어온 강사도 바로 따라 할 수 있는 단계별 진행안을 제공합니다.",
    languageGuide: "Korean guide + essential English",
    bestFor: "대체강사, 신규강사, 긴급 보강"
  }
];

export function isInstructorModeId(value: string | null | undefined): value is InstructorModeId {
  return value === "native" || value === "korean" || value === "bilingual" || value === "substitute";
}

export function getInstructorMode(value: string | null | undefined): InstructorMode {
  const id = isInstructorModeId(value) ? value : "korean";
  return instructorModes.find((mode) => mode.id === id) ?? instructorModes[1];
}
