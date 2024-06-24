import React, {useEffect, useState} from 'react';
import '../css/CardDestacada.css';
import casa from '../../assets/casa-portada.png';
import {toast} from "react-toastify";

export function CardDestacada({nombre}) {

    const [alojamientos, setAlojamientos] = useState([]);
    const [imagenes, setImagenes] = useState([]);
    // const [currentImagen, setCurrentImagen] = useState(null);

    // useEffect para cargar alojamientos e imágenes al montar el componente
    useEffect(() => {
        fetchAlojamientos();
        fetchImagenes();
    }, []);

    // Función para obtener los alojamientos del backend
    const fetchAlojamientos = async () => {
        const endpoint = 'http://localhost:3001/alojamiento/getAlojamientos';
        try {
            const response = await fetch(endpoint);
            if (response.ok) {
                const data = await response.json();
                setAlojamientos(data);
            } else {
                throw new Error('Error al cargar alojamientos');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Error al cargar alojamientos');
        }
    };

    // Función para obtener las imágenes del backend
    const fetchImagenes = async () => {
        const endpoint = 'http://localhost:3001/imagen/getAllImagenes';
        try {
            const response = await fetch(endpoint);
            if (response.ok) {
                const data = await response.json();
                setImagenes(data);

            } else {
                throw new Error('Error al cargar las imágenes');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Error al cargar las imágenes');
        }
    };


    //Trayendo la info a traves de los alojamientos
    return (
        <div className="destacadasCards">

            {alojamientos.length > 0 ? (

                alojamientos.map((alojamiento) =>

                    imagenes.length >0 ? (

                        imagenes.map((imagen) =>

                            imagen.idAlojamiento === alojamiento.idAlojamiento ? (
                                <div className="cdest" key={alojamiento.idAlojamiento}>
                                    <h4><a href="#">{alojamiento.Titulo}</a></h4>
                                    <img src={imagen.RutaArchivo} alt={`Imagen ${alojamiento.Titulo}`}/>
                                    <p className="infoPropiedadDestacada">
                                        <span className="enfasisTexto">Lo mejor de la propiedad: Lorem ipsum dolor sit amet! Officiis.</span>
                                    </p>
                                </div>
                            ) : (
                                <div className="cdestNoVisible" key={alojamiento.idAlojamiento}></div>
                            )
                        )

                    ) : (
                        <div className="cdest" key={alojamiento.idAlojamiento}>
                            <h4><a href="#">{alojamiento.Titulo}</a></h4>
                            <img src="" alt=" sin imagen para mostrar"/>
                            <p className="infoPropiedadDestacada">
                                <span className="enfasisTexto">Lo mejor de la propiedad: Lorem ipsum dolor sit amet! Officiis.</span>
                            </p>
                        </div>
                    )
                )

            ) : (
                <p>No hay imágenes disponibles.</p>
            )}

        </div>

    );

}