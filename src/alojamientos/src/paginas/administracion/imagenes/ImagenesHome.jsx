import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash, faSearch, faBed} from '@fortawesome/free-solid-svg-icons';
import CrearImagen from './componentes/CrearImagen';
import EditarImagen from './componentes/EditarEliminarImagen';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './componentes/Imagenes.css';


const AlojamientosHome = () => {
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
      <h1><FontAwesomeIcon icon={faBed} /> Imagenes</h1>
      <div className={`menu-container2 ${section ? 'hidden' : ''}`}>
        <button className={section === 'crear' ? 'active' : ''} onClick={() => handleClick('crear')}>
          <FontAwesomeIcon icon={faPlus} /> Crear Imagen
        </button>
        <button className={section === 'editar o eliminar' ? 'active' : ''} onClick={() => handleClick('editar o eliminar')}>
          <FontAwesomeIcon icon={faEdit} /> Editar <FontAwesomeIcon icon={faTrash}/> Eliminar Imagen
        </button>
      </div>
      <div className={`content-section ${transition ? 'enter' : 'enter-active'}`}>
        {section === 'crear' && <CrearImagen />}
        {section === 'editar o eliminar' && <EditarImagen />}
      </div>
    </div>
  );
};

export default AlojamientosHome;
