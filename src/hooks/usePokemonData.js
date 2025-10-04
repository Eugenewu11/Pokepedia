import { useState, useEffect } from 'react';
import PokeApiService from '../services/PokeApiServicio.js';

export const usePokemonData = () => {
    const [pokemonLista, setPokemonLista] = useState([]);
    const [pokemonListaCompleta, setPokemonListaCompleta] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        cargarListaBasica();
    }, []);

    const cargarListaBasica = async () => {
        try {
            setCargando(true);
            
            const todasLasRegiones = [
                'kanto', 'johto', 'hoenn', 'sinnoh', 'unova', 
                'kalos', 'alola', 'galar', 'paldea'
            ];

            let todosLosPokemon = [];

            for (const region of todasLasRegiones) {
                try {
                    const listaRegion = await PokeApiService.getPokemonPorRegion(region);
                    const listaConRegion = listaRegion.map(pokemon => ({
                        ...pokemon,
                        region: region
                    }));
                    todosLosPokemon = [...todosLosPokemon, ...listaConRegion];
                } catch (error) {
                    console.error(`Error cargando región ${region}:`, error);
                }
            }

            setPokemonListaCompleta(todosLosPokemon);
            setPokemonLista(todosLosPokemon);
            
        } catch (error) {
            console.error('Error cargando Pokémon:', error);
        } finally {
            setCargando(false);
        }
    };

    const cargarDetallesPokemon = async (lista) => {
        const listaConDetalles = await Promise.all(
            lista.map(async (pokemon) => {
                if (pokemon.tipos && pokemon.habitat !== undefined) return pokemon;
                
                try {
                    const detalle = await PokeApiService.getPokemon(pokemon.name);
                    return {
                        ...pokemon,
                        tipos: detalle.types,
                        id: detalle.id,
                        sprite: detalle.sprite,
                        habitat: detalle.habitat || null
                    };
                } catch (error) {
                    console.error(`Error cargando ${pokemon.name}:`, error);
                    return pokemon;
                }
            })
        );
        return listaConDetalles;
    };

    const obtenerDetallePokemon = async (nombre) => {
        try {
            const detalle = await PokeApiService.getPokemon(nombre);
            
            // Actualizar en la lista completa
            setPokemonListaCompleta(prev => 
                prev.map(p => p.name === nombre ? { 
                    ...p, 
                    tipos: detalle.types, 
                    id: detalle.id, 
                    sprite: detalle.sprite, 
                    habitat: detalle.habitat 
                } : p)
            );
            
            return detalle;
        } catch (error) {
            console.error('Error obteniendo detalle:', error);
            return null;
        }
    };

    return {
        pokemonLista,
        pokemonListaCompleta,
        cargando,
        setPokemonLista,
        setPokemonListaCompleta,
        cargarDetallesPokemon,
        obtenerDetallePokemon
    };
};
