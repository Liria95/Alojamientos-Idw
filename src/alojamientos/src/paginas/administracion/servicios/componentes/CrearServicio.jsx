import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdCard, faPerson, faPlus, faSave, faSpinner } from '@fortawesome/free-solid-svg-icons';

// Hook personalizado para cargar servicios
const useFetchServicios = () => {
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchServicios = async () => {
    const endpoint = 'http://localhost:3001/servicio/getAllServicios';
    try {
      const response = await fetch(endpoint);
      if (response.ok) {
        const data = await response.json();
        setServicios(data);
      } else {
        throw new Error('Error al cargar servicios');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al cargar servicios');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServicios();
  }, []); // Dependencia vacía para que se ejecute solo una vez al montar el componente

  return { servicios, loading, refetchServicios: fetchServicios };
};

const CrearServicio = () => {
  const { servicios, loading, refetchServicios } = useFetchServicios();

  // Esquema de validación usando Yup
  const validationSchema = Yup.object().shape({
    Nombre: Yup.string().required('Nombre es requerido'), // Campo Nombre es requerido
  });

  // Función para manejar el envío del formulario
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const endpoint = 'http://localhost:3001/servicio/createServicio';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Error al guardar el servicio');
      }

      toast.success('Servicio creado con éxito');
      resetForm();
      refetchServicios(); // Actualiza la lista de servicios después de crear uno nuevo
    } catch (error) {
      console.error('Error:', error);
      toast.error(error.message || 'Error al crear el servicio');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container">
      <h1><FontAwesomeIcon icon={faPlus} /> Crear Servicio</h1>
      <Formik
        initialValues={{ Nombre: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="form">
            <div className="form-field">
              <label><FontAwesomeIcon icon={faSave} /> Nombre del Servicio:</label>
              <Field type="text" name="Nombre" className="input-field" />
              <ErrorMessage name="Nombre" component="div" className="error" />
            </div>
            <button type="submit" disabled={isSubmitting} className="button">
              {isSubmitting ? (
                <FontAwesomeIcon icon={faSpinner} spin /> 
              ) : (
                <>
                  <FontAwesomeIcon icon={faSave} /> Guardar
                </>
              )}
            </button>
          </Form>
        )}
      </Formik>

      <ToastContainer />

      <h2><FontAwesomeIcon icon={faIdCard} /> Lista de Servicios</h2>
      {loading ? (
        <p><FontAwesomeIcon icon={faSpinner} spin /> Cargando servicios...</p>
      ) : servicios.length > 0 ? (
        <div className="tarjetas-contenedor">
          {servicios.map((servicio) => (
            <div key={servicio.idServicio} className="tarjeta">
              <p><FontAwesomeIcon icon={faIdCard} /> <span className="text-id">Id:</span> {servicio.idServicio}</p>
              <p><FontAwesomeIcon icon={faPerson} /> <span className="text-id">Nombre:</span> {servicio.Nombre}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No hay servicios disponibles.</p>
      )}
    </div>
  );
};

export default CrearServicio;
