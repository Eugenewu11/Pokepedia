/*
    Filtra la lista de Pokémon por término de búsqueda
 */
export const filtrarPorBusqueda = (lista, terminoBusqueda) => {
    if (!terminoBusqueda) return lista;
    
    return lista.filter(pokemon =>
        pokemon.name.toLowerCase().includes(terminoBusqueda.toLowerCase())
    );
};

/*
    Filtra la lista de Pokémon por regiones
 */
export const filtrarPorRegiones = (lista, regiones) => {
    if (!regiones || regiones.length === 0) return lista;
    
    return lista.filter(pokemon =>
        regiones.includes(pokemon.region)
    );
};

/*
    TODO: Implementar filtro por tipos
    Filtra la lista de Pokémon por tipos
 */
export const filtrarPorTipos = (lista, tipos) => {
    if (!tipos || tipos.length === 0) return lista;
    
    return lista.filter(pokemon => {
        if (!pokemon.tipos) return false;
        return pokemon.tipos.some(tipo => tipos.includes(tipo));
    });
};

/*
    TODO: Implementar filtro por hábitats
    Filtra la lista de Pokémon por hábitats
 */
export const filtrarPorHabitats = (lista, habitats) => {
    if (!habitats || habitats.length === 0) return lista;
    
    return lista.filter(pokemon => {
        if (!pokemon.habitat) return false;
        return habitats.includes(pokemon.habitat);
    });
};

/*
    Verifica si se necesitan cargar detalles para aplicar los filtros
 */
export const necesitaCargarDetalles = (filtrosActivos) => {
    return (filtrosActivos.tipos && filtrosActivos.tipos.length > 0) || 
           (filtrosActivos.habitats && filtrosActivos.habitats.length > 0);
};

/*
    Aplica todos los filtros a la lista de Pokémon
 */
export const aplicarTodosFiltros = (lista, terminoBusqueda, filtrosActivos) => {
    let listaFiltrada = [...lista];

    // Filtrar por búsqueda
    listaFiltrada = filtrarPorBusqueda(listaFiltrada, terminoBusqueda);

    // Filtrar por regiones
    listaFiltrada = filtrarPorRegiones(listaFiltrada, filtrosActivos.regiones);

    // Filtrar por tipos
    listaFiltrada = filtrarPorTipos(listaFiltrada, filtrosActivos.tipos);

    // Filtrar por hábitats
    listaFiltrada = filtrarPorHabitats(listaFiltrada, filtrosActivos.habitats);

    return listaFiltrada;
};
