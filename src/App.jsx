import { Routes, Route } from "react-router-dom";
import './styles/App.css'
import SeleccionMenu from './pages/Inicio.jsx'
import Pokedex from './pages/Pokedex.jsx'
import Regiones from './pages/Regiones.jsx'
import Movimientos from './pages/Movimientos.jsx'
import Objetos from './pages/Objetos.jsx'
import Bayas from './pages/Bayas.jsx'

function App() {
  return (
   <div>
      <Routes>
        <Route path="/" element={<SeleccionMenu />} />
        <Route path="/pokedex" element={<Pokedex />} />
        <Route path="/regiones" element={<div>Regiones</div>} />
        <Route path="/movimientos" element={<div>Movimientos</div>} />
        <Route path="/objetos" element={<div>Objetos</div>} />
        <Route path="/bayas" element={<div>Bayas</div>} />
      </Routes>
   </div>
  )
}

export default App