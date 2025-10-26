import { useNavigate } from 'react-router-dom';

const PerfilPokemon = ({ pokemon, especie, evoluciones }) => {
  const navigate = useNavigate();

  // Verificar si hay datos del Pokémon
  if (!pokemon) {
    return <div className="flex justify-center items-center h-screen text-xl text-gray-600">Cargando información del Pokémon...</div>;
  }

  // Obtener la descripción en español (si es que existe)
  const obtenerDescripcion = () => {
    if (!especie || !especie.flavor_text_entries) return null;
    
    const entradaEspanol = especie.flavor_text_entries.find(
      entrada => entrada.language.name === 'es' && entrada.language && entrada.flavor_text
    );
    
    return entradaEspanol ? entradaEspanol.flavor_text.replace(/\f/g, ' ') : null;
  };
  
  // Obtener debilidades 
  const obtenerDebilidades = () => {
    // Tipos del Pokémon
    const debilidadesPorTipo = {
      fire: ['water', 'ground', 'rock'],
      water: ['electric', 'grass'],
      grass: ['fire', 'ice', 'poison', 'flying', 'bug'],
      electric: ['ground'],
      ice: ['fire', 'fighting', 'rock', 'steel'],
      fighting: ['flying', 'psychic', 'fairy'],
      poison: ['ground', 'psychic'],
      ground: ['water', 'grass', 'ice'],
      flying: ['electric', 'ice', 'rock'],
      psychic: ['bug', 'ghost', 'dark'],
      bug: ['flying', 'rock', 'fire'],
      rock: ['water', 'grass', 'fighting', 'ground', 'steel'],
      ghost: ['ghost', 'dark'],
      dragon: ['ice', 'dragon', 'fairy'],
      dark: ['fighting', 'bug', 'fairy'],
      steel: ['fire', 'fighting', 'ground'],
      fairy: ['poison', 'steel']
    };
    
    return pokemon.types.flatMap(tipo => 
      debilidadesPorTipo[tipo.type.name] || []
    ).filter((valor, indice, arreglo) => arreglo.indexOf(valor) === indice);
  };
  
  // Mapeo de estadísticas 
  const nombresEstadisticas = {
    'hp': 'PS',
    'attack': 'Ataque',
    'defense': 'Defensa',
    'special-attack': 'Ataque Especial',
    'special-defense': 'Defensa Especial',
    'speed': 'Velocidad'
  };

  // Filtrar y formatear estadísticas
  const estadisticas = pokemon.stats.map(estadistica => ({
    nombre: nombresEstadisticas[estadistica.stat.name] || estadistica.stat.name,
    valor: estadistica.base_stat,
    max: estadistica.stat.name === 'hp' ? 255 : 180 // PS tiene un máximo más alto
  }));

  const descripcion = obtenerDescripcion();
  const debilidades = obtenerDebilidades();
  
  // Formatear altura y peso
  const alturaEnMetros = (pokemon.height / 10).toFixed(1);
  const pesoEnKg = (pokemon.weight / 10).toFixed(1);
  
  // Obtener habilidades
  const habilidades = pokemon.abilities.map(habilidad => 
    habilidad.ability.name.replace('-', ' ')
  ).join(', ');
  
  // Obtener género 
  const obtenerProporcionGenero = () => {
    if (!especie || especie.gender_rate === -1) return 'Desconocido';
    
    const tasaFemenina = (especie.gender_rate / 8) * 100;
    const tasaMasculina = 100 - tasaFemenina;
    
    if (tasaFemenina === 0) return '100% ♀';
    
    return `${tasaMasculina}% ♂ / ${tasaFemenina}% ♀`;
  };

  // Funciones auxiliares para colores
  function obtenerColorTipo(tipo) {
    const coloresTipo = {
      normal: 'bg-gray-400 hover:bg-gray-500',
      fire: 'bg-red-500 hover:bg-red-600',
      water: 'bg-blue-500 hover:bg-blue-600',
      electric: 'bg-yellow-400 hover:bg-yellow-500 text-gray-900',
      grass: 'bg-green-500 hover:bg-green-600',
      ice: 'bg-cyan-300 hover:bg-cyan-400 text-gray-900',
      fighting: 'bg-red-700 hover:bg-red-800',
      poison: 'bg-purple-500 hover:bg-purple-600',
      ground: 'bg-amber-600 hover:bg-amber-700',
      flying: 'bg-indigo-400 hover:bg-indigo-500',
      psychic: 'bg-pink-500 hover:bg-pink-600',
      bug: 'bg-lime-500 hover:bg-lime-600',
      rock: 'bg-amber-700 hover:bg-amber-800',
      ghost: 'bg-indigo-700 hover:bg-indigo-800',
      dragon: 'bg-purple-700 hover:bg-purple-800',
      dark: 'bg-gray-800 hover:bg-gray-900',
      steel: 'bg-slate-400 hover:bg-slate-500',
      fairy: 'bg-pink-300 hover:bg-pink-400 text-gray-900',
    };
    return coloresTipo[tipo] || 'bg-gray-400 hover:bg-gray-500';
  }

  function obtenerColorEstadistica(estadistica) {
    if (estadistica >= 90) return 'bg-green-500';
    if (estadistica >= 70) return 'bg-green-400';
    if (estadistica >= 50) return 'bg-yellow-400';
    if (estadistica >= 30) return 'bg-orange-400';
    return 'bg-red-500';
  }

  // Función para obtener el color de fondo según el tipo
  const obtenerColorFondoTipo = (tipo) => {
    const coloresTipo = {
      normal: 'bg-gray-400',
      fire: 'bg-red-500',
      water: 'bg-blue-500',
      electric: 'bg-yellow-400',
      grass: 'bg-green-500',
      ice: 'bg-cyan-300',
      fighting: 'bg-red-700',
      poison: 'bg-purple-500',
      ground: 'bg-amber-600',
      flying: 'bg-indigo-400',
      psychic: 'bg-pink-500',
      bug: 'bg-lime-500',
      rock: 'bg-amber-700',
      ghost: 'bg-indigo-700',
      dragon: 'bg-purple-700',
      dark: 'bg-gray-800',
      steel: 'bg-slate-400',
      fairy: 'bg-pink-300'
    };
    return coloresTipo[tipo] || 'bg-gray-400';
  };

    // Función para formatear el nombre del Pokémon
  const formatearNombre = (nombre) => {
    return nombre.charAt(0).toUpperCase() + nombre.slice(1).replace(/-/g, ' ');
  };

  // Verificar si hay datos del Pokémon
  if (!pokemon) {
    return <div className="flex justify-center items-center h-screen text-xl text-gray-600">Cargando información del Pokémon...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4 bg-[#EA202D] mt-6 rounded-2xl">
      <button 
        onClick={() => navigate(-1)} 
        className="mb-6 flex items-center bg-white/90 hover:bg-white hover:cursor-pointer font-medium px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 border-2 border-transparent hover:border-gray-200"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        Volver
      </button>

      <div className="bg-white/90 rounded-lg shadow-lg p-6 backdrop-blur-sm">
        {/* Encabezado */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Imagen grande */}
          <div className="w-full md:w-1/3 flex-shrink-0">
            <div className="bg-gray-50 rounded-lg p-6 flex justify-center items-center">
              <img 
                src={pokemon.sprites.other['official-artwork']?.front_default || pokemon.sprites.front_default} 
                alt={pokemon.name}
                className="w-full max-w-xs h-auto"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/300x300?text=Pokemon+No+Disponible';
                }}
              />
            </div>
            
            {/* Tipo/s */}
            <div className="mt-4 flex gap-2 flex-wrap justify-center">
              {pokemon.types?.map((type, index) => (
                <span 
                  key={index}
                  className={`${obtenerColorTipo(type.type.name)} text-white px-4 py-1 rounded-full text-sm font-semibold capitalize`}
                >
                  {type.type.name}
                </span>
              ))}
            </div>
            
            {/* Debilidades */}
            {debilidades?.length > 0 && (
              <div className="mt-4 bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-100">
                <h4 className="text-sm font-semibold text-blue-700 mb-3">
                  Debilidades
                </h4>
                <div className="flex flex-wrap gap-2">
                  {debilidades.map((debilidad, index) => (
                    <span 
                      key={index}
                      className={`${obtenerColorTipo(debilidad)} text-white px-3 py-1 rounded-full text-xs font-medium capitalize shadow-sm hover:shadow-md transition-all duration-200`}
                    >
                      {debilidad}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Información del Pokémon */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl font-bold text-gray-800">
                {formatearNombre(pokemon.name)}
              </h1>
              <span className="text-xl text-gray-500">
                #{String(pokemon.id).padStart(3, '0')}
              </span>
            </div>

            {/* Descripción */}
            {descripcion && (
              <p className="text-gray-600 mb-6 bg-gray-50 p-4 rounded-lg">
                {descripcion}
              </p>
            )}

            {/* Detalles */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-100 hover:shadow-md transition-shadow duration-200">
                <h4 className="font-medium text-blue-700 mb-2">Altura</h4>
                <p className="text-xl font-semibold text-gray-800">{alturaEnMetros} m</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl border border-green-100 hover:shadow-md transition-shadow duration-200">
                <h4 className="font-medium text-green-700 mb-2">Peso</h4>
                <p className="text-xl font-semibold text-gray-800">{pesoEnKg} kg</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-4 rounded-xl border border-purple-100 hover:shadow-md transition-shadow duration-200">
                <h4 className="font-medium text-purple-700 mb-2">Habilidades</h4>
                <p className="text-lg font-medium text-gray-800 capitalize">{habilidades}</p>
              </div>
              <div className="bg-gradient-to-br from-pink-50 to-rose-50 p-4 rounded-xl border border-pink-100 hover:shadow-md transition-shadow duration-200">
                <h4 className="font-medium text-pink-700 mb-2">Género</h4>
                <p className="text-xl font-semibold text-gray-800">{obtenerProporcionGenero()}</p>
              </div>
            </div>

            {/* Estadísticas */}
            <div className="mb-8 bg-gradient-to-r from-gray-50 to-blue-50 p-6 rounded-xl border border-blue-100 max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Estadísticas Base
              </h3>
              <div className="space-y-3 max-w-md mx-auto">
                {estadisticas.map((estadistica, index) => (
                  <div key={index} className="mb-2">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-gray-600">
                        {estadistica.nombre}
                      </span>
                      <span className="font-bold">{estadistica.valor}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className={`h-full rounded-full ${obtenerColorEstadistica(estadistica.valor)}`}
                        style={{ width: `${Math.min(100, (estadistica.valor / estadistica.max) * 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Evoluciones */}
        {Array.isArray(evoluciones) && evoluciones.length > 0 && (
          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Evoluciones</h3>
            <div className="flex flex-wrap gap-6 justify-center">
              {evoluciones.map((evo) => (
                <div key={evo.id} className="flex flex-col items-center">
                  <div className="bg-gray-50 p-3 rounded-full mb-2">
                    <img 
                      src={evo.sprite} 
                      alt={evo.name}
                      className="w-20 h-20 object-contain"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/80x80?text=Pokemon';
                      }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-700 capitalize">
                    {evo.name.replace(/-/g, ' ')}
                  </span>
                  <span className="text-xs text-gray-500">#{String(evo.id).padStart(3, '0')}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PerfilPokemon;
