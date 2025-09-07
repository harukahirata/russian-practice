"use client";
import { useEffect, useMemo, useState } from "react";
import { WORDS_L1, WORDS_L2 } from "@/lib/words";

type Mode = "reading" | "meaning"; // 読みクイズ・意味クイズ
type Level = 1 | 2;

const POOLS: Record<Level, typeof WORDS_L1> = {
  1: WORDS_L1,
  2: WORDS_L2,
};

function pickRandom<T>(arr: T[], n: number): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, n);
}

function buildQuestion(
  word: (typeof WORDS_L1)[number],
  mode: Mode,
  pool: typeof WORDS_L1
) {
  const correct = mode === "reading" ? word.readingJa : word.meaningJa;
  const distractorsPool = pool
    .map((w) => (mode === "reading" ? w.readingJa : w.meaningJa))
    .filter((x) => x !== correct);

  const options = pickRandom([correct, ...pickRandom(distractorsPool, 3)], 4);
  return { prompt: word.ru, correct, options } as const;
}

export default function WordQuiz() {
  const [mode, setMode] = useState<Mode>("meaning"); // 初期は意味クイズにする
  const [level, setLevel] = useState<Level>(1);
  const pool = POOLS[level];

  const [index, setIndex] = useState<number | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  useEffect(() => {
    setIndex(Math.floor(Math.random() * pool.length));
    setSelected(null);
  }, [level, pool.length]);

  const word = useMemo(
    () => (index === null ? pool[0] : pool[index]),
    [index, pool]
  );

  const q = useMemo(() => {
    if (index === null)
      return { prompt: "", correct: "", options: [] as string[] };
    return buildQuestion(word, mode, pool);
  }, [index, word, mode, pool]);

  const answered = selected !== null;

  const next = () => {
    setIndex((i) => ((i ?? 0) + 1) % pool.length);
    setSelected(null);
  };

  if (index === null) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        Loading...
      </div>
    );
  }

  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
      {/* モード切り替え */}
      <div className="mb-3 flex flex-col gap-3 md:flex-row md:items-center">
        <div className="flex items-center gap-2">
          <span className="text-sm opacity-80">モード:</span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setMode("meaning")}
              className={[
                "rounded px-3 py-1 text-sm border",
                mode === "meaning"
                  ? "bg-white text-slate-900 border-transparent"
                  : "border-white/20 hover:bg-white/10",
              ].join(" ")}
            >
              意味
            </button>
            <button
              onClick={() => setMode("reading")}
              className={[
                "rounded px-3 py-1 text-sm border",
                mode === "reading"
                  ? "bg-white text-slate-900 border-transparent"
                  : "border-white/20 hover:bg-white/10",
              ].join(" ")}
            >
              読み
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm opacity-80">レベル:</span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setLevel(1)}
              className={[
                "rounded px-3 py-1 text-sm border",
                level === 1
                  ? "bg-white text-slate-900 border-transparent"
                  : "border-white/20 hover:bg-white/10",
              ].join(" ")}
            >
              Level1
            </button>
            <button
              onClick={() => setLevel(2)}
              className={[
                "rounded px-3 py-1 text-sm border",
                level === 2
                  ? "bg-white text-slate-900 border-transparent"
                  : "border-white/20 hover:bg-white/10",
              ].join(" ")}
            >
              Level2
            </button>
          </div>
        </div>

        <div className="md:ml-auto text-sm opacity-80">
          進捗{" "}
          <strong>
            {score.correct}/{score.total}
          </strong>
        </div>
      </div>

      <div className="mb-4 text-5xl tracking-wide">{q.prompt}</div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {q.options.map((opt) => {
          const active = selected === opt;
          const correct = answered && opt === q.correct;
          const wrong = answered && active && !correct;
          return (
            <button
              key={opt}
              onClick={() => {
                if (answered) return;
                setSelected(opt);
                setScore((s) => ({
                  correct: s.correct + (opt === q.correct ? 1 : 0),
                  total: s.total + 1,
                }));
              }}
              className={[
                "rounded-xl border px-4 py-3 text-left",
                correct
                  ? "border-emerald-400/40 bg-emerald-400/20"
                  : wrong
                  ? "border-rose-400/40 bg-rose-400/20"
                  : "border-white/20 bg-white/5 hover:bg-white/10",
              ].join(" ")}
            >
              {opt}
            </button>
          );
        })}
      </div>

      <div className="mt-4 flex items-center gap-3">
        <button
          onClick={next}
          className="ronded-xl bg-white px-4 py-2 font-semibold text-slate-900"
        >
          次の問題へ
        </button>
        {answered && (
          <span className="opacity-85">
            答え: <strong>{q.correct}</strong>
          </span>
        )}
      </div>
    </section>
  );
}
