import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ApiService from '../services/ApiService';
import PerfilPokemon from './PerfilPokemon';
import { useNavigate } from 'react-router-dom';

const PokemonDetalle = () => {
  const { id } = useParams(); //

  /*
    const navigate = useNavigate();
    
    Es un hook de react-router-dom que permite navegar programáticamente entre rutas.
    navigate('/ruta'); Para ir a una ruta especifica
    navigate(-1); Para ir a la ruta anterior
    */
  const navigate = useNavigate();
  
  //const [valor, setValor] = useState(valorInicial); 
  //El estado cambia con el tiempo y React vuelve a renderizar el componente cuando cambia.
  const [pokemon, setPokemon] = useState(null);
  const [especie, setEspecie] = useState(null);
  const [evoluciones, setEvoluciones] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  /*
    useEffect(() => {
      // código que quieres ejecutar
    }, [dependencias]);

    La función dentro de useEffect se ejecuta después del renderizado.
    El array de dependencias indica cuándo debe volver a ejecutarse.
    -Si está vacío [], se ejecuta solo una vez.
    -Si contiene variables, se ejecuta cada vez que esas variables cambian.
  */
  // Función para obtener la cadena de evolución
  const obtenerCadenaEvolucion = async (url) => {
    try {
      // Extraer el path de la URL completa (eliminando el dominio base)
      const path = url.replace('https://pokeapi.co/api/v2/', '');
      const apiService = new ApiService();
      const data = await apiService.request(path);
      
      // Obtener los datos de cada Pokémon en la cadena
      const evolucionesData = await Promise.all(
        data.chain.evolves_to.map(async (evolucion) => {
          const pokemonData = await apiService.request(`pokemon/${evolucion.species.name}`);
          return {
            name: evolucion.species.name,
            sprite: pokemonData.sprites.other['official-artwork']?.front_default || pokemonData.sprites.front_default,
            id: pokemonData.id
          };
        })
      );
      
      // Agregar también el Pokémon base
      const pokemonBase = await apiService.request(`pokemon/${data.chain.species.name}`);
      evolucionesData.unshift({
        name: data.chain.species.name,
        sprite: pokemonBase.sprites.other['official-artwork']?.front_default || pokemonBase.sprites.front_default,
        id: pokemonBase.id
      });
      
      return evolucionesData;
    } catch (error) {
      console.error('Error al cargar la cadena de evolución:', error);
      return [];
    }
  };

  useEffect(() => {
    const apiService = new ApiService();
    
    const obtenerDatosPokemon = async () => {
      try {
        setCargando(true);
        
        // Obtener datos básicos del Pokémon
        const dataPokemon = await apiService.request(`pokemon/${id}`);
        setPokemon(dataPokemon);
        
        // Obtener datos de la especie para la descripción y cadena de evolución
        const dataEspecie = await apiService.request(`pokemon-species/${dataPokemon.species.name}`);
        setEspecie(dataEspecie);
        
        // Obtener cadena de evolución
        const cadenaEvolucion = await obtenerCadenaEvolucion(dataEspecie.evolution_chain.url);
        setEvoluciones(cadenaEvolucion);
        
      } catch (err) {
        setError('No se pudo cargar la información del Pokémon');
        console.error('Error al cargar los datos del Pokémon:', err);
      } finally {
        setCargando(false);
      }
    };

    obtenerDatosPokemon();
  }, [id]);

  // Estado de carga
  if (cargando) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Cargando información del Pokémon...</p>
        </div>
      </div>
    );
  }

  // Estado de error
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-red-50 p-6">
        <div className="text-center max-w-md">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-red-700 mb-2">¡Ups! Algo salió mal</h2>
          <p className="text-gray-700 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  // Mostrar el perfil del Pokémon
  return <PerfilPokemon pokemon={pokemon} especie={especie} evoluciones={evoluciones} />;
};

export default PokemonDetalle;