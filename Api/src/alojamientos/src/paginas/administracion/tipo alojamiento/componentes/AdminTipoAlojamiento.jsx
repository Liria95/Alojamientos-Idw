import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faSpinner, faListCheck, faIdCard, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import 'react-toastify/dist/ReactToastify.css';
import './TipoAlojamiento.css';

// URL base de la API
const API_BASE_URL = 'http://localhost:3001/tiposAlojamiento';

const AdminTipoAlojamiento = () => {
  // Estados para manejar la lista de tipos de alojamientos, carga, edición, etc.
  const [tiposAlojamientos, setTiposAlojamientos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editingTipoAlojamiento, setEditingTipoAlojamiento] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // useEffect para obtener la lista de tipos de alojamientos al montar el componente
  useEffect(() => {
    fetchTiposAlojamientos();
  }, []);

  // Función para obtener la lista de tipos de alojamientos desde la API
  const fetchTiposAlojamientos = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/getTiposAlojamiento`);
      if (!response.ok) {
        throw new Error('Error al obtener los tipos de alojamientos');
      }

      const data = await response.json();
      setTiposAlojamientos(data);
      toast.success('Tipos de alojamientos cargados exitosamente');
    } catch (error) {
      console.error('Error:', error);
      toast.error(error.message || 'Error al obtener los tipos de alojamientos');
    } finally {
      setIsLoading(false);
    }
  };

  // Valores iniciales del formulario
  const initialValues = { Descripcion: '' };

  // Esquema de validación del formulario
  const validationSchema = Yup.object({
    Descripcion: Yup.string().required('La Descripción es requerida')
  });

  // Función para manejar el envío del formulario
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const endpoint = isEditing
      ? `${API_BASE_URL}/putTipoAlojamiento/${editingTipoAlojamiento.idTipoAlojamiento}`
      : `${API_BASE_URL}/createTipoAlojamiento`;

    const method = isEditing ? 'PUT' : 'POST';

    try {
      const response = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error(`Error al ${isEditing ? 'editar' : 'crear'} el tipo alojamiento`);
      }

      toast.success(`Tipo Alojamiento ${isEditing ? 'editado' : 'creado'} con éxito`);
      resetForm();
      fetchTiposAlojamientos();
      cancelEdit();
    } catch (error) {
      console.error('Error:', error);
      toast.error(error.message || `Error al ${isEditing ? 'editar' : 'crear'} el tipo alojamiento`);
    } finally {
      setSubmitting(false);
    }
  };

  // Función para manejar la eliminación de un tipo de alojamiento
  const handleDelete = async (idTipoAlojamiento) => {
    try {
      const response = await fetch(`${API_BASE_URL}/deleteTipoAlojamiento/${idTipoAlojamiento}`, { method: 'DELETE' });

      if (!response.ok) {
        throw new Error('Error al eliminar el tipo de alojamiento');
      }

      toast.success('Tipo de alojamiento eliminado con éxito');
      fetchTiposAlojamientos();
    } catch (error) {
      console.error('Error:', error);
      toast.error(error.message || 'Error al eliminar el tipo de alojamiento');
    }
  };

  // Función para manejar la edición de un tipo de alojamiento
  const handleEdit = (tipoAlojamiento) => {
    setEditingTipoAlojamiento(tipoAlojamiento);
    setIsEditing(true);
  };

  // Función para cancelar la edición
  const cancelEdit = () => {
    setEditingTipoAlojamiento(null);
    setIsEditing(false);
  };

  return (
    <div className="tipo-alojamiento-container">
      <div className="crear-card card">
        <h2><FontAwesomeIcon icon={faEdit} /> {isEditing ? 'Editar Tipo Alojamiento' : 'Crear Tipo Alojamiento'}</h2>
        <Formik
          initialValues={isEditing ? editingTipoAlojamiento : initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="form-group">
                <label htmlFor="Descripcion" className="label">Descripción:</label>
                <Field as="textarea" id="Descripcion" name="Descripcion" className="textarea-input" />
                <ErrorMessage name="Descripcion" component="div" className="error" />
              </div>
              <div className="button-group">
                <button type="submit" className="submit-button" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <span><FontAwesomeIcon icon={faSpinner} spin /> Guardando...</span>
                  ) : (
                    <span><FontAwesomeIcon icon={faEdit} /> {isEditing ? 'Editar' : 'Guardar'}</span>
                  )}
                </button>
                {isEditing && (
                  <button type="button" className="cancel-button" onClick={cancelEdit}>
                    <FontAwesomeIcon icon={faTrashAlt} /> Cancelar
                  </button>
                )}
              </div>
            </Form>
          )}
        </Formik>
      </div>

      <div className="listar-card card">
        <h2><FontAwesomeIcon icon={faListCheck} /> Listado de Tipos de Alojamientos</h2>
        {isLoading ? (
          <p>Cargando tipos de alojamientos...</p>
        ) : (
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th><FontAwesomeIcon icon={faIdCard} /> Id</th>
                  <th><FontAwesomeIcon icon={faInfoCircle} /> Descripción</th>
                  <th><FontAwesomeIcon icon={faEdit} /> Acciones</th>
                </tr>
              </thead>
              <tbody>
                {tiposAlojamientos.map(tipo => (
                  <tr key={tipo.idTipoAlojamiento}>
                    <td>{tipo.idTipoAlojamiento}</td>
                    <td>{tipo.Descripcion}</td>
                    <td>
                      <button onClick={() => handleEdit(tipo)} className="edit-button">
                        <FontAwesomeIcon icon={faEdit} /> Editar
                      </button>
                      <button onClick={() => handleDelete(tipo.idTipoAlojamiento)} className="delete-button">
                        <FontAwesomeIcon icon={faTrashAlt} /> Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminTipoAlojamiento;
