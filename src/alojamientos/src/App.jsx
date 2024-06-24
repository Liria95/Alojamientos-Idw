import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './paginas/Home/Home';
import Institucional from './paginas/Institucional/Institucional';
import Administracion from './paginas/administracion/Administracion';
import Contactanos from './paginas/Contactanos/Contactanos';
import ListarAlojamientosPage from './paginas/Home/componentes/ListarAlojamientoPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/institucional" element={<Institucional />} />
          <Route path="/administracion" element={<Administracion />} />
          <Route path="/contactanos" element={<Contactanos />} />
          <Route path="/listar-alojamientos" element={<ListarAlojamientosPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
