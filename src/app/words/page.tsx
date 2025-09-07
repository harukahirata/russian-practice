import WordQuiz from "@/components/WordQuiz";

export default function Page() {
  return (
    <main className="space-y-4">
      <p className="leading-7">キリル→意味 / 読みを当てる単語クイズ</p>
      <WordQuiz />
    </main>
  );
}
