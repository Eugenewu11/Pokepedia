import React from 'react';
import { useParams } from 'react-router-dom';
import PerfilPokemon from './PerfilPokemon';

/**
 * Componente contenedor que simplemente renderiza el PerfilPokemon
 * Mantenido por compatibilidad con las rutas existentes
 */
const PokemonDetalle = () => {
  const { id } = useParams();
  
  // Simplemente renderizamos PerfilPokemon que ahora maneja su propio estado
  return <PerfilPokemon />;
};

export default PokemonDetalle;