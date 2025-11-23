/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  getEvolutionChain,
  getEvolutionChainBySpeciesUrl,
} from "@/app/lib/api/pokemon";
import { getPokemonKoreanName } from "@/app/lib/api/pokemon-to-language";
import { EvolutionNode } from "@/app/lib/types/types";

interface PokemonEvolutionChainProps {
  pokemonId?: number;
  speciesUrl?: string;
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
}: PokemonEvolutionChainProps) {
  const [evolutionChain, setEvolutionChain] = useState<
    { name: string; id: string; koreanName?: string }[]
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
        const evoListWithKorean = await Promise.all(
          evoList.map(async (p) => {
            const kName = await getPokemonKoreanName(parseInt(p.id));
            return { ...p, koreanName: kName };
          })
        );
        setEvolutionChain(evoListWithKorean);
      } catch (e) {
        console.error("진화 정보를 가져오는 중 오류:", e);
      }
    };

    fetchEvolutionData();
  }, [pokemonId, speciesUrl]);

  if (evolutionChain.length === 0) {
    return null;
  }

  return (
    <div className="w-full mb-6">
      <h2 className="text-xl font-bold mb-3 text-gray-700 border-b pb-2">
        진화 정보
      </h2>
      <div className="flex flex-wrap justify-center items-center gap-4">
        {evolutionChain.map((evo, index) => (
          <div key={index} className="flex items-center">
            <Link
              href={`/pokemon/detail/${evo.id}`}
              className="flex flex-col items-center group"
            >
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-2 border-2 border-transparent group-hover:border-blue-400 transition-all">
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${evo.id}.png`}
                  alt={evo.name}
                  className="w-20 h-20 object-contain"
                />
              </div>
              <span className="text-sm font-bold text-gray-700 group-hover:text-blue-600">
                {evo.koreanName || evo.name}
              </span>
            </Link>
            {index < evolutionChain.length - 1 && (
              <span className="mx-2 text-gray-400 text-2xl">→</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
