"use client";

import { useState, useEffect } from "react";

import TypeCard from "../type/TypeCard";
import CardSelectButton from "./CardSelectButton";

import { getPokemonByNumber, getPokemonByType } from "@/app/lib/api/pokemon";
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
        const pokemonData = await getPokemonByNumber(pokemonNumber);
        const types = pokemonData.types.map(
          (typeInfo: any) => typeInfo.type.name
        );
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

  const randomNumber = Math.floor(Math.random() * 1000) + 1;

  // 이전 포켓몬
  const handlePrevious = () => {
    setPokemonNumber((prev) => (prev > 1 ? prev - 1 : 1000));
  };

  // 다음 포켓몬
  const handleNext = () => {
    setPokemonNumber((prev) => (prev < 1000 ? prev + 1 : 1));
  };

  // 랜덤 포켓몬
  const handleRandom = () => {
    setPokemonNumber(Math.floor(Math.random() * 1000) + 1);
  };

  return (
    <div className="flex items-center justify-center">
      <CardSelectButton string="◀" onClick={handlePrevious} />
      <div className="border border-gray-300 p-4 rounded-lg shadow-lg h-80px max-w-5/12 flex flex-col items-center justify-center bg-white m-2">
        {isLoading ? (
          <div className="w-[150px] h-[240px] animate-pulse rounded-md flex items-center justify-center">
            <img
              src="skeleton-monsterball.png"
              alt="loading"
              className="h-[50px] w-[50px]"
            />
          </div>
        ) : (
          <>
            <Link href={`/pokemon/detail/${pokemonNumber}`}>
              <div className="w-[150px] h-[240px]">
                <div className="text-sm text-gray-600">No.{pokemonNumber}</div>
                <div className=" font-bold mb-2">{pokemonName}</div>
                <img
                  className="w-full fit-contain"
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonNumber}.png`}
                  alt="랜덤포켓몬"
                />
                <div className="text-gray-600 text-sm flex flex-row justify-center">
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
