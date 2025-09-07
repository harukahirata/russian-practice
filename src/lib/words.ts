export type Word = {
  ru: string;
  readingJa: string;
  meaningJa: string;
};

export const WORDS: Word[] = [
  { ru: "привет", readingJa: "プリビェート", meaningJa: "やあ / こんにちは" },
  { ru: "спасибо", readingJa: "スパシーバ", meaningJa: "ありがとう" },
  { ru: "дом", readingJa: "ドム", meaningJa: "家" },
  { ru: "кот", readingJa: "コート", meaningJa: "猫（雄猫）" },
  { ru: "собака", readingJa: "サバーカ", meaningJa: "犬" },
];
