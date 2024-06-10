import React from 'react';
import { Carousel } from 'antd';
import tienda from '../../assets/img/tienda.jpeg';
import tienda2 from '../../assets/img/tienda2.jpeg';
import tienda3 from '../../assets/img/tienda3.jpeg';

const imageStyle: React.CSSProperties = {
  width: '100%',
  height: '300px',
  objectFit: 'cover',
};

const CustomCarousel: React.FC = () => (
  <div style={{ width: '500px', margin: '0 auto' }}>
    <Carousel arrows dotPosition="bottom" infinite={false} autoplay>
      <div>
        <img src={tienda} alt="Tienda 1" style={imageStyle} />
      </div>
      <div>
        <img src={tienda2} alt="Tienda 2" style={imageStyle} />
      </div>
      <div>
        <img src={tienda3} alt="Tienda 3" style={imageStyle} />
      </div>
    </Carousel>
  </div>
);

export default CustomCarousel;
