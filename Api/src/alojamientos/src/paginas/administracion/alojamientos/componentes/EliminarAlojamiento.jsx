import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faIdCard, faInfoCircle, faMapMarkerAlt, faMoneyBillAlt, faBed, faBath, faCheckCircle, faHome, faEdit } from '@fortawesome/free-solid-svg-icons';


const EliminarAlojamiento = () => {
  const [alojamientos, setAlojamientos] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAlojamientos = async () => {
      try {
        const response = await fetch('http://localhost:3001/alojamiento/getAlojamientos');
        if (response.ok) {
          const data = await response.json();
          setAlojamientos(data);
        } else {
          throw new Error('Error al obtener la lista de alojamientos');
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchAlojamientos();
  }, []);

  const eliminarAlojamiento = async (id) => {
    const confirmacion = window.confirm(`¿Estás seguro de que quieres eliminar el alojamiento con ID ${id}?`);
    if (!confirmacion) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/alojamiento/deleteAlojamiento/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setAlojamientos(alojamientos.filter(alojamiento => alojamiento.idAlojamiento !== id));
        toast.success('Alojamiento eliminado con éxito');
      } else {
        throw new Error('Error al eliminar el alojamiento');
      }
    } catch (err) {
      toast.error(err.message || 'Error al eliminar el alojamiento');
    }
  };

  return (
    <div>
      <ToastContainer />
      <h1>Eliminar Alojamiento</h1>
      {error && <div className="error-message">{error}</div>}
      {alojamientos.length > 0 ? (
        <table>
          <thead>
          <tr>
              <th><FontAwesomeIcon icon={faIdCard}/>Id</th>
              <th><FontAwesomeIcon icon={faInfoCircle} /> Título</th>
              <th><FontAwesomeIcon icon={faInfoCircle} /> Descripción</th>
              <th><FontAwesomeIcon icon={faMapMarkerAlt} /> Latitud</th>
              <th><FontAwesomeIcon icon={faMapMarkerAlt} /> Longitud</th>
              <th><FontAwesomeIcon icon={faMoneyBillAlt} /> Precio por Día</th>
              <th><FontAwesomeIcon icon={faBed} /> Cantidad de Dormitorios</th>
              <th><FontAwesomeIcon icon={faBath} /> Cantidad de Baños</th>
              <th><FontAwesomeIcon icon={faCheckCircle} /> Estado</th>
              <th><FontAwesomeIcon icon={faHome} /> Tipo de Alojamiento</th>
              <th><FontAwesomeIcon icon={faEdit} /> Acciones</th>
            </tr>
          </thead>
          <tbody>
            {alojamientos.map((alojamiento) => (
              <tr key={alojamiento.idAlojamiento}>
                <td>{alojamiento.idAlojamiento}</td>
                <td>{alojamiento.Titulo}</td>
                <td>{alojamiento.Descripcion}</td>
                <td>{alojamiento.Latitud}</td>
                <td>{alojamiento.Longitud}</td>
                <td>{alojamiento.PrecioPorDia}</td>
                <td>{alojamiento.CantidadDormitorios}</td>
                <td>{alojamiento.CantidadBanios}</td>
                <td>{alojamiento.Estado}</td>
                <td>{alojamiento.TipoAlojamiento}</td>
                <td>
                  <button onClick={() => eliminarAlojamiento(alojamiento.idAlojamiento)}>
                    <FontAwesomeIcon icon={faTrash} /> Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hay alojamientos disponibles</p>
      )}
    </div>
  );
};

export default EliminarAlojamiento;
