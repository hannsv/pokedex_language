/* eslint-disable @next/next/no-img-element */
"use client";

import TypeCard from "@/app/_components/pokemon/type/TypeCard";
import PokemonEvolutionChain from "@/app/_components/pokemon/detail/PokemonEvolutionChain";
import TypeMatchup from "@/app/_components/pokemon/detail/TypeMatchup";
import PokemonMoves from "@/app/_components/pokemon/detail/PokemonMoves";
import { getPokemonByNumber } from "@/app/lib/api/pokemon";
import { getFormKoreanName } from "@/app/lib/api/pokemon-to-language";
import { PokemonData } from "@/app/lib/types/types";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function PokemonDetailClient({ id }: { id: string }) {
  const router = useRouter();
  const [pokemonData, setPokemonData] = useState<PokemonData | null>(null);
  const [pokemonName, setPokemonName] = useState<string>("");
  const [pokemonEngName, setPokemonEngName] = useState<string>("");
  const [pokemonDescription, setPokemonDescription] = useState<string>("");
  const [pokemonTypes, setPokemonTypes] = useState<string[]>([]);
  const [pokemonAbilities, setPokemonAbilities] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isShiny, setIsShiny] = useState(false);

  const pokeNum = parseInt(id, 10);

  const handlePrev = () => {
    if (pokeNum > 1) {
      router.push(`/pokemon/detail/${pokeNum - 1}`);
    }
  };

  const handleNext = () => {
    if (pokeNum < 1025) {
      router.push(`/pokemon/detail/${pokeNum + 1}`);
    }
  };

  useEffect(() => {
    // Check session storage for shiny preference
    const savedShiny = sessionStorage.getItem("pokemon_list_shiny");
    if (savedShiny === "true") {
      setIsShiny(true);
    }
  }, []);

  useEffect(() => {
    const currentId = parseInt(id, 10);
    // Save current pokemon ID for scroll restoration
    sessionStorage.setItem("last_viewed_pokemon_id", currentId.toString());

    // Ensure list count is enough to show this pokemon (heuristic)
    const savedCount = sessionStorage.getItem("pokemon_list_count");
    const currentCount = savedCount ? parseInt(savedCount, 10) : 20;
    if (currentId > currentCount) {
      sessionStorage.setItem(
        "pokemon_list_count",
        Math.max(currentCount, currentId).toString()
      );
    }

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

        const englishName =
          speciesData.names.find(
            (n: { language: { name: string }; name: string }) =>
              n.language.name === "en"
          )?.name || "";

        // 10000번대 이상인 경우 폼 이름 추가
        if (pokeNum > 10000) {
          const formName = getFormKoreanName(data.name);
          koreanName += formName;
        }

        setPokemonName(koreanName);
        setPokemonEngName(englishName);

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
    <div className="max-w-4xl mx-auto p-0 md:p-4 relative">
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <img
            className="w-20 h-20 object-contain animate-spin"
            src="/skeleton-monsterball.png"
            alt="loading"
          />
        </div>
      ) : pokemonData ? (
        <div className="flex flex-col items-center relative">
          {/* Back Button */}
          <button
            onClick={() => router.push("/pokemon")}
            className="absolute left-2 top-2 p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-[#FFD700] dark:hover:bg-[#333] rounded-full transition-colors z-10"
            aria-label="목록으로"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="w-full flex justify-center items-center px-4 mb-2 mt-14 md:mt-8 relative">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-800 dark:text-[#EAEAEA]">
                {pokemonName}
              </h1>
              <p className="text-lg text-gray-400 dark:text-gray-500 font-medium">
                {pokemonEngName}
              </p>
            </div>
            <div className="absolute right-4 flex flex-col items-end gap-1">
              {pokemonData.id <= 10000 ? (
                <span className="text-xl text-gray-500 dark:text-gray-400 font-mono">
                  No.{String(pokemonData.id).padStart(4, "0")}
                </span>
              ) : (
                <span className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full text-sm font-bold">
                  Special
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between md:justify-center gap-2 md:gap-6 w-full mb-6 px-4 md:px-0">
            <button
              onClick={handlePrev}
              disabled={pokeNum <= 1}
              className="p-2 text-gray-300 hover:text-gray-500 hover:bg-gray-100 dark:text-gray-600 dark:hover:text-[#FFD700] dark:hover:bg-[#333] rounded-full transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="이전 포켓몬"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <div className="relative w-[60vw] h-[60vw] max-w-64 max-h-64 bg-gray-100 dark:bg-[#121212] dark:border dark:border-[#FFD700] rounded-full flex items-center justify-center shadow-inner group">
              <img
                src={
                  isShiny
                    ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${pokemonData.id}.png`
                    : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonData.id}.png`
                }
                alt={pokemonData.name}
                className="w-[75%] h-[75%] object-contain hover:scale-110 transition-transform duration-300"
              />
              {/* Shiny Toggle Button */}
              <button
                onClick={() => {
                  const newState = !isShiny;
                  setIsShiny(newState);
                  sessionStorage.setItem(
                    "pokemon_list_shiny",
                    String(newState)
                  );
                }}
                className={`absolute bottom-2 right-2 p-2 rounded-full shadow-md transition-all ${
                  isShiny
                    ? "bg-yellow-400 text-white ring-2 ring-yellow-200"
                    : "bg-white text-gray-400 hover:text-yellow-500 dark:bg-[#333] dark:text-gray-500 dark:hover:text-[#FFD700]"
                }`}
                title={
                  isShiny ? "기본 모습 보기" : "이로치(색이 다른) 모습 보기"
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                  <path d="M3 3v5h5" />
                  <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
                  <path d="M16 21h5v-5" />
                </svg>
              </button>
            </div>

            <button
              onClick={handleNext}
              disabled={pokeNum >= 1025}
              className="p-2 text-gray-300 hover:text-gray-500 hover:bg-gray-100 dark:text-gray-600 dark:hover:text-[#FFD700] dark:hover:bg-[#333] rounded-full transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="다음 포켓몬"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>

          <div className="flex gap-2 mb-6">
            {pokemonTypes.map((type, index) => (
              <TypeCard key={index} typeNames={type} />
            ))}
          </div>

          <div className="w-full bg-gray-50 dark:bg-[#121212] dark:border dark:border-[#FFD700] p-6 rounded-lg shadow-sm mb-6">
            <h2 className="text-xl font-bold mb-3 text-gray-700 dark:text-[#EAEAEA] border-b dark:border-gray-700 pb-2">
              특징
            </h2>
            <p className="text-gray-700 dark:text-[#EAEAEA] text-lg leading-relaxed whitespace-pre-line text-center">
              {pokemonDescription}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 w-full mb-6">
            <div className="bg-blue-50 dark:bg-[#121212] dark:border dark:border-[#FFD700] p-4 rounded-lg text-center">
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">
                키
              </p>
              <p className="text-xl font-semibold dark:text-[#EAEAEA]">
                {pokemonData.height / 10} m
              </p>
            </div>
            <div className="bg-blue-50 dark:bg-[#121212] dark:border dark:border-[#FFD700] p-4 rounded-lg text-center">
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">
                몸무게
              </p>
              <p className="text-xl font-semibold dark:text-[#EAEAEA]">
                {pokemonData.weight / 10} kg
              </p>
            </div>
          </div>

          <div className="w-full mb-6">
            <h2 className="text-xl font-bold mb-3 text-gray-700 dark:text-[#EAEAEA] border-b dark:border-gray-700 pb-2">
              기본 능력치
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {pokemonData.stats.map((stat) => (
                <div
                  key={stat.stat.name}
                  className="bg-gray-100 dark:bg-[#2C2C2C] p-3 rounded-md flex flex-col items-center"
                >
                  <span className="text-xs text-gray-500 dark:text-gray-400 uppercase font-bold">
                    {stat.stat.name}
                  </span>
                  <span className="text-lg font-bold text-blue-600 dark:text-[#FFD700]">
                    {stat.base_stat}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full mb-6">
            <h2 className="text-xl font-bold mb-3 text-gray-700 dark:text-[#EAEAEA] border-b dark:border-gray-700 pb-2">
              특성
            </h2>
            <div className="flex flex-wrap gap-2">
              {pokemonAbilities.map((ability, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-yellow-100 text-yellow-800 dark:bg-[#333] dark:text-[#FFD700] dark:border dark:border-[#FFD700] rounded-full text-sm font-medium"
                >
                  {ability}
                </span>
              ))}
            </div>
          </div>

          {/* 진화 정보 */}
          <PokemonEvolutionChain speciesUrl={pokemonData.species.url} />

          {/* 방어 상성 */}
          <TypeMatchup types={pokemonTypes} />

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
