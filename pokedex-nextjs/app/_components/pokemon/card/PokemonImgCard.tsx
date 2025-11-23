interface PokemonImgCardProps {
  indexId: number;
}

export default function PokemonImgCard({ indexId }: PokemonImgCardProps) {
  console.log("포켓몬 이미지 카드 indexId:", indexId);

  return (
    <img
      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${indexId}.png`}
      alt="Pokémon Image"
      className="h-32 mb-2 border border-gray-200 rounded-lg cursor-pointer"
    />
  );
}
