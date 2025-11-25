"use client";

import { useState, useEffect } from "react";

import TypeCard from "../type/TypeCard";
import CardSelectButton from "./CardSelectButton";

import { PokemonData } from "@/app/lib/types/types";
import { getPokemonByNumber } from "@/app/lib/api/pokemon";
import { getPokemonKoreanName } from "@/app/lib/api/pokemon-to-language";
import Link from "next/link";

interface RandomPokemonCardProps {
  pokemonId: number;
  onNext: () => void;
  onPrev: () => void;
}

/**
 *
 * @component
 * @description 랜덤 포켓몬 카드 컴포넌트
 */
export default function RandomPokemonCard({
  pokemonId,
  onNext,
  onPrev,
}: RandomPokemonCardProps) {
  const [pokemonName, setPokemonName] = useState("로딩 중...");
  const [pokemonTypes, setPokemonTypes] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        setIsLoading(true);
        const pokemonData: PokemonData = await getPokemonByNumber(pokemonId);
        const types = pokemonData.types.map((typeInfo) => typeInfo.type.name);
        setPokemonTypes(types);
        const koreanName = await getPokemonKoreanName(pokemonId);
        setPokemonName(koreanName);
      } catch (error) {
        console.error("포켓몬 데이터를 가져오는 중 오류 발생:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPokemonData();
  }, [pokemonId]);

  return (
    <div className="flex items-center justify-center gap-4">
      <CardSelectButton string="◀" onClick={onPrev} />
      <div className="bg-white border-2 border-gray-800 rounded-xl p-4 w-[200px] h-[320px] flex flex-col items-center justify-center m-2 shadow-[4px_4px_0px_0px_rgba(31,41,55,1)] transition-transform hover:-translate-y-1">
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
              href={`/pokemon/detail/${pokemonId}`}
              className="w-full h-full flex flex-col items-center"
            >
              <div className="w-full flex-1 flex flex-col items-center justify-between py-2">
                <div className="text-sm text-gray-600">No.{pokemonId}</div>
                <div className="font-bold text-lg mb-2">{pokemonName}</div>
                <div className="relative w-32 h-32 mb-2">
                  <img
                    className="w-full h-full object-contain"
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`}
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
      <CardSelectButton string="▶" onClick={onNext} />
    </div>
  );
}
