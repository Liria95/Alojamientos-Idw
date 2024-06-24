import React from 'react';
import '../administracion/Portada.css';
import logo from '../assets/casalogo.png';

export function Portada() {
    return (
        <nav className="Portada" role="navigation" aria-label="Main Navigation">
            <div className="logocasita">
                <img src={logo} className="logo" alt="Logo de la empresa HOUSE" />
            </div>
        </nav>
    );
}

export default Portada;
