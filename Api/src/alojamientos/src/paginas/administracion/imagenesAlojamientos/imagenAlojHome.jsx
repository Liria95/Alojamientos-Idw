import React, { useState, useEffect } from 'react';
import {toast} from "react-toastify";

const Formulario = () => {
    const [imagen, setImagen] = useState(null);
    const [rutaImagen, setRutaImagen] = useState('');
    const [opciones, setOpciones] = useState([]);
    const [opcionSeleccionada, setOpcionSeleccionada] = useState('');
    const [imagenesCargadas, setImagenesCargadas] = useState([]);
    const [error, setError] = useState('');

    console.log(imagenesCargadas);

    // Función para manejar la carga de la imagen desde el input file
    const handleImagenChange = (event) => {
        const file = event.target.files[0];
        setImagen(file);
        const objectURL = URL.createObjectURL(file);
        setRutaImagen(objectURL);
        console.log(objectURL);  //Psrs ver la ruta de la imagen
    };

    // Función para manejar el cambio en el select
    const handleSelectChange = (event) => {
        setOpcionSeleccionada(event.target.value);
    };


    // Cargar las imágenes
    useEffect(() => {
        obtenerImagenesGuardadas();
    }, []);


    // Función para obtener todas las imágenes cargadas desde el backend
    const obtenerImagenesGuardadas = async () => {
        try {
            const response = await fetch('http://localhost:3001/imagen/getAllImagenes');
            if (!response.ok) {
                throw new Error('Error al obtener la lista de imágenes');
            }
            if (response.ok) {
                const data = await response.json();
                setImagenesCargadas(data);



                console.log('Estas son las imagenes cargadas'+imagenesCargadas);

        }} catch (error) {
            console.error('Error al obtener imágenes cargadas:', error);
        }
    };

    // Función asíncrona para obtener los alojamientos desde el backend y poder seleccionarlos en el select
    useEffect(() => {
        fetchAlojamientos(); // Llama a la función para obtener alojamientos
    }, []);
    const fetchAlojamientos = async () => {
        const endpoint = 'http://localhost:3001/alojamiento/getAlojamientos'; // Endpoint para obtener alojamientos

        try {
            const response = await fetch(endpoint); // Petición GET a la API
            if (response.ok) {
                const data = await response.json(); // Convertir respuesta a JSON
                setOpciones(data); // Actualizar el estado con los alojamientos obtenidos
            } else {
                throw new Error('Error al cargar las imagenes guardadas'); // Lanzar error si la respuesta no es exitosa
            }
        } catch (error) {
            console.error('Error:', error); // Manejo de errores en la consola
            toast.error('Error al cargar las imagenes guardadas'); // Mostrar notificación de error
        }
    };

    // Función para enviar los datos al backend y luego actualizar las imágenes cargadas
    const handleSubmit = async (event) => {
        event.preventDefault();

        const endpoint = 'http://localhost:3001/imagen/createImagen';

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    //'idImagen': 0,
                    'idAlojamiento': opcionSeleccionada,
                    'RutaArchivo': rutaImagen
                }),
            });

            if (!response.ok) {
                throw new Error('Error al guardar la imagen');
            }
            toast.success('Imagen guardada con éxito');


            // Obtener la info de la imagen guardada desde la respuesta del servidor
            //ACA NECESITO PODER ACCEDER AL ID DE ESA ULTIMA IMAGEN QUE INGRESE PARA PODER TRAERLO Y A LA NUEVA IMAGEN DARLE VALOR A ESE ATRIBUTO
            //Y LOGRAR QUE CON EL SET QUEDE LA IMAGEN CARGADA CON TODOS LOS DATOS. PUES EL IMAGENESCARGADAS.MAP DEL RETURN, NO TENGO BIEN LOS DATOS DE ESA ULTIMA IMAGEN

            const nuevaImagen = { idAlojamiento: opcionSeleccionada, rutaImagen: rutaImagen  };

            // Actualizar el estado de imágenes cargadas con la nueva imagen y opción seleccionada
            setImagenesCargadas([...imagenesCargadas, nuevaImagen]);


            // Limpiar los campos después de cargar la imagen
            setImagen(null);
            setRutaImagen('');
            setOpcionSeleccionada('');


        } catch (error) {
            console.error('Error al procesar la imagen:', error);
            alert('Hubo un error al cargar la imagen. Por favor intenta de nuevo.');
        }
    };



    const eliminarImagen = async (id) => {

        try {


            // Realizar una solicitud para eliminar la imagen del backend
            const response = await fetch(`http://localhost:3001/imagen/deleteImagen/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Error al eliminar la imagen');
            }
            obtenerImagenesGuardadas();
            toast.success('Imagen eliminada con éxito');


        } catch (error) {
            console.error('Error al eliminar la imagen:', error);
            // Manejar el error como sea necesario (mostrar mensaje de error, etc.)
        }
    };

    const actualizarImagen = async () => {

    };



    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Cargar Imagen:</label>
                    <input type="file" accept="image/*" onChange={handleImagenChange} />
                    {rutaImagen && <img src={rutaImagen} alt="Vista previa de la imagen" style={{ maxWidth: '200px' }} />}
                </div>
                <div>
                    <label>Seleccionar alojamiento:</label>
                    <select value={opcionSeleccionada} onChange={handleSelectChange}>
                        <option value="">Selecciona un alojamiento</option>
                        {opciones.map(opcion => (
                            <option key={opcion.idAlojamiento} value={opcion.idAlojamiento}>{opcion.Titulo}</option>
                        ))}
                    </select>
                </div>
                <button type="submit" onClick={fetchAlojamientos}>Aceptar</button>
            </form>

            {/* Mostrar las imágenes cargadas */}
            <div>
                <h2>IMAGENES DE LOS ALOJAMIENTOS</h2>
                {imagenesCargadas.map((img, index) => (
                    <div key={index}>
                        <img src={img.rutaImagen} alt={img.rutaImagen}
                             style={{maxWidth: '200px', margin: '10px', textAlign: 'left'}}/>
                        <span>idAlojamiento: {img.idAlojamiento}</span><br/>
                        <span>idImagen: {img.idImagen}</span><br/>
                        <span>Ruta de imagen: {img.RutaArchivo}</span>
                        <button onClick={() => eliminarImagen(img.idImagen)}>Eliminar</button>
                        <button onClick={actualizarImagen}>Actualizar</button>

                    </div>
                ))}
            </div>
        </div>
    );

};

export default Formulario;

/*// Función para enviar los datos al backend al hacer click en Aceptar
const handleSubmit = async (event) => {
    event.preventDefault();

    const endpoint = 'http://localhost:3001/imagen/createImagen';

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'RutaArchivo': rutaImagen,
                'idAlojamiento': opcionSeleccionada,
            }),
        });

        if (!response.ok) {
            throw new Error('Error al guardar la imagen');
        }

        const data = await response.json();

        // Actualizar el estado de imágenes cargadas con la nueva imagen y opción seleccionada
        setImagenesCargadas([...imagenesCargadas, { rutaImagen, opcionSeleccionada }]);
        setImagen(null);
        setRutaImagen('');
        setOpcionSeleccionada('');

        toast.success('Imagen agregada con exito');
        //console.log('Respuesta del servidor:', data);
    } catch (error) {
        //console.error('Error al enviar datos:', error);
        toast.error('Error al enviar datos:', error.message);
    }
};

// Función para obtener las imagenes desde el servidor
useEffect(() => {
    fetchImagenes(); // Llama a la función para obtener imagenes
}, []);
const fetchImagenes = async () => {
    const endpoint = 'http://localhost:3001/imagen/getAllImagenes'; // Endpoint para obtener imagenes

    try {
        const response = await fetch(endpoint); // Petición GET a la API
        if (response.ok) {
            const data = await response.json(); // Convertir respuesta a JSON
            setInfoImagen(data); // Actualizar el estado con las imagenes
            console.log(data)

        } else {
            throw new Error('Error al cargar servicios'); // Lanzar error si la respuesta no es exitosa
        }
    } catch (error) {
        console.error('Error:', error); // Manejo de errores en la consola
        toast.error('Error al cargar servicios'); // Mostrar notificación de error
    }
};

return (
    <div>
        <form onSubmit={handleSubmit}>
            <div>
                <label>Cargar Imagen:</label>
                <input type="file" accept="image/!*" onChange={handleImagenChange} />
                {rutaImagen && <img src={rutaImagen} alt="Vista previa de la imagen" style={{ maxWidth: '100px' }} />}
            </div>
            <div>
                <label>A que alojamiento pertenece:</label>
                <select value={opcionSeleccionada} onChange={handleSelectChange}>
                    <option value="">Selecciona una opción</option>
                    {opciones.map(opcion => (
                        <option key={opcion.idAlojamiento} value={opcion.idAlojamiento}>{opcion.Titulo}</option>
                    ))}
                </select>
            </div>
            <button type="submit" >Aceptar</button>
        </form>

        {/!* Mostrar las imágenes cargadas *!/}
        <div>
            <h2>Imágenes Cargadas</h2>



            {imagenesCargadas.map((img, index) => (
                <div key={index}>

                    <img src={img.rutaImagen} style={{maxWidth: '200px', margin: '10px'}}/>
                    <span>{infoImagen.idAlojamiento}</span>

                </div>
            ))}

        </div>
    </div>
);*/