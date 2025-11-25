import PokemonSprite from "./PokemonSprite";

interface PokemonImgCardProps {
  indexId: number;
  isShiny?: boolean;
}

export default function PokemonImgCard({
  indexId,
  isShiny = false,
}: PokemonImgCardProps) {
  console.log("포켓몬 이미지 카드 indexId:", indexId);

  return (
    <PokemonSprite
      indexId={indexId}
      isShiny={isShiny}
      alt="Pokémon Image"
      className="h-32 mb-2 border border-gray-200 rounded-lg cursor-pointer object-contain p-2 dark:border-gray-700 dark:bg-[#2C2C2C]"
    />
  );
}
