import React from 'react';
import {CardDestacada} from '../componentes/CardDestacada';
import '../css/SeccionDestacadas.css';

export function SeccionDestacadas() {
    return (
        <div>

            <div className="navDestacadas">
                <ul>
                    <li><a href="#">1</a></li>
                    <li><a href="#">2</a></li>
                    <li><a href="#">3</a></li>
                    <li><a href="#">4</a></li>
                    <li><a href="#">5</a></li>
                </ul>

                <a href="#" className="buscar">Ver todas</a>
            </div>
        </div>
    );
}

export default SeccionDestacadas;