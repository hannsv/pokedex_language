import PokemonCard from "@/app/_components/pokemon/card/PokemonCard";
import DropDownFilter from "@/app/_components/pokemon/filter/DropDownFilter";

export default function PokemonListPage() {
  const len = 15;

  return (
    <div className="flex flex-col items-center justify-center">
      {/* 필터 메뉴 */}
      <DropDownFilter />
      <div className="grid grid-cols-3 rounded-lg w-full bg-white text-black gap-4 p-4">
        {Array.from({ length: len }, (_, index) => (
          <PokemonCard key={index} indexId={index + 1} />
        ))}
      </div>
    </div>
  );
}
