"use client";

/**
 *
 * @component
 * @description 포켓몬 메인페이지 카드 컴포넌트. 도감번호, 이름, 이미지, 타입 순으로 세로 정렬 배치
 */

import { useEffect, useState, useRef } from "react";

import {
  getPokemonKoreanName,
  getFormKoreanName,
  getPokemonName,
} from "@/app/lib/api/pokemon-to-language";
import TypeCard from "../type/TypeCard";
import Link from "next/link";
import PokemonImgCard from "./PokemonImgCard";
import { PokemonData } from "@/app/lib/types/types";
import PokemonSprite from "./PokemonSprite";

interface PokemonCardProps {
  indexId: number;
  viewMode?: "grid" | "list";
  isShiny?: boolean;
  lang?: "ko" | "en" | "zh";
}

// Global cache for pokemon card data to prevent re-fetching on navigation
const pokemonCardCache: Record<string, { name: string; types: string[] }> = {};

//pokeapi.co/api/v2/pokemon/1/
export default function PokemonCard({
  indexId,
  viewMode = "grid",
  isShiny = false,
  lang = "ko",
}: PokemonCardProps) {
  // Check cache first
  const cacheKey = `${lang}-${indexId}`;
  const cachedData = pokemonCardCache[cacheKey];

  const [isLoading, setIsLoading] = useState(!cachedData);
  const [pokemonName, setPokemonName] = useState<string>(
    cachedData?.name || ""
  );
  const [pokemonTypes, setPokemonTypes] = useState<string[]>(
    cachedData?.types || []
  );
  const [pokemonNumber, setPokemonNumber] = useState<number>(indexId);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "50px" }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // If data is already cached, use it and skip fetch
    const cacheKey = `${lang}-${indexId}`;
    if (pokemonCardCache[cacheKey]) {
      setPokemonName(pokemonCardCache[cacheKey].name);
      setPokemonTypes(pokemonCardCache[cacheKey].types);
      setIsLoading(false);
      return;
    }

    if (!isVisible) return;

    const fetchPokemonData = async () => {
      try {
        setIsLoading(true);
        setPokemonNumber(indexId);
        // 포켓몬 데이터 가져오기
        const data = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${indexId || 25}/`
        );
        const pokemonData: PokemonData = await data.json();

        let displayName = pokemonData.name;
        const speciesUrl = pokemonData.species.url;
        const speciesId = speciesUrl.split("/").filter(Boolean).pop();

        if (lang === "ko") {
          let koname = await getPokemonKoreanName(Number(speciesId));

          // 10000번대 이상인 경우 폼 이름 추가
          if (indexId > 10000) {
            const formName = getFormKoreanName(pokemonData.name);
            koname += formName;
          }
          displayName = koname;
        } else if (lang === "zh") {
          displayName = await getPokemonName(Number(speciesId), "zh");
        } else {
          // English formatting (capitalize)
          displayName =
            pokemonData.name.charAt(0).toUpperCase() +
            pokemonData.name.slice(1);
        }

        // Save to cache
        pokemonCardCache[cacheKey] = {
          name: displayName,
          types: pokemonData.types.map((typeInfo) => typeInfo.type.name),
        };

        setPokemonName(displayName);
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
  }, [indexId, isVisible, lang]);

  const handleCardClick = () => {
    // Save scroll position before navigation
    sessionStorage.setItem("pokemon_scroll_pos", window.scrollY.toString());
  };

  return (
    <div
      ref={cardRef}
      id={`pokemon-card-${indexId}`}
      className={`border border-gray-300 dark:border-[#FFD700] rounded-lg shadow-lg bg-white dark:bg-[#1E1E1E] transition-all hover:shadow-xl ${
        viewMode === "grid"
          ? "flex flex-col items-center justify-center p-2 h-full"
          : "flex flex-row items-center justify-between p-4 w-full h-auto"
      }`}
    >
      {isLoading ? (
        <div className="h-[180px] w-full animate-pulse rounded-md flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <img
            src="/skeleton-monsterball.png"
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
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                  No.{pokemonNumber}
                </div>
              ) : (
                <div className="text-[10px] font-bold text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-200 px-1.5 py-0.5 rounded-full mb-1">
                  Special
                </div>
              )}
              <div className="font-bold mb-1 text-center break-keep text-sm h-10 flex items-center justify-center w-full leading-tight text-gray-900 dark:text-[#EAEAEA]">
                {pokemonName}
              </div>
              <Link
                href={`/${lang}/pokemon/detail/${indexId}`}
                className="w-full flex justify-center"
                onClick={handleCardClick}
              >
                <PokemonImgCard indexId={indexId} isShiny={isShiny} />
              </Link>
              <div className="flex flex-wrap justify-center gap-1 mt-1 w-full">
                {pokemonTypes.map((pokemonType, index) => (
                  <TypeCard
                    key={index}
                    typeNames={pokemonType}
                    size="small"
                    lang={lang}
                  />
                ))}
              </div>
            </>
          ) : (
            // List View Layout
            <>
              <div className="flex items-center gap-4 flex-1">
                <Link
                  href={`/${lang}/pokemon/detail/${indexId}`}
                  className="shrink-0"
                  onClick={handleCardClick}
                >
                  <div className="w-16 h-16 relative">
                    <PokemonSprite
                      indexId={indexId}
                      isShiny={isShiny}
                      alt={pokemonName}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </Link>
                <div className="flex flex-col items-start">
                  {pokemonNumber <= 10000 ? (
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      No.{pokemonNumber}
                    </div>
                  ) : (
                    <div className="text-[10px] font-bold text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-200 px-1.5 py-0.5 rounded-full mb-0.5 w-fit">
                      Special
                    </div>
                  )}
                  <div className="font-bold text-lg text-gray-900 dark:text-[#EAEAEA]">
                    {pokemonName}
                  </div>
                </div>
              </div>
              <div className="flex gap-1">
                {pokemonTypes.map((pokemonType, index) => (
                  <TypeCard
                    key={index}
                    typeNames={pokemonType}
                    size="medium"
                    lang={lang}
                  />
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
