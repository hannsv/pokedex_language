import axios from "axios";

export const getPokemonKoreanName = async (id: number) => {
  const resp = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}/`);
  const data = await resp.json();
  const koreanNameItem = data.names.find((n: any) => n.language.name === "ko");
  return koreanNameItem ? koreanNameItem.name : data.name; // 한글이 없으면 영문 이름 fallback
};
