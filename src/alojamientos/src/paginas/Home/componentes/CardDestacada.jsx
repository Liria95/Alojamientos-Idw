import React, { useEffect, useState } from 'react';
import '../css/CardDestacada.css';
import casa from '../../assets/casa-portada.png';
import { toast } from "react-toastify";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

export function CardDestacada({ nombre }) {
    const [alojamientos, setAlojamientos] = useState([]);
    const [imagenes, setImagenes] = useState([]);

    useEffect(() => {
        fetchAlojamientos();
        fetchImagenes();
    }, []);

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

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000
    };

    return (
        <div className="destacadasCards">
            {alojamientos.length > 0 ? (
                alojamientos.slice(0, 4).map((alojamiento) => {
                    const imagenesAlojamiento = imagenes.filter(img => img.idAlojamiento === alojamiento.idAlojamiento);
                    return (
                        <div className="cdest" key={alojamiento.idAlojamiento}>
                            <h4><a href="#">{alojamiento.Titulo}</a></h4>
                            {imagenesAlojamiento.length > 0 ? (
                                <Slider {...settings}>
                                    {imagenesAlojamiento.map((imagen, index) => (
                                        <div key={index}>
                                            <img src={imagen.RutaArchivo} alt={`Imagen ${alojamiento.Titulo}`} />
                                        </div>
                                    ))}
                                </Slider>
                            ) : (
                                <img src='' alt={`Imagen ${alojamiento.Titulo} no Disponible`} />
                            )}
                            <p className="infoPropiedadDestacada">
                                <span className="enfasisTexto">Lo mejor de la propiedad: Lorem ipsum dolor sit amet! Officiis.</span>
                            </p>
                        </div>
                    );
                })
            ) : (
                <p>No hay propiedades destacadas disponibles.</p>
            )}
        </div>
    );
}
