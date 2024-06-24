import React, { useState } from 'react';
import CrearServicio from './componentes/CrearServicio;';
import ActualizarServicio from './componentes/ActualizarServicio';
import EliminarServicio from './componentes/EliminarServicio';
import Buscarid from './componentes/Buscarid';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Servicios = () => {
  const [section, setSection] = useState(null); // Inicialmente null para no mostrar ningún componente

  return (
    <div>
      <ToastContainer />
      <h1>Administración de Servicios</h1>
      <div className="menu-container">
        <button onClick={() => setSection('crear')}>Crear Servicio</button>
        <button onClick={() => setSection('actualizar')}>Actualizar Servicio</button>
        <button onClick={() => setSection('eliminar')}>Eliminar Servicio</button>
        <button onClick={() => setSection('listar')}>Listar Servicios</button>
      </div>
      {section === 'crear' && <CrearServicio />}
      {section === 'Actualizar' && <ActualizarServicio />}
      {section === 'Eliminar' && <EliminarServicio />}
      {section === 'BuscarId' && <Buscarid />}
    </div>
  );
};

export default Servicios;
