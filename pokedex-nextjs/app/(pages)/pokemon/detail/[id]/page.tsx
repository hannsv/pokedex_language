"use client";

import TypeCard from "@/app/_components/pokemon/type/TypeCard";
import { getPokemonByNumber } from "@/app/lib/api/pokemon";
import React, { useEffect, useState } from "react";

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
  console.log(paramsId);

  const [pokemonData, setPokemonData] = useState<PokemonData | null>(null);
  const [pokemonName, setPokemonName] = useState<string>("");
  const [pkemonType, setPokemonType] = useState<string>("");
  const [typeList, setTypeList] = useState<string[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        // console.log("params 객체 전체:", params);
        // console.log("params.id:", params?.id);
        // console.log("타입:", typeof params?.id);

        setIsLoading(true);
        // param.id는 문자열이므로 숫자로 변환
        const idAsNumber = parseInt(paramsId, 10);
        const data = await getPokemonByNumber(idAsNumber);
        console.log("가져온 포켓몬 데이터:", data);
        setPokemonData(data);
        const types = data.types.map((typeInfo) => typeInfo.type.name);
        setPokemonName(data.name);

        setTypeList(types);
      } catch (error) {
        console.error("포켓몬 데이터를 가져오는 중 오류 발생:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPokemonData();
  }, [params]);

  return (
    <div className="p-4">
      {isLoading ? (
        <div>
          <img
            className="w-2/12 h-10/12 object-contain animate-spin mx-auto"
            src="/skeleton-monsterball.png"
            alt="loading"
          />
        </div>
      ) : pokemonData ? (
        <div>
          <h1 className="text-2xl font-bold mb-4">포켓몬 상세 정보</h1>
          <p>No. {pokemonData.id}</p>
          <p> {pokemonData.name}</p>

          <div className="mt-4 items-center justify-around flex">
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonData.id}.png`}
              alt={pokemonData.name}
              className="h-32 mb-2 border border-gray-200 rounded-lg cursor-pointer"
            />
          </div>

          <h2 className="text-xl font-semibold mt-4 mb-2">타입</h2>
          <div className="flex gap-2">
            {typeList.map((type) => (
              <TypeCard key={type} type={type} />
            ))}
          </div>
        </div>
      ) : (
        <div>포켓몬 데이터를 불러올 수 없습니다.</div>
      )}
    </div>
  );
}
