"use client";

/**
 *
 * @component
 * @description 포켓몬 메인페이지 카드 컴포넌트. 도감번호, 이름, 이미지, 타입 순으로 세로 정렬 배치
 */

import { useEffect, useState } from "react";

import { getPokemonKoreanName } from "@/app/lib/api/pokemon-to-language";

interface PokemonCardProps {
  indexId: number;
}

//pokeapi.co/api/v2/pokemon/1/
export default function PokemonCard({ indexId }: PokemonCardProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState<any>(null);
  const [pokemonName, setPokemonName] = useState<string>("");

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        setIsLoading(true);
        const data = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${indexId || 25}/`
        );
        const pokemonData = await data.json();
        setPokemonData(pokemonData);
        const pokemonName = await getPokemonKoreanName(pokemonData.name);
        setPokemonName(pokemonName.name);
      } catch (error) {
        console.error("포켓몬 데이터를 가져오는 중 오류 발생:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPokemonData();
  }, [indexId]);

  return (
    <div className="border border-gray-300 p-2 rounded-lg shadow-lg h-80px flex flex-col items-center justify-center bg-white m-2">
      {isLoading ? (
        <div className="h-[180px] w-[100px] animate-pulse rounded-md flex items-center justify-center">
          <img
            src="skeleton-monsterball.png"
            alt="loading"
            className="h-[48px] w-[50px]"
          />
        </div>
      ) : (
        <>
          {/* 포켓몬 이미지 */}
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${indexId}.png`}
            alt="Pokémon Image"
            className="h-32 mb-2 border border-gray-200 rounded-lg cursor-pointer"
          />
          {/* 포켓몬 이름 */}
          <div className=" font-bold mb-2">{pokemonName}</div>
          {/* 포켓몬 타입 */}
          <div className="text-gray-600">Type: Electric</div>
        </>
      )}
    </div>
  );
}
