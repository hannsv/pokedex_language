"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { pokemonTypes } from "@/app/lib/api/pokemonTypes";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      const term = searchTerm.trim();
      
      // 타입 검색 확인 (한글 이름 또는 영문 이름)
      const matchedType = pokemonTypes.find(
        (t) => t.name === term || t.en === term.toLowerCase()
      );

      if (matchedType) {
        router.push(`/type?type=${matchedType.en}`);
      } else {
        // 검색어가 있으면 상세 페이지로 이동
        router.push(`/pokemon/detail/${term.toLowerCase()}`);
      }
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className="relative flex items-center w-full max-w-[300px]"
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
          className="block w-full p-2.5 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          placeholder="포켓몬 이름, 번호..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          required
        />
        <button
          type="submit"
          className="absolute right-1.5 bottom-1.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md text-xs px-3 py-1.5 transition-colors"
        >
          검색
        </button>
      </div>
    </form>
  );
}
