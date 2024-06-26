import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faSave, faTimes, faImage, faImages  } from '@fortawesome/free-solid-svg-icons';

const EditarImagen = () => {
  const [alojamientos, setAlojamientos] = useState([]);
  const [imagenes, setImagenes] = useState([]);
  const [currentImagen, setCurrentImagen] = useState(null);

  useEffect(() => {
    fetchAlojamientos();
    fetchImagenes();
  }, []);

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

  const validationSchema = Yup.object().shape({
    idAlojamiento: Yup.string().required('Alojamiento es requerido'),
    RutaArchivo: Yup.string().required('Ruta del archivo es requerida'),
  });

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
      fetchImagenes();
      setCurrentImagen(null);
    } catch (error) {
      console.error('Error:', error);
      toast.error(error.message || 'Error al actualizar la imagen');
    } finally {
      setSubmitting(false);
    }
  };

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
      fetchImagenes();
    } catch (error) {
      console.error('Error:', error);
      toast.error(error.message || 'Error al eliminar la imagen');
    }
  };

  const handleEdit = (imagen) => {
    setCurrentImagen(imagen);
  };

  return (
    <div className="container">
      <h1><FontAwesomeIcon icon={faImage} /> Editar o <FontAwesomeIcon icon={faTrash} /> Eliminar Imágenes</h1>
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
            <Form className="form">
              <div className="form-field">
                <label>Alojamiento:</label>
                <Field as="select" name="idAlojamiento" className="select-field">
                  <option value="">Selecciona un alojamiento</option>
                  {alojamientos.map((alojamiento) => (
                    <option key={alojamiento.idAlojamiento} value={alojamiento.idAlojamiento}>
                      {alojamiento.Titulo}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="idAlojamiento" component="div" className="error" />
              </div>
              <div className="form-field">
                <label>Ruta del Archivo:</label>
                <Field type="text" name="RutaArchivo" className="input-field" />
                <ErrorMessage name="RutaArchivo" component="div" className="error" />
              </div>
              <button type="submit" disabled={isSubmitting} className="button">
                <FontAwesomeIcon icon={faSave} /> Actualizar
              </button>
              <button type="button" onClick={() => setCurrentImagen(null)} className="button cancel-button">
                <FontAwesomeIcon icon={faTimes} /> Cancelar
              </button>
            </Form>
          )}
        </Formik>
      ) : (
        <p>Selecciona una imagen para editar.</p>
      )}
      <ToastContainer />

      <h2><FontAwesomeIcon icon={faImages} /> Lista de Imágenes</h2>
      <div className="tarjetas-contenedor">
        {imagenes.length > 0 ? (
          imagenes.map((imagen) => (
            <div key={imagen.idImagen} className="tarjeta">
              <img src={imagen.RutaArchivo} alt={`Imagen ${imagen.idImagen}`} className="imagen" />
              <div className="tarjeta-info">
                <p>
                  <span className="text-imagen">Imagen:</span> {imagen.idImagen}
                </p>
                <p>
                  <span className="text-url">URL:</span> {imagen.RutaArchivo}
                </p>
                <p>
                  <span className="text-titulo">Título del Alojamiento:</span> {alojamientos.find((a) => a.idAlojamiento === imagen.idAlojamiento)?.Titulo || 'N/A'}
                </p>
                <button className="boton-editar" onClick={() => handleEdit(imagen)}>
                  <FontAwesomeIcon icon={faEdit} /> Editar
                </button>
                <button className="boton-eliminar" onClick={() => handleDelete(imagen.idImagen)}>
                  <FontAwesomeIcon icon={faTrash} /> Eliminar
                </button>
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
