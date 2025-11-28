import { getDictionary } from "@/app/lib/dictionaries/get-dictionary";
import PokemonListClient from "./PokemonListClient";

interface PageProps {
  params: Promise<{ lang: "ko" | "en" | "zh" }>;
}

export default async function Page({ params }: PageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return <PokemonListClient dict={dict} lang={lang} />;
}
