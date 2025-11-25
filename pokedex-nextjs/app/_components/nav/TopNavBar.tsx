"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SearchBar from "./SearchBar";

export default function TopNavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Check local storage or system preference
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDarkMode(true);
    }
  };

  const menuItems = [
    { name: "포켓몬", href: "/pokemon" },
    { name: "상성계산기", href: "/type" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full shadow-md">
      {/* Red Top Section */}
      <div className="bg-red-600 dark:bg-[#121212] dark:border-b dark:border-[#FFD700] w-full h-16 relative flex items-center justify-center px-4 transition-colors duration-300">
        <div className="max-w-7xl w-full flex justify-between items-center">
          {/* Left Section: Mobile Menu & Logo & Desktop Nav */}
          <div className="flex items-center gap-2 z-30">
            <div className="flex items-center gap-2">
              {/* Mobile Menu Button (Left) */}
              <button
                className="md:hidden text-white dark:text-[#FFD700] p-2 hover:bg-red-700 dark:hover:bg-[#333] rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="메뉴 열기"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={
                      isMenuOpen
                        ? "M6 18L18 6M6 6l12 12"
                        : "M4 6h16M4 12h16M4 18h16"
                    }
                  />
                </svg>
              </button>

              {/* Logo */}
              <div className="shrink-0 flex items-center">
                <Link href="/" className="flex items-center gap-2 group">
                  <div className="relative w-8 h-8 bg-white rounded-full border-4 border-gray-800 dark:border-[#FFD700] flex items-center justify-center overflow-hidden shadow-sm group-hover:rotate-12 transition-transform duration-300">
                    <div className="absolute top-0 w-full h-1/2 bg-red-500 dark:bg-[#121212]"></div>
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-800 dark:bg-[#FFD700] -translate-y-1/2"></div>
                    <div className="absolute w-2 h-2 bg-white dark:bg-[#FFD700] rounded-full border-2 border-gray-800 dark:border-[#FFD700] z-10"></div>
                  </div>
                  <span className="hidden md:block font-bold text-lg tracking-tight text-white dark:text-[#FFD700] drop-shadow-md group-hover:text-yellow-300 transition-colors">
                    Pokedex
                  </span>
                </Link>
              </div>
            </div>

            {/* Desktop Navigation - Moved to Left Section */}
            <nav className="hidden md:flex space-x-1">
              {menuItems.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/" && pathname.startsWith(item.href));

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`px-3 py-2 rounded-full text-sm font-bold transition-all ${
                      isActive
                        ? "bg-white text-red-600 shadow-sm dark:bg-[#FFD700] dark:text-[#121212]"
                        : "text-white hover:bg-red-700 hover:text-white dark:text-[#EAEAEA] dark:hover:bg-[#333] dark:hover:text-[#FFD700]"
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right Section: Search */}
          <div className="flex items-center z-10 gap-2">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-red-700 dark:hover:bg-[#333] transition-colors text-white dark:text-[#FFD700]"
              aria-label={
                isDarkMode ? "라이트 모드로 전환" : "다크 모드로 전환"
              }
            >
              {isDarkMode ? (
                // Sun Icon (Click to switch to Light Mode)
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-yellow-300 dark:text-[#FFD700]"
                >
                  <circle cx="12" cy="12" r="5" />
                  <path d="M12 1v2" />
                  <path d="M12 21v2" />
                  <path d="M4.22 4.22l1.42 1.42" />
                  <path d="M18.36 18.36l1.42 1.42" />
                  <path d="M1 12h2" />
                  <path d="M21 12h2" />
                  <path d="M4.22 19.78l1.42-1.42" />
                  <path d="M18.36 5.64l1.42-1.42" />
                </svg>
              ) : (
                // Moon Icon (Click to switch to Dark Mode)
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-yellow-100"
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>

            {/* Desktop Search */}
            <div className="hidden md:flex items-center w-[300px]">
              <SearchBar />
            </div>

            {/* Mobile Search Button (Right) */}
            <button
              className="md:hidden text-white dark:text-[#FFD700] p-2 hover:bg-red-700 dark:hover:bg-[#333] rounded-lg transition-colors"
              onClick={() => setIsSearchOpen(true)}
              aria-label="검색 열기"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Black Line & Center Circle (Pokeball Design) - Hidden in Dark Mode or Styled */}
      <div className="relative w-full h-2 bg-gray-800 dark:bg-[#FFD700]">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white dark:bg-[#121212] rounded-full border-4 border-gray-800 dark:border-[#FFD700] flex items-center justify-center z-20">
          <div className="w-8 h-8 bg-white dark:bg-[#121212] rounded-full border-2 border-gray-800 dark:border-[#FFD700] flex items-center justify-center">
            <div className="w-6 h-6 bg-white/50 dark:bg-[#FFD700]/50 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white dark:bg-[#1E1E1E] border-b border-gray-200 dark:border-[#FFD700] shadow-lg z-40 animate-in slide-in-from-top-5 duration-200">
          <div className="flex flex-col p-4 space-y-2">
            {menuItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${
                    isActive
                      ? "bg-red-600 text-white shadow-md dark:bg-[#FFD700] dark:text-[#121212]"
                      : "text-gray-700 hover:bg-gray-50 dark:text-[#EAEAEA] dark:hover:bg-[#333]"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Mobile Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-start justify-center pt-24 px-4 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-4 animate-in zoom-in-95 duration-200 relative">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg text-gray-800">포켓몬 검색</h3>
              <button
                onClick={() => setIsSearchOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
                aria-label="닫기"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <SearchBar />
          </div>
          <div
            className="absolute inset-0 -z-10"
            onClick={() => setIsSearchOpen(false)}
          />
        </div>
      )}
    </header>
  );
}
