import React, { useState, useEffect, useMemo } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPencilAlt, faKey, faCheckCircle, faTimesCircle, faMapMarkerAlt, faMoneyBillAlt, faBed, faBath, faList } from '@fortawesome/free-solid-svg-icons';
import './BuscarAlojamiento.css';

const BuscarAlojamiento = () => {
  // Estados para manejar los alojamientos, filtros, errores, carga y paginación
  const [alojamientos, setAlojamientos] = useState([]);
  const [filteredAlojamientos, setFilteredAlojamientos] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [alojamientosPerPage] = useState(5);
  const [precioMinimo, setPrecioMinimo] = useState(0);
  const [precioMaximo, setPrecioMaximo] = useState(Number.MAX_SAFE_INTEGER);
  const [estadoFiltro, setEstadoFiltro] = useState('');
  const [cantidadHabitaciones, setCantidadHabitaciones] = useState('');

  // useEffect para obtener la lista de alojamientos al montar el componente
  useEffect(() => {
    const fetchAlojamientos = async () => {
      try {
        const response = await fetch('http://localhost:3001/alojamiento/getAlojamientos');
        if (!response.ok) {
          throw new Error('Error al obtener la lista de alojamientos');
        }
        const data = await response.json();
        setAlojamientos(data);
        setFilteredAlojamientos(data);
      } catch (err) {
        setError(err.message);
        toast.error(err.message || 'Error al obtener la lista de alojamientos');
      } finally {
        setLoading(false);
      }
    };

    fetchAlojamientos();
  }, []);

  // Opciones para los desplegables de precio mínimo y máximo
  const precioMinimoOptions = [0, 50, 100, 200, 500];
  const precioMaximoOptions = [100, 200, 300, 400, 500, 1000, 2000, Number.MAX_SAFE_INTEGER];

  // Opciones para el desplegable de cantidad mínima de habitaciones
  const cantidadHabitacionesOptions = ['', 1, 2, 3, 4, 5];

  // useMemo para optimizar el filtrado de alojamientos
  const filteredData = useMemo(() => {
    return alojamientos.filter(alojamiento =>
      alojamiento.PrecioPorDia >= precioMinimo &&
      alojamiento.PrecioPorDia <= precioMaximo &&
      (estadoFiltro === '' || alojamiento.Estado.toLowerCase() === estadoFiltro.toLowerCase()) &&
      (cantidadHabitaciones === '' || alojamiento.CantidadDormitorios >= cantidadHabitaciones)
    );
  }, [alojamientos, precioMinimo, precioMaximo, estadoFiltro, cantidadHabitaciones]);

  // Manejo de cambio de página
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Función para mostrar detalles del alojamiento (actualmente solo loguea en consola)
  const handleShowDetails = (alojamiento) => {
    console.log('Mostrar detalles de:', alojamiento);
  };

  // Cálculo de índices para paginación
  const indexOfLastAlojamiento = currentPage * alojamientosPerPage;
  const indexOfFirstAlojamiento = indexOfLastAlojamiento - alojamientosPerPage;
  const currentAlojamientos = filteredData.slice(indexOfFirstAlojamiento, indexOfLastAlojamiento);

  // Mensaje de carga
  if (loading) {
    return <p className="loading-message">Cargando alojamientos...</p>;
  }

  return (
    <div className="buscar-alojamiento">
      <ToastContainer />
      <div className="search-and-list-container">
        <div className="search-form">
          <h2><FontAwesomeIcon icon={faList} /> Listado de Alojamientos</h2>
          <div className="price-filter">
            <label><FontAwesomeIcon icon={faMoneyBillAlt} /> Precio mínimo:</label>
            <select value={precioMinimo} onChange={(e) => setPrecioMinimo(parseInt(e.target.value))}>
              {precioMinimoOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            <label><FontAwesomeIcon icon={faMoneyBillAlt} /> Precio máximo:</label>
            <select value={precioMaximo} onChange={(e) => setPrecioMaximo(parseInt(e.target.value))}>
              {precioMaximoOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          <div className="estado-filter">
            <label><FontAwesomeIcon icon={faCheckCircle} /> Estado:</label>
            <select value={estadoFiltro} onChange={(e) => setEstadoFiltro(e.target.value)}>
              <option value="">Todos</option>
              <option value="Disponible">Disponible</option>
              <option value="Reservado">Reservado</option>
            </select>
          </div>
          <div className="habitaciones-filter">
            <label><FontAwesomeIcon icon={faBed} /> Cantidad de Habitaciones mínima:</label>
            <select value={cantidadHabitaciones} onChange={(e) => setCantidadHabitaciones(parseInt(e.target.value))}>
              {cantidadHabitacionesOptions.map(option => (
                <option key={option} value={option}>{option === '' ? 'Cualquiera' : option}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="alojamientos-list-container">
          <div className="alojamientos-grid">
            {currentAlojamientos.length > 0 ? (
              currentAlojamientos.map((alojamiento) => (
                <div className="alojamiento-card" key={alojamiento.idAlojamiento} onClick={() => handleShowDetails(alojamiento)}>
                  <h3><FontAwesomeIcon icon={faHome} /> {alojamiento.Titulo}</h3>
                  <p><FontAwesomeIcon icon={faPencilAlt} /> {alojamiento.Descripcion}</p>
                  <p><FontAwesomeIcon icon={faMapMarkerAlt} /> {alojamiento.Latitud}</p>
                  <p><FontAwesomeIcon icon={faMapMarkerAlt} /> {alojamiento.Longitud}</p>
                  <p><FontAwesomeIcon icon={faMoneyBillAlt} /> Precio por Día: {alojamiento.PrecioPorDia}</p>
                  <p><FontAwesomeIcon icon={faBed} /> Cantidad de Dormitorios: {alojamiento.CantidadDormitorios}</p>
                  <p><FontAwesomeIcon icon={faBath} /> Cantidad de Baños: {alojamiento.CantidadBanios}</p>
                  <p><FontAwesomeIcon icon={alojamiento.Estado === 'Disponible' ? faCheckCircle : faTimesCircle} /> Estado: {alojamiento.Estado}</p>
                  <p><FontAwesomeIcon icon={faKey} /> Tipo de Alojamiento: {alojamiento.TipoAlojamiento}</p>
                </div>
              ))
            ) : (
              <p className="no-results">No hay alojamientos disponibles</p>
            )}
            <div className="pagination">
              <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Anterior</button>
              <span>Página {currentPage}</span>
              <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentAlojamientos.length < alojamientosPerPage}>Siguiente</button>
            </div>
          </div>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default BuscarAlojamiento;
