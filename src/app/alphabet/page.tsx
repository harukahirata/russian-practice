"use client";
import { useState } from "react";
import { CYRILLIC } from "@/lib/cyrillic";

export default function AlphabetPage() {
  const [showKind, setShowKind] = useState(false);

  return (
    <main className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">アルファベット一覧</h2>
        <button
          onClick={() => setShowKind((v) => !v)}
          className="rounded border border-white/20 px-3 py-1 text-sm hover:bg-white/10"
        >
          {showKind ? "種別を隠す" : "種別を表示"}
        </button>
      </div>

      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {CYRILLIC.map((c) => {
          return (
            <li
              key={c.upper}
              className="rounded-xl border border-white/10 bg-white/5 p-4"
            >
              <div className="text-4xl leading-none tracking-wide">
                {c.upper} <span className="text-2xl opacity-70">{c.lower}</span>
              </div>
              <div className="mt-1 text-sm opacity-80">読み: {c.readingJa}</div>
              <div className="text-xs opacity-60">IPA: {c.ipa ?? "-"}</div>
              {showKind && (
                <div className="mt-1 text-xs opacity-60">
                  種別:{" "}
                  {c.kind === "vowel"
                    ? "母音"
                    : c.kind === "consonant"
                    ? "子音"
                    : "記号"}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </main>
  );
}
