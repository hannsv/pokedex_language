"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import PokemonCard from "@/app/_components/pokemon/card/PokemonCard";
import DropDownFilter from "@/app/_components/pokemon/filter/DropDownFilter";
import pokemonDataRaw from "@/data/pokemon.json";

// Define the type for our pokemon data
interface Pokemon {
  name: string;
  url: string;
  korean_name?: string;
  types?: string[];
}

const pokemonData = pokemonDataRaw as Pokemon[];

export default function PokemonListPage() {
  const [selectedType, setSelectedType] = useState("all");
  const [selectedForm, setSelectedForm] = useState("all");
  const [itemsPerRow, setItemsPerRow] = useState(3);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [displayedCount, setDisplayedCount] = useState(20);
  const loaderRef = useRef<HTMLDivElement>(null);

  // Filter pokemon based on selected type and form
  const filteredPokemon = useMemo(() => {
    let filtered = pokemonData;

    // 1. Type Filter
    if (selectedType !== "all") {
      filtered = filtered.filter((p) => p.types?.includes(selectedType));
    }

    // 2. Form Filter
    if (selectedForm !== "all") {
      filtered = filtered.filter((p) => {
        if (selectedForm === "mega") return p.name.includes("-mega");
        if (selectedForm === "gmax") return p.name.includes("-gmax");
        if (selectedForm === "alola") return p.name.includes("-alola");
        if (selectedForm === "galar") return p.name.includes("-galar");
        if (selectedForm === "hisui") return p.name.includes("-hisui");
        if (selectedForm === "paldea") return p.name.includes("-paldea");
        return true;
      });
    }

    return filtered;
  }, [selectedType, selectedForm]);

  // Get the subset of pokemon to display
  const displayedPokemon = filteredPokemon.slice(0, displayedCount);

  // Infinite scroll observer
  useEffect(() => {
    const currentLoader = loaderRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setDisplayedCount((prev) =>
            Math.min(prev + 20, filteredPokemon.length)
          );
        }
      },
      { threshold: 0.1 }
    );

    if (currentLoader) {
      observer.observe(currentLoader);
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, [filteredPokemon.length]);

  // Helper to extract ID from URL
  const getPokemonId = (url: string) => {
    const parts = url.split("/");
    return parseInt(parts[parts.length - 2]);
  };

  const gridColsClass =
    viewMode === "list"
      ? "grid-cols-1"
      : itemsPerRow === 3
      ? "grid-cols-3"
      : itemsPerRow === 4
      ? "grid-cols-4"
      : itemsPerRow === 5
      ? "grid-cols-5"
      : "grid-cols-6";

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-6xl mx-auto px-4">
      {/* 필터 메뉴 */}
      <DropDownFilter
        selectedType={selectedType}
        onSelectType={(type) => {
          setSelectedType(type);
          setDisplayedCount(20);
        }}
        selectedForm={selectedForm}
        onSelectForm={(form) => {
          setSelectedForm(form);
          setDisplayedCount(20);
        }}
      />

      {/* 보기 설정 (행당 개수 및 뷰 모드) */}
      <div className="w-full flex justify-between items-center mb-4 px-1">
        {/* 뷰 모드 토글 */}
        <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-1.5 rounded-md transition-all ${
              viewMode === "grid"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-400 hover:text-gray-600"
            }`}
            title="카드형 보기"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-1.5 rounded-md transition-all ${
              viewMode === "list"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-400 hover:text-gray-600"
            }`}
            title="리스트형 보기"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="8" y1="6" x2="21" y2="6"></line>
              <line x1="8" y1="12" x2="21" y2="12"></line>
              <line x1="8" y1="18" x2="21" y2="18"></line>
              <line x1="3" y1="6" x2="3.01" y2="6"></line>
              <line x1="3" y1="12" x2="3.01" y2="12"></line>
              <line x1="3" y1="18" x2="3.01" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* 행당 개수 (그리드 뷰일 때만 표시) */}
        {viewMode === "grid" && (
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-gray-500"></span>
            <div className="flex bg-gray-100 p-1 rounded-lg">
              {[3, 4, 5, 6].map((num) => (
                <button
                  key={num}
                  onClick={() => setItemsPerRow(num)}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                    itemsPerRow === num
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 포켓몬 리스트 */}
      <div
        className={`grid ${gridColsClass} rounded-lg w-full bg-white text-black gap-4 p-4`}
      >
        {displayedPokemon.map((pokemon) => {
          const id = getPokemonId(pokemon.url);
          return <PokemonCard key={id} indexId={id} viewMode={viewMode} />;
        })}
      </div>

      {/* 로딩 트리거 */}
      {displayedCount < filteredPokemon.length && (
        <div ref={loaderRef} className="w-full py-8 flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      )}

      {/* 결과 없음 메시지 */}
      {filteredPokemon.length === 0 && (
        <div className="w-full py-20 text-center text-gray-500">
          해당 타입의 포켓몬이 없습니다.
        </div>
      )}
    </div>
  );
}
