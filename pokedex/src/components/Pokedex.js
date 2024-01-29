import { useEffect, useState } from "react";
import axios from "axios";

export default function Pokedex() {
  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    const fetData = async () => {
      const allPokemonData = [];
      for (let i = 1; i <= 151; i++) {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${i}`
        );
        const speciesResponse = await axios.get(
          `https://pokeapi.co/api/v2/pokemon-species/${i}`
        );
        const koreanName = speciesResponse.data.names.find(
          (name) => name.language.name === "ko"
        );
        allPokemonData.push({ ...response.data, korean_name: koreanName.name });
      }
      setPokemonData(allPokemonData);
    };
    fetData();
  }, []);
  
  const renderPokeList = () => {
    return pokemonData.map((pokemon)=>(
      <div>
        <img src={pokemon.sprites.front_default} alt={pokemon.korean_name}/>
        <p>{pokemon.korean_name}</p>
        <p>ID: {pokemon.id}</p>
      </div>
    ))
  }

  return <div>
    {renderPokeList()}
  </div>;
}