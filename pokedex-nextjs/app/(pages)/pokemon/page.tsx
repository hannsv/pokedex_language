import PokemonCard from "@/app/_components/pokemon/card/pokemonCard";
import RandomPokemonCard from "@/app/_components/pokemon/card/RandomPokemonCard";
import DropDownFilter from "@/app/_components/pokemon/filter/DropDownFilter";

export default function PokemonPage() {
  return (
    <div className="flex flex-col items-center justify-center">
      {/* 필터 메뉴 */}
      <DropDownFilter />
      {/* 포켓몬 랜덤 카드 */}
      <RandomPokemonCard />
      <div className="grid grid-cols-3  rounded-lg w-full bg-white text-black">
        <PokemonCard num={1} />
        <PokemonCard num={2} />
        <PokemonCard num={3} />
        <PokemonCard num={4} />
        <PokemonCard num={5} />
        <PokemonCard num={6} />
        <PokemonCard num={7} />
        <PokemonCard num={8} />
        <PokemonCard num={9} />
      </div>
    </div>
  );
}
