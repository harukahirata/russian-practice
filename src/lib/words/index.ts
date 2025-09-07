export { type Word } from "./types";

import { WORDS_L1 } from "./level1";
import { WORDS_L2 } from "./level2";

export { WORDS_L1, WORDS_L2 };

export const POOLS = { 1: WORDS_L1, 2: WORDS_L2 } as const;
export type Level = keyof typeof POOLS;
export const ALL_WORDS = [...WORDS_L1, ...WORDS_L2] as const;
