import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CrearAlojamientoServicio = () => {
    const [alojamientos, setAlojamientos] = useState([]);
    const [servicios, setServicios] = useState([]);
    const [alojamientosServicios, setAlojamientosServicios] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchAlojamientos();
        fetchServicios();
        fetchAlojamientosServicios();
    }, []);

    const fetchAlojamientos = async () => {
        try {
            const response = await fetch('http://localhost:3001/alojamiento/getAlojamientos');
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

    const fetchServicios = async () => {
        try {
            const response = await fetch('http://localhost:3001/servicio/getAllServicios');
            if (response.ok) {
                const data = await response.json();
                setServicios(data);
            } else {
                throw new Error('Error al cargar servicios');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Error al cargar servicios');
        }
    };

    const fetchAlojamientosServicios = async () => {
        try {
            const response = await fetch('http://localhost:3001/alojamientosServicios/getAllAlojamientoServicios');
            if (response.ok) {
                const data = await response.json();
                setAlojamientosServicios(data);
            } else {
                throw new Error('Error al cargar alojamientos con servicios');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('Error al cargar alojamientos con servicios');
        }
    };

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        const endpoint = 'http://localhost:3001/alojamientosServicios/createAlojamientoServicio';

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            if (!response.ok) {
                throw new Error('Error al crear la relación');
            }

            toast.success('Relación creada con éxito');
            resetForm();
            fetchAlojamientosServicios(); // Actualizar la lista después de crear la relación
        } catch (error) {
            console.error('Error:', error);
            toast.error(error.message || 'Error al crear la relación');
        } finally {
            setSubmitting(false);
        }
    };

    const validationSchema = Yup.object().shape({
        idAlojamiento: Yup.string().required('ID de Alojamiento es requerido'),
        idServicio: Yup.string().required('ID de Servicio es requerido'),
    });

    return (
        <div>
            <h1>Crear Nueva Relación entre Alojamiento y Servicio</h1>
            <Formik
                initialValues={{ idAlojamiento: '', idServicio: '' }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, setFieldValue }) => (
                    <Form>
                        <div>
                            <label>ID de Alojamiento:</label>
                            <Field as="select" name="idAlojamiento">
                                <option value="">Seleccionar Alojamiento</option>
                                {alojamientos.map((alojamiento) => (
                                    <option key={alojamiento.idAlojamiento} value={alojamiento.idAlojamiento}>
                                        {alojamiento.Titulo}
                                    </option>
                                ))}
                            </Field>
                            <ErrorMessage name="idAlojamiento" component="div" className="error" />
                        </div>
                        <div>
                            <label>Nombre de Servicio:</label>
                            <Field as="select" name="idServicio" onChange={(e) => {
                                const selectedServicio = servicios.find(servicio => servicio.idServicio === e.target.value);
                                setFieldValue('idServicio', e.target.value);
                                setFieldValue('nombreServicio', selectedServicio.Nombre);
                            }}>
                                <option value="">Seleccionar Servicio</option>
                                {servicios.map((servicio) => (
                                    <option key={servicio.idServicio} value={servicio.idServicio}>
                                        {servicio.Nombre}
                                    </option>
                                ))}
                            </Field>
                            <ErrorMessage name="idServicio" component="div" className="error" />
                        </div>
                        <button type="submit" disabled={isSubmitting}>
                            Crear
                        </button>
                    </Form>
                )}
            </Formik>

            <div className="list-container">
                <ToastContainer />
                <h1>Lista de Alojamientos con Servicios</h1>
                {error && <div className="error-message">{error}</div>}
                <div className="tarjetas-contenedor">
                    {alojamientosServicios.length > 0 ? (
                        alojamientosServicios.map((item) => (
                            <div key={item.idAlojamientoServicio} className="tarjeta">
                                <p><strong>ID Alojamiento Servicio:</strong> {item.idAlojamientoServicio}</p>
                                <p><strong>ID Alojamiento:</strong> {item.idAlojamiento}</p>
                                <p><strong>ID Servicio:</strong> {item.idServicio} </p>
                            </div>
                        ))
                    ) : (
                        <p>No hay alojamientos con servicios disponibles.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CrearAlojamientoServicio;
