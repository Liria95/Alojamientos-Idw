import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/BarraNav.css';
import logo from '../../assets/casalogo.png';

export function BarraNav() {
    const [menuAbierto, setMenuAbierto] = useState(false);

    const toggleMenu = () => {
        setMenuAbierto(!menuAbierto);
    };

    return (
        <nav className="barraNavegacion" role="navigation" aria-label="Main Navigation">
            <div className="logoYMenu">
                <img src={logo} className="logoBarra" alt="Logo de la empresa HOUSE" />
                <button
                    className={`menuHamburguesa ${menuAbierto ? 'abierto' : ''}`}
                    onClick={toggleMenu}
                    aria-label="Abrir menú"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
            <ul className={`menu ${menuAbierto ? 'abierto' : ''}`}>
                <li><Link to="/">HOME</Link></li>
                <li><Link to="/institucional">INSTITUCIONAL</Link></li>
                <li><Link to="/administracion">ADMINISTRACION</Link></li>
                <li><Link to="/contactanos">CONTACTANOS</Link></li>
                <li><Link to="/registro">REGISTRO</Link></li>
            </ul>
        </nav>
    );
}
