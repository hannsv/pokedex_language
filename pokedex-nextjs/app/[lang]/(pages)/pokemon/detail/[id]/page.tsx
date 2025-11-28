import pokemonDataRaw from "@/data/pokemon.json";
import PokemonDetailClient from "@/app/_components/pokemon/detail/PokemonDetailClient";
import { getDictionary } from "@/app/lib/dictionaries/get-dictionary";

// 정적 파라미터 생성 (빌드 시 실행)
export async function generateStaticParams() {
  const languages = ["ko", "en", "zh"];
  const pokemonList = pokemonDataRaw as { url: string }[];

  const params = [];
  for (const lang of languages) {
    for (const pokemon of pokemonList) {
      const id = pokemon.url.split("/").filter(Boolean).pop();
      if (id) {
        params.push({ lang, id });
      }
    }
  }
  return params;
}

// 포켓몬 상세페이지 컴포넌트 (Server Component)
export default async function PokemonDetailPage({
  params,
}: {
  params: Promise<{ id: string; lang: "ko" | "en" | "zh" }>;
}) {
  const { id, lang } = await params;
  const dict = await getDictionary(lang);
  return <PokemonDetailClient id={id} lang={lang} dict={dict} />;
}
