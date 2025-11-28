/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  getEvolutionChain,
  getEvolutionChainBySpeciesUrl,
} from "@/app/lib/api/pokemon";
import { getPokemonName } from "@/app/lib/api/pokemon-to-language";
import { EvolutionNode } from "@/app/lib/types/types";

interface PokemonEvolutionChainProps {
  pokemonId?: number;
  speciesUrl?: string;
  lang: "ko" | "en" | "zh";
  dict: any;
}

function getEvolutionSpecies(
  chain: EvolutionNode
): { name: string; id: string }[] {
  let speciesList: { name: string; id: string }[] = [];
  const id = chain.species.url.split("/").filter(Boolean).pop()!;
  speciesList.push({ name: chain.species.name, id });

  if (chain.evolves_to.length > 0) {
    chain.evolves_to.forEach((node) => {
      speciesList = [...speciesList, ...getEvolutionSpecies(node)];
    });
  }
  return speciesList;
}

export default function PokemonEvolutionChain({
  pokemonId,
  speciesUrl,
  lang,
  dict,
}: PokemonEvolutionChainProps) {
  const [evolutionChain, setEvolutionChain] = useState<
    { name: string; id: string; displayName?: string }[]
  >([]);

  useEffect(() => {
    const fetchEvolutionData = async () => {
      try {
        let evoData;
        if (speciesUrl) {
          evoData = await getEvolutionChainBySpeciesUrl(speciesUrl);
        } else if (pokemonId) {
          evoData = await getEvolutionChain(pokemonId);
        } else {
          return;
        }

        const evoList = getEvolutionSpecies(evoData.chain);
        const evoListWithLang = await Promise.all(
          evoList.map(async (p) => {
            const dName = await getPokemonName(parseInt(p.id), lang);
            return { ...p, displayName: dName };
          })
        );
        setEvolutionChain(evoListWithLang);
      } catch (e) {
        console.error("진화 정보를 가져오는 중 오류:", e);
      }
    };

    fetchEvolutionData();
  }, [pokemonId, speciesUrl, lang]);

  if (evolutionChain.length === 0) {
    return null;
  }

  return (
    <div className="w-full mb-6">
      <h2 className="text-xl font-bold mb-3 text-gray-700 dark:text-[#EAEAEA] border-b dark:border-gray-700 pb-2">
        {dict.detail.evolution}
      </h2>
      <div className="flex flex-wrap justify-center items-center gap-4">
        {evolutionChain.map((evo, index) => (
          <div key={index} className="flex items-center">
            <Link
              href={`/${lang}/pokemon/detail/${evo.id}`}
              className="flex flex-col items-center group"
            >
              <div className="w-24 h-24 bg-gray-100 dark:bg-[#121212] dark:border dark:border-[#FFD700] rounded-full flex items-center justify-center mb-2 border-2 border-transparent group-hover:border-blue-400 transition-all">
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${evo.id}.png`}
                  alt={evo.name}
                  className="w-20 h-20 object-contain"
                />
              </div>
              <span className="text-sm font-bold text-gray-700 dark:text-[#EAEAEA] group-hover:text-blue-600 dark:group-hover:text-[#FFD700]">
                {evo.displayName || evo.name}
              </span>
            </Link>
            {index < evolutionChain.length - 1 && (
              <span className="mx-2 text-gray-400 dark:text-gray-500 text-2xl">
                →
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
