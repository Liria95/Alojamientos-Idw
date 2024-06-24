import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import logo from '../../assets/casalogo.png';
import '../css/Footer.css';

export function Footer() {
    return (
        <footer>
            <div className="redesSociales">
                <ul>
                    <li>
                        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                            <FontAwesomeIcon icon={faInstagram} /> Instagram
                        </a>
                    </li>
                    <li>
                        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                            <FontAwesomeIcon icon={faFacebook} /> Facebook
                        </a>
                    </li>
                    <li>
                        <a href="https://wa.me" target="_blank" rel="noopener noreferrer" aria-label="Whatsapp">
                            <FontAwesomeIcon icon={faWhatsapp} /> Whatsapp
                        </a>
                    </li>
                </ul>
                <img src={logo} width="150" alt="Logo de la empresa" />
            </div>
        </footer>
    );
}

export default Footer;
