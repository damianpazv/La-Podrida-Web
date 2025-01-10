import React, { createContext, useState } from 'react';

// Creamos el contexto
const JugadoresContext = createContext();

// Creamos un componente proveedor que envolverá nuestra aplicación
const JugadoresProvider = ({ children }) => {
  // Definimos el estado del array de jugadores
  const [jugadores, setJugadores] = useState([]);

  return (
    // Proporcionamos el contexto con el valor del array de jugadores
    <JugadoresContext.Provider value={{ jugadores, setJugadores }}>
      {children}
    </JugadoresContext.Provider>
  );
};

export { JugadoresProvider, JugadoresContext };