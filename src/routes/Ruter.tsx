import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Instrumentos from '../pages/Instrumentos';





const Rutas: React.FC = () => {
    return (

            <Routes>
              <Route path="/" element={<Instrumentos />} />



            </Routes>


    );
  }

  export default Rutas;