import React, {useState} from 'react'
import {Menu, X} from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Navbar() {
    const [menuAbierto, setMenuAbierto] = useState(false)

    const toggleMenu = () => {
        setMenuAbierto(!menuAbierto)
    }

    const enlaces = [
        {nombre: 'Home', ruta: '/'},
        {nombre: 'Pokedex', ruta: '/pokedex'},
        {nombre: 'Regions', ruta: '/regiones'},
        {nombre: 'Movements', ruta: '/movimientos'},
        {nombre: 'Items', ruta: '/objetos'},
        {nombre: 'Berries', ruta: '/bayas'}
    ]

    return (
        <>
            {/*Navbar*/}
            <nav className='fixed top-0 left-0 right-0 bg-[#222222] text-white shadow-lg z-50'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                    <div className='flex items-center justify-between h-16'>
                        
                        {/*Titulo de la pagina*/}
                        <div className='flex items-center'>
                            <Link to="/">
                                <h1 className='text-2xl font-bold hover:text-gray-300 transition-colors duration-200'>
                                    Pokepedia
                                </h1>
                            </Link>
                        </div>

                        {/*Botones de navegacion*/}
                        <div className='hidden md:flex space-x-8'>
                            {enlaces.map((enlace, index) => (
                                <Link 
                                    key={index} 
                                    to={enlace.ruta} 
                                    className='hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200'
                                >
                                    {enlace.nombre}
                                </Link>
                            ))}
                        </div>

                        {/*Boton hamburguesa*/}
                        <div className='md:hidden'>
                            <button
                                onClick={toggleMenu}
                                className='p-2 rounded-md hover:bg-gray-700 focus:outline-none transition-colors duration-200'
                            >
                                {menuAbierto ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/*Menu para movil */}
                <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
                    menuAbierto ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                    <div className='px-2 pt-2 pb-3 space-y-1 bg-[#1a1a1a]'>
                        {enlaces.map((enlace, index) => (
                            <Link 
                                key={index} 
                                to={enlace.ruta} 
                                className='block px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors duration-200'
                                onClick={() => setMenuAbierto(false)}
                            >
                                {enlace.nombre}
                            </Link>
                        ))}
                    </div>
                </div>
            </nav>
        </>
    )
}