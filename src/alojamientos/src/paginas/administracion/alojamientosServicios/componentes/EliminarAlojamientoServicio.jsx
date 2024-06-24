import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EliminarAlojamientoServicio = () => {
  const [alojamientoServicios, setAlojamientoServicios] = useState([]); // Estado para almacenar la lista de relaciones

  useEffect(() => {
    fetchAlojamientoServicios(); // Cargar relaciones al montar el componente
  }, []);

  // Función para eliminar una relación
  const handleDelete = async (idAlojamientoServicio) => {
    const endpoint = `http://localhost:3001/alojamientosServicios/deleteAlojamientoServicio/${idAlojamientoServicio}`; // Endpoint para eliminar la relación

    try {
      const response = await fetch(endpoint, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error al eliminar la relación'); // Lanzar error si la respuesta no es exitosa
      }

      toast.success('Relación eliminada con éxito'); // Mostrar notificación de éxito
      fetchAlojamientoServicios(); // Volver a cargar la lista de relaciones actualizada
    } catch (error) {
      console.error('Error:', error); // Manejo de errores en la consola
      toast.error(error.message || 'Error al eliminar la relación'); // Mostrar mensaje de error en notificación
    }
  };

  // Función para obtener las relaciones desde el servidor
  const fetchAlojamientoServicios = async () => {
    const endpoint = 'http://localhost:3001/alojamientosServicios/getAllAlojamientoServicios'; // Endpoint para obtener relaciones

    try {
      const response = await fetch(endpoint); // Petición GET a la API
      if (response.ok) {
        const data = await response.json(); // Convertir respuesta a JSON
        setAlojamientoServicios(data); // Actualizar el estado con las relaciones obtenidas
      } else {
        throw new Error('Error al cargar relaciones'); // Lanzar error si la respuesta no es exitosa
      }
    } catch (error) {
      console.error('Error:', error); // Manejo de errores en la consola
      toast.error('Error al cargar relaciones'); // Mostrar notificación de error
    }
  };

  return (
    <div>
      <h2>Lista de Relaciones entre Alojamiento y Servicio</h2>
      <div className="tarjetas-contenedor">
        {alojamientoServicios.length > 0 ? ( // Renderizado de la lista de relaciones
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
              <button onClick={() => handleDelete(relacion.idAlojamientoServicio)}>Eliminar</button>
            </div>
          ))
        ) : (
          <p>No hay relaciones disponibles.</p> // Mensaje si no hay relaciones para mostrar
        )}
      </div>
    </div>
  );
};

export default EliminarAlojamientoServicio;