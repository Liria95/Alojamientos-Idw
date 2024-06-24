import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CrearServicio = () => {
  const [servicios, setServicios] = useState([]); // Estado para almacenar la lista de servicios

  useEffect(() => {
    fetchServicios(); // Cargar servicios al montar el componente
  }, []);

  // Función para obtener los servicios desde el servidor
  const fetchServicios = async () => {
    const endpoint = 'http://localhost:3001/servicio/getAllServicios'; // Endpoint para obtener servicios

    try {
      const response = await fetch(endpoint); // Petición GET a la API
      if (response.ok) {
        const data = await response.json(); // Convertir respuesta a JSON
        setServicios(data); // Actualizar el estado con los servicios obtenidos
      } else {
        throw new Error('Error al cargar servicios'); // Lanzar error si la respuesta no es exitosa
      }
    } catch (error) {
      console.error('Error:', error); // Manejo de errores en la consola
      toast.error('Error al cargar servicios'); // Mostrar notificación de error
    }
  };

  // Esquema de validación usando Yup
  const validationSchema = Yup.object().shape({
    Nombre: Yup.string().required('Nombre es requerido'), // Campo Nombre es requerido
  });

  // Función para manejar el envío del formulario
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const endpoint = 'http://localhost:3001/servicio/createServicio'; // Endpoint para crear un nuevo servicio

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Cabecera para enviar datos JSON
        },
        body: JSON.stringify(values), // Convertir valores a JSON y enviar en el cuerpo de la petición
      });

      if (!response.ok) {
        throw new Error('Error al guardar el servicio'); // Lanzar error si la respuesta no es exitosa
      }

      toast.success('Servicio creado con éxito'); // Mostrar notificación de éxito
      resetForm(); // Reiniciar el formulario después de enviarlo con éxito
      fetchServicios(); // Volver a cargar la lista de servicios actualizada
    } catch (error) {
      console.error('Error:', error); // Manejo de errores en la consola
      toast.error(error.message || 'Error al crear el servicio'); // Mostrar mensaje de error en notificación
    } finally {
      setSubmitting(false); // Desactivar estado de "enviando" del formulario
    }
  };

  return (
    <div>
      <h1>Crear Servicio</h1>
      <Formik
        initialValues={{ Nombre: '' }} // Valores iniciales del formulario
        validationSchema={validationSchema} // Esquema de validación a aplicar
        onSubmit={handleSubmit} // Función a ejecutar al enviar el formulario
      >
        {({ isSubmitting }) => ( // Renderizado del formulario usando render props
          <Form>
            <div>
              <label>Nombre del Servicio:</label>
              <Field type="text" name="Nombre" /> 
              <ErrorMessage name="Nombre" component="div" className="error" /> 
            </div>
            <button type="submit" disabled={isSubmitting}>Guardar</button>
          </Form>
        )}
      </Formik>

      <h2>Lista de Servicios</h2>
      <div className="tarjetas-contenedor">
        {servicios.length > 0 ? ( // Renderizado de la lista de servicios
          servicios.map((servicio) => (
            <div key={servicio.idServicio} className="tarjeta">
              <p>
                <span className="text-id">ID:</span> {servicio.idServicio} 
              </p>
              <p>
                <span className="text-nombre">Nombre:</span> {servicio.Nombre}
              </p>
            </div>
          ))
        ) : (
          <p>No hay servicios disponibles.</p> // Mensaje si no hay servicios para mostrar
        )}
      </div>
    </div>
  );
};

export default CrearServicio;
