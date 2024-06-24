import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CrearAlojamientoServicio = () => {
  const [alojamientoServicios, setAlojamientoServicios] = useState([]); // Estado para almacenar la lista de relaciones

  // Función para manejar el envío del formulario
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const endpoint = 'http://localhost:3001/alojamientosServicios/createAlojamientoServicio'; // Endpoint para crear una nueva relación

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Cabecera para enviar datos JSON
        },
        body: JSON.stringify(values), // Convertir valores a JSON y enviar en el cuerpo de la petición
      });

      if (!response.ok) {
        throw new Error('Error al crear la relación'); // Lanzar error si la respuesta no es exitosa
      }

      toast.success('Relación creada con éxito'); // Mostrar notificación de éxito
      resetForm(); // Reiniciar el formulario después de enviarlo con éxito
      fetchAlojamientoServicios(); // Volver a cargar la lista de relaciones actualizada
    } catch (error) {
      console.error('Error:', error); // Manejo de errores en la consola
      toast.error(error.message || 'Error al crear la relación'); // Mostrar mensaje de error en notificación
    } finally {
      setSubmitting(false); // Desactivar estado de "enviando" del formulario
    }
  };

  // Esquema de validación usando Yup
  const validationSchema = Yup.object().shape({
    idAlojamiento: Yup.string().required('ID de Alojamiento es requerido'), // Campo idAlojamiento es requerido
    idServicio: Yup.string().required('ID de Servicio es requerido'), // Campo idServicio es requerido
  });

  // Función para obtener las relaciones desde el servidor
  const fetchAlojamientoServicios = async () => {
    const endpoint = 'http://localhost:3001/alojamientosServicios/getAllAlojamientoServicios'; // Endpoint para obtener relaciones

    try {
      const response = await fetch(endpoint); // Petición GET a la API
      if (response.ok) {
        const data = await response.json(); // Convertir respuesta a JSON
        setAlojamientoServicios(data); // Actualizar el estado con las relaciones obtenidas
      } else {
        throw new Error('Error al cargar relaciones'); // Lanzar error si la respuesta no es exitosa
      }
    } catch (error) {
      console.error('Error:', error); // Manejo de errores en la consola
      toast.error('Error al cargar relaciones'); // Mostrar notificación de error
    }
  };

  return (
    <div>
      <h1>Crear Nueva Relación entre Alojamiento y Servicio</h1>
      <Formik
        initialValues={{ idAlojamiento: '', idServicio: '' }} // Valores iniciales del formulario
        validationSchema={validationSchema} // Esquema de validación a aplicar
        onSubmit={handleSubmit} // Función a ejecutar al enviar el formulario
      >
        {({ isSubmitting }) => ( // Renderizado del formulario usando render props
          <Form>
            <div>
              <label>ID de Alojamiento:</label>
              <Field type="text" name="idAlojamiento" /> 
              <ErrorMessage name="idAlojamiento" component="div" className="error" /> 
            </div>
            <div>
              <label>ID de Servicio:</label>
              <Field type="text" name="idServicio" /> 
              <ErrorMessage name="idServicio" component="div" className="error" /> 
            </div>
            <button type="submit" disabled={isSubmitting}>Crear</button>
          </Form>
        )}
      </Formik>

      <h2>Lista de Relaciones entre Alojamiento y Servicio</h2>
      <div className="tarjetas-contenedor">
        {alojamientoServicios.length > 0 ? ( // Renderizado de la lista de relaciones
          alojamientoServicios.map((relacion) => (
            <div key={relacion.idAlojamientoServicio} className="tarjeta">
              <p>
                <span className="text-id">ID de Relación:</span> {relacion.idAlojamientoServicio} 
              </p>
              <p>
                <span className="text-id">ID de Alojamiento:</span> {relacion.idAlojamiento} 
              </p>
              <p>
                <span className="text-id">ID de Servicio:</span> {relacion.idServicio}
              </p>
            </div>
          ))
        ) : (
          <p>No hay relaciones disponibles.</p> // Mensaje si no hay relaciones para mostrar
        )}
      </div>
    </div>
  );
};

export default CrearAlojamientoServicio;