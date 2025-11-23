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
}

//pokeapi.co/api/v2/pokemon/1/
export default function PokemonCard({ indexId }: PokemonCardProps) {
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

  return (
    <div className="border border-gray-300 p-2 rounded-lg shadow-lg h-80px flex flex-col items-center justify-center bg-white m-2">
      {isLoading ? (
        <div className="h-[180px] w-[100px] animate-pulse rounded-md flex items-center justify-center">
          <img
            src="skeleton-monsterball.png"
            alt="loading"
            className="h-12 w-[50px]"
          />
        </div>
      ) : (
        <>
          {/* 도감번호 */}
          {pokemonNumber <= 10000 ? (
            <div className="text-sm text-gray-600">No.{pokemonNumber}</div>
          ) : (
            <div className="text-xs font-bold text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full mb-1">
              Special Form
            </div>
          )}
          {/* 포켓몬 이름 */}
          <div className=" font-bold mb-2 text-center break-keep">
            {pokemonName}
          </div>
          {/* 포켓몬 이미지 */}
          <Link href={`/pokemon/detail/${indexId}`}>
            <PokemonImgCard indexId={indexId} />
          </Link>

          {/* 포켓몬 타입 */}
          <div className="text-gray-600 text-sm flex flex-row justify-center">
            {pokemonTypes.map((pokemonType, index) => (
              <TypeCard key={index} typeNames={pokemonType} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
