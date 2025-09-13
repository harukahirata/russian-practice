"use client";
import { useEffect, useMemo, useState } from "react";
import { CYRILLIC, CHOICES_READING, CyrillicLetter } from "@/lib/cyrillic";

type Mode = "reading" | "ipa";

const EMPTY_Q = { correct: "", options: [] as string[] };

function pickRandom<T>(arr: T[], n: number): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, n);
}

function buildQuestion(letter: CyrillicLetter, mode: Mode) {
  if (mode === "reading") {
    const correct = letter.readingJa;
    const others = pickRandom(
      CHOICES_READING.filter((c) => c !== correct),
      3
    );
    const options = pickRandom([correct, ...others], 4);
    return { correct, options } as const;
  } else {
    const correct = letter.ipa ?? "-";

    const allIpa = CYRILLIC.map((l) => l.ipa).filter(Boolean) as string[];
    const others = pickRandom(
      allIpa.filter((ipa) => ipa !== correct),
      3
    );
    const options = pickRandom([correct, ...others], 4);
    return { correct, options } as const;
  }
}

export default function AlphaQuiz() {
  const [index, setIndex] = useState<number | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  const [mode, setMode] = useState<Mode>("reading");

  useEffect(() => {
    setIndex(Math.floor(Math.random() * CYRILLIC.length));
  }, []);

  const letter = useMemo(() => {
    return CYRILLIC[index ?? 0];
  }, [index]);

  const q = useMemo(() => {
    if (index === null) return EMPTY_Q;
    return buildQuestion(letter, mode);
  }, [index, letter, mode]);

  const answered = selected !== null;

  const next = () => {
    setIndex((i) => {
      const nextIdx = ((i ?? 0) + 1) % CYRILLIC.length;
      return nextIdx;
    });
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
    <section className="rounded-2xl border-white/10 bg-white/5 p-6">
      <div className="mb-3 flex items-center gap-3">
        <span className="opacity-80">進捗</span>
        <strong>
          {score.correct}/{score.total}
        </strong>
      </div>
      <div className="mb-4 flex gap-2">
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
        <button
          onClick={() => setMode("ipa")}
          className={[
            "rounded px-3 py-1 text-sm border",
            mode === "ipa"
              ? "bg-white text-slate-900 border-transparent"
              : "border-white/20 hover:bg-white/10",
          ].join(" ")}
        >
          種別
        </button>
      </div>

      <div className="grid grid-cols-[1fr_auto] items-start gap-4">
        <div>
          <div className="mb-2 text-sm opacity-70">
            この文字のおおまかな読みは？
          </div>
          <div className="mb-1 text-[72px] leading-none tracking-wider">
            {letter.upper}{" "}
            <span className="text-[48px] opacity-70">{letter.lower}</span>
          </div>
        </div>
      </div>

      <div className="mt-2 grid grid-cols-2 gap-3">
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
          className="rounded-xl bg-white px-4 py-2 font-semibold text-slate-900"
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
