import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import TopNavBar from "./components/nav/TopNavBar";

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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* 상단 내비게이션 바 */}
        <TopNavBar />

        {children}

        {/* 저작권 표기 */}
        <footer className="flex h-24 w-full items-center justify-center ">
          <a
            className="flex items-center justify-center gap-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            <p className="text-gray-400 text-sm text-center">
              Pokémon, 포켓몬, 포켓몬스터는 ©2021 Pokémon과 ©1995-2021
              Nintendo/Creatures Inc./GAME FREAK inc.의 저작권 및 상표입니다.
            </p>
          </a>
        </footer>
      </body>
    </html>
  );
}
