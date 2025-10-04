import { useState, useEffect, useRef } from 'react';

export const useInfiniteScroll = (pokemonLista, itemsPorPagina = 7) => {
    const [pokemonMostrados, setPokemonMostrados] = useState([]);
    const [cargandoMas, setCargandoMas] = useState(false);
    const [paginaActual, setPaginaActual] = useState(0);
    const observerTarget = useRef(null);

    // Inicializar con los primeros items cuando cambia la lista
    useEffect(() => {
        const primeros = pokemonLista.slice(0, itemsPorPagina);
        setPokemonMostrados(primeros);
        setPaginaActual(0);
    }, [pokemonLista, itemsPorPagina]);

    // Configurar IntersectionObserver
    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting && !cargandoMas && pokemonMostrados.length < pokemonLista.length) {
                    cargarMasPokemon();
                }
            },
            { threshold: 1 }
        );

        if (observerTarget.current) {
            observer.observe(observerTarget.current);
        }

        return () => {
            if (observerTarget.current) {
                observer.unobserve(observerTarget.current);
            }
        };
    }, [pokemonMostrados, pokemonLista, cargandoMas]);

    const cargarMasPokemon = async () => {
        if (cargandoMas || pokemonMostrados.length >= pokemonLista.length) return;
        
        setCargandoMas(true);
        const siguiente = paginaActual + 1;
        const inicio = siguiente * itemsPorPagina;
        const fin = inicio + itemsPorPagina;
        
        const siguientes = pokemonLista.slice(inicio, fin);
        
        setPokemonMostrados(prev => [...prev, ...siguientes]);
        setPaginaActual(siguiente);
        setCargandoMas(false);
    };

    return {
        pokemonMostrados,
        cargandoMas,
        observerTarget
    };
};
