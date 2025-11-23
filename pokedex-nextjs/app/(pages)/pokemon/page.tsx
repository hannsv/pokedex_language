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
  const [itemsPerRow, setItemsPerRow] = useState(3);
  const [displayedCount, setDisplayedCount] = useState(20);
  const loaderRef = useRef<HTMLDivElement>(null);

  // Filter pokemon based on selected type
  const filteredPokemon = useMemo(() => {
    if (selectedType === "all") {
      return pokemonData;
    }
    return pokemonData.filter((p) => p.types?.includes(selectedType));
  }, [selectedType]);

  // Get the subset of pokemon to display
  const displayedPokemon = filteredPokemon.slice(0, displayedCount);

  // Infinite scroll observer
  useEffect(() => {
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

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [filteredPokemon.length]);

  // Reset displayed count when filter changes
  useEffect(() => {
    setDisplayedCount(20);
  }, [selectedType]);

  // Helper to extract ID from URL
  const getPokemonId = (url: string) => {
    const parts = url.split("/");
    return parseInt(parts[parts.length - 2]);
  };

  const gridColsClass =
    {
      3: "grid-cols-3",
      4: "grid-cols-4",
      5: "grid-cols-5",
      6: "grid-cols-6",
    }[itemsPerRow] || "grid-cols-3";

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-6xl mx-auto px-4">
      {/* 필터 메뉴 */}
      <DropDownFilter
        selectedType={selectedType}
        onSelectType={setSelectedType}
      />

      {/* 보기 설정 (행당 개수) */}
      <div className="w-full flex justify-end mb-4 gap-2">
        <span className="text-sm text-gray-600 flex items-center mr-2">
          행당 개수:
        </span>
        {[3, 4, 5, 6].map((num) => (
          <button
            key={num}
            onClick={() => setItemsPerRow(num)}
            className={`px-3 py-1 text-xs rounded border ${
              itemsPerRow === num
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {num}개
          </button>
        ))}
      </div>

      {/* 포켓몬 리스트 */}
      <div
        className={`grid ${gridColsClass} rounded-lg w-full bg-white text-black gap-4 p-4`}
      >
        {displayedPokemon.map((pokemon) => {
          const id = getPokemonId(pokemon.url);
          return <PokemonCard key={id} indexId={id} />;
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
