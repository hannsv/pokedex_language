interface PokemonImgCardProps {
  indexId: number;
  isShiny?: boolean;
}

export default function PokemonImgCard({
  indexId,
  isShiny = false,
}: PokemonImgCardProps) {
  console.log("포켓몬 이미지 카드 indexId:", indexId);

  const imageUrl = isShiny
    ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${indexId}.png`
    : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${indexId}.png`;

  return (
    <img
      src={imageUrl}
      alt="Pokémon Image"
      className="h-32 mb-2 border border-gray-200 rounded-lg cursor-pointer object-contain p-2"
    />
  );
}
