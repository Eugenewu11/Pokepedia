import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar.jsx';
import PokemonCard from '../components/PokemonCard.jsx';
import DetallePokemon from '../components/DetallePokemon.jsx';
import BarraBusqueda from '../components/BarraBusqueda.jsx';
import { usePokemonData } from '../hooks/usePokemonData.js';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll.js';
import { necesitaCargarDetalles, aplicarTodosFiltros } from '../utils/pokemonFilters.js';

export default function Pokedex() {
    const {
        pokemonLista,
        pokemonListaCompleta,
        cargando,
        setPokemonLista,
        setPokemonListaCompleta,
        cargarDetallesPokemon,
        obtenerDetallePokemon
    } = usePokemonData();

    const { pokemonMostrados, cargandoMas, observerTarget } = useInfiniteScroll(pokemonLista);

    const [pokemonSeleccionado, setPokemonSeleccionado] = useState(null);
    const [terminoBusqueda, setTerminoBusqueda] = useState("");
    const [filtrosActivos, setFiltrosActivos] = useState({
        regiones: [],
        tipos: [],
        habitats: []
    });

    useEffect(() => {
        aplicarFiltrosYBusqueda();
    }, [terminoBusqueda, filtrosActivos, pokemonListaCompleta]);

    const aplicarFiltrosYBusqueda = async () => {
        // Aplicar filtros básicos primero (búsqueda y región)
        let listaFiltrada = aplicarTodosFiltros(
            pokemonListaCompleta,
            terminoBusqueda,
            { regiones: filtrosActivos.regiones }
        );

        // Si necesita detalles (tipos o hábitats), cargarlos
        if (necesitaCargarDetalles(filtrosActivos)) {
            const batchSize = 20;
            let listaConDetalles = [];

            for (let i = 0; i < listaFiltrada.length; i += batchSize) {
                const batch = listaFiltrada.slice(i, i + batchSize);
                const batchConDetalles = await cargarDetallesPokemon(batch);
                listaConDetalles = [...listaConDetalles, ...batchConDetalles];
            }

            // Actualizar lista completa con detalles
            const listaNueva = pokemonListaCompleta.map(p => {
                const conDetalle = listaConDetalles.find(pd => pd.name === p.name);
                return conDetalle || p;
            });
            setPokemonListaCompleta(listaNueva);

            // Aplicar filtros de tipo y hábitat
            listaFiltrada = aplicarTodosFiltros(
                listaConDetalles,
                "",
                { tipos: filtrosActivos.tipos, habitats: filtrosActivos.habitats }
            );
        }

        setPokemonLista(listaFiltrada);

        // Seleccionar primer Pokémon si es necesario
        if (listaFiltrada.length > 0) {
            const pokemonActualSigueEnLista = listaFiltrada.some(
                p => p.name === pokemonSeleccionado?.name
            );
            
            if (!pokemonActualSigueEnLista) {
                const primerPokemon = await obtenerDetallePokemon(listaFiltrada[0].name);
                setPokemonSeleccionado(primerPokemon);
            }
        } else {
            setPokemonSeleccionado(null);
        }
    };

    const handleSeleccionarPokemon = async (pokemon) => {
        const detalle = await obtenerDetallePokemon(pokemon.name);
        setPokemonSeleccionado(detalle);
    };

    const handleBuscar = (termino) => {
        setTerminoBusqueda(termino);
    };

    const handleFiltrar = (filtros) => {
        setFiltrosActivos(filtros);
    };

    const handleLimpiarFiltros = () => {
        setTerminoBusqueda("");
        setFiltrosActivos({ regiones: [], tipos: [], habitats: [] });
    };

    return (
        <div className="bg-[#EA202D] min-h-screen">
            <Navbar />

            <div className="pt-20 px-4 pb-8">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-6">
                        <BarraBusqueda 
                            onBuscar={handleBuscar}
                            onFiltrar={handleFiltrar}
                            terminoBusqueda={terminoBusqueda}
                            filtrosActivos={filtrosActivos}
                        />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-1">
                            <DetallePokemon pokemon={pokemonSeleccionado} />
                        </div>

                        <div className="lg:col-span-2">
                            <div className="bg-gray-800 rounded-lg p-6 border-4 border-gray-700">
                                {cargando ? (
                                    <div className="text-white text-center py-8">
                                        <div className="animate-pulse">Loading Pokedex...</div>
                                    </div>
                                ) : pokemonLista.length === 0 ? (
                                    <div className="text-white text-center py-8">
                                        <p className="mb-4">No Pokemon found with the selected filters</p>
                                        <button 
                                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                                            onClick={handleLimpiarFiltros}
                                        >
                                            Clear filters
                                        </button>
                                    </div>
                                ) : (
                                    <div className="space-y-2 max-h-[600px] overflow-y-auto">
                                        {pokemonMostrados.map((pokemon, index) => (
                                            <PokemonCard
                                                key={`${pokemon.name}-${index}`}
                                                pokemon={pokemon}
                                                estaSeleccionado={pokemonSeleccionado?.name === pokemon.name}
                                                alSeleccionar={() => handleSeleccionarPokemon(pokemon)}
                                            />
                                        ))}
                                        
                                        {pokemonMostrados.length < pokemonLista.length && (
                                            <div ref={observerTarget} className="text-white text-center py-4">
                                                {cargandoMas ? (
                                                    <div className="animate-pulse">Loading...</div>
                                                ) : (
                                                    <div className="text-gray-400 text-sm">Scroll to load more</div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}