{/* Menu inicial*/}
import React from 'react';
import { useNavigate } from 'react-router-dom';

const SeleccionMenu = () => {
  const navigate = useNavigate();

  // Función para manejar la navegación
  const navegarA = (ruta) => {
    navigate(ruta);
  };

  const opciones = [
    { nombre: 'Pokedex', ruta: '/pokedex' },
    { nombre: 'Regions', ruta: '/regiones' },
    { nombre: 'Movements', ruta: '/movimientos' },
    { nombre: 'Objects', ruta: '/objetos' },
    { nombre: 'Berries', ruta: '/bayas' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-200 to-green-300 flex items-center justify-center p-4 sm:p-6">
      <div className="max-w-6xl w-full flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
        
        {/* Sección izquierda - Profesor Oak */}
        <div className="flex flex-col items-center gap-6 w-full lg:w-auto">
          
          {/* Imagen del Profesor Oak*/}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative bg-gradient-to-b from-yellow-400 to-yellow-500 p-1 rounded-lg shadow-2xl border-4 border-gray-600">
              <div className="bg-gradient-to-b from-gray-200 to-gray-300 px-4 sm:px-6 py-3 rounded border-4 border-yellow-500">
                <h1 className="text-base sm:text-lg font-bold text-gray-800 whitespace-nowrap">
                  Professor Oak
                </h1>
              </div>
            </div>

            <div className="w-40 h-56 sm:w-48 sm:h-64 md:w-56 md:h-72 p-1 rounded-lg flex items-end justify-center overflow-hidden">
              <img 
                src="/inicio/oak.png" 
                alt="Profesor Oak" 
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Cuadro de diálogo*/}
          <div className="relative bg-gradient-to-b from-yellow-400 to-yellow-500 p-1 rounded-lg shadow-2xl border-4 border-gray-600 w-full max-w-md">
            <div className="bg-gradient-to-b from-gray-200 to-gray-300 p-4 sm:p-6 rounded border-4 border-yellow-500">
              <p className="text-sm sm:text-base text-gray-900 leading-relaxed font-medium">
                Welcome trainer! Here you can find information about the Pokemon of each region and more!
              </p>
            </div>
          </div>
        </div>

        {/* Sección derecha - Menú de opciones */}
        <div className="bg-white rounded-lg shadow-2xl p-6 sm:p-8 w-full lg:flex-1 border-4 border-gray-300">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 text-center mb-6 pb-3 border-b-2 border-gray-300">
            Navigate through our sections:
          </h2>
          
          <div className="space-y-3 sm:space-y-4">
            {opciones.map((opcion, index) => (
              <button
                key={index}
                onClick={() => navegarA(opcion.ruta)}
                className="w-full text-base sm:text-lg bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 sm:py-4 px-4 sm:px-6 rounded-lg shadow-md transition-all duration-200 hover:shadow-lg hover:scale-105 border-2 border-gray-400 hover:border-gray-500 hover:cursor-pointer"
              >
                {opcion.nombre}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeleccionMenu;