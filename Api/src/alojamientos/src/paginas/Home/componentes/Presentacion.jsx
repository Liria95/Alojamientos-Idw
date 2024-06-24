import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Presentacion.css';

export function Presentacion() {
    return (
        <section className="presentacionIntro container text-center py-5">
            <h2 className="display-4 mb-4">
                <span className="textoResaltado">ALQUILA CON HOUSE</span><br />
                Relájate y disfruta tu estadía
            </h2>
            <p className="lead">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aliquid delectus doloribus eligendi eos
                nesciunt nihil placeat quo repellendus rerum. Aut corporis deserunt, totam! Lorem ipsum dolor sit amet,
                consectetur adipisicing elit. A in inventore iste laboriosam, libero mollitia neque placeat quae
                quibusdam reprehenderit sapiente sequi veniam vero. Ipsum!
            </p>
        </section>
    );
}
