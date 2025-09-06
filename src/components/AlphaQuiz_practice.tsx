"use client";
// クライアントコンポーネントにする
import { useEffect, useMemo, useState } from "react";
import { CYRILLIC, CHOICES_READING, CyrillicLetter } from "@/lib/cyrillic";

const EMPTY_Q = { correct: "", options: [] as string[] };

function pickRandom<T>(arr: T[], n: number): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, n);
}

function buildQuestion(letter: CyrillicLetter) {
  const correct = letter.readingJa;
  const others = pickRandom(
    CHOICES_READING.filter((c) => c !== correct),
    3
  );
  const options = pickRandom([correct, ...others], 4);
  return { correct, options } as const;
}

export default function AlphaQuiz() {
  const [index, setIndex] = useState<number | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  useEffect(() => {
    setIndex(Math.floor(Math.random() * CYRILLIC.length));
  }, []);

  const letter = useMemo(() => {
    return CYRILLIC[index ?? 0];
  }, [index]);

  const q = useMemo(() => {
    if (index === null) return EMPTY_Q;
    return buildQuestion(letter);
  }, [index, letter]);

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

      <div className="grid grid-cols-[1fr_auto] items-start gap-4">
        <div>
          <div className="mb-2 text-sm opacity-70">
            この文字のおおまかな読みは？
          </div>
          <div className="mb-1 text-[72px] leading-none tracking-wider">
            {letter.upper}{" "}
            <span className="text-[48px] opacity-70">{letter.lower}</span>
          </div>
          <div className="mb-4 text-sm opacity-70">
            種別：
            {letter.kind === "vowel"
              ? "母音"
              : letter.kind === "consonant"
              ? "子音"
              : "記号"}
            {letter.ipa ? ` / IPA: ${letter.ipa}` : ""}
          </div>
        </div>

        <button
          onClick={() => {
            setScore((s) => ({ ...s, total: s.total + 1 }));
            next();
          }}
          className="rounded-full border border-white/20 px-3 py-2 opacity-90 hover:opacity-100"
        >
          スキップ
        </button>
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
