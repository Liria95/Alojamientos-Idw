import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BuscarServicioPorId = () => {
  const [servicio, setServicio] = useState(null); 
  // Esquema de validación usando Yup
  const validationSchema = Yup.object().shape({
    idServicio: Yup.string().required('ID es requerido'), 
  });

  // Función para manejar el envío del formulario
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const { idServicio } = values;
    const endpoint = `http://localhost:3001/servicio/getServicio/${idServicio}`; 

    try {
      const response = await fetch(endpoint);

      if (!response.ok) {
        throw new Error('Error al obtener el servicio'); 
      }

      const data = await response.json(); 
      setServicio(data); 
      toast.success('Servicio obtenido con éxito'); 
    } catch (error) {
      console.error('Error:', error); 
      toast.error(error.message || 'Error al obtener el servicio'); 
      setServicio(null); 
    } finally {
      setSubmitting(false); 
      resetForm(); // Reiniciar el formulario después de enviarlo
    }
  };

  return (
    <div>
      <h1>Buscar Servicio por ID</h1>
      <Formik
        initialValues={{ idServicio: '' }} 
        validationSchema={validationSchema} 
        onSubmit={handleSubmit} 
      >
        {({ isSubmitting }) => ( 
          <Form>
            <div>
              <label>ID del Servicio:</label>
              <Field type="text" name="idServicio" />
              <ErrorMessage name="idServicio" component="div" className="error" />
            </div>
            <button type="submit" disabled={isSubmitting}>Buscar</button>
          </Form>
        )}
      </Formik>

      <h2>Resultado del Servicio</h2>
      <div className="tarjetas-contenedor">
        {servicio ? (
          <div className="tarjeta">
            <p>
              <span className="text-id">ID:</span> {servicio.idServicio}
            </p>
            <p>
              <span className="text-nombre">Nombre:</span> {servicio.Nombre}
            </p>
          </div>
        ) : (
          <p>No se ha encontrado el servicio.</p> 
        )}
      </div>
    </div>
  );
};

export default BuscarServicioPorId;