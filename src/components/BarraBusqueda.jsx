import { useState, useEffect } from "react";
import { Search, Filter, X } from "lucide-react";

export default function BarraBusqueda({ 
    onBuscar, 
    onFiltrar, 
    onCambiarRegion, 
    regionActual,
    terminoBusqueda,
    filtrosActivos 
}) {
    const [mostrarFiltros, setMostrarFiltros] = useState(false);
    const [busqueda, setBusqueda] = useState(terminoBusqueda || "");
    
    // Estados de filtros
    const [regionesDisponibles] = useState([
        'kanto', 'johto', 'hoenn', 'sinnoh', 'unova', 
        'kalos', 'alola', 'galar', 'paldea'
    ]);
    
    // Estados de selección
    const [regionesSeleccionadas, setRegionesSeleccionadas] = useState(filtrosActivos?.regiones || []);

    // Sincronizar con los filtros externos
    useEffect(() => {
        if (filtrosActivos) {
            setRegionesSeleccionadas(filtrosActivos.regiones || []);
        }
    }, [filtrosActivos]);

    // Sincronizar búsqueda
    useEffect(() => {
        setBusqueda(terminoBusqueda || "");
    }, [terminoBusqueda]);

    const toggleFiltro = () => {
        setMostrarFiltros(!mostrarFiltros);
    };

    const handleCheckbox = (valor, setter, estado) => {
        if (estado.includes(valor)) {
            setter(estado.filter(item => item !== valor));
        } else {
            setter([...estado, valor]);
        }
    };

    const limpiarFiltros = () => {
        setRegionesSeleccionadas([]);
        
        // Limpiar campos
        onFiltrar({
            regiones: [],
            tipos: [],
            habitats: []
        });
    };

    const aplicarFiltros = () => {
        onFiltrar({
            regiones: regionesSeleccionadas,
            tipos: [],
            habitats: []
        });
        setMostrarFiltros(false);
    };

    const handleBusqueda = (e) => {
        const valor = e.target.value;
        setBusqueda(valor);
        onBuscar(valor);
    };

    const handleCambioRegion = (e) => {
        const region = e.target.value;
        if (onCambiarRegion) {
            onCambiarRegion(region);
        }
        // Actualizar las regiones seleccionadas
        setRegionesSeleccionadas([region]);
    };

    return (
        <div className="w-full">
            {/* Barra de búsqueda */}
            <div className="flex gap-2">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                    <input 
                        type="search" 
                        placeholder="Search Pokemon..." 
                        value={busqueda}
                        onChange={handleBusqueda}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    />
                </div>
                
                <button 
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-lg flex items-center gap-2 transition-colors duration-200"
                    onClick={toggleFiltro}
                >
                    <Filter size={20} />
                    <span className="hidden sm:inline">Filters</span>
                </button>   
            </div>
            
            {/* Panel de filtros */}
            {mostrarFiltros && (
                <div className="mt-4 p-6 bg-white border border-gray-300 rounded-lg shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-lg text-gray-800">Filters</h3>
                        <button 
                            onClick={toggleFiltro}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Solo Regiones */}
                    <div>
                        <h4 className="font-semibold text-gray-700 mb-3">Region</h4>
                        <div className="space-y-2 max-h-64 overflow-y-auto">
                            {regionesDisponibles.map((region) => (
                                <label 
                                    key={region}
                                    className="flex items-center space-x-2 cursor-pointer p-2 hover:bg-gray-50 rounded transition-colors"
                                >
                                    <input 
                                        type="checkbox" 
                                        className="hidden peer"
                                        checked={regionesSeleccionadas.includes(region)}
                                        onChange={() => handleCheckbox(region, setRegionesSeleccionadas, regionesSeleccionadas)}
                                    />
                                    <span className="w-5 h-5 border-2 border-gray-300 rounded-full peer-checked:bg-blue-500 peer-checked:border-blue-500 transition-all duration-200 flex items-center justify-center flex-shrink-0">
                                        {regionesSeleccionadas.includes(region) && (
                                            <span className="w-2 h-2 bg-white rounded-full"></span>
                                        )}
                                    </span>
                                    <span className="text-gray-700 capitalize">{region}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Botones*/}
                    <div className="mt-6 flex gap-2">
                        <button 
                            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg transition-colors duration-200 font-medium"
                            onClick={limpiarFiltros}
                        >
                            Clear filters
                        </button>
                        <button 
                            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 font-medium"
                            onClick={aplicarFiltros}
                        >
                            Apply filters
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}