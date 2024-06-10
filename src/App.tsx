import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Menu from './Components/menu/Menu';
import Rutas from './routes/Ruter';

const App: React.FC = () => {
  return (
    <Router>
      <Menu />
      <Rutas />
    </Router>
  );
};

export default App;