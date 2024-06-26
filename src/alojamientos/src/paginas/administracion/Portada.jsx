import React from 'react';
import '../administracion/Portada.css';
import logo from '../assets/casalogo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBed, faImages, faConciergeBell, faHotel } from '@fortawesome/free-solid-svg-icons';

const Portada = ({ handleClick, handleBackToAdmin, section }) => {

  // Función para manejar el clic en el botón "Home"
  const handleHomeClick = () => {
    window.location.href = '/';
  };

  return (
    <nav className="Portada" role="navigation" aria-label="Main Navigation">
      <div className="logocasita">
        <img src={logo} className="logo" alt="Logo de la empresa HOUSE" />
      </div>
      <div className="menu-containeradmin">
        {/* Botón "Home" solo visible cuando no estamos en la sección de administración */}
        {section !== 'administracion' && (
          <>
            <button className="toggle-button" onClick={handleBackToAdmin}>
              <FontAwesomeIcon icon={faHome} /> Administración
            </button>
            <button className={section === 'home' ? 'active' : ''} onClick={handleHomeClick}>
              <FontAwesomeIcon icon={faHome} /> Home
            </button>
          </>
        )}

        {/* Botones de secciones cuando estamos en la sección de administración */}
        {section === 'administracion' && (
          <>
            <button className={section === 'administracion' ? 'active' : ''} onClick={() => handleClick('administracion')}>
              <FontAwesomeIcon icon={faHome} /> Administración
            </button>
            <button className={section === 'alojamientos' ? 'active' : ''} onClick={() => handleClick('alojamientos')}>
              <FontAwesomeIcon icon={faBed} /> Alojamientos
            </button>
            <button className={section === 'tipo alojamiento' ? 'active' : ''} onClick={() => handleClick('tipo alojamiento')}>
              <FontAwesomeIcon icon={faHotel} /> Tipo Alojamiento
            </button>
            <button className={section === 'imagenes' ? 'active' : ''} onClick={() => handleClick('imagenes')}>
              <FontAwesomeIcon icon={faImages} /> Imágenes
            </button>
            <button className={section === 'servicios' ? 'active' : ''} onClick={() => handleClick('servicios')}>
              <FontAwesomeIcon icon={faConciergeBell} /> Servicios
            </button>
            <button className={section === 'alojamiento servicios' ? 'active' : ''} onClick={() => handleClick('alojamiento servicios')}>
              <FontAwesomeIcon icon={faConciergeBell} /> Alojamientos Servicios
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Portada;
