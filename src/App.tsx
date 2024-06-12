import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Menu from './Components/menu/Menu';


const App: React.FC = () => {
  return (
    <Router>
      <Menu />
     
    </Router>
  );
};

export default App;