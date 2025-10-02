
class ApiService {
    constructor(baseURL = 'https://pokeapi.co/api/v2/') {
        this.baseURL = baseURL;
    }

    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`; 
        const config = {
            headers: {
                'Content-Type': 'application/json', 
                ...options.headers,
            },
            ...options,
        }
        
        try {
            const response = await fetch(url, config);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Fallo la request de la API: ', error);
            throw error;
        }
    }
}

export default ApiService;