import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PokeApiService from '../services/PokeApiServicio';

//Objeto literal que contiene como clave el tipo del pokemon y valor el bg del color
const tipoColores = {
  normal: 'bg-gray-400',
  fire: 'bg-orange-500',
  water: 'bg-blue-500',
  electric: 'bg-yellow-400',
  grass: 'bg-green-500',
  ice: 'bg-cyan-300',
  fighting: 'bg-amber-700',
  poison: 'bg-purple-500',
  ground: 'bg-yellow-700',
  flying: 'bg-indigo-400',
  psychic: 'bg-pink-500',
  bug: 'bg-lime-500',
  rock: 'bg-yellow-800',
  ghost: 'bg-purple-700',
  dragon: 'bg-indigo-700',
  dark: 'bg-gray-800',
  steel: 'bg-gray-500',
  fairy: 'bg-pink-300'
};

export default function TablaMovimientos() {
  const navigate = useNavigate();
  
  const [movimientos, setMovimientos] = useState([]); 
  const [cargando, setCargando] = useState(true);
  const [tipoSeleccionado, setTipoSeleccionado] = useState('Todos');
  const [tipos, setTipos] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [totalMovimientos, setTotalMovimientos] = useState(0);
  const [movimientosPorPagina, setMovimientosPorPagina] = useState(20);

  const apiService = PokeApiService;

  useEffect(() => {
    setPaginaActual(1);
    cargarMovimientos(1);
  }, [tipoSeleccionado]);

  useEffect(() => {
    cargarMovimientos(paginaActual);
  }, [paginaActual]);

  const cargarMovimientos = async (pagina = 1) => {
    setCargando(true);
    const itemsPorPagina = tipoSeleccionado !== 'Todos' ? 50 : 20;
    setMovimientosPorPagina(itemsPorPagina);
    
    const offset = (pagina - 1) * itemsPorPagina;

    try {
      const data = await apiService.request('move?limit=1');
      const total = data.count;
      
      if (tipoSeleccionado !== 'Todos') {
        const allMovements = await apiService.request(`move?limit=${total}`);
        const allDetailsPromises = allMovements.results.map(async (mov) => {
          try {
            const details = await apiService.request(`move/${mov.name}`);
            return details;
          } catch (error) {
            console.error(`Error obteniendo detalles para ${mov.name}:`, error);
            return null;
          }
        });
        
        const allDetails = await Promise.all(allDetailsPromises);
        const filteredMovements = allDetails.filter(mov => 
          mov !== null && mov.type.name === tipoSeleccionado.toLowerCase()
        );
          
        setTotalMovimientos(filteredMovements.length);
        setTotalPaginas(Math.ceil(filteredMovements.length / itemsPorPagina));
        
        const paginatedMovements = filteredMovements.slice(offset, offset + itemsPorPagina);
        setMovimientos(paginatedMovements);
        
        const todosLosTipos = [...new Set([...movimientos, ...paginatedMovements].map(mov => mov.type.name))].sort();
        setTipos(todosLosTipos);
      } else {
        setTotalMovimientos(total);
        setTotalPaginas(Math.ceil(total / itemsPorPagina));
        
        const data = await apiService.request(`move?limit=${itemsPorPagina}&offset=${offset}`);
        
        const detallesPromises = data.results.map(async (mov) => {
          try {
            const details = await apiService.request(`move/${mov.name}`);
            return details;
          } catch (error) {
            console.error(`Error obteniendo detalles para ${mov.name}:`, error);
            return null;
          }
        });
        
        const movimientosDetallados = (await Promise.all(detallesPromises)).filter(mov => mov !== null);
        
        setTotalMovimientos(data.count);
        setTotalPaginas(Math.ceil(data.count / itemsPorPagina));
        setMovimientos(movimientosDetallados);
        
        const todosLosTipos = [...new Set([...movimientos, ...movimientosDetallados].map(mov => mov.type.name))].sort();
        setTipos(todosLosTipos);
      }

      setPaginaActual(pagina);
    } catch (error) {
      console.error('Error al cargar los movimientos:', error);
    } finally {
      setCargando(false);
    }
  };

  const movimientosFiltrados = tipoSeleccionado === 'Todos' 
    ? movimientos 
    : movimientos.filter(mov => mov.type?.name?.toLowerCase() === tipoSeleccionado.toLowerCase());

  const obtenerNombreIngles = (names) => {
    const nombreEn = names?.find(n => n.language.name === 'en');
    return nombreEn ? nombreEn.name : names?.[0]?.name || 'N/A';
  };

  const obtenerNombreEspanol = (names) => {
    const nombreEs = names?.find(n => n.language.name === 'es');
    return nombreEs ? nombreEs.name : names?.[0]?.name || 'N/A';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-600 to-red-800 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-2xl p-4 md:p-6 mb-4 md:mb-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 md:mb-6 gap-4">
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center text-red-600 hover:text-red-800 transition-colors hover:cursor-pointer self-start"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back
            </button>
            <h1 className="text-2xl md:text-4xl font-bold text-gray-800 text-center flex-grow">
              Pokémon Movements
            </h1>
            <div className="hidden md:block w-20"></div>
          </div>
          
          <div className="mb-4 md:mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by type:
            </label>
            <select
              value={tipoSeleccionado}
              onChange={(e) => setTipoSeleccionado(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent hover:cursor-pointer"
            >
              <option value="Todos">All types</option>
              {tipos.map(tipo => (
                <option key={tipo} value={tipo}>
                  {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {cargando ? (
          <div className="bg-white rounded-lg shadow-2xl p-12 text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-red-600 mx-auto mb-4"></div>
            <p className="text-xl text-gray-600">Loading movements...</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
            {/* Vista de tabla para PC o laptop */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-800 text-white">
                    <th className="px-6 py-4 text-left font-semibold">ID</th>
                    <th className="px-6 py-4 text-left font-semibold">Name</th>
                    <th className="px-6 py-4 text-left font-semibold">Type</th>
                    <th className="px-6 py-4 text-left font-semibold">Class</th>
                    <th className="px-6 py-4 text-left font-semibold">Power</th>
                    <th className="px-6 py-4 text-left font-semibold">Spanish</th>
                  </tr>
                </thead>
                <tbody>
                  {movimientosFiltrados.map((movimiento, index) => (
                    <tr 
                      key={movimiento.id}
                      className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-red-50 transition-colors`}
                    >
                      <td className="px-6 py-4 text-gray-700 font-medium">
                        #{movimiento.id}
                      </td>
                      <td className="px-6 py-4 text-gray-800 font-semibold">
                        {obtenerNombreIngles(movimiento.names)}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`${tipoColores[movimiento.type?.name] || 'bg-gray-400'} text-white px-3 py-1 rounded-full text-sm font-semibold`}>
                          {movimiento.type?.name || 'N/A'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-700 capitalize">
                        {movimiento.damage_class?.name || '-'}
                      </td>
                      <td className="px-6 py-4 text-gray-700 font-bold">
                        {movimiento.power || '-'}
                      </td>
                      <td className="px-6 py-4 text-gray-600 italic">
                        {obtenerNombreEspanol(movimiento.names)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Vista de tarjetas para móviles */}
            <div className="md:hidden">
              {movimientosFiltrados.map((movimiento) => (
                <div 
                  key={movimiento.id}
                  className="border-b border-gray-200 p-4 hover:bg-red-50 transition-colors"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-gray-500 text-sm font-medium">#{movimiento.id}</span>
                        <span className={`${tipoColores[movimiento.type?.name] || 'bg-gray-400'} text-white px-2 py-1 rounded-full text-xs font-semibold`}>
                          {movimiento.type?.name || 'N/A'}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-800">
                        {obtenerNombreIngles(movimiento.names)}
                      </h3>
                      <p className="text-sm text-gray-600 italic">
                        {obtenerNombreEspanol(movimiento.names)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-gray-500 font-medium">Class:</span>
                      <p className="text-gray-800 capitalize">{movimiento.damage_class?.name || '-'}</p>
                    </div>
                    <div>
                      <span className="text-gray-500 font-medium">Power:</span>
                      <p className="text-gray-800 font-bold">{movimiento.power || '-'}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {movimientosFiltrados.length === 0 ? (
              <div className="p-8 md:p-12 text-center text-gray-500">
                <p className="text-lg md:text-xl">We couldn't find movements with type "{tipoSeleccionado}"</p>
              </div>
            ) : (
              <div className="flex flex-col md:flex-row justify-between items-center p-4 bg-gray-50 border-t border-gray-200 gap-4">
                <button
                  onClick={() => cargarMovimientos(paginaActual - 1)}
                  disabled={paginaActual === 1 || cargando}
                  className={`w-full md:w-auto px-4 py-2 rounded-lg ${paginaActual === 1 || cargando ? 'bg-gray-300 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600 text-white'}`}
                >
                  Previous
                </button>
                <div className="flex flex-col items-center">
                  <span className="text-gray-700 text-sm md:text-base text-center">
                    Page {paginaActual} of {totalPaginas}
                  </span>
                </div>
                <button
                  onClick={() => cargarMovimientos(paginaActual + 1)}
                  disabled={paginaActual >= totalPaginas || cargando}
                  className={`w-full md:w-auto px-4 py-2 rounded-lg ${(paginaActual >= totalPaginas || cargando) ? 'bg-gray-300 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600 text-white'}`}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}