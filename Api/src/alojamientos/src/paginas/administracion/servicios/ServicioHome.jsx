import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash, faSearch, faBed} from '@fortawesome/free-solid-svg-icons';
import CrearServicio from './componentes/CrearServicio';
import ActualizarServicio from './componentes/ActualizarServicio';
import EliminarServicio from './componentes/EliminarServicio';
import Buscarid from './componentes/Buscarid';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ServicioHome = () => {
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
      <h1><FontAwesomeIcon icon={faBed} /> Servicios</h1>
      <div className={`menu-container ${section ? 'hidden' : ''}`}>
        <button className={section === 'crear' ? 'active' : ''} onClick={() => handleClick('crear')}>
          <FontAwesomeIcon icon={faPlus} /> Crear Servicios
        </button>
        
        <button className={section === 'actualizar' ? 'active' : ''} onClick={() => handleClick('actualizar')}>
          <FontAwesomeIcon icon={faEdit} /> Actualizar Servicios
        </button>
        <button className={section === 'eliminar' ? 'active' : ''} onClick={() => handleClick('eliminar')}>
          <FontAwesomeIcon icon={faTrash} /> Eliminar Servicios
        </button>
        <button className={section === 'buscarId' ? 'active' : ''} onClick={() => handleClick('buscarId')}>
          <FontAwesomeIcon icon={faEdit} /> Buscar por Id
        </button>
      </div>
      <div className={`content-section ${transition ? 'enter' : 'enter-active'}`}>
        {section === 'crear' && <CrearServicio />}
        {section === 'actualizar' && <ActualizarServicio />}
        {section === 'eliminar' && <EliminarServicio />}
        {section === 'buscarId' && <Buscarid />}
      </div>
    </div>
  );
};

export default ServicioHome;
