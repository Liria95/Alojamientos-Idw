import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ActualizarServicio = () => {
  const [id, setId] = useState('');
  const [nombre, setNombre] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = `http://localhost:3001/servicio/updateServicio/${id}`;

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

      toast.success(`Servicio actualizado: ${nombre}`);
      setId('');
      setNombre('');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al actualizar el servicio');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Actualizar Servicio</h2>
      <label>
        ID:
        <input type="text" value={id} onChange={(e) => setId(e.target.value)} required />
      </label>
      <label>
        Nombre:
        <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
      </label>
      <button type="submit">Actualizar</button>
    </form>
  );
};

export default ActualizarServicio;