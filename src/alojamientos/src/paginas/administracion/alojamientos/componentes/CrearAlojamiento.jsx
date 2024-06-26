import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik'; 
import * as Yup from 'yup'; 
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Componente principal para la creación de alojamiento
const CrearAlojamiento = () => {
  const [tiposAlojamiento, setTiposAlojamiento] = useState([]); // Estado para almacenar los tipos de alojamiento disponibles

  // Hook useEffect para cargar los tipos de alojamiento al montar el componente
  useEffect(() => {
    fetchTiposAlojamiento(); // Llama a la función para obtener tipos de alojamiento
  }, []);

  // Función asíncrona para obtener los tipos de alojamiento desde el backend
  const fetchTiposAlojamiento = async () => {
    const endpoint = 'http://localhost:3001/tiposAlojamiento/getTiposAlojamiento'; // Endpoint para obtener tipos de alojamiento

    try {
      const response = await fetch(endpoint); // Petición GET a la API
      if (response.ok) {
        const data = await response.json(); // Convertir respuesta a JSON
        setTiposAlojamiento(data); // Actualizar el estado con los tipos de alojamiento obtenidos
      } else {
        throw new Error('Error al cargar tipos de alojamiento'); // Lanzar error si la respuesta no es exitosa
      }
    } catch (error) {
      console.error('Error:', error); // Manejo de errores en la consola
      toast.error('Error al cargar tipos de alojamiento'); // Mostrar notificación de error
    }
  };

  // Esquema de validación de Formik utilizando Yup
  const validationSchema = Yup.object({
    Titulo: Yup.string().required('Título es requerido'),
    Descripcion: Yup.string().required('Descripción es requerida'),
    Latitud: Yup.number()
      .required('Latitud es requerida')
      .min(-90, 'Latitud mínima es -90')
      .max(90, 'Latitud máxima es 90'),
    Longitud: Yup.number()
      .required('Longitud es requerida')
      .min(-180, 'Longitud mínima es -180')
      .max(180, 'Longitud máxima es 180'), // Validación para Longitud
    PrecioPorDia: Yup.number()
      .required('Precio por Día es requerido')
      .positive('Debe ser un número positivo'), // Validación para PrecioPorDia
    CantidadDormitorios: Yup.number()
      .required('Cantidad de Dormitorios es requerida')
      .positive('Debe ser un número positivo')
      .integer('Debe ser un número entero'), // Validación para CantidadDormitorios
    CantidadBanios: Yup.number()
      .required('Cantidad de Baños es requerida')
      .positive('Debe ser un número positivo')
      .integer('Debe ser un número entero'),
    Estado: Yup.string().required('Estado es requerido'), 
    TipoAlojamiento: Yup.string().required('Tipo de Alojamiento es requerido'),
  });

  // Función para manejar el envío del formulario
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const endpoint = 'http://localhost:3001/alojamiento/createAlojamiento'; // Endpoint para crear un nuevo alojamiento

    try {
      const response = await fetch(endpoint, {
        method: 'POST', // Método POST para enviar datos
        headers: {
          'Content-Type': 'application/json', // Cabecera para enviar datos JSON
        },
        body: JSON.stringify(values), // Convertir valores a JSON y enviar en el cuerpo de la petición
      });

      if (response.ok) {
        toast.success('Alojamiento creado con éxito'); // Mostrar notificación de éxito
        resetForm(); // Resetear el formulario después de una creación exitosa
      } else {
        const errorData = await response.json(); // Convertir respuesta de error a JSON
        throw new Error(errorData.message || 'Error al crear el alojamiento'); // Lanzar error con mensaje personalizado
      }
    } catch (error) {
      console.error('Error:', error); // Manejo de errores en la consola
      toast.error(error.message || 'Error al crear el alojamiento'); // Mostrar mensaje de error en notificación
    } finally {
      setSubmitting(false); // Finalizar la carga del formulario
    }
  };

  return (
    <div>
      <h1>Crear Alojamiento</h1>
      <Formik
        initialValues={{
          Titulo: '',
          Descripcion: '',
          Latitud: '',
          Longitud: '',
          PrecioPorDia: '',
          CantidadDormitorios: '',
          CantidadBanios: '',
          Estado: 'Disponible', // Valor por defecto para Estado
          TipoAlojamiento: '', // Valor por defecto para TipoAlojamiento
        }}
        validationSchema={validationSchema} // Esquema de validación a aplicar
        onSubmit={handleSubmit} // Función a ejecutar al enviar el formulario
      >
        {({ isSubmitting }) => ( // Renderizado del formulario usando render props
          <Form>
            <div>
              <label>Título:</label>
              <Field type="text" name="Titulo" /> 
              <ErrorMessage name="Titulo" component="div" className="error" /> 
            </div>
            <div>
              <label>Descripción:</label>
              <Field as="textarea" name="Descripcion" /> 
              <ErrorMessage name="Descripcion" component="div" className="error" /> 
            </div>
            <div>
              <label>Latitud:</label>
              <Field type="number" step="0.00000001" name="Latitud" /> 
              <ErrorMessage name="Latitud" component="div" className="error" /> 
            </div>
            <div>
              <label>Longitud:</label>
              <Field type="number" step="0.00000001" name="Longitud" /> 
              <ErrorMessage name="Longitud" component="div" className="error" /> 
            </div>
            <div>
              <label>Precio por Día:</label>
              <Field type="number" step="0.01" name="PrecioPorDia" /> 
              <ErrorMessage name="PrecioPorDia" component="div" className="error" />
            </div>
            <div>
              <label>Cantidad de Dormitorios:</label>
              <Field as="select" name="CantidadDormitorios">
                <option value="">Selecciona cantidad de dormitorios</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5 o más</option>
              </Field>
              <ErrorMessage name="CantidadDormitorios" component="div" className="error" />
            </div>
            <div>
              <label>Cantidad de Baños:</label>
              <Field as="select" name="CantidadBanios">
                <option value="">Selecciona cantidad de baños</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5 o más</option>
              </Field>
              <ErrorMessage name="CantidadBanios" component="div" className="error" />
            </div>
            <div>
              <label>Estado:</label>
              <Field as="select" name="Estado"> 
                <option value="Disponible">Disponible</option> 
                <option value="Reservado">Reservado</option>
              </Field>
              <ErrorMessage name="Estado" component="div" className="error" />
            </div>
            <div>
              <label>Tipo de Alojamiento:</label>
              <Field as="select" name="TipoAlojamiento"> {/* Campo de selección para el tipo de alojamiento */}
                <option value="">Selecciona un tipo de alojamiento</option> {/* Opción por defecto */}
                {tiposAlojamiento.map((tipo) => ( // Mapeo de tipos de alojamiento disponibles
                  <option key={tipo.idTipoAlojamiento} value={tipo.idTipoAlojamiento}>
                    {tipo.Descripcion}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="TipoAlojamiento" component="div" className="error" /> 
            </div>
            <button type="submit" disabled={isSubmitting}>
              Guardar
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CrearAlojamiento;
