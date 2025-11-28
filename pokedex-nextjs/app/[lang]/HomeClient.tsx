"use client";

import { useState, useEffect } from "react";
import RandomPokemonCard from "@/app/_components/pokemon/card/RandomPokemonCard";
import RandomTrivia from "@/app/_components/home/RandomTrivia";

interface HomeClientProps {
  lang: "ko" | "en" | "zh";
  dict: any;
}

export default function HomeClient({ lang, dict }: HomeClientProps) {
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
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-[#EAEAEA] mb-2">
          {dict?.home?.random_card_title || "오늘의 포켓몬"}
        </h1>
      </div>
      <RandomPokemonCard
        pokemonId={pokemonId}
        onNext={handleNext}
        onPrev={handlePrevious}
        lang={lang}
      />
      <RandomTrivia trigger={pokemonId} lang={lang} />
    </div>
  );
}
