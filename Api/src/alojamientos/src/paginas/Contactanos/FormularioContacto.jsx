import React, { useState } from 'react';
import '../Contactanos/css/FormularioContacto.css';

export default function FormularioContacto() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [reserva, setReserva] = useState("Si");
  const [mensajeMostrado, setMensajeMostrado] = useState("");

  const handleNombreChange = (event) => {
    setNombre(event.target.value);
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  }

  const handleMensajeChange = (event) => {
    setMensaje(event.target.value);
  }

  const handleReservaChange = (event) => {
    setReserva(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setMensajeMostrado(`Nombre: ${nombre}\nEmail: ${email}\nMensaje: ${mensaje}\nReserva: ${reserva}`);
  }

  return (
    <section className="seccion-contacto">
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nombre">Nombre:</label>
          <input type="text" id="nombre" name="nombre" required placeholder="Ingrese nombre" value={nombre} onChange={handleNombreChange} />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required placeholder="Ingrese su correo" value={email} onChange={handleEmailChange} />
        </div>
        <div className="form-group">
          <label htmlFor="mensaje">Mensaje:</label>
          <textarea
            id="mensaje"
            name="mensaje"
            rows={5}
            required
            value={mensaje}
            onChange={handleMensajeChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="reserva">¿Desea realizar una reserva?</label>
          <select id="reserva" name="reserva" value={reserva} onChange={handleReservaChange}>
            <option value="Si">Sí</option>
            <option value="No">No</option>
          </select>
          <br />
          <br />
          <button type="submit">Enviar</button>
        </div>
      </form>
      {mensajeMostrado && (
        <div className="mensaje-mostrado">
          <h3>Mensaje Enviado:</h3>
          <pre>{mensajeMostrado}</pre>
        </div>
      )}
    </section>
  );
}
