"use client";

import { useState, useEffect } from "react";

interface PokemonSpriteProps {
  indexId: number;
  isShiny?: boolean;
  alt: string;
  className?: string;
}

export default function PokemonSprite({
  indexId,
  isShiny = false,
  alt,
  className,
}: PokemonSpriteProps) {
  const [fallbackLevel, setFallbackLevel] = useState(0);

  useEffect(() => {
    setFallbackLevel(0);
  }, [indexId, isShiny]);

  const getSrc = () => {
    if (fallbackLevel === 0) {
      return isShiny
        ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${indexId}.png`
        : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${indexId}.png`;
    }
    if (fallbackLevel === 1) {
      return isShiny
        ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${indexId}.png`
        : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${indexId}.png`;
    }
    return "/skeleton-monsterball.png";
  };

  return (
    <img
      src={getSrc()}
      alt={alt}
      loading="lazy"
      onError={() => {
        if (fallbackLevel < 2) {
          setFallbackLevel((prev) => prev + 1);
        }
      }}
      className={className}
    />
  );
}
