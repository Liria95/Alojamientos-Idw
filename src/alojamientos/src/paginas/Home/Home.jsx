import React from 'react'
import Header from "./componentes/Header";
import {Presentacion} from "./componentes/Presentacion";
import {Seccion} from "./componentes/Seccion";
import SeccionDestacadas from "./componentes/SeccionDestacadas";
import {SeccionTiposA} from "./componentes/SeccionTiposA";
import {Footer} from "./componentes/Footer";
import BotonBuscarAlojamientos from '../Home/componentes/BotonBuscarAlojamientos';
import {CardDestacada} from "./componentes/CardDestacada";



export function Home() {
    return (
        <div>
            <Header />
            <BotonBuscarAlojamientos />
            <Presentacion />
            <Seccion ClassName='destacadas' nombre='ALOJAMIENTOS DESTACADOS' />
            <SeccionDestacadas />
            <Seccion ClassName='categoriaPropiedades' nombre='TIPOS DE ALOJAMIENTOS' />
            <SeccionTiposA className='cardsCategorias' />
            <Footer/> 
        </div>
    )
}