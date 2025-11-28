import { getDictionary } from "@/app/lib/dictionaries/get-dictionary";
import HomeClient from "./HomeClient";

interface PageProps {
  params: Promise<{ lang: "ko" | "en" | "zh" }>;
}

export default async function Home({ params }: PageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return <HomeClient lang={lang} dict={dict} />;
}
