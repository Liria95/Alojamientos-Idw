import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdCard, faTrashAlt, faTimes, faList } from '@fortawesome/free-solid-svg-icons';


const EliminarServicio = () => {
  const [id, setId] = useState('');
  const [servicios, setServicios] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [showForm, setShowForm] = useState(false); // Estado para controlar la visibilidad del formulario

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

  // Función para manejar la eliminación de un servicio
  const handleDeleteService = async () => {
    const endpoint = `http://localhost:3001/servicio/deleteServicio/${selectedService.idServicio}`;

    try {
      const response = await fetch(endpoint, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error al eliminar el servicio');
      }

      toast.success('Servicio eliminado');
      setId('');
      setSelectedService(null);
      setShowForm(false); // Ocultar el formulario después de eliminar el servicio
      fetchServicios(); // Volver a cargar la lista de servicios actualizada
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al eliminar el servicio');
    }
  };

  // Función para seleccionar un servicio para eliminar
  const selectServiceToDelete = (servicio) => {
    setSelectedService(servicio);
    setShowForm(true); // Mostrar el formulario al seleccionar un servicio para eliminar
  };

  // Función para cancelar la eliminación del servicio
  const handleCancelDelete = () => {
    setId('');
    setSelectedService(null);
    setShowForm(false); // Ocultar el formulario al cancelar la eliminación
  };

  return (
    <div className="container">
      <div className="tarjetas-contenedor">
        {servicios.length > 0 ? (
          servicios.map((servicio) => (
            <div key={servicio.idServicio} className="tarjeta">
              <p>
                <span className='text-id'> <FontAwesomeIcon icon={faIdCard} /> Id: </span> {servicio.idServicio}
              </p>
              <p>
                <span className='text-id'> <FontAwesomeIcon icon={faTrashAlt} /> Nombre:</span> {servicio.Nombre}
              </p>
              <button onClick={() => selectServiceToDelete(servicio)}> <FontAwesomeIcon icon={faTrashAlt}/> Eliminar</button>
            </div>
          ))
        ) : (
          <p>No hay servicios disponibles.</p>
        )}
      </div>

      {showForm && selectedService && ( // Renderizado condicional del formulario de eliminación
        <form onSubmit={handleDeleteService} className="form-eliminar">
          <h2>Eliminar Servicio</h2>
          <p><FontAwesomeIcon icon={faIdCard} /> Id: {selectedService.idServicio}</p>
          <p><FontAwesomeIcon icon={faTrashAlt} /> Nombre: {selectedService.Nombre}</p>
          <div className="botones-accion">
            <button type="submit"><FontAwesomeIcon icon={faTrashAlt}/> Eliminar</button>
            <button type="button" onClick={handleCancelDelete}><FontAwesomeIcon icon={faTimes} /> Cancelar</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default EliminarServicio;
