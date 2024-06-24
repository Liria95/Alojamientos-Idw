import React from 'react';
import './Portada.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';

export function FooterAdmin() {
    return (
        <footer className="footeradmin">
            <ul className="footeradmin-list">
                <li className="footeradmin-item">
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faFacebook} /> Facebook
                    </a>
                </li>
                <li className="footeradmin-item">
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faInstagram} /> Instagram
                    </a>
                </li>
                <li className="footeradmin-item">
                    <a href="https://www.whatsapp.com" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faWhatsapp} /> WhatsApp
                    </a>
                </li>
            </ul>
        </footer>
    );
}

export default FooterAdmin;
