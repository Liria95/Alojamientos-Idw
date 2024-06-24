
import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ListarAlojamientosConServicios = () => {
  const [alojamientosServicios, setAlojamientosServicios] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAlojamientosServicios = async () => {
      const endpoint = 'http://localhost:3001/alojamientosServicios/getAllAlojamientoServicios';

      try {
        const response = await fetch(endpoint);
        if (response.ok) {
          const data = await response.json();
          setAlojamientosServicios(data);
        } else {
          throw new Error('Error al cargar los alojamientos con sus servicios');
        }
      } catch (error) {
        console.error('Error:', error);
        setError(error.message);
        toast.error('Error al cargar los alojamientos con sus servicios');
      }
    };

    fetchAlojamientosServicios();
  }, []);

  return (
    <div className="list-container">
      <ToastContainer />
      <h1>Lista de Alojamientos con Servicios</h1>
      {error && <div className="error-message">{error}</div>}
      <div className="tarjetas-contenedor">
        {alojamientosServicios.length > 0 ? (
          alojamientosServicios.map((item) => (
            <div key={item.idAlojamientoServicio} className="tarjeta">
              <p><strong>ID Alojamiento Servicio:</strong> {item.idAlojamientoServicio}</p>
              <p><strong>ID Alojamiento:</strong> {item.idAlojamiento}</p>
              <p><strong>ID Servicio:</strong> {item.idServicio}</p>
            </div>
          ))
        ) : (
          <p>No hay alojamientos disponibles.</p>
        )}
      </div>
    </div>
  );
};

export default ListarAlojamientosConServicios;