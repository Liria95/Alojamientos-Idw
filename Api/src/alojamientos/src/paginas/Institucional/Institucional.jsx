import React from 'react';
import { Navigate } from 'react-router-dom';
import Header from '../Home/componentes/Header'; 
import SeccionInstitucional from '../Institucional/componentes/SeccionInstitucional';
import SeccionPorQueElegirnos from '../Institucional/componentes/SeccionPorQueElegirnos';
import NuestroEquipo from '../Institucional/componentes/NuestroEquipo';
import { Footer } from '../Home/componentes/Footer'; 
import BotonBuscarAlojamientos from '../Home/componentes/BotonBuscarAlojamientos';

function Institucional() {
  const handleVerAlojamientosClick = () => {
    return <Navigate to="/listar-alojamientos" />;
  };

  return (
    <div className="institucional">
      <Header />
      <BotonBuscarAlojamientos onClick={handleVerAlojamientosClick} />
      <SeccionInstitucional />
      <SeccionPorQueElegirnos />
      <NuestroEquipo />
      <Footer />
    </div>
  );
}

export default Institucional;
