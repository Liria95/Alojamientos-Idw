import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../css/ActualizarAlojamientoServicio.css';

const ActualizarAlojamientoServicio = () => {
  const [alojamientoServicios, setAlojamientoServicios] = useState([]);
  const [selectedRelation, setSelectedRelation] = useState(null);

  useEffect(() => {
    fetchAlojamientoServicios();
  }, []);

  const handleUpdate = async (values, { setSubmitting, resetForm }) => {
    const endpoint = `http://localhost:3001/alojamientosServicios/updateAlojamientoServicio/${selectedRelation.idAlojamientoServicio}`;

    try {
      const response = await fetch(endpoint, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar la relación');
      }

      toast.success('Relación actualizada con éxito');
      resetForm();
      fetchAlojamientoServicios();
      setSelectedRelation(null);
    } catch (error) {
      console.error('Error:', error);
      toast.error(error.message || 'Error al actualizar la relación');
    } finally {
      setSubmitting(false);
    }
  };

  const validationSchema = Yup.object().shape({
    idAlojamiento: Yup.string().required('ID de Alojamiento es requerido'),
    idServicio: Yup.string().required('ID de Servicio es requerido'),
  });

  const fetchAlojamientoServicios = async () => {
    const endpoint = 'http://localhost:3001/alojamientosServicios/getAllAlojamientoServicios';

    try {
      const response = await fetch(endpoint);
      if (response.ok) {
        const data = await response.json();
        setAlojamientoServicios(data);
      } else {
        throw new Error('Error al cargar relaciones');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al cargar relaciones');
    }
  };

  return (
    <div>
      {selectedRelation && (
        <div>
          <h1>Actualizar Relación entre Alojamiento y Servicio</h1>
          <Formik
            initialValues={{
              idAlojamiento: selectedRelation.idAlojamiento,
              idServicio: selectedRelation.idServicio,
            }}
            validationSchema={validationSchema}
            onSubmit={handleUpdate}
          >
            {({ isSubmitting, resetForm }) => (
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
                <div className="button-group">
                  <button type="submit" className="actualizar" disabled={isSubmitting}>Actualizar</button>
                  <button
                    type="button"
                    className="cancel-button"
                    onClick={() => {
                      resetForm();
                      setSelectedRelation(null);
                    }}
                  >
                    Cancelar
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      )}

      <h2>Lista de Relaciones entre Alojamiento y Servicio</h2>
      <div className="tarjetas-contenedor">
        {alojamientoServicios.length > 0 ? (
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
              <button onClick={() => setSelectedRelation(relacion)}>Actualizar</button>
            </div>
          ))
        ) : (
          <p>No hay relaciones disponibles.</p>
        )}
      </div>
    </div>
  );
};

export default ActualizarAlojamientoServicio;
