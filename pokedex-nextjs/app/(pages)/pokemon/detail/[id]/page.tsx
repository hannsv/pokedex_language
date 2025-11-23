"use client";

import TypeCard from "@/app/_components/pokemon/type/TypeCard";
import { getPokemonByNumber } from "@/app/lib/api/pokemon";
import React, { useEffect, useState } from "react";
import { getPokemonKoreanName } from "@/app/lib/api/pokemon-to-language";

// params 타입을 올바르게 정의
interface PokeDetailProps {
  params: {
    id: string; // 디렉토리 이름과 일치시키기
  };
}

interface PokemonData {
  id: number;
  name: string;
  types: Array<{
    type: {
      name: string;
    };
  }>;
  // 필요한 다른 필드들 추가
}

export default function PokemonDetailPage({
  params,
}: {
  // promise 형태로 받기
  params: Promise<{ id: string }>;
}) {
  // next 16v 부턴 params가 프로미스 형태로 전달됨
  // 따라서 React.use로 해제 필요
  const paramsId = React.use(params).id;

  const [pokemonData, setPokemonData] = useState<PokemonData | null>(null);
  const [pokemonName, setPokemonName] = useState<string>("");
  const [pokemonTypes, setPokemonTypes] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        setIsLoading(true);
        // param.id는 문자열이므로 숫자로 변환
        const pokeNum = parseInt(paramsId, 10);
        const data = await getPokemonByNumber(pokeNum);
        console.log("가져온 포켓몬 데이터:", data);
        setPokemonData(data);
        const types = data.types.map((typeInfo: any) => typeInfo.type.name);
        console.log("포켓몬 타입:", types);
        setPokemonTypes(types);
        const koreanName = await getPokemonKoreanName(pokeNum);
        setPokemonName(koreanName);
      } catch (error) {
        console.error("포켓몬 데이터를 가져오는 중 오류 발생:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPokemonData();
  }, [params]);

  return (
    <div className=" p-4 rounded-lg">
      {isLoading ? (
        <div className="">
          <img
            className="w-2/12 object-contain animate-spin mx-auto"
            src="/skeleton-monsterball.png"
            alt="loading"
          />
        </div>
      ) : pokemonData ? (
        <div>
          <p className="text-gray-600">No. {pokemonData.id}</p>

          <div className="flex flex-row gap-2">
            <h1 className="text-2xl font-bold">{pokemonName}</h1>
            <p className="text-sm text-gray-600 mt-2"> {pokemonData.name}</p>
          </div>

          <div className="mt-4 items-center justify-around flex">
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonData.id}.png`}
              alt={pokemonData.name}
              className="h-48 mb-2 border border-gray-200 rounded-lg cursor-pointer hover:scale-105 transition-transform"
            />
          </div>
          <div className="flex justify-center items-center mt-4">
            {pokemonTypes.map((type, index) => (
              <TypeCard key={index} typeNames={type} />
            ))}
          </div>
        </div>
      ) : (
        <div>포켓몬 데이터를 불러올 수 없습니다.</div>
      )}
    </div>
  );
}
