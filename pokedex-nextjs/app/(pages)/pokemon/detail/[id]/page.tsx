"use client";

import { useState, useEffect } from "react";

interface PokemonDetailPageProps {
  params: number;
}

export default function PokemonDetailPage({ params }: PokemonDetailPageProps) {
  const [pokemon, setPokemon] = useState<any>(null);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        console.log("Detail Page Params ID:", params);
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${params}`);
        const pokemon = await res.json();

        console.log("Fetched Pokémon Data:", pokemon);
        setPokemon(pokemon);
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      }
    };
    fetchPokemonData();
  }, [params]);

  return (
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold mb-4 capitalize">{params}</h1>
    </div>
  );
}
