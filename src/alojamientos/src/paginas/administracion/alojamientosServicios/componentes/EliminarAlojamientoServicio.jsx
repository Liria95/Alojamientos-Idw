import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EliminarAlojamientoServicio = () => {
  const [alojamientoServicios, setAlojamientoServicios] = useState([]);

  useEffect(() => {
    fetchAlojamientoServicios();
  }, []);

  const handleDelete = async (idAlojamientoServicio) => {
    const endpoint = `http://localhost:3001/alojamientosServicios/deleteAlojamientoServicio/${idAlojamientoServicio}`;

    try {
      const response = await fetch(endpoint, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error al eliminar la relación');
      }

      toast.success('Relación eliminada con éxito');
      fetchAlojamientoServicios();
    } catch (error) {
      console.error('Error:', error);
      toast.error(error.message || 'Error al eliminar la relación');
    }
  };

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
              <button
                className="eliminar-button"
                onClick={() => handleDelete(relacion.idAlojamientoServicio)}
              >
                Eliminar
              </button>
            </div>
          ))
        ) : (
          <p>No hay relaciones disponibles.</p>
        )}
      </div>
    </div>
  );
};

export default EliminarAlojamientoServicio;
