import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash, faSearch, faBed } from '@fortawesome/free-solid-svg-icons';
import CrearAlojamiento from './componentes/CrearAlojamiento';
import ActualizarAlojamiento from './componentes/ActualizarAlojamiento';
import EliminarAlojamiento from './componentes/EliminarAlojamiento';
import BuscarAlojamiento from './componentes/BuscarAlojamiento';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AlojamientosHome = () => {
  // Estados para manejar la sección actual y las transiciones
  const [section, setSection] = useState(null);
  const [transition, setTransition] = useState(false);

  // Función para manejar los clics en los botones del menú
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
      <h1><FontAwesomeIcon icon={faBed} /> Alojamientos</h1>
      <div className={`menu-container2 ${section ? 'hidden' : ''}`}>
        <button className={section === 'crear' ? 'active' : ''} onClick={() => handleClick('crear')}>
          <FontAwesomeIcon icon={faPlus} /> Crear Alojamiento
        </button>
        <button className={section === 'actualizar' ? 'active' : ''} onClick={() => handleClick('actualizar')}>
          <FontAwesomeIcon icon={faEdit} /> Actualizar Alojamiento
        </button>
        <button className={section === 'eliminar' ? 'active' : ''} onClick={() => handleClick('eliminar')}>
          <FontAwesomeIcon icon={faTrash} /> Eliminar Alojamiento
        </button>
        <button className={section === 'buscar' ? 'active' : ''} onClick={() => handleClick('buscar')}>
          <FontAwesomeIcon icon={faSearch} /> Buscar Alojamiento
        </button>
      </div>
      <div className={`content-section ${transition ? 'enter' : 'enter-active'}`}>
        {section === 'crear' && <CrearAlojamiento />}
        {section === 'actualizar' && <ActualizarAlojamiento />}
        {section === 'eliminar' && <EliminarAlojamiento />}
        {section === 'buscar' && <BuscarAlojamiento />}
      </div>
    </div>
  );
};

export default AlojamientosHome;
