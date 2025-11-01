import axios from "axios";

export default function RandomPokemonCard() {
  const randomNumber = Math.floor(Math.random() * 1000) + 1; // 1부터 151 사이의 랜덤 숫자 생성

  const pokemonKoreanName = async (pokeNum: number, pokeName: string) => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon-species/${randomNumber}`
      );
      const result =
        response.data.names.find((name: Name) => name.language.name === "ko")
          .name || pokeName;

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

  // console.log("포켓몬 한국어 이름:", pokemonKoreanName);

  return (
    <div className="border border-gray-300 p-4 rounded-lg shadow-lg h-80px flex flex-col items-center justify-center bg-white m-2">
      <div className="text-sm text-gray-600">No.{randomNumber}</div>
      <div className=" font-bold mb-2">
        {pokemonKoreanName(randomNumber, "Pokémon Name")}
      </div>
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${randomNumber}.png`}
        alt="오늘의 포켓몬"
        width={100}
        height={100}
      />
      {/* 포켓몬 이름 */}

      {/* 포켓몬 타입 */}
      <div className="text-gray-600">Type: Electric</div>
    </div>
  );
}
