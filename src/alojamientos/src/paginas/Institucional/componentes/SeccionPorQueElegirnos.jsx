import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../css/SeccionPorQueElegirnos.css';
import imagen_empresa1 from '../../assets/conocimiento.jpg';
import imagen_empresa2 from '../../assets/experiencia.jpg';
import imagen_empresa3 from '../../assets/servicioalcliente.jpg';
import imagen_empresa4 from '../../assets/negociacion.jpg';
import imagen_empresa5 from '../../assets/contactos.jpg';
import imagen_empresa6 from '../../assets/herramientas.jpg';


function PorQueElegirnos() {
  const imagenes = [
    [imagen_empresa1, imagen_empresa2, imagen_empresa3], // Grupo de imágenes para la primera iteración
    [imagen_empresa4, imagen_empresa5, imagen_empresa6],
  ];

  return (
    <div className="PorQueElegirnos">
      {imagenes.map((grupo, index) => (
        <div key={index} className={`container container${index + 1}`}>
          <Carousel
            showThumbs={false}
            emulateTouch={true}
            infiniteLoop={true}
            transitionTime={500} // Tiempo de transición en milisegundos
            swipeable={true} // Permite deslizar con el dedo en dispositivos táctiles
            autoPlay={true} // Activa el deslizamiento automático
            interval={3000} // Intervalo de tiempo en milisegundos entre cada deslizamiento
          >
            {grupo.map((imagen, i) => (
              <div key={i}>
                <img src={imagen} alt={`Empresa XYZ ${index + 1}`} className={`imagen-empresa imagen-${index + 1}`} />
              </div>
            ))}
          </Carousel>
          <div className="barras">
            <div className="barra-superior">
              <p>Texto 1</p>
              <div className="barra-superior-adicional">
                <p>{index === 0 ? '90%' : index === 1 ? '89%' : '80%'}</p>
              </div>
            </div>
            <div className="barra-media">
              <p>Texto 2</p>
              <div className="barra-media-adicional">
                <p>{index === 0 ? '76%' : index === 1 ? '75%' : '100%'}</p>
              </div>
            </div>
            <div className="barra-inferior">
              <p>Texto 3</p>
              <div className="barra-inferior-adicional">
                <p>{index === 0 ? '99%' : index === 1 ? '95%' : '85%'}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PorQueElegirnos;
