import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash, faSearch, faBuilding } from '@fortawesome/free-solid-svg-icons';
import CrearAlojamientoServicio from './componentes/CrearAlojamientoServicio';
import ActualizarAlojamientoServicio from './componentes/ActualizarAlojamientoServicio';
import EliminarAlojamientoServicio from './componentes/EliminarAlojamientoServicio';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AlojamientoServiciosHome = () => {
  const [section, setSection] = useState(null);
  const [transition, setTransition] = useState(false);

  const handleClick = (sectionName) => {
    setTransition(true);
    setTimeout(() => {
      setSection(sectionName);
      setTransition(false);
    }, 500);
  };

  return (
    <div className={`admin-container ${section ? 'hidden' : ''}`}>
      <ToastContainer />
      <h1><FontAwesomeIcon icon={faBuilding} /> Alojamientos con Servicios</h1>
      <div className={`menu-container2 ${section ? 'hidden' : ''}`}>
        <button className={section === 'crear' ? 'active' : ''} onClick={() => handleClick('crear')}>
          <FontAwesomeIcon icon={faPlus} /> Crear Alojamiento Servicio
        </button>
        <button className={section === 'actualizar' ? 'active' : ''} onClick={() => handleClick('actualizar')}>
          <FontAwesomeIcon icon={faEdit} /> Actualizar Alojamiento Servicio
        </button>
        <button className={section === 'eliminar' ? 'active' : ''} onClick={() => handleClick('eliminar')}>
          <FontAwesomeIcon icon={faTrash} /> Eliminar Alojamiento Servicio
        </button>
      </div>
      <div className={`content-section ${transition ? 'enter' : 'enter-active'}`}>
        {section === 'crear' && <CrearAlojamientoServicio />}
        {section === 'eliminar' && <EliminarAlojamientoServicio />}
        {section === 'actualizar' && <ActualizarAlojamientoServicio />}       
      </div>
    </div>
  );
};

export default AlojamientoServiciosHome;