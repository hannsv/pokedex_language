"use client";

import { useState, useEffect } from "react";

import TypeCard from "../type/TypeCard";
import CardSelectButton from "./CardSelectButton";

import { PokemonData } from "@/app/lib/types/types";
import { getPokemonByNumber } from "@/app/lib/api/pokemon";
import { getPokemonKoreanName } from "@/app/lib/api/pokemon-to-language";
import Link from "next/link";

/**
 *
 * @component
 * @description 랜덤 포켓몬 카드 컴포넌트
 */
export default function RandomPokemonCard() {
  const [pokemonNumber, setPokemonNumber] = useState(
    Math.floor(Math.random() * 1000) + 1
  );
  const [pokemonName, setPokemonName] = useState("로딩 중...");
  const [pokemonTypes, setPokemonTypes] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        setIsLoading(true);
        const pokemonData: PokemonData = await getPokemonByNumber(
          pokemonNumber
        );
        const types = pokemonData.types.map((typeInfo) => typeInfo.type.name);
        setPokemonTypes(types);
        const koreanName = await getPokemonKoreanName(pokemonNumber);
        setPokemonName(koreanName);
      } catch (error) {
        console.error("포켓몬 데이터를 가져오는 중 오류 발생:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPokemonData();
  }, [pokemonNumber]);

  // 이전 포켓몬
  const handlePrevious = () => {
    setPokemonNumber((prev) => (prev > 1 ? prev - 1 : 1000));
  };

  // 다음 포켓몬
  const handleNext = () => {
    setPokemonNumber((prev) => (prev < 1000 ? prev + 1 : 1));
  };

  return (
    <div className="flex items-center justify-center">
      <CardSelectButton string="◀" onClick={handlePrevious} />
      <div className="border border-gray-300 p-4 rounded-lg shadow-lg w-[200px] h-[320px] flex flex-col items-center justify-center bg-white m-2">
        {isLoading ? (
          <div className="w-full h-full animate-pulse rounded-md flex items-center justify-center">
            <img
              src="skeleton-monsterball.png"
              alt="loading"
              className="h-[50px] w-[50px]"
            />
          </div>
        ) : (
          <>
            <Link
              href={`/pokemon/detail/${pokemonNumber}`}
              className="w-full h-full flex flex-col items-center"
            >
              <div className="w-full flex-1 flex flex-col items-center justify-between py-2">
                <div className="text-sm text-gray-600">No.{pokemonNumber}</div>
                <div className="font-bold text-lg mb-2">{pokemonName}</div>
                <div className="relative w-32 h-32 mb-2">
                  <img
                    className="w-full h-full object-contain"
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonNumber}.png`}
                    alt="랜덤포켓몬"
                  />
                </div>
                <div className="text-gray-600 text-sm flex flex-row justify-center gap-1">
                  {pokemonTypes.map((type, index) => (
                    <TypeCard key={index} typeNames={type} />
                  ))}
                </div>
              </div>
            </Link>
          </>
        )}
      </div>
      <CardSelectButton string="▶" onClick={handleNext} />
    </div>
  );
}
