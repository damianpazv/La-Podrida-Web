import React, { useContext, useState } from "react";
import { JugadoresContext } from "../context/JugadoresContext";
import "./Home.css"; // Importa los estilos desde un archivo CSS externo
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Box } from '@mui/material';

const Home = () => {
  const [cantJugadores, setCantJugadores] = useState(3);
  const { jugadores, setJugadores,cantManos,setCantManos,valorBaza,setValorBaza } = useContext(JugadoresContext);

  const navigate=useNavigate();

  const resetApp = () => {
    setJugadores([]);
    setCantJugadores(3);
    setCantManos(3);
    setValorBaza(2);
  };

  const handleNombreChange = (text, index) => {
    setJugadores((prevJugadores) => {
      const nuevosJugadores = [...prevJugadores];
      nuevosJugadores[index].nombre = text.toUpperCase();
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


      <Box
  sx={{
    display: "flex",
    gap: 2, // Espaciado entre los inputs
    alignItems: "center", // Alinea los inputs verticalmente al centro (opcional)
    mb: 2, // Margen inferior del contenedor
  }}
>
 

  <TextField
    variant="outlined"
    label="Jugadores"
    type="number"
    value={cantJugadores}
    onChange={(e) => setCantJugadores(e.target.value)}
    sx={{ flex: 1 }} // Los inputs compartirán el espacio disponible
  />



  <TextField
    variant="outlined"
    label="Nro Manos"
    type="number"
    value={cantManos}
    onChange={(e) => setCantManos(parseInt(e.target.value,10) )}
    sx={{ flex: 1 }}
  />
 


  <TextField
    variant="outlined"
    label="Valor baza"
    type="number"
    value={valorBaza}
    onChange={(e) => setValorBaza(parseInt(e.target.value,10))}
    sx={{ flex: 1 }}
  />

</Box>


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
