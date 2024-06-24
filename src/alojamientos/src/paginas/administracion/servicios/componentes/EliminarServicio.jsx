import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EliminarServicio = () => {
  const [id, setId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = `http://localhost:3001/servicio/deleteServicio/${id}`;

    try {
      const response = await fetch(endpoint, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error al eliminar el servicio');
      }

      toast.success('Servicio eliminado');
      setId('');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al eliminar el servicio');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Eliminar Servicio</h2>
      <label>
        ID:
        <input type="text" value={id} onChange={(e) => setId(e.target.value)} required />
      </label>
      <button type="submit">Eliminar</button>
    </form>
  );
};

export default EliminarServicio;