import Image from "next/image";
import RandomPokemonCard from "./_components/pokemon/card/RandomPokemonCard";
import RandomTrivia from "./_components/home/RandomTrivia";

// 루트 페이지
export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] pb-20">
      <RandomPokemonCard />
      <RandomTrivia />
    </div>
  );
}
