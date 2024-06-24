import React, { useState, useEffect } from 'react';

const ObtenerAlojamientoServicio = () => {
  const [alojamientoServicio, setAlojamientoServicio] = useState(null); // Estado para almacenar el alojamiento y servicio obtenido
  const [idAlojamiento, setIdAlojamiento] = useState(1); // ID de alojamiento predeterminado (puedes cambiarlo según necesites)

  // Función para obtener el alojamiento y servicio por ID de alojamiento
  const fetchAlojamientoServicio = async () => {
    const endpoint = `http://localhost:3001/alojamientosServicios/getAlojamientoServicios/${idAlojamiento}`;

    try {
      const response = await fetch(endpoint);
      if (response.ok) {
        const data = await response.json();
        setAlojamientoServicio(data); // Actualizar el estado con el alojamiento y servicio obtenido
      } else {
        throw new Error('Error al obtener el alojamiento y servicio');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchAlojamientoServicio(); // Llamar a la función para obtener el alojamiento y servicio al montar el componente
  }, [idAlojamiento]); // Dependencia: se vuelve a cargar cuando cambia idAlojamiento

  // Manejar cambios en el campo de ID de alojamiento
  const handleChangeIdAlojamiento = (event) => {
    setIdAlojamiento(Number(event.target.value)); // Convertir a número y actualizar el estado
  };

  return (
    <div>
      <h1>Obtener Alojamiento y Servicio por ID de Alojamiento</h1>
      <div>
        <label>ID de Alojamiento:</label>
        <input type="number" value={idAlojamiento} onChange={handleChangeIdAlojamiento} />
        <button onClick={fetchAlojamientoServicio}>Obtener</button>
      </div>
      <hr />
      {alojamientoServicio ? (
        <div>
          <h2>Datos del Alojamiento y Servicio</h2>
          <p><strong>ID de Relación:</strong> {alojamientoServicio.idAlojamientoServicio}</p>
          <p><strong>ID de Alojamiento:</strong> {alojamientoServicio.idAlojamiento}</p>
          <p><strong>ID de Servicio:</strong> {alojamientoServicio.idServicio}</p>
        </div>
      ) : (
        <p>No se ha obtenido ningún alojamiento y servicio.</p>
      )}
    </div>
  );
};

export default ObtenerAlojamientoServicio;