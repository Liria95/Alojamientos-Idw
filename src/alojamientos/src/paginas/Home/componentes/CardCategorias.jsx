import React from 'react';
import '../css/CardCategorias.css';

export function CardCategorias({ nombre }) {
    return (
        <div className="card">
            <h4>{nombre}</h4>
            <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="84" height="84" viewBox="0 0 24 24"
                 strokeWidth="1" stroke="#ff9300" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M5 12l-2 0l9 -9l9 9l-2 0"></path>
                <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7"></path>
                <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6"></path>
            </svg>
            <p className="infoTipoloft">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque eius et, minus
                perferendis repellendus suscipit?
            </p>
            <button className="buscar">Buscar</button>
        </div>
    );
}
