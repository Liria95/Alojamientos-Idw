import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditarImagen = () => {
  // Estados para alojamientos, imágenes y la imagen actual seleccionada
  const [alojamientos, setAlojamientos] = useState([]);
  const [imagenes, setImagenes] = useState([]);
  const [currentImagen, setCurrentImagen] = useState(null);

  // useEffect para cargar alojamientos e imágenes al montar el componente
  useEffect(() => {
    fetchAlojamientos();
    fetchImagenes();
  }, []);

  // Función para obtener los alojamientos del backend
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

  // Función para obtener las imágenes del backend
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

  // Validación del formulario con Yup
  const validationSchema = Yup.object().shape({
    idAlojamiento: Yup.string().required('Alojamiento es requerido'),
    RutaArchivo: Yup.string().required('Ruta del archivo es requerida'),
  });

  // Función para manejar el envío del formulario
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const endpoint = `http://localhost:3001/imagen/updateImagen/${currentImagen.idImagen}`;
    try {
      const response = await fetch(endpoint, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar la imagen');
      }

      toast.success('Imagen actualizada con éxito');
      resetForm();
      fetchImagenes(); // Actualiza la lista de imágenes después de la actualización
      setCurrentImagen(null);
    } catch (error) {
      console.error('Error:', error);
      toast.error(error.message || 'Error al actualizar la imagen');
    } finally {
      setSubmitting(false);
    }
  };

  // Función para manejar la eliminación de una imagen
  const handleDelete = async (idImagen) => {
    const endpoint = `http://localhost:3001/imagen/deleteImagen/${idImagen}`;
    try {
      const response = await fetch(endpoint, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error al eliminar la imagen');
      }

      toast.success('Imagen eliminada con éxito');
      fetchImagenes(); // Actualiza la lista de imágenes después de la eliminación
    } catch (error) {
      console.error('Error:', error);
      toast.error(error.message || 'Error al eliminar la imagen');
    }
  };

  // Función para manejar la edición de una imagen
  const handleEdit = (imagen) => {
    setCurrentImagen(imagen);
  };

  return (
    <div>
      <h1>Editar o eliminar Imágenes</h1>
      {currentImagen ? (
        <Formik
          initialValues={{
            idAlojamiento: currentImagen.idAlojamiento,
            RutaArchivo: currentImagen.RutaArchivo,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
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
                <label>Ruta del Archivo:</label>
                <Field type="text" name="RutaArchivo" />
                <ErrorMessage name="RutaArchivo" component="div" className="error" />
              </div>
              <button type="submit" className='boton-actualizar' disabled={isSubmitting}>
                Actualizar
              </button>
              <button type="button" onClick={() => setCurrentImagen(null)}>
                Cancelar
              </button>
            </Form>
          )}
        </Formik>
      ) : (
        <p>Selecciona una imagen para editar.</p>
      )}

      <h2>Lista de Imágenes</h2>
      <div className="tarjetas-contenedor">
        {imagenes.length > 0 ? (
          imagenes.map((imagen) => (
            <div key={imagen.idImagen} className="tarjeta">
              <img src={imagen.RutaArchivo} alt={`Imagen ${imagen.idImagen}`} />
              <div className="tarjeta-info">
                <p>
                  <span className="text-imagen">Imagen:</span> {imagen.idImagen}
                </p>
                <p>
                  <span className="text-url">URL:</span> {imagen.RutaArchivo}
                </p>
                <p>
                  <span className='text-titulo'>Título del Alojamiento:{' '}</span>
                  {alojamientos.find((a) => a.idAlojamiento === imagen.idAlojamiento)?.Titulo || 'N/A'}
                </p>
                <button className='boton-editar' onClick={() => handleEdit(imagen)}>Editar</button>
                <button className='boton-eliminar' onClick={() => handleDelete(imagen.idImagen)}>Eliminar</button>
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

export default EditarImagen;
