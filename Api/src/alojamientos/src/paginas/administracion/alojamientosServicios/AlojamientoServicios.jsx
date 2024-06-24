import React, { useState } from 'react';
import ListarAlojamientosConServicios from '../componentes/ListarAlojamientosConServicios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AlojamientoServicios = () => {
  const [section, setSection] = useState(null); // Inicialmente null para no mostrar ningún componente

  return (
    <div>
      <ToastContainer />
      <h1>Administración de Alojamientos y Servicios</h1>
      <div className="menu-container">
        <button onClick={() => setSection('listarAlojamientosConServicios')}>ListarAlojamientosConServicios</button>
      </div>
        

      {section === 'listarAlojamientosConServicios' && <ListarAlojamientosConServicios />}
    </div>
  );
};

export default AlojamientoServicios;