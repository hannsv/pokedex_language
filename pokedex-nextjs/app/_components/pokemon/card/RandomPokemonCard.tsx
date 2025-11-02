import axios from "axios";

/**
 *
 * @component
 * @description 랜덤 포켓몬 카드 컴포넌트
 */
export default function RandomPokemonCard() {
  "use client";

  interface PokemonCard {
    id: number;
    name: string;
    types: { type: { name: string } }[];
  }

  const randomNumber = Math.floor(Math.random() * 1000) + 1;

  const typeNames = {
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

  const types = {
    1: "",
    2: "",
  };

  const pokemonKoreanName = async (pokeNum: number, pokeName: string) => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon-species/${randomNumber}`
      );
      const result =
        response.data.names.find(
          (name: { language: { name: string }; name: string }) =>
            name.language.name === "ko"
        ).name || pokeName;
      console.log("포켓몬 한국어 이름:", response);
      return result;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log("데이터가 없는 포켓몬입니다.");
        return pokeName;
      } else {
        console.log("데이터를  가져오는 중 오류가 발생했습니다.");
        return;
      }
    }
  };

  return (
    <div className="border border-gray-300 p-4 rounded-lg shadow-lg h-80px flex flex-col items-center justify-center bg-white m-2">
      {/* 도감번호 */}
      <div className="text-sm text-gray-600">No.{randomNumber}</div>
      {/* 포켓몬 이름 */}
      <div className=" font-bold mb-2">
        {pokemonKoreanName(randomNumber, "Pokémon Name")}
      </div>
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${randomNumber}.png`}
        alt="오늘의 포켓몬"
        width={100}
        height={100}
      />

      {/* 포켓몬 타입 */}
      <div className="text-gray-600">
        Type: {Object.values(types).join(", ")}
      </div>
    </div>
  );
}
