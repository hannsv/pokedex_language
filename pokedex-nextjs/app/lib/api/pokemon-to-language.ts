export const getPokemonName = async (
  id: number,
  lang: "ko" | "en" | "zh" = "ko"
) => {
  const resp = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}/`);
  const data = await resp.json();

  const targetLang = lang === "zh" ? "zh-Hans" : lang;

  const nameItem = data.names.find(
    (n: { language: { name: string } }) => n.language.name === targetLang
  );

  // Fallback logic
  if (nameItem) return nameItem.name;

  // If zh-Hans not found, try zh-Hant
  if (lang === "zh") {
    const hantItem = data.names.find(
      (n: { language: { name: string } }) => n.language.name === "zh-Hant"
    );
    if (hantItem) return hantItem.name;
  }

  // Fallback to English name if target language not found, or capitalize name from data
  const enItem = data.names.find(
    (n: { language: { name: string } }) => n.language.name === "en"
  );

  return enItem ? enItem.name : data.name;
};

export const getPokemonKoreanName = async (id: number) => {
  return getPokemonName(id, "ko");
};

export const getFormKoreanName = (name: string): string => {
  if (name.includes("-mega-x")) return " (메가진화 X)";
  if (name.includes("-mega-y")) return " (메가진화 Y)";
  if (name.includes("-mega")) return " (메가진화)";
  if (name.includes("-alola")) return " (알로라 리전폼)";
  if (name.includes("-galar")) return " (가라르 리전폼)";
  if (name.includes("-hisui")) return " (히스이 리전폼)";
  if (name.includes("-paldea")) return " (팔데아 리전폼)";
  if (name.includes("-gmax")) return " (거다이맥스)";
  if (name.includes("-origin")) return " (오리진폼)";
  if (name.includes("-therian")) return " (영물폼)";

  return "";
};
