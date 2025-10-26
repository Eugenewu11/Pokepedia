import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function PokemonCard({ pokemon, estaSeleccionado, alSeleccionar }) {
  const navigate = useNavigate();
  const pokemonId = pokemon.url.split('/').slice(-2, -1)[0];
  const spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;

  const handleClick = () => {
    navigate(`/pokemon/${pokemonId}`);
  };

  return (
    <div className='pokemon-card' onClick={handleClick}>
      <div
        className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ${
          estaSeleccionado
            ? 'bg-blue-300 border-2 border-blue-500'
            : 'bg-white hover:bg-gray-100 border-2 border-gray-300'
        }`}
      >
        {/* Sprite del Pokémon */}
        <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center">
          <img 
            src={spriteUrl} 
            alt={pokemon.name}
            className="w-full h-full object-contain pixelated"
            loading="lazy"
          />
        </div>

        {/* Nombre del Pokémon */}
        <span className="text-gray-900 font-medium capitalize flex-1">
          {pokemon.name}
        </span>
      </div>
    </div>
  );
}