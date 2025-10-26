import React from 'react';

// Muestra el Pokémon seleccionado con su imagen y tipo
export default function DetallePokemon({ pokemon }) {
  if (!pokemon) {
    return (
      <div className="bg-gray-800 rounded-lg p-6 text-white text-center">
        <p>Select a Pokemon</p>
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
          <div className="text-gray-400">Loading...</div>
        )}
      </div>

      {/* Tipo */}
      <div className="bg-white rounded-lg p-3 text-center">
        <p className="text-gray-900 font-medium">
          Type: <span className="capitalize">{pokemon.types?.join(' / ') || 'Unknown'}</span>
        </p>
      </div>
    </div>
  );
}

//Comentarios de aprendizaje:
/*
  Optional chaining ---> ?.
    Previene errores al acceder a propiedades de un objeto que puede ser undefined o null.
    Ejemplo: pokemon.types?.join(' / ') || 'Desconocido'
    Si pokemon.types es undefined, se devuelve 'Desconocido'.

    Como concatena?
    pokemon.types?.join(' / ') || 'Desconocido'
    pokemon.types es un array, por lo que se usa join para convertirlo en una cadena de texto.
    
    // Pokémon con un tipo
    ['electric'].join(' / ')  
    // Resultado: "electric"

    // Pokémon con dos tipos
    ['fire', 'flying'].join(' / ')  
    // Resultado: "fire / flying"

    // Pokémon con tres tipos (raro pero posible)
    ['grass', 'poison', 'fairy'].join(' / ')
    // Resultado: "grass / poison / fairy"
*/