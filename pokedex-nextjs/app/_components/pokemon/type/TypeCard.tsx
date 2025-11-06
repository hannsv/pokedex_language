import React from "react";
import { pokemonTypes } from "../../../lib/api/pokemonTypes";
import { typeStyleMap } from "../../../lib/api/pokemonTypes";

interface TypeCardProps {
  firstType: string;
  secondType: string | undefined;

  typeNames: string;
  typeNameKorean: string;
}

// const typeFilter = (num: number) => {
//   return Object.entries(typeNames).find(([key, value]) => {
//     return value === `https://pokeapi.co/api/v2/type/${num}/`;
//   });
// };

function enToColor(englishName: string) {
  const type = pokemonTypes.find((t) => t.en === englishName);
  console.log("type:", type);
  console.log("en:", englishName);
  console.log("colorName:", type?.colorName);
  return type ? type.colorName : "gray"; // 기본 색상
}

const typeNames1 = {
  common: "https://pokeapi.co/api/v2/type/",
  normal: "https://pokeapi.co/api/v2/type/1/",
  fighting: "https://pokeapi.co/api/v2/type/2/",
  flying: "https://pokeapi.co/api/v2/type/3/",
  poison: "https://pokeapi.co/api/v2/type/4/",
  ground: "https://pokeapi.co/api/v2/type/5/",
  rock: "https://pokeapi.co/api/v2/type/6/",
  bug: "https://pokeapi.co/api/v2/type/7/",
  ghost: "https://pokeapi.co/api/v2/type/8/",
  steel: "https://pokeapi.co/api/v2/type/9/",
  fire: "https://pokeapi.co/api/v2/type/10/",
  water: "https://pokeapi.co/api/v2/type/11/",
  grass: "https://pokeapi.co/api/v2/type/12/",
  electric: "https://pokeapi.co/api/v2/type/13/",
  psychic: "https://pokeapi.co/api/v2/type/14/",
  ice: "https://pokeapi.co/api/v2/type/15/",
  dragon: "https://pokeapi.co/api/v2/type/16/",
  dark: "https://pokeapi.co/api/v2/type/17/",
  fairy: "https://pokeapi.co/api/v2/type/18/",
  stellar: "https://pokeapi.co/api/v2/type/19/",
  shadow: "https://pokeapi.co/api/v2/type/20/",
  unknown: "https://pokeapi.co/api/v2/type/10001/",
};

export default function TypeCard({ typeNames }: TypeCardProps) {
  console.log("타입:", typeNames);

  const { bg, text } = typeStyleMap[typeNames] || {
    bg: "bg-gray-300",
    text: "text-black",
  };

  return (
    <div className="border rounded-md border-black-300 items-center justify-center m-1">
      <div
        className={`text-center flex-row px-2 rounded-md ${bg} ${text} text-xs`}
      >
        {typeNames}
      </div>
    </div>
  );
}
