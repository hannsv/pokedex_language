export const getPokemonKoreanName = async (id: number) => {
  const resp = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}/`);
  const data = await resp.json();
  const koreanNameItem = data.names.find(
    (n: { language: { name: string } }) => n.language.name === "ko"
  );
  return koreanNameItem ? koreanNameItem.name : data.name; // 한글이 없으면 영문 이름 fallback
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
