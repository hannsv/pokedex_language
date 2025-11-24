"use client";

/**
 *
 * @component
 * @description 포켓몬 메인페이지 카드 컴포넌트. 도감번호, 이름, 이미지, 타입 순으로 세로 정렬 배치
 */

import { useEffect, useState } from "react";

import {
  getPokemonKoreanName,
  getFormKoreanName,
} from "@/app/lib/api/pokemon-to-language";
import TypeCard from "../type/TypeCard";
import Link from "next/link";
import PokemonImgCard from "./PokemonImgCard";
import { PokemonData } from "@/app/lib/types/types";

interface PokemonCardProps {
  indexId: number;
  viewMode?: "grid" | "list";
}

//pokeapi.co/api/v2/pokemon/1/
export default function PokemonCard({
  indexId,
  viewMode = "grid",
}: PokemonCardProps) {
  const [isLoading, setIsLoading] = useState(true);

  const [pokemonName, setPokemonName] = useState<string>("");
  const [pokemonTypes, setPokemonTypes] = useState<string[]>([]);
  const [pokemonNumber, setPokemonNumber] = useState<number>(indexId);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        setIsLoading(true);
        setPokemonNumber(indexId);
        // 포켓몬 데이터 가져오기
        const data = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${indexId || 25}/`
        );
        const pokemonData: PokemonData = await data.json();

        // species url에서 id 추출하여 한글 이름 가져오기
        const speciesUrl = pokemonData.species.url;
        const speciesId = speciesUrl.split("/").filter(Boolean).pop();

        let koname = await getPokemonKoreanName(Number(speciesId));

        // 10000번대 이상인 경우 폼 이름 추가
        if (indexId > 10000) {
          const formName = getFormKoreanName(pokemonData.name);
          koname += formName;
        }

        setPokemonName(koname);
        //타입 가져오기
        const types = pokemonData.types.map((typeInfo) => typeInfo.type.name);
        setPokemonTypes(types);
        console.log("포켓몬 타입:", types);
      } catch (error) {
        console.error("포켓몬 데이터를 가져오는 중 오류 발생:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPokemonData();
  }, [indexId]);

  const handleCardClick = () => {
    // Save scroll position before navigation
    sessionStorage.setItem("pokemon_scroll_pos", window.scrollY.toString());
  };

  return (
    <div
      className={`border border-gray-300 rounded-lg shadow-lg bg-white transition-all hover:shadow-xl ${
        viewMode === "grid"
          ? "flex flex-col items-center justify-center p-2 h-full"
          : "flex flex-row items-center justify-between p-4 w-full h-auto"
      }`}
    >
      {isLoading ? (
        <div className="h-[180px] w-full animate-pulse rounded-md flex items-center justify-center">
          <img
            src="skeleton-monsterball.png"
            alt="loading"
            className="h-12 w-[50px]"
          />
        </div>
      ) : (
        <>
          {viewMode === "grid" ? (
            // Grid View Layout
            <>
              {pokemonNumber <= 10000 ? (
                <div className="text-xs text-gray-500 mb-1">
                  No.{pokemonNumber}
                </div>
              ) : (
                <div className="text-[10px] font-bold text-blue-600 bg-blue-100 px-1.5 py-0.5 rounded-full mb-1">
                  Special
                </div>
              )}
              <div className="font-bold mb-1 text-center break-keep text-sm h-10 flex items-center justify-center w-full leading-tight">
                {pokemonName}
              </div>
              <Link
                href={`/pokemon/detail/${indexId}`}
                className="w-full flex justify-center"
                onClick={handleCardClick}
              >
                <PokemonImgCard indexId={indexId} />
              </Link>
              <div className="flex flex-wrap justify-center gap-1 mt-1 w-full">
                {pokemonTypes.map((pokemonType, index) => (
                  <TypeCard key={index} typeNames={pokemonType} size="small" />
                ))}
              </div>
            </>
          ) : (
            // List View Layout
            <>
              <div className="flex items-center gap-4 flex-1">
                <Link
                  href={`/pokemon/detail/${indexId}`}
                  className="shrink-0"
                  onClick={handleCardClick}
                >
                  <div className="w-16 h-16 relative">
                    <img
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${indexId}.png`}
                      alt={pokemonName}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </Link>
                <div className="flex flex-col items-start">
                  {pokemonNumber <= 10000 ? (
                    <div className="text-xs text-gray-500">
                      No.{pokemonNumber}
                    </div>
                  ) : (
                    <div className="text-[10px] font-bold text-blue-600 bg-blue-100 px-1.5 py-0.5 rounded-full mb-0.5 w-fit">
                      Special
                    </div>
                  )}
                  <div className="font-bold text-lg">{pokemonName}</div>
                </div>
              </div>
              <div className="flex gap-1">
                {pokemonTypes.map((pokemonType, index) => (
                  <TypeCard key={index} typeNames={pokemonType} size="medium" />
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
