import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Juego from './components/Juego';
import Home from './components/Home';
import { JugadoresProvider } from './context/JugadoresContext';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <JugadoresProvider>
      <Router>
        <header
          style={{
            backgroundColor: '#005267',
            padding: '10px',
            textAlign: 'center',
            color: 'white',
          }}
        >
          <h1 style={{ fontSize: '24px', margin: 0 }}>La Podrida</h1>
        </header>

        {/* <nav
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '10px',
            backgroundColor: '#004050',
            padding: '10px',
          }}
        >
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
            Home
          </Link>
          <Link to="/juego" style={{ color: 'white', textDecoration: 'none' }}>
            Juego
          </Link>
        </nav> */}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/juego" element={<Juego />} />
        </Routes>

        {/* Footer con el texto "Desarrollado por Ing Damian Paz" */}
        <footer
          style={{
            backgroundColor: '#005267',
            color: 'white',
            textAlign: 'center',
            padding: '10px',
            position: 'fixed',
            width: '100%',
            bottom: 0,
          }}
        >
          <p style={{ margin: 0 }}>© Desarrollado por Ing Damian Paz</p>
        </footer>
      </Router>
    </JugadoresProvider>
  );
};

export default App;


