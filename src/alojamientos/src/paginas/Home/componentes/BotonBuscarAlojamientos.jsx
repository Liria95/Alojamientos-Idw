import React from 'react';
import '../css/BotonBuscarAlojamiento.css';
import casaPrincipal from '../../assets/casaPortada2.png';


function BotonBuscarAlojamientos() {
  const handleClick = () => {
    window.open('/listar-alojamientos', '_blank');
  };

  return (
    <div className="seccion-form-busqueda">
      <button className="boton-alquileres-temporales" onClick={handleClick}>
        Buscar Alojamientos
      </button>
      <h1 className="text">
        VACACIONES PERFECTAS <br />
        <strong className="textResaltado">EN EL LUGAR PERFECTO</strong>
      </h1>
      <div id="casitaPortada">
        <img src={casaPrincipal} alt="Casa de portada" />
      </div>
    </div>
  );
}

export default BotonBuscarAlojamientos;
