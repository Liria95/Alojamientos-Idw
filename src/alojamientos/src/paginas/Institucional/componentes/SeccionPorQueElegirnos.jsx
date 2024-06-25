import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../css/SeccionPorQueElegirnos.css';
import imagen_empresa1 from '../../assets/conocimiento1.jpg';
import imagen_empresa2 from '../../assets/experiencia1.jpg';
import imagen_empresa3 from '../../assets/servicioalcliente1.jpg';
import imagen_empresa4 from '../../assets/conocimiento2.jpg';
import imagen_empresa5 from '../../assets/experiencia2.jpg';
import imagen_empresa6 from '../../assets/servicioalcliente2.jpg';
import imagen_empresa7 from '../../assets/transparencia1.jpg';
import imagen_empresa8 from '../../assets/cumplimiento1.jpg';
import imagen_empresa9 from '../../assets/herramientas1.jpg';
import imagen_empresa10 from '../../assets/transparencia2.jpg';
import imagen_empresa11 from '../../assets/cumplimiento2.jpg';
import imagen_empresa12 from '../../assets/herramientas2.jpg';
import imagen_empresa13 from '../../assets/referencias1.jpg';
import imagen_empresa14 from '../../assets/contactos1.jpg';
import imagen_empresa15 from '../../assets/negociacion1.jpg';
import imagen_empresa16 from '../../assets/referencias2.jpg';
import imagen_empresa17 from '../../assets/contactos2.jpg';
import imagen_empresa18 from '../../assets/negociacion2.jpg';


function PorQueElegirnos() {
  const imagenes = [
    [imagen_empresa1, imagen_empresa2, imagen_empresa3, imagen_empresa4, imagen_empresa5, imagen_empresa6],
    [imagen_empresa7, imagen_empresa8, imagen_empresa9, imagen_empresa10, imagen_empresa11, imagen_empresa12],
    [imagen_empresa13, imagen_empresa14, imagen_empresa15, imagen_empresa16, imagen_empresa17, imagen_empresa18],


  ];

  const textos = [
    { superior: "CONOCIMIENTO", media: "AMPLIA EXPERIENCIA", inferior: "SERVICIO AL CLIENTE" },
    { superior: "TRANSPARENCIA", media: "CUMPLIMIENTO", inferior: "HERRAMIENTAS" },
    { superior: "REFERENCIAS", media: "CONTACTOS", inferior: "NEGOCIACIÓN" },
  ];

  const porcentajes = [
    { superior: "100%", media: "80%", inferior: "90%" },
    { superior: "100%", media: "100%", inferior: "85%" },
    { superior: "90%", media: "80%", inferior: "85%" },
  ];

  return (
    <div className="PorQueElegirnos">
      {imagenes.map((grupo, index) => (
        <div key={index} className={`container container${index + 1}`}>
          <Carousel
            showThumbs={false}
            emulateTouch={true}
            infiniteLoop={true}
            transitionTime={500}
            swipeable={true}
            autoPlay={true}
            interval={3000}
          >
            {grupo.map((imagen, i) => (
              <div key={i}>
                <img src={imagen} alt={`Empresa XYZ ${index + 1}`} className={`imagen-empresa imagen-${index}-${i}`} />
              </div>
            ))}
          </Carousel>
          <div className="barras">
            <div className="barra-superior">
              <p className="texto-superior">{textos[index].superior}</p>
              <div className="barra-superior-adicional">
                <p className="porcentaje-superior">{porcentajes[index].superior}</p>
              </div>
            </div>
            <div className="barra-media">
              <p className="texto-media">{textos[index].media}</p>
              <div className="barra-media-adicional">
                <p className="porcentaje-media">{porcentajes[index].media}</p>
              </div>
            </div>
            <div className="barra-inferior">
              <p className="texto-inferior">{textos[index].inferior}</p>
              <div className="barra-inferior-adicional">
                <p className="porcentaje-inferior">{porcentajes[index].inferior}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PorQueElegirnos;
