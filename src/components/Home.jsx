import React, { useContext, useState } from "react";
import { JugadoresContext } from "../context/JugadoresContext";
import "./Home.css"; // Importa los estilos desde un archivo CSS externo
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Box } from '@mui/material';

const Home = () => {
  const [cantJugadores, setCantJugadores] = useState("");
  const { jugadores, setJugadores } = useContext(JugadoresContext);

  const navigate=useNavigate();

  const resetApp = () => {
    setJugadores([]);
    setCantJugadores("");
  };

  const handleNombreChange = (text, index) => {
    setJugadores((prevJugadores) => {
      const nuevosJugadores = [...prevJugadores];
      nuevosJugadores[index].nombre = text;
      nuevosJugadores[index].puntos = 0;
      return nuevosJugadores;
    });
  };

  const siguiente = () => {
    if (jugadores[0]) {
      
        navigate('/juego', { state: { cantidadJugadores: jugadores.length } });

      return;
    }

    const nuevosJugadores = Array.from(
      { length: Number(cantJugadores) },
      () => ({ nombre: "", puntos: 0 })
    );

    setJugadores(nuevosJugadores);
  };

  return (
    <Box sx={{ p: 3, bgcolor: '#f5f5f5', minHeight: '86vh' }}>
      {/* Título */}
      <Typography variant="h6" sx={{ mb: 3 }}>
        Ingrese cantidad de jugadores:
      </Typography>

      {/* Input para la cantidad de jugadores */}
      <TextField
        variant="outlined"
        label="Cantidad de jugadores"
        type="number"
        fullWidth
        value={cantJugadores}
        onChange={(e) => setCantJugadores(e.target.value)}
        sx={{ mb: 2 }}
      />

      {/* Botones */}
      <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
        <Button
          variant="contained"
          sx={{ backgroundColor: '#008081', color: 'white', flex: 1 }}
          onClick={siguiente}
        >
          {jugadores[0] ? 'JUGAR' : 'SIGUIENTE'}
        </Button>
        <Button
          variant="contained"
          sx={{ backgroundColor: '#2f6fda', color: 'white', flex: 1 }}
          onClick={resetApp}
        >
          Resetear
        </Button>
      </Box>

      {/* Lista de jugadores */}
      <Box sx={{ mb: 3 }}>
        {jugadores.map((jugador, index) => (
          <Box key={index} sx={{ mb: 2 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Jugador {index + 1}
            </Typography>
            <TextField
              variant="outlined"
              label="Nombre del jugador"
              fullWidth
              value={jugador.nombre}
              onChange={(e) => handleNombreChange(e.target.value, index)}
              sx={{ mb: 2 }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Home;
