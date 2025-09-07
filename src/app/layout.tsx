import "./globals.css";
import TabBar from "@/components/TabBar";

export const metadata = {
  title: "ロシア語アルファベットクイズ",
  description: "Cyrillic × 読み4択",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="min-h-dvh bg-slate-950 text-white">
        <div className="mx-auto max-w-[960px] px-4 pb-20 p-6">
          <header className="mb-6 flex items-center justify-between">
            <h1 className="m-0 text-xl">ロシア語アルファベットクイズ</h1>
            <nav className="opacity-80">v0.1</nav>
          </header>
          {children}
          <footer className="mt-10 text-sm opacity-70">
            出典：Wikibooks「ロシア語/入門/文字と発音」ほか
          </footer>
        </div>
        <TabBar />
      </body>
    </html>
  );
}
