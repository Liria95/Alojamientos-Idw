import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faConciergeBell, faIdCard, faIdCardClip, faList } from '@fortawesome/free-solid-svg-icons';

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
        <div className="container">
            <h1><FontAwesomeIcon icon={faBed} /> Crear Nueva Relación entre Alojamiento y Servicio <FontAwesomeIcon icon={faConciergeBell} /></h1>
            <div className="form-container">
                <Formik
                    initialValues={{ idAlojamiento: '', idServicio: '' }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting, setFieldValue }) => (
                        <Form className="form">
                            <div className="form-field">
                                <label htmlFor="idAlojamiento" className="form-label">ID de Alojamiento:</label>
                                <Field as="select" name="idAlojamiento" className="select-field">
                                    <option value="">Seleccionar Alojamiento</option>
                                    {alojamientos.map((alojamiento) => (
                                        <option key={alojamiento.idAlojamiento} value={alojamiento.idAlojamiento}>
                                            {alojamiento.Titulo}
                                        </option>
                                    ))}
                                </Field>
                                <ErrorMessage name="idAlojamiento" component="div" className="error" />
                            </div>
                            <div className="form-field">
                                <label htmlFor="idServicio" className="form-label">Nombre de Servicio:</label>
                                <Field as="select" name="idServicio" className="select-field" onChange={(e) => {
                                    const selectedServicio = servicios.find(servicio => servicio.idServicio === e.target.value);
                                    setFieldValue('idServicio', e.target.value);
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
                            <button type="submit" disabled={isSubmitting} className="button">
                                Crear
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>

            <div className="list-container">
                <ToastContainer />
                <h2 className="list-header"><FontAwesomeIcon icon={faList} /> Lista de Alojamientos con Servicios</h2>
                {error && <div className="error-message">{error}</div>}
                <div className="tarjetas-contenedor">
                    {alojamientosServicios.length > 0 ? (
                        alojamientosServicios.map((item) => (
                            <div key={item.idAlojamientoServicio} className="tarjeta">
                                <p>
                                  <span className="text-id"><FontAwesomeIcon icon={faIdCard} /> Id Alojamiento Servicio: </span> {item.idAlojamientoServicio}
                                </p>
                                <p>
                                  <span className="text-id"><FontAwesomeIcon icon={faIdCardClip} /> Id de Alojamiento:</span> {item.idAlojamiento}
                                </p>
                                <p>
                                  <span className="text-id"><FontAwesomeIcon icon={faIdCard} /> ID de Servicio:</span> {item.idServicio}
                                </p>
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
