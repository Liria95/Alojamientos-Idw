import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faHotel } from '@fortawesome/free-solid-svg-icons';
import AdminTipoAlojamiento from './componentes/AdminTipoAlojamiento';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AlojamientosHome = () => {
  // Estados para manejar la sección actual y las transiciones
  const [section, setSection] = useState(null);
  const [transition, setTransition] = useState(false);

  // Función para manejar los clics en los botones del menú
  const handleClick = (sectionName) => {
    // Inicia la transición
    setTransition(true);
    setTimeout(() => {
      // Cambia la sección después de la transición
      setSection(sectionName);
      setTransition(false);
    }, 500);
  };

  return (
    <div className={`admin-container ${section ? 'hidden' : ''}`}>
      <ToastContainer />
      <h1><FontAwesomeIcon icon={faHotel} /> Tipo Alojamientos</h1>
      <div className={`menu-container2 ${section ? 'hidden' : ''}`}>
        <button onClick={() => handleClick('tipo')}>
          <FontAwesomeIcon icon={faCog} style={{ marginRight: '5px' }} />
          Administrar Tipo de alojamiento
        </button>
      </div>
      <div className={`content-section ${transition ? 'enter' : 'enter-active'}`}>
        {section === 'tipo' && <AdminTipoAlojamiento />}
      </div>
    </div>
  );
};

export default AlojamientosHome;
