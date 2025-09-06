import AlphaQuiz from "@/components/AlphaQuiz";

export default function Page() {
  return (
    <main className="space-y-4">
      <p className="leading-7">キリル文字の大まかな日本語読みを当てるクイズ</p>
      <AlphaQuiz />
    </main>
  );
}
