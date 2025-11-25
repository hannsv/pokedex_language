import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import TopNavBar from "./_components/nav/TopNavBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "포켓몬 도감",
  description: "Pokedex",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-100`}
      >
        {/* 상단 내비게이션 바 */}
        <TopNavBar />
        {/* 메인 컨텐츠 */}
        <main className="flex justify-center font-sans pt-0 pb-4 px-2 md:pb-10 md:px-4 min-h-[calc(100vh-80px)]">
          <div className="w-full max-w-7xl rounded-b-2xl rounded-t-none md:rounded-2xl shadow-xl bg-white text-black p-2 md:p-8 border border-gray-100">
            {children}
          </div>
        </main>
        {/* 저작권 표기 */}
        <footer className="flex h-24 w-full items-center justify-center bg-slate-100">
          <a
            className="flex items-center justify-center gap-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            <p className="text-gray-400 text-sm text-center pl-12 pr-12">
              Pokémon, 포켓몬스터는 ©2021 Pokémon과 ©1995-2021
              Nintendo/Creatures Inc./GAME FREAK inc.의 저작권 및 상표입니다.
            </p>
          </a>
        </footer>
      </body>
    </html>
  );
}
