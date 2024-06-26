import React, { useState } from 'react';
import AlojamientosHome from '../administracion/alojamientos/AlojamientosHome';
import TipoAlojamientoHome from '../administracion/tipo alojamiento/TipoAlojamientoHome';
import Portada from './Portada';
import Footeradmin from './FooterAdmin';
import ServicioHome from '../administracion/servicios/ServicioHome';
import AlojamientoServiciosHome from '../administracion/alojamientosServicios/AlojamientoServiciosHome';
import './Admin.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImagenesHome from '../administracion/imagenes/ImagenesHome';

const Administracion = () => {
  const [section, setSection] = useState('administracion'); 
  const [transition, setTransition] = useState(false);  

  const handleClick = (sectionName) => {
    setTransition(true);  
    setTimeout(() => {
      setSection(sectionName); 
      setTransition(false); 
    }, 500);
  };

  const handleBackToAdmin = () => {
    setTransition(true);
    setTimeout(() => {
      setSection('administracion');
      setTransition(false);
    }, 500);
  };

  return (
    <div className="admin-container">
      <ToastContainer />
      <Portada handleClick={handleClick} handleBackToAdmin={handleBackToAdmin} section={section} />
      <div className={`content-section ${transition ? 'enter' : 'enter-active'}`}>
        {section === 'alojamientos' && <AlojamientosHome />}
        {section === 'tipo alojamiento' && <TipoAlojamientoHome />}
        {section === 'servicios' && <ServicioHome />}
        {section === 'imagenes' && <ImagenesHome />}
        {section === 'alojamiento servicios' && <AlojamientoServiciosHome />}
      </div>
      <Footeradmin />
    </div>
  );
};

export default Administracion;
