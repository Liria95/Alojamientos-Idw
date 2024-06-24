import React from 'react';
import {CardDestacada} from '../componentes/CardDestacada';
import '../css/SeccionDestacadas.css';

export function SeccionDestacadas() {
    return (
        <div>
            <div className="propDestacadas1">
                <CardDestacada key="1" nombre="Destacada1" />
                <CardDestacada key="2" nombre="Destacada2" />
                <CardDestacada key="3" nombre="Destacada3" />
            </div>

            <div className="propDestacadas2">
                <CardDestacada key="4" nombre="Destacada4" />
                <CardDestacada key="5" nombre="Destacada5" />
                <CardDestacada key="6" nombre="Destacada6" />
            </div>
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