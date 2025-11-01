export default function PokemonCard(indexId?: number) {
  indexId = indexId || 25; // 기본값으로 피카츄 도감번호 설정

  return (
    <div className="border border-gray-300 p-2 rounded-lg shadow-lg h-80px flex flex-col items-center justify-center bg-white m-2">
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png`}
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
