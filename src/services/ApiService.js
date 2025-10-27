// Cache para almacenar respuestas y evitar peticiones duplicadas
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos de caché

class ApiService {
    constructor(baseURL = 'https://pokeapi.co/api/v2/') {
        this.baseURL = baseURL;
    }

    /**
     * Realiza una petición a la API con caché
     * @param {string} endpoint - El endpoint de la API a consultar
     * @param {Object} options - Opciones de la petición
     * @returns {Promise<any>} - Los datos de la respuesta
     */
    async request(endpoint, options = {}) {
        const cacheKey = `${endpoint}-${JSON.stringify(options)}`;
        const now = Date.now();
        
        // Verificar si la respuesta está en caché y es reciente
        const cached = cache.get(cacheKey);
        if (cached && (now - cached.timestamp < CACHE_DURATION)) {
            return Promise.resolve(cached.data);
        }

        const url = `${this.baseURL}${endpoint}`;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            ...options,
        };
        
        try {
            const response = await fetch(url, config);
            
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(
                    errorData.message || `HTTP error! status: ${response.status}`,
                    {
                        status: response.status,
                        statusText: response.statusText,
                        url,
                        ...errorData
                    }
                );
            }
            
            const data = await response.json();
            
            // Almacenar en caché
            cache.set(cacheKey, {
                data,
                timestamp: now
            });
            
            return data;
            
        } catch (error) {
            console.error(`Error en la petición a ${endpoint}:`, error);
            throw error;
        }
    }

    // Métodos específicos para Pokémon
    
    /**
     * Obtiene un Pokémon por su ID o nombre
     * @param {string|number} id - ID o nombre del Pokémon
     * @returns {Promise<Object>} Datos del Pokémon
     */
    async getPokemon(id) {
        return this.request(`pokemon/${id}`);
    }
    
    /**
     * Obtiene la especie de un Pokémon
     * @param {string|number} id - ID o nombre del Pokémon
     * @returns {Promise<Object>} Datos de la especie
     */
    async getPokemonSpecies(id) {
        return this.request(`pokemon-species/${id}`);
    }
    
    /**
     * Obtiene información de un tipo de Pokémon
     * @param {string|number} id - ID o nombre del tipo
     * @returns {Promise<Object>} Datos del tipo
     */
    async getType(id) {
        return this.request(`type/${id}`);
    }
    
    /**
     * Obtiene una lista paginada de Pokémon
     * @param {number} limit - Número de resultados por página
     * @param {number} offset - Desplazamiento para la paginación
     * @returns {Promise<Object>} Lista de Pokémon con metadatos de paginación
     */
    async getPokemonList(limit = 20, offset = 0) {
        return this.request(`pokemon?limit=${limit}&offset=${offset}`);
    }
    
    /**
     * Obtiene la cadena de evolución de un Pokémon
     * @param {string|number} id - ID de la cadena de evolución
     * @returns {Promise<Object>} Cadena de evolución
     */
    async getEvolutionChain(id) {
        return this.request(`evolution-chain/${id}`);
    }
}

// Exportar la clase para que pueda ser extendida
export { ApiService };

// Exportar también una instancia por defecto para uso común
export default new ApiService();