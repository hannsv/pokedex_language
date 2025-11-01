import PokemonCard from "@/app/_components/card/pokemonCard";
import RandomPokemonCard from "@/app/_components/card/RandomPokemonCard";

export default function PokemonPage() {
  return (
    <div className="flex flex-col items-center justify-center">
      {/* 포켓몬 랜덤 카드 */}
      <RandomPokemonCard />
      <div className="grid grid-cols-3  rounded-lg w-full bg-white text-black">
        <PokemonCard />
      </div>
    </div>
  );
}
