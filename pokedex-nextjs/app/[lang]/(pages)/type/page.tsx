import { getDictionary } from "@/app/lib/dictionaries/get-dictionary";
import TypeCalculatorClient from "./TypeCalculatorClient";

interface PageProps {
  params: Promise<{ lang: "ko" | "en" | "zh" }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return {
    title: dict.type_calc.title,
    description: dict.type_calc.description,
  };
}

export default async function TypeCalculatorPage({ params }: PageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return <TypeCalculatorClient dict={dict} lang={lang} />;
}
