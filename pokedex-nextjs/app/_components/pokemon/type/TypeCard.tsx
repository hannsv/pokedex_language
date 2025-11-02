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

const typeKorean = [
  { type: "common", korean: "공통" },
  { type: "normal", korean: "노말" },
  { type: "fighting", korean: "격투" },
  { type: "flying", korean: "비행" },
  { type: "poison", korean: "독" },
  { type: "ground", korean: "땅" },
  { type: "rock", korean: "바위" },
  { type: "bug", korean: "벌레" },
  { type: "ghost", korean: "고스트" },
  { type: "steel", korean: "강철" },
  { type: "fire", korean: "불꽃" },
  { type: "water", korean: "물" },
  { type: "grass", korean: "풀" },
  { type: "electric", korean: "전기" },
  { type: "psychic", korean: "에스퍼" },
  { type: "ice", korean: "얼음" },
  { type: "dragon", korean: "드래곤" },
  { type: "dark", korean: "악" },
  { type: "fairy", korean: "페어리" },
  { type: "stellar", korean: "별자리" },
  { type: "shadow", korean: "그림자" },
  { type: "unknown", korean: "알 수 없음" },
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
