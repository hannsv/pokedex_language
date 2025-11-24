/* eslint-disable @next/next/no-img-element */
"use client";

import TypeCard from "@/app/_components/pokemon/type/TypeCard";
import PokemonEvolutionChain from "@/app/_components/pokemon/detail/PokemonEvolutionChain";
import PokemonMoves from "@/app/_components/pokemon/detail/PokemonMoves";
import { getPokemonByNumber } from "@/app/lib/api/pokemon";
import { getFormKoreanName } from "@/app/lib/api/pokemon-to-language";
import { PokemonData } from "@/app/lib/types/types";
import React, { useEffect, useState } from "react";

export default function PokemonDetailClient({ id }: { id: string }) {
  const [pokemonData, setPokemonData] = useState<PokemonData | null>(null);
  const [pokemonName, setPokemonName] = useState<string>("");
  const [pokemonDescription, setPokemonDescription] = useState<string>("");
  const [pokemonTypes, setPokemonTypes] = useState<string[]>([]);
  const [pokemonAbilities, setPokemonAbilities] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        setIsLoading(true);
        // param.id는 문자열이므로 숫자로 변환
        const pokeNum = parseInt(id, 10);
        const data = await getPokemonByNumber(pokeNum);
        console.log("가져온 포켓몬 데이터:", data);
        setPokemonData(data);
        const types = data.types.map(
          (typeInfo: { type: { name: string } }) => typeInfo.type.name
        );
        console.log("포켓몬 타입:", types);
        setPokemonTypes(types);

        // 특성 한글 이름 가져오기
        const abilityPromises = data.abilities.map(
          async (abilityInfo: { ability: { url: string } }) => {
            const res = await fetch(abilityInfo.ability.url);
            const abilityData = await res.json();
            const koreanAbility =
              abilityData.names.find(
                (n: { language: { name: string }; name: string }) =>
                  n.language.name === "ko"
              )?.name || abilityData.name;
            return koreanAbility;
          }
        );
        const abilities = await Promise.all(abilityPromises);
        setPokemonAbilities(abilities);

        // Species 데이터 가져오기 (이름, 설명)
        // pokemonData.species.url을 사용하여 정확한 species 정보 가져오기
        const speciesResponse = await fetch(data.species.url);
        const speciesData = await speciesResponse.json();

        let koreanName =
          speciesData.names.find(
            (n: { language: { name: string }; name: string }) =>
              n.language.name === "ko"
          )?.name || data.name;

        // 10000번대 이상인 경우 폼 이름 추가
        if (pokeNum > 10000) {
          const formName = getFormKoreanName(data.name);
          koreanName += formName;
        }

        setPokemonName(koreanName);

        const koreanFlavorText =
          speciesData.flavor_text_entries.find(
            (f: { language: { name: string }; flavor_text: string }) =>
              f.language.name === "ko"
          )?.flavor_text || "설명이 없습니다.";
        setPokemonDescription(koreanFlavorText);
      } catch (error) {
        console.error("포켓몬 데이터를 가져오는 중 오류 발생:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPokemonData();
  }, [id]);

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white rounded-xl shadow-md mt-10">
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <img
            className="w-20 h-20 object-contain animate-spin"
            src="/skeleton-monsterball.png"
            alt="loading"
          />
        </div>
      ) : pokemonData ? (
        <div className="flex flex-col items-center">
          <div className="w-full flex justify-between items-center px-4 mb-4">
            <h1 className="text-3xl font-bold text-gray-800">{pokemonName}</h1>
            {pokemonData.id <= 10000 ? (
              <span className="text-xl text-gray-500 font-mono">
                No.{String(pokemonData.id).padStart(4, "0")}
              </span>
            ) : (
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-bold">
                Special
              </span>
            )}
          </div>

          <div className="relative w-64 h-64 bg-gray-100 rounded-full flex items-center justify-center mb-6 shadow-inner">
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonData.id}.png`}
              alt={pokemonData.name}
              className="w-48 h-48 object-contain hover:scale-110 transition-transform duration-300"
            />
          </div>

          <div className="flex gap-2 mb-6">
            {pokemonTypes.map((type, index) => (
              <TypeCard key={index} typeNames={type} />
            ))}
          </div>

          <div className="w-full bg-gray-50 p-6 rounded-lg shadow-sm mb-6">
            <h2 className="text-xl font-bold mb-3 text-gray-700 border-b pb-2">
              특징
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line text-center">
              {pokemonDescription}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 w-full mb-6">
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <p className="text-gray-500 text-sm mb-1">키</p>
              <p className="text-xl font-semibold">
                {pokemonData.height / 10} m
              </p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <p className="text-gray-500 text-sm mb-1">몸무게</p>
              <p className="text-xl font-semibold">
                {pokemonData.weight / 10} kg
              </p>
            </div>
          </div>

          <div className="w-full mb-6">
            <h2 className="text-xl font-bold mb-3 text-gray-700 border-b pb-2">
              기본 능력치
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {pokemonData.stats.map((stat) => (
                <div
                  key={stat.stat.name}
                  className="bg-gray-100 p-3 rounded-md flex flex-col items-center"
                >
                  <span className="text-xs text-gray-500 uppercase font-bold">
                    {stat.stat.name}
                  </span>
                  <span className="text-lg font-bold text-blue-600">
                    {stat.base_stat}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full mb-6">
            <h2 className="text-xl font-bold mb-3 text-gray-700 border-b pb-2">
              특성
            </h2>
            <div className="flex flex-wrap gap-2">
              {pokemonAbilities.map((ability, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium"
                >
                  {ability}
                </span>
              ))}
            </div>
          </div>

          {/* 진화 정보 */}
          <PokemonEvolutionChain speciesUrl={pokemonData.species.url} />

          {/* 기술 정보 */}
          <PokemonMoves moves={pokemonData.moves} />
        </div>
      ) : (
        <div className="text-center text-gray-500 py-10">
          포켓몬 데이터를 불러올 수 없습니다.
        </div>
      )}
    </div>
  );
}
