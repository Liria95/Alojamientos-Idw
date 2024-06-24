import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdCard, faTrashAlt, faTimes, faSyncAlt } from '@fortawesome/free-solid-svg-icons';

const ActualizarServicio = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [nombre, setNombre] = useState('');
  const [showForm, setShowForm] = useState(false); // Estado para controlar la visibilidad del formulario
  const [servicios, setServicios] = useState([]);

  useEffect(() => {
    fetchServicios(); // Cargar servicios al montar el componente
  }, []);

  // Función para obtener los servicios desde el servidor
  const fetchServicios = async () => {
    const endpoint = 'http://localhost:3001/servicio/getAllServicios';

    try {
      const response = await fetch(endpoint);
      if (response.ok) {
        const data = await response.json();
        setServicios(data);
      } else {
        throw new Error('Error al cargar servicios');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al cargar servicios');
    }
  };

  // Función para manejar la actualización de un servicio
  const handleUpdateService = (servicio) => {
    setSelectedService(servicio);
    setNombre(servicio.Nombre);
    setShowForm(true); // Mostrar el formulario al seleccionar un servicio para actualizar
  };

  // Función para enviar la actualización del nombre del servicio
  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = `http://localhost:3001/servicio/updateServicio/${selectedService.idServicio}`;

    try {
      const response = await fetch(endpoint, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Nombre: nombre }),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar el servicio');
      }

      toast.success(`Nombre del servicio actualizado: ${nombre}`);
      setNombre('');
      setSelectedService(null);
      setShowForm(false); // Ocultar el formulario después de una actualización exitosa
      fetchServicios(); // Volver a cargar la lista de servicios actualizada
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al actualizar el nombre del servicio');
    }
  };

  // Función para cancelar la actualización del servicio
  const handleCancelUpdate = () => {
    setNombre('');
    setSelectedService(null);
    setShowForm(false); // Ocultar el formulario al cancelar la actualización
  };

  return (
    <div className="actualizar-servicio-container">
      {showForm && selectedService && ( // Renderizado condicional del formulario
        <form onSubmit={handleSubmit} className="form-actualizar">
          <h2>Actualizar Nombre del Servicio</h2>
          <p>ID: {selectedService.idServicio}</p>
          <label>
            Nuevo Nombre:
            <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
          </label>
          <div className="botones-accion">
            <button type="submit"><FontAwesomeIcon icon={faSyncAlt} /> Actualizar</button>
            <button type="button" onClick={handleCancelUpdate}><FontAwesomeIcon icon={faTimes} /> Cancelar</button>
          </div>
        </form>
      )}

      <div className="tarjetas-contenedor">
        {servicios.length > 0 ? (
          servicios.map((servicio) => (
            <div key={servicio.idServicio} className="tarjeta">
              <p><FontAwesomeIcon icon={faIdCard} /> ID: {servicio.idServicio}</p>
              <p><FontAwesomeIcon icon={faTrashAlt} /> Nombre: {servicio.Nombre}</p>
              <button onClick={() => handleUpdateService(servicio)}><FontAwesomeIcon icon={faSyncAlt} /> Actualizar</button>
            </div>
          ))
        ) : (
          <p>No hay servicios disponibles.</p>
        )}
      </div>
    </div>
  );
};

export default ActualizarServicio;
