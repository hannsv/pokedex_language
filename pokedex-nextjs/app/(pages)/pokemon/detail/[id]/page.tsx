import pokemonDataRaw from "@/data/pokemon.json";
import PokemonDetailClient from "@/app/_components/pokemon/detail/PokemonDetailClient";

// 정적 파라미터 생성 (빌드 시 실행)
export async function generateStaticParams() {
  return (pokemonDataRaw as { url: string }[]).map((pokemon) => {
    const id = pokemon.url.split("/").filter(Boolean).pop();
    return {
      id: id,
    };
  });
}

// 포켓몬 상세페이지 컴포넌트 (Server Component)
export default async function PokemonDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <PokemonDetailClient id={id} />;
}
