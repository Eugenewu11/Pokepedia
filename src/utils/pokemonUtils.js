// Funciones de utilidad para Pokémon

/**
 * Obtiene el color de fondo según el tipo de Pokémon
 * @param {string} tipo - El tipo de Pokémon 
 * @returns {string} Clase de Tailwind para el color de fondo
 */
export const obtenerColorFondoTipo = (tipo) => {
  const coloresTipo = {
    normal: 'bg-gray-100',
    fire: 'bg-red-100',
    water: 'bg-blue-100',
    electric: 'bg-yellow-100',
    grass: 'bg-green-100',
    ice: 'bg-cyan-100',
    fighting: 'bg-red-100',
    poison: 'bg-purple-100',
    ground: 'bg-amber-100',
    flying: 'bg-indigo-100',
    psychic: 'bg-pink-100',
    bug: 'bg-lime-100',
    rock: 'bg-amber-100',
    ghost: 'bg-indigo-100',
    dragon: 'bg-purple-100',
    dark: 'bg-gray-100',
    steel: 'bg-slate-100',
    fairy: 'bg-pink-100',
  };
  return coloresTipo[tipo] || 'bg-gray-100';
};

/**
 * Obtiene el color para botones o etiquetas según el tipo de Pokémon
 * @param {string} tipo - El tipo de Pokémon
 * @returns {string} Clase de Tailwind para el color
 */
export const obtenerColorTipo = (tipo) => {
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
};

/**
 * Obtiene las debilidades de un Pokémon basadas en sus tipos
 * @param {Array} types - Array de tipos del Pokémon
 * @returns {Array} Array de tipos a los que es débil
 */
export const obtenerDebilidades = (types) => {
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
  
  return types.flatMap(tipo => 
    debilidadesPorTipo[tipo.type.name] || []
  ).filter((valor, indice, arreglo) => arreglo.indexOf(valor) === indice);
};

/**
 * Formatea el nombre de un Pokémon
 * @param {string} nombre - Nombre del Pokémon
 * @returns {string} Nombre formateado
 */
export const formatearNombre = (nombre) => {
  if (!nombre) return '';
  return nombre.charAt(0).toUpperCase() + nombre.slice(1).replace(/-/g, ' ');
};

/**
 * Obtiene el color para la barra de estadísticas según el valor
 * @param {number} valor - Valor de la estadística
 * @returns {string} Clase de Tailwind para el color
 */
export const obtenerColorEstadistica = (valor) => {
  if (valor >= 90) return 'bg-green-500';
  if (valor >= 70) return 'bg-green-400';
  if (valor >= 50) return 'bg-yellow-400';
  if (valor >= 30) return 'bg-orange-400';
  return 'bg-red-500';
};

/**
 * Obtiene la proporción de género de un Pokémon
 * @param {number} genderRate - Tasa de género de la especie del Pokémon
 * @returns {string} Cadena con la proporción de género
 */
export const obtenerProporcionGenero = (genderRate) => {
  if (genderRate === -1) return 'Desconocido';
  
  const tasaFemenina = (genderRate / 8) * 100;
  const tasaMasculina = 100 - tasaFemenina;
  
  if (tasaFemenina === 0) return '100% ♂';
  if (tasaMasculina === 0) return '100% ♀';
  
  return `${tasaMasculina}% ♂ / ${tasaFemenina}% ♀`;
};
