import React from 'react';
import '../css/SeccionPorQueElegirnos.css';
import imagen_empresa1 from '../../assets/imagen_empresa1.jpg';

function PorQueElegirnos() {
  return (
    <div className="PorQueElegirnos">
      {[1, 2, 3].map((i) => (
        <div key={i} className={`container container${i}`}>
          <img src={imagen_empresa1} alt={`Empresa XYZ ${i}`} className={`imagen-empresa imagen-${i}`} />
          <div className="barras">
            <div className="barra-superior">
              <p>Texto 1</p>
              <div className="barra-superior-adicional">
                <p>{i === 1 ? '90%' : i === 2 ? '89%' : '80%'}</p>
              </div>
            </div>
            <div className="barra-media">
              <p>Texto 2</p>
              <div className="barra-media-adicional">
                <p>{i === 1 ? '76%' : i === 2 ? '75%' : '100%'}</p>
              </div>
            </div>
            <div className="barra-inferior">
              <p>Texto 3</p>
              <div className="barra-inferior-adicional">
                <p>{i === 1 ? '99%' : i === 2 ? '95%' : '85%'}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PorQueElegirnos;
