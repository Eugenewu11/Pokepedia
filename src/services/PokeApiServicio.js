
import { ApiService } from './ApiService.js';

class PokeApiService extends ApiService {
  constructor() {
    super('https://pokeapi.co/api/v2/'); // Pasar la URL base al padre
  }

  async getPokemon(idOnombre) {
    try {
      if (!idOnombre && idOnombre !== 0) {
        throw new Error('Se requiere un ID o nombre del pokemon');
      }
      
      const param = String(idOnombre).toLowerCase().trim();
      const response = await this.request(`pokemon/${param}`);
      return this._procesarPokemonData(response);
    } catch (error) {
      console.error(`Error obteniendo Pokémon ${idOnombre}:`, error);
      throw error;
    }   
  }

  async getPokemonPorRegion(region = 'kanto') {
    try {
      const regiones = {
        // Generación 1 - Kanto
        kanto: { limit: 151, offset: 0 },
        
        // Generación 2 - Johto  
        johto: { limit: 100, offset: 151 },
        
        // Generación 3 - Hoenn
        hoenn: { limit: 135, offset: 251 },
        
        // Generación 4 - Sinnoh
        sinnoh: { limit: 107, offset: 386 },
        
        // Generación 5 - Teselia/Unova
        unova: { limit: 156, offset: 493 },
        
        // Generación 6 - Kalos
        kalos: { limit: 72, offset: 649 },
        
        // Generación 7 - Alola
        alola: { limit: 88, offset: 721 },
        
        // Generación 8 - Galar
        galar: { limit: 96, offset: 809 },
        
        // Generación 9 - Paldea
        paldea: { limit: 120, offset: 905 }
      };

      const regionData = regiones[region.toLowerCase()] || regiones.kanto;
      const response = await this.request(
        `pokemon?limit=${regionData.limit}&offset=${regionData.offset}`
      );

      return response.results;
    } catch (error) {
      console.error(`Error obteniendo Pokémon de ${region}:`, error);
      throw error;
    }
  }

  _procesarPokemonData(pokemonData) {
    return {
      id: pokemonData.id,
      name: pokemonData.name,
      types: pokemonData.types.map(typeInfo => typeInfo.type.name),
      abilities: pokemonData.abilities.map(abilityInfo => abilityInfo.ability.name),
      stats: pokemonData.stats.reduce((acc, statInfo) => {
        acc[statInfo.stat.name] = statInfo.base_stat;
        return acc;
      }, {}),
      sprite: pokemonData.sprites.front_default,
      officialArtwork: pokemonData.sprites.other['official-artwork']?.front_default,
      height: pokemonData.height / 10,
      weight: pokemonData.weight / 10,
      base_experience: pokemonData.base_experience, 
      order: pokemonData.order 
    };
  }
  
  async getTiposPokemon() {
    try {
      const response = await this.request('type');
      return response.results;
    } catch (error) {
      console.error('Error obteniendo tipos:', error);
      throw error;
    }
  }
  
  async getHabitats() {
    try {
      const response = await this.request('pokemon-habitat');
      return response.results;
    } catch (error) {
      console.error('Error obteniendo hábitats:', error);
      throw error;
    }
  }

  // Obtener lista de movimientos
  async getMovimientos(limit = 100, offset = 0) {
    try {
      const response = await fetch(`${this.baseURL}/move?limit=${limit}&offset=${offset}`);
      const data = await response.json();
      return data.results; 
    } catch (error) {
      console.error("Error al obtener los movimientos:", error);
      return [];
    }
  }

  // Obtener detalles de un movimiento
  async getDetallesMovimiento(nameOrId) {
    try {
      const response = await fetch(`${this.baseURL}/move/${nameOrId}`);
      if (!response.ok) throw new Error("Movimiento no encontrado");
      const data = await response.json();

      // Extraemos solo lo relevante
      return {
        id: data.id,
        name: data.name,
        power: data.power,
        names: data.names.map(n => ({
          language: n.language.name,
          name: n.name
        })),
        damage_class: data.damage_class.name,
        type: data.type.name
      };
    } catch (error) {
      console.error("Error al obtener el movimiento:", error.message);
      return null;
    }
  }
}

export default new PokeApiService();