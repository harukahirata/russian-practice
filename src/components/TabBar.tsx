"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/", label: "クイズ", icon: "🧠" },
  { href: "/alphabet", label: "アルファベット", icon: "🔤" },
  { href: "/words", label: "単語", icon: "📚" },
];

export default function TabBar() {
  const pathname = usePathname();
  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-slate-900/85 backdrop-blur">
      <ul className="mx-auto flex max-x-[960px] items-stretch justify-around">
        {tabs.map((t) => {
          const active = pathname === t.href;
          return (
            <li key={t.href} className="flex-1">
              <Link
                href={t.href}
                className={[
                  "flex flex-col items-center justify-center gap-0.5 py-2.5 text-sm",
                  active ? "text-white" : "text-white/70 hover:text-white",
                ].join(" ")}
              >
                <span aria-hidden className="text-base">
                  {t.icon}
                </span>
                <span>{t.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
