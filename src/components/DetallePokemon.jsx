{/*Pokemon seleccionado al hacer click en la lista*/}

import React from 'react';

export default function DetallePokemon({ pokemon }) {
  if (!pokemon) {
    return (
      <div className="bg-gray-800 rounded-lg p-6 text-white text-center">
        <p>Selecciona un Pokémon</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6 border-4 border-gray-700">
      {/* Nombre */}
      <div className="bg-white rounded-lg p-3 mb-4 text-center">
        <h2 className="text-xl font-bold capitalize text-gray-900">
          {pokemon.name}
        </h2>
      </div>

      {/* Imagen */}
      <div className="bg-white rounded-lg p-6 mb-4 flex items-center justify-center h-64">
        {pokemon.sprite ? (
          <img
            src={pokemon.sprite}
            alt={pokemon.name}
            className="w-full h-full object-contain pixelated"
          />
        ) : (
          <div className="text-gray-400">Cargando...</div>
        )}
      </div>

      {/* Tipo */}
      <div className="bg-white rounded-lg p-3 text-center">
        <p className="text-gray-900 font-medium">
          Tipo: <span className="capitalize">{pokemon.types?.join(' / ') || 'Desconocido'}</span>
        </p>
      </div>
    </div>
  );
}