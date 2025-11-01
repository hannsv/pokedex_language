import PokemonCard from "@/app/_components/card/pokemonCard";

export default function PokemonPage() {
  return (
    <div className="flex items-center justify-center">
      <div className="grid grid-cols-3  rounded-lg w-11/12  bg-white text-black">
        <PokemonCard />
        <PokemonCard />
        <PokemonCard />
        <PokemonCard />
        <PokemonCard />
        <PokemonCard />
      </div>
    </div>
  );
}
