import { Routes, Route } from "react-router-dom";
import './styles/App.css'
import SeleccionMenu from './pages/Inicio.jsx'
import Pokedex from './pages/Pokedex.jsx'
import Regiones from './pages/Regiones.jsx'
import Movimientos from './pages/Movimientos.jsx'
import Objetos from './pages/Objetos.jsx'
import Bayas from './pages/Bayas.jsx'
import PokemonDetalle from './components/PokemonDetalle.jsx'

function App() {
  return (
   <div>
      <Routes>
        <Route path="/" element={<SeleccionMenu />} />
        <Route path="/pokedex" element={<Pokedex />} />
        <Route path="/regiones" element={<div>Regiones</div>} />
        <Route path="/objetos" element={<Objetos />} />
        <Route path="/bayas" element={<Bayas />} />
        <Route path="/movimientos" element={<Movimientos/>} />
        <Route path="/pokemon/:id" element={<PokemonDetalle />} />
      </Routes>
   </div>
  )
}

export default App