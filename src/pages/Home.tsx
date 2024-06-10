import React from 'react';
import Carousel from '../Components/carousel/Carousel';

export default function Home() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
      <h1>Musical Hendrix</h1>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <Carousel />
      </div>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <h3>
          Musical Hendrix es una tienda de instrumentos musicales con ya más de 15 años de
          experiencia. Tenemos el conocimiento y la capacidad como para informarte acerca de las
          mejores elecciones para tu compra musical.
        </h3>
      </div>
    </div>
  );
}
