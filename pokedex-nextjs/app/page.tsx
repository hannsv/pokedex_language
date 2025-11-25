"use client";

import { useState, useEffect } from "react";
import RandomPokemonCard from "./_components/pokemon/card/RandomPokemonCard";
import RandomTrivia from "./_components/home/RandomTrivia";

// 루트 페이지
export default function Home() {
  const [pokemonId, setPokemonId] = useState(1);

  useEffect(() => {
    setPokemonId(Math.floor(Math.random() * 1000) + 1);
  }, []);

  const handlePrevious = () => {
    setPokemonId((prev) => (prev > 1 ? prev - 1 : 1000));
  };

  const handleNext = () => {
    setPokemonId((prev) => (prev < 1000 ? prev + 1 : 1));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] pb-20">
      <RandomPokemonCard
        pokemonId={pokemonId}
        onNext={handleNext}
        onPrev={handlePrevious}
      />
      <RandomTrivia trigger={pokemonId} />
    </div>
  );
}
