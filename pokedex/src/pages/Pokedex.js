import { useEffect, useState } from "react";
import axios from "axios";

export default function Pokedex() {
  // const [pokemonData, setPokemonData] = useState([]);
  // useEffect(() => {
  //   const fetData = async () => {
  //     const allPokemonData = [];
  //     for (let i = 1; i <= 10; i++) {
  //       const response = await axios.get(
  //         `https://pokeapi.co/api/v2/pokemon/${i}`
  //       );
  //       const speciesResponse = await axios.get(
  //         `https://pokeapi.co/api/v2/pokemon-species/${i}`
  //       );
  //       const koreanName = speciesResponse.data.names.find(
  //         (name) => name.language.name === "ko"
  //       );
  //       allPokemonData.push({ ...response.data, korean_name: koreanName.name });
  //     }
  //     setPokemonData(allPokemonData);
  //   };
  //   fetData();
  // }, []);

  return <div>pokedex</div>;
}
