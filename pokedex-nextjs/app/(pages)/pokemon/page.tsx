import PokemonCard from "@/app/_components/pokemon/card/pokemonCard";
import RandomPokemonCard from "@/app/_components/pokemon/card/RandomPokemonCard";
import DropDownFilter from "@/app/_components/pokemon/filter/DropDownFilter";
import TypeCard from "@/app/_components/pokemon/type/TypeCard";

export default function PokemonPage() {
  const len = 15;

  return (
    <div className="flex flex-col items-center justify-center">
      {/* 필터 메뉴 */}
      <DropDownFilter />
      {/* 포켓몬 랜덤 카드 */}
      <RandomPokemonCard />
      <div className="grid grid-cols-3  rounded-lg w-full bg-white text-black">
        {Array.from({ length: len }, (_, index) => (
          <PokemonCard key={index} indexId={index + 1} />
        ))}
      </div>
    </div>
  );
}
