interface TypeCardProps {
  typeName: string;
  secondType: string | undefined;

  typeNameKorean: string;
}

const typeFilter = (num: number) => {
  return Object.entries(typeNames).find(([key, value]) => {
    return value === `https://pokeapi.co/api/v2/type/${num}/`;
  });
};

export const pokemonTypes = [
  { name: "노말", en: "normal", color: "#A8A77A" },
  { name: "불꽃", en: "fire", color: "#EE8130" },
  { name: "물", en: "water", color: "#6390F0" },
  { name: "전기", en: "electric", color: "#F7D02C" },
  { name: "풀", en: "grass", color: "#7AC74C" },
  { name: "얼음", en: "ice", color: "#96D9D6" },
  { name: "격투", en: "fighting", color: "#C22E28" },
  { name: "독", en: "poison", color: "#A33EA1" },
  { name: "땅", en: "ground", color: "#E2BF65" },
  { name: "비행", en: "flying", color: "#A98FF3" },
  { name: "에스퍼", en: "psychic", color: "#F95587" },
  { name: "벌레", en: "bug", color: "#A6B91A" },
  { name: "바위", en: "rock", color: "#B6A136" },
  { name: "고스트", en: "ghost", color: "#735797" },
  { name: "드래곤", en: "dragon", color: "#6F35FC" },
  { name: "악", en: "dark", color: "#705746" },
  { name: "강철", en: "steel", color: "#B7B7CE" },
  { name: "페어리", en: "fairy", color: "#D685AD" },
];

const typeNameToKorean = (num: number) => {
  const typeKoreanMapping: { [key: string]: string } = {
    normal: "노말",
    fighting: "격투",
    flying: "비행",
    poison: "독",
    ground: "땅",
    rock: "바위",
    bug: "벌레",
    ghost: "고스트",
    steel: "강철",
    fire: "불꽃",
    water: "물",
    grass: "풀",
    electric: "전기",
    psychic: "에스퍼",
    ice: "얼음",
    dragon: "드래곤",
    dark: "악",
    fairy: "페어리",
    stellar: "별자리",
    shadow: "그림자",
    unknown: "알 수 없음",
  };

  return typeKoreanMapping[typeName] || typeName;
};

const typeNames = {
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

export default function TypeCard({ typeName, secondType }: TypeCardProps) {
  // console.log("타입 한글:", typeKorean[1]);

  return (
    <div className="border border-gray-300 p-2 rounded-lg shadow-lg h-80px flex flex-col items-center justify-center bg-white m-2">
      <div className=" font-bold mb-2">Type Name</div>
    </div>
  );
}
