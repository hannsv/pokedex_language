"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { pokemonTypes } from "@/app/lib/api/pokemonTypes";
import pokemonData from "@/data/pokemon.json";

interface Pokemon {
  name: string;
  url: string;
  korean_name?: string;
}

interface SearchBarProps {
  dict?: any;
  lang?: "ko" | "en" | "zh";
}

export default function SearchBar({ dict, lang = "ko" }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<
    {
      name: string;
      url?: string;
      type?: string;
      en?: string;
      korean_name?: string;
      original?: any;
    }[]
  >([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const router = useRouter();
  const wrapperRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.length > 0) {
      const lowerValue = value.toLowerCase();

      // 포켓몬 이름 검색 (영문 또는 한글)
      const filteredPokemon = (pokemonData as Pokemon[])
        .filter(
          (p) =>
            p.name.toLowerCase().includes(lowerValue) ||
            (p.korean_name && p.korean_name.includes(value))
        )
        .slice(0, 5)
        .map((p) => ({ ...p, type: "pokemon" }));

      // 타입 검색 (한글, 영문, 중국어)
      const filteredTypes = pokemonTypes
        .filter(
          (t) =>
            t.name.includes(value) ||
            t.en.toLowerCase().includes(lowerValue) ||
            t.zh.includes(value)
        )
        .map((t) => {
          let displayName = `${t.name} (${t.en})`;
          if (lang === "zh") displayName = `${t.zh} (${t.en})`;
          else if (lang === "en") displayName = `${t.en} (${t.name})`;

          return {
            name: displayName,
            en: t.en,
            type: "type",
            original: t,
          };
        });

      setSuggestions([...filteredTypes, ...filteredPokemon]);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (item: {
    name: string;
    url?: string;
    type?: string;
    en?: string;
    korean_name?: string;
    original?: any;
  }) => {
    if (item.type === "pokemon" && item.url) {
      const id = item.url.split("/").filter(Boolean).pop();
      // Use current language for name if available, otherwise fallback
      let displayName = item.name;
      if (lang === "ko") displayName = item.korean_name || item.name;
      else if (lang === "zh") displayName = item.name; // Fallback to English as we don't have Chinese in json

      setSearchTerm(displayName);
      setShowSuggestions(false);
      router.push(`/${lang}/pokemon/detail/${id}`);
    } else if (item.type === "type" && item.en) {
      let term = item.en;
      if (lang === "ko" && item.original) term = item.original.name;
      else if (lang === "zh" && item.original) term = item.original.zh;

      setSearchTerm(term);
      setShowSuggestions(false);
      router.push(`/${lang}/type?type=${item.en}`);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      const term = searchTerm.trim();

      // 타입 검색 확인 (한글, 영문, 중국어)
      const matchedType = pokemonTypes.find(
        (t) => t.name === term || t.en === term.toLowerCase() || t.zh === term
      );

      if (matchedType) {
        router.push(`/${lang}/type?type=${matchedType.en}`);
        setShowSuggestions(false);
        return;
      }

      // 포켓몬 검색 (한글 이름 또는 영문 이름)
      const matchedPokemon = (pokemonData as Pokemon[]).find(
        (p) =>
          p.name.toLowerCase() === term.toLowerCase() || p.korean_name === term
      );

      if (matchedPokemon) {
        const id = matchedPokemon.url.split("/").filter(Boolean).pop();
        router.push(`/${lang}/pokemon/detail/${id}`);
      } else {
        // 검색어가 있으면 상세 페이지로 이동 (fallback)
        router.push(`/${lang}/pokemon/detail/${term.toLowerCase()}`);
      }
      setShowSuggestions(false);
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className="relative flex items-center w-full"
      ref={wrapperRef}
    >
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          className="block w-full p-2.5 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all dark:bg-[#1E1E1E] dark:text-[#EAEAEA] dark:border-gray-700 dark:focus:border-[#FFD700] dark:focus:ring-[#FFD700]"
          placeholder={dict?.search_placeholder || "이름, 타입..."}
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={() => {
            if (searchTerm) setShowSuggestions(true);
          }}
          required
        />
        <button
          type="submit"
          className="absolute right-1.5 bottom-1.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md text-xs px-3 py-1.5 transition-colors dark:bg-[#333] dark:text-[#FFD700] dark:hover:bg-[#444] dark:border dark:border-[#FFD700]"
        >
          {lang === "en" ? "Search" : "검색"}
        </button>

        {/* 연관 검색어 목록 */}
        {showSuggestions && suggestions.length > 0 && (
          <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg shadow-lg top-full mt-1 max-h-60 overflow-y-auto dark:bg-[#1E1E1E] dark:border-[#FFD700]">
            {suggestions.map((item, index) => (
              <li
                key={index}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm flex justify-between items-center dark:hover:bg-[#333] dark:text-[#EAEAEA]"
                onClick={() => handleSuggestionClick(item)}
              >
                <span className="text-xs text-gray-500 uppercase dark:text-gray-400">
                  {item.korean_name
                    ? `${item.korean_name} (${item.name})`
                    : item.name}
                </span>
                <span className="text-xs text-gray-500 uppercase dark:text-gray-400">
                  {item.type === "type" ? "타입" : "포켓몬"}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </form>
  );
}
