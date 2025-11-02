/**
 *
 * @component
 * @description 포켓몬 메인페이지 카드 컴포넌트. 도감번호, 이름, 이미지, 타입 순으로 세로 정렬 배치
 */

interface PokemonCardProps {
  indexId: number;
}

//pokeapi.co/api/v2/pokemon/1/
export default function PokemonCard({ indexId }: PokemonCardProps) {
  fetch(`https://pokeapi.co/api/v2/pokemon/${indexId || 25}/`).then(
    (response) => {
      console.log("포켓몬 데이터:", response);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    }
  );

  https: indexId = indexId || 25; // 기본값으로 피카츄 도감번호 설정

  return (
    <div className="border border-gray-300 p-2 rounded-lg shadow-lg h-80px flex flex-col items-center justify-center bg-white m-2">
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${indexId}.png`}
        alt="Pokémon Image"
        className="h-32 mb-2 border border-gray-200 rounded-lg cursor-pointer"
      />
      {/* 포켓몬 이름 */}
      <div className=" font-bold mb-2">Pokémon Name</div>
      {/* 포켓몬 타입 */}
      <div className="text-gray-600">Type: Electric</div>
    </div>
  );
}
