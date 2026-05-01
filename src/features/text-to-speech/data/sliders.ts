interface Slider {
  id: "temperature" | "topP" | "topK" | "repetitionPenalty";
  label: string;
  leftLabel: string;
  rightLabel: string;
  defaultValue: number;
  step: number;
  min: number;
  max: number;
}

export const sliders: Slider[] = [
  {
    id: "temperature",
    label: "Creativity",
    leftLabel: "Consistent",
    rightLabel: "Expressive",
    defaultValue: 0.8,
    step: 0.1,
    min: 0,
    max: 2,
  },
  {
    id: "topP",
    label: "Voice Variety",
    leftLabel: "Stable",
    rightLabel: "Dynamic",
    defaultValue: 0.95,
    step: 0.01,
    min: 0,
    max: 1,
  },
  {
    id: "topK",
    label: "Expression Range",
    leftLabel: "Subtle",
    rightLabel: "Dramatic",
    defaultValue: 1000,
    step: 100,
    min: 1,
    max: 10000,
  },
  {
    id: "repetitionPenalty",
    label: "Natural Flow",
    leftLabel: "Rhythmic",
    rightLabel: "Varied",
    defaultValue: 1.2,
    step: 0.1,
    min: 1,
    max: 2,
  },
];
