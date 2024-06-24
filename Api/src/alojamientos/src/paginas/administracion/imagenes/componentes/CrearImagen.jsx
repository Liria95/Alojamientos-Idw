import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CrearImagen = () => {
  // Estados para alojamientos, imágenes y número de imágenes a crear
  const [alojamientos, setAlojamientos] = useState([]);
  const [imagenes, setImagenes] = useState([]);
  const [numImagenes, setNumImagenes] = useState(1);

  // useEffect para cargar alojamientos e imágenes al montar el componente
  useEffect(() => {
    fetchAlojamientos();
    fetchImagenes();
  }, []);

  // Función para obtener los alojamientos desde el servidor
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

  // Función para obtener las imágenes desde el servidor
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

  // Esquema de validación usando Yup
  const validationSchema = Yup.object().shape({
    idAlojamiento: Yup.string().required('Alojamiento es requerido'),
    imagenes: Yup.array()
      .of(Yup.string().required('Ruta del archivo es requerida'))
      .min(1, 'Debes subir al menos una imagen'),
  });

  // Función para manejar el envío del formulario
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const endpoint = 'http://localhost:3001/imagen/createImagen';

    try {
      // Promesas para crear cada imagen en el servidor
      const promises = values.imagenes.map(async (RutaArchivo) => {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ idAlojamiento: values.idAlojamiento, RutaArchivo }),
        });

        if (!response.ok) {
          throw new Error('Error al crear la imagen');
        }
      });

      // Espera a que todas las promesas se resuelvan
      await Promise.all(promises);
      toast.success('Imágenes creadas con éxito');
      resetForm();
      fetchImagenes();
    } catch (error) {
      console.error('Error:', error);
      toast.error(error.message || 'Error al crear las imágenes');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h1>Crear Imágenes</h1>
      <Formik
        initialValues={{
          idAlojamiento: '',
          imagenes: Array(numImagenes).fill(''),
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, isSubmitting, setFieldValue }) => (
          <Form>
            <div>
              <label>Alojamiento:</label>
              <Field as="select" name="idAlojamiento">
                <option value="">Selecciona un alojamiento</option>
                {alojamientos.map((alojamiento) => (
                  <option key={alojamiento.idAlojamiento} value={alojamiento.idAlojamiento}>
                    {alojamiento.Titulo}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="idAlojamiento" component="div" className="error" />
            </div>
            <div>
              <label>Número de Imágenes:</label>
              <Field
                type="number"
                value={numImagenes}
                onChange={(e) => {
                  const value = parseInt(e.target.value, 10);
                  setNumImagenes(value);
                  setFieldValue('imagenes', Array(value).fill(''));
                }}
              />
            </div>
            {values.imagenes.map((_, index) => (
              <div key={index}>
                <label>Ruta del Archivo {index + 1}:</label>
                <Field type="text" name={`imagenes[${index}]`} />
                <ErrorMessage name={`imagenes[${index}]`} component="div" className="error" />
              </div>
            ))}
            <button type="submit" disabled={isSubmitting}>
              Guardar
            </button>
          </Form>
        )}
      </Formik>

      <h2>Lista de Imágenes</h2>
      <div className="tarjetas-contenedor">
        {imagenes.length > 0 ? (
          imagenes.map((imagen) => (
            <div key={imagen.idImagen} className="tarjeta">
              <img src={imagen.RutaArchivo} alt={`Imagen ${imagen.idImagen}`} />
              <div className="tarjeta-info">
                <p>
                  <span className="text-imagen"> Imagen:</span> {imagen.idImagen}
                </p>
                <p>
                  <span className="text-url">URL:</span>{imagen.RutaArchivo}
                </p>
                <p>
                  <span className='text-titulo'>Título del Alojamiento:{' '}</span>
                  {alojamientos.find((a) => a.idAlojamiento === imagen.idAlojamiento)?.Titulo || 'N/A'}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>No hay imágenes disponibles.</p>
        )}
      </div>
    </div>
  );
};

export default CrearImagen;
