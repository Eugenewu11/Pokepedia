import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar.jsx';
import PokemonCard from '../components/PokemonCard.jsx';
import DetallePokemon from '../components/DetallePokemon.jsx';
import PokeApiService from '../services/PokeApiServicio.js';

export default function Pokedex() {
    const [pokemonLista, setPokemonLista] = useState([]);
    const [pokemonSeleccionado, setPokemonSeleccionado] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [regionActual, setRegionActual] = useState('kanto');

    useEffect(() => {
        cargarPokemon();
    }, [regionActual]);

    const cargarPokemon = async () => {
        try {
            setCargando(true);
            const lista = await PokeApiService.getPokemonPorRegion(regionActual);
            setPokemonLista(lista);
            
            // Seleccionar el primero por defecto
            if (lista.length > 0) {
                const primerPokemon = await obtenerDetallePokemon(lista[0].name);
                setPokemonSeleccionado(primerPokemon);
            }
        } catch (error) {
            console.error('Error cargando Pokémon:', error);
        } finally {
            setCargando(false);
        }
    };

    const obtenerDetallePokemon = async (nombre) => {
        try {
            return await PokeApiService.getPokemon(nombre);
        } catch (error) {
            console.error('Error obteniendo detalle:', error);
            return null;
        }
    };

    const handleSeleccionarPokemon = async (pokemon) => {
        const detalle = await obtenerDetallePokemon(pokemon.name);
        setPokemonSeleccionado(detalle);
    };

    return (
        <div className="bg-[#EA202D] min-h-screen">
            <Navbar />

            <div className="pt-30 px-4 pb-8">
                <div className="max-w-7xl mx-auto">
                    {/* Layout principal */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Detalle del Pokémon */}
                        <div className="lg:col-span-1">
                            <DetallePokemon pokemon={pokemonSeleccionado} />
                        </div>

                        {/* Lista de Pokémon */}
                        <div className="lg:col-span-2">
                            <div className="bg-gray-800 rounded-lg p-6 border-4 border-gray-700">
                                {/* Selector de región y el*/}
                                <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-gray-600">
                                    <h2 className="text-2xl font-bold text-white capitalize">
                                        Región de {regionActual}
                                    </h2>
                                    
                                    <select
                                        value={regionActual}
                                        onChange={(e) => setRegionActual(e.target.value)}
                                        className="px-4 py-2 rounded-lg border-2 border-gray-600 bg-white font-semibold text-sm"
                                    >
                                        <option value="kanto">Kanto</option>
                                        <option value="johto">Johto</option>
                                        <option value="hoenn">Hoenn</option>
                                        <option value="sinnoh">Sinnoh</option>
                                        <option value="unova">Unova</option>
                                        <option value="kalos">Kalos</option>
                                        <option value="alola">Alola</option>
                                        <option value="galar">Galar</option>
                                        <option value="paldea">Paldea</option>
                                    </select>
                                </div>

                                {cargando ? (
                                    <div className="text-white text-center py-8">Cargando...</div>
                                ) : (
                                    <div className="space-y-2 max-h-[600px] overflow-y-auto">
                                        {pokemonLista.map((pokemon, index) => (
                                            <PokemonCard
                                                key={index}
                                                pokemon={pokemon}
                                                estaSeleccionado={pokemonSeleccionado?.name === pokemon.name}
                                                alSeleccionar={() => handleSeleccionarPokemon(pokemon)}
                                            />
                                        ))}
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