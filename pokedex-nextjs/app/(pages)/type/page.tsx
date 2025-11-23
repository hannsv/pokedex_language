"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { pokemonTypes, typeStyleMap } from "@/app/lib/api/pokemonTypes";
import { getPokemonByType } from "@/app/lib/api/pokemon";
import PokemonCard from "@/app/_components/pokemon/card/PokemonCard";

interface PokemonTypeEntry {
  pokemon: {
    name: string;
    url: string;
  };
  slot: number;
}

function TypePageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentType = searchParams.get("type");
  const [pokemonList, setPokemonList] = useState<PokemonTypeEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (currentType) {
      fetchPokemonByType(currentType);
    } else {
      setPokemonList([]);
    }
  }, [currentType]);

  const fetchPokemonByType = async (type: string) => {
    setIsLoading(true);
    try {
      const data = await getPokemonByType(type);
      setPokemonList(data.pokemon);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTypeClick = (typeEn: string) => {
    router.push(`/type?type=${typeEn}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">타입별 포켓몬</h1>

      {/* Type Selector */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {pokemonTypes.map((t) => {
          const style = typeStyleMap[t.en] || {
            bg: "bg-gray-200",
            text: "text-black",
          };
          return (
            <button
              key={t.en}
              onClick={() => handleTypeClick(t.en)}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-all shadow-sm ${
                style.bg
              } ${style.text} ${
                currentType === t.en
                  ? "ring-4 ring-offset-2 ring-blue-400 scale-110"
                  : "opacity-80 hover:opacity-100 hover:scale-105"
              }`}
            >
              {t.name}
            </button>
          );
        })}
      </div>

      {/* Pokemon List */}
      {isLoading ? (
        <div className="text-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-500">포켓몬을 불러오는 중...</p>
        </div>
      ) : currentType ? (
        <>
          <div className="mb-4 text-gray-600 font-medium">
            총 {pokemonList.length}마리의 포켓몬이 발견되었습니다.
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {pokemonList.map((p: PokemonTypeEntry) => {
              const urlParts = p.pokemon.url.split("/");
              const id = urlParts[urlParts.length - 2];
              return <PokemonCard key={id} indexId={Number(id)} />;
            })}
          </div>
        </>
      ) : (
        <div className="text-center text-gray-500 py-20 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-lg">보고 싶은 포켓몬 타입을 선택해주세요!</p>
        </div>
      )}
    </div>
  );
}

export default function TypePage() {
  return (
    <Suspense fallback={<div className="text-center py-20">로딩중...</div>}>
      <TypePageContent />
    </Suspense>
  );
}
