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
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
           
            backgroundColor:'#f5f5f5' // El contenedor ocupa toda la altura de la ventana
          }}
        >
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

          <main
            style={{
              flex: 1, // El contenido principal ocupa el espacio restante
              padding: '10px',
            }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/juego" element={<Juego />} />
            </Routes>
          </main>

          <footer
            style={{
              backgroundColor: '#005267',
              color: 'white',
              textAlign: 'center',
              padding: '8px',
              width: '100%',
            }}
          >
            <p style={{ margin: 0 }}>© Desarrollado por Ing Damian Paz</p>
          </footer>
        </div>
      </Router>
    </JugadoresProvider>
  );
};

export default App;



