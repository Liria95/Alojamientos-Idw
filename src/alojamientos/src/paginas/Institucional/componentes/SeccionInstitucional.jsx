import React from 'react';
import '../css/SeccionInstitucional.css';
import { Seccion } from '../../Home/componentes/Seccion';

function SeccionInstitucional() {
  return (
    <section className="seccion-institucional">
      <Seccion ClassName="seccion-contacto1" nombre='Bienvenido a IDW Check-In' />

      {/* <h1>Bienvenido a IDW Check-In</h1> */}
      <p>Nos complace presentarle IDW Check-In, la plataforma líder en reservas de alojamiento que simplifica la búsqueda y reserva de tu próximo destino. En IDW Check-In, nos esforzamos por ofrecer una experiencia de usuario excepcional, combinando una amplia variedad de opciones de alojamiento con una interfaz intuitiva y amigable.</p>
      <Seccion ClassName="seccion-contacto1" nombre='Nuestra Misión' />
      {/* <h2>Nuestra Misión</h2> */}
      <p>En IDW Check-In, nuestra misión es proporcionar a nuestros usuarios la mejor experiencia de reserva de alojamiento posible. Nos dedicamos a ofrecer una plataforma robusta y confiable que simplifique el proceso de búsqueda y reserva, permitiendo a nuestros usuarios encontrar el alojamiento perfecto para sus necesidades.</p>
      <Seccion ClassName="seccion-contacto1" nombre='Lo Que Ofrecemos' />
      {/* <h2>Lo Que Ofrecemos</h2> */}
      <p>En IDW Check-In, ofrecemos una amplia variedad de opciones de alojamiento, que incluyen casas, departamentos, hostels y más. Nuestro catálogo abarca alojamientos de todas las categorías y precios, asegurando que cada usuario pueda encontrar la opción perfecta para su estadía.</p>
      <Seccion ClassName="seccion-contacto1" nombre='Nuestro Compromiso' />
      {/* <h2>Nuestro Compromiso</h2> */}
      <p>En IDW Check-In, estamos comprometidos con la excelencia en cada aspecto de nuestro servicio. Desde el diseño de nuestro sitio web hasta la calidad de nuestro servicio al cliente, nos esforzamos por superar las expectativas de nuestros usuarios en todo momento.</p>
      <p>¡Gracias por elegir IDW Check-In para tus próximas reservas de alojamiento! Esperamos que disfrutes de tu experiencia con nosotros.</p>
      <p>Para más información, no dudes en ponerte en contacto con nuestro equipo.</p>
    </section>
  );
}

export default SeccionInstitucional;
