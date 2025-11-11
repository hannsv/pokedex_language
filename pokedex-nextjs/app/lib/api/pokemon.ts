// 포켓몬 리스트 가져오기
export async function getPokemonList(limit = 151) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
  return res.json();
}
//포켓몬 번호로 찾기
export async function getPokemonByNumber(number: number) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${number}`);
  if (!res.ok) throw new Error("Not found");
  return res.json();
}

//포켓몬 이름으로 찾기 : en name to korean name
export async function getPokemonByName(name: string) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  if (!res.ok) throw new Error("Not found");
  return res.json();
}

//포켓몬 타입으로 찾기
export async function getPokemonByType(type: string) {
  const res = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
  if (!res.ok) throw new Error("Not found");
  return res.json();
}

//포켓몬 세대별로 찾기
export async function getPokemonByGeneration(generation: string) {
  const res = await fetch(`https://pokeapi.co/api/v2/generation/${generation}`);
  if (!res.ok) throw new Error("Not found");
  return res.json();
}
