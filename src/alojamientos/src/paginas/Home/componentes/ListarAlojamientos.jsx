import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPencilAlt, faKey, faCheckCircle, faTimesCircle, faMapMarkerAlt, faMoneyBillAlt, faBed, faBath, faList } from '@fortawesome/free-solid-svg-icons';

const ListarAlojamientos = () => {
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
  const [tiposAlojamiento, setTiposAlojamiento] = useState([]);
  const [tipoAlojamientoSeleccionado, setTipoAlojamientoSeleccionado] = useState('');
  const [imagenesAlojamientos, setImagenesAlojamientos] = useState({});

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

        // Obtener imágenes asociadas a cada alojamiento
        const promises = data.map(async (alojamiento) => {
          const responseImagenes = await fetch(`http://localhost:3001/imagen/getAllImagenes`);
          if (responseImagenes.ok) {
            const dataImagenes = await responseImagenes.json();
            setImagenesAlojamientos(prevState => ({
              ...prevState,
              [alojamiento.idAlojamiento]: dataImagenes,
            }));
          }
        });
        await Promise.all(promises);

      } catch (err) {
        setError(err.message);
        toast.error(err.message || 'Error al obtener la lista de alojamientos');
      } finally {
        setLoading(false);
      }
    };

    const fetchTiposAlojamiento = async () => {
      try {
        const response = await fetch('http://localhost:3001/tiposAlojamiento/getTiposAlojamiento');
        if (!response.ok) {
          throw new Error('Error al obtener los tipos de alojamiento');
        }
        const data = await response.json();
        setTiposAlojamiento(data);
      } catch (err) {
        setError(err.message);
        toast.error(err.message || 'Error al obtener los tipos de alojamiento');
      }
    };

    fetchAlojamientos();
    fetchTiposAlojamiento();
  }, []);

  const precioMinimoOptions = [0, 50, 100, 200, 500];
  const precioMaximoOptions = [100, 200, 300, 400, 500, 1000, 2000, Number.MAX_SAFE_INTEGER];
  const cantidadHabitacionesOptions = ['', 1, 2, 3, 4, 5];

  const filteredData = alojamientos.filter(alojamiento =>
    alojamiento.PrecioPorDia >= precioMinimo &&
    alojamiento.PrecioPorDia <= precioMaximo &&
    (estadoFiltro === '' || alojamiento.Estado.toLowerCase() === estadoFiltro.toLowerCase()) &&
    (cantidadHabitaciones === '' || alojamiento.CantidadDormitorios >= cantidadHabitaciones) &&
    (tipoAlojamientoSeleccionado === '' || alojamiento.TipoAlojamiento.toString() === tipoAlojamientoSeleccionado)
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleShowDetails = (alojamiento) => {
    console.log('Mostrar detalles de:', alojamiento);
  };

  const indexOfLastAlojamiento = currentPage * alojamientosPerPage;
  const indexOfFirstAlojamiento = indexOfLastAlojamiento - alojamientosPerPage;
  const currentAlojamientos = filteredData.slice(indexOfFirstAlojamiento, indexOfLastAlojamiento);

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
          <div className="tipo-alojamiento-filter">
            <label><FontAwesomeIcon icon={faHome} /> Tipo de Alojamiento:</label>
            <select value={tipoAlojamientoSeleccionado} onChange={(e) => setTipoAlojamientoSeleccionado(e.target.value)}>
              <option value="">Todos</option>
              {tiposAlojamiento.map(tipo => (
                <option key={tipo.idTipoAlojamiento} value={tipo.idTipoAlojamiento}>{tipo.Descripcion}</option>
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
                  <p><FontAwesomeIcon icon={faMapMarkerAlt} /> Ubicacion: {alojamiento.Longitud}, {alojamiento.Latitud}</p>
                  <p><FontAwesomeIcon icon={faMoneyBillAlt} /> Precio por Día: {alojamiento.PrecioPorDia}</p>
                  <p><FontAwesomeIcon icon={faBed} /> Cantidad de Dormitorios: {alojamiento.CantidadDormitorios}</p>
                  <p><FontAwesomeIcon icon={faBath} /> Cantidad de Baños: {alojamiento.CantidadBanios}</p>
                  <p><FontAwesomeIcon icon={alojamiento.Estado === 'Disponible' ? faCheckCircle : faTimesCircle} /> Estado: {alojamiento.Estado}</p>

                  {/* Mostrar imágenes */}
                  {imagenesAlojamientos[alojamiento.idAlojamiento] && (
                    <div className="imagenes-alojamiento">
                      {imagenesAlojamientos[alojamiento.idAlojamiento].map((imagen) => (
                        <img key={imagen.idImagen} src={imagen.RutaArchivo} alt={`Imagen ${imagen.idImagen}`} />
                      ))}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p>No se encontraron alojamientos que coincidan con los filtros seleccionados.</p>
            )}
          </div>

          {filteredData.length > alojamientosPerPage && (
            <div className="pagination">
              <button
                onClick={() => handlePageChange(currentPage > 1 ? currentPage - 1 : 1)}
                disabled={currentPage === 1}
              >
                Anterior
              </button>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={indexOfLastAlojamiento >= filteredData.length}
              >
                Siguiente
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListarAlojamientos;
