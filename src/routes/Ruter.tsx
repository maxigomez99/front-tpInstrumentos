import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Instrumentos from '../pages/Instrumentos';
import Home from '../pages/Home';
import DondeEstamos from '../pages/DondeEstamos'; 
import GrillaInstrumento from '../pages/GrillaInstrumento';

const Rutas: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/donde-estamos" element={<DondeEstamos />} />
            <Route path="/productos" element={<Instrumentos />} />
            <Route path="/instrumentos" element={<GrillaInstrumento />} />
        </Routes>
    );
}

export default Rutas;