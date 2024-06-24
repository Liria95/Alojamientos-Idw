import React from 'react';
import '../css/CardDestacada.css';
import casa from '../../assets/casa-portada.png';

export function CardDestacada({ nombre }) {
    return (
        <div className="cdest">
            <h4><a href="#">{nombre}</a></h4>
            <img src={casa} alt={`Imagen de ${nombre}`} />
            <p className="infoPropiedadDestacada">
                <span className="enfasisTexto">Lo mejor de la propiedad: Lorem ipsum dolor sit amet! Officiis.</span>
            </p>
        </div>
    );
}
