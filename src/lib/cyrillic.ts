// src/lib/cyrillic.ts
export type CyrillicLetter = {
  upper: string;
  lower: string;
  readingJa: string;
  ipa?: string;
  kind: "vowel" | "consonant" | "sign";
};

export const CYRILLIC: CyrillicLetter[] = [
  { upper: "А", lower: "а", readingJa: "ア", kind: "vowel", ipa: "/a/" },
  { upper: "Б", lower: "б", readingJa: "バ", kind: "consonant", ipa: "/b/" },
  { upper: "В", lower: "в", readingJa: "ヴァ", kind: "consonant", ipa: "/v/" },
  { upper: "Г", lower: "г", readingJa: "ガ", kind: "consonant", ipa: "/g/" },
  { upper: "Д", lower: "д", readingJa: "ダ", kind: "consonant", ipa: "/d/" },
  {
    upper: "Е",
    lower: "е",
    readingJa: "ィエ",
    kind: "vowel",
    ipa: "/je/ ~ /e/",
  },
  { upper: "Ё", lower: "ё", readingJa: "ィヨ", kind: "vowel", ipa: "/jo/" },
  {
    upper: "Ж",
    lower: "ж",
    readingJa: "ジ(zh)",
    kind: "consonant",
    ipa: "/ʐ/ ~ /ʒ/",
  },
  { upper: "З", lower: "з", readingJa: "ズ", kind: "consonant", ipa: "/z/" },
  { upper: "И", lower: "и", readingJa: "イ", kind: "vowel", ipa: "/i/" },
  { upper: "Й", lower: "й", readingJa: "イ短", kind: "consonant", ipa: "/j/" },
  { upper: "К", lower: "к", readingJa: "カ", kind: "consonant", ipa: "/k/" },
  {
    upper: "Л",
    lower: "л",
    readingJa: "ラ/リャ",
    kind: "consonant",
    ipa: "/l ~ lʲ/",
  },
  { upper: "М", lower: "м", readingJa: "マ", kind: "consonant", ipa: "/m/" },
  { upper: "Н", lower: "н", readingJa: "ナ", kind: "consonant", ipa: "/n/" },
  {
    upper: "О",
    lower: "о",
    readingJa: "オ(弱勢でア寄り)",
    kind: "vowel",
    ipa: "/o/ ~ /ɐ/",
  },
  { upper: "П", lower: "п", readingJa: "パ", kind: "consonant", ipa: "/p/" },
  {
    upper: "Р",
    lower: "р",
    readingJa: "ラ(巻き舌)",
    kind: "consonant",
    ipa: "/r/ ~ /rʲ/",
  },
  { upper: "С", lower: "с", readingJa: "ス", kind: "consonant", ipa: "/s/" },
  { upper: "Т", lower: "т", readingJa: "タ", kind: "consonant", ipa: "/t/" },
  { upper: "У", lower: "у", readingJa: "ウ", kind: "vowel", ipa: "/u/" },
  { upper: "Ф", lower: "ф", readingJa: "フ", kind: "consonant", ipa: "/f/" },
  { upper: "Х", lower: "х", readingJa: "ハ/ホ", kind: "consonant", ipa: "/x/" },
  {
    upper: "Ц",
    lower: "ц",
    readingJa: "ツ(硬)",
    kind: "consonant",
    ipa: "/t͡s/",
  },
  {
    upper: "Ч",
    lower: "ч",
    readingJa: "チ(軟)",
    kind: "consonant",
    ipa: "/t͡ɕ ~ t͡ʃ/",
  },
  {
    upper: "Ш",
    lower: "ш",
    readingJa: "シャ(硬)",
    kind: "consonant",
    ipa: "/ʂ/",
  },
  {
    upper: "Щ",
    lower: "щ",
    readingJa: "シシャ(長め)",
    kind: "consonant",
    ipa: "/ɕː ~ ɕtɕ/",
  },
  { upper: "Ъ", lower: "ъ", readingJa: "硬音記号", kind: "sign" },
  { upper: "Ы", lower: "ы", readingJa: "イ(喉奥)", kind: "vowel", ipa: "/ɨ/" },
  { upper: "Ь", lower: "ь", readingJa: "軟音記号", kind: "sign" },
  { upper: "Э", lower: "э", readingJa: "エ", kind: "vowel", ipa: "/e/" },
  { upper: "Ю", lower: "ю", readingJa: "ユ", kind: "vowel", ipa: "/ju/" },
  { upper: "Я", lower: "я", readingJa: "ヤ", kind: "vowel", ipa: "/ja/" },
];

export const CHOICES_READING = Array.from(
  new Set(CYRILLIC.map((c) => c.readingJa))
);
