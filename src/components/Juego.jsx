import React, { useContext, useState } from 'react';
import { JugadoresContext } from '../context/JugadoresContext';
import { Box, Typography, TextField, Button, Modal, Paper, FormControlLabel, Checkbox} from "@mui/material";
import "./Juego.css";
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';



const Juego = () => {
    const location = useLocation();
    const { cantidadJugadores } = location.state;
  const [ronda, setRonda] = useState(1);
  const [cartas, setCartas] = useState(1);
  const { jugadores, setJugadores ,cantManos,valorBaza} = useContext(JugadoresContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [flagCartas, setFlagCartas] = useState(true);
  const [flagPuntos, setFlagPuntos] = useState(true);
  const [puntosRonda, setPuntosRonda] = useState([]);
  const [camposHabilitados, setCamposHabilitados] = useState(true);
const navigate=useNavigate()



  const handleSiguienteRonda = () => {
    // Cálculo de las manos (número de rondas) basado en la cantidad de jugadores
    // const manosMax = Math.min(10, Math.max(5, cantidadJugadores));  // Entre 5 y 10 rondas, dependiendo de la cantidad de jugadores.
    // const manosMax = cantManos; 
    // Calcular cuántas cartas por jugador hay en cada ronda

console.log(cantManos,ronda,valorBaza);

    // let cartasPorJugador;
    // if (ronda <= 3) {
    //   // En las primeras rondas (3 primeras), los jugadores reciben más cartas (4 cartas por jugador).
    //   cartasPorJugador = 4;
    // } else if (ronda <= 6) {
    //   // En las rondas intermedias, el número de cartas se reduce (3 cartas por jugador).
    //   cartasPorJugador = 3;
    // } else {
    //   // En las rondas finales, los jugadores reciben menos cartas (2 cartas por jugador).
    //   cartasPorJugador = 2;
    // }
  
    // Comprobar si hemos alcanzado el fin del juego (cuando ya hemos jugado todas las rondas)
    if (ronda === cantManos) {
        Swal.fire({
          title: ` ${jugadoresOrdenados[0].nombre} ha ganado el juego!`,
          imageUrl: "https://i.pinimg.com/originals/5b/7a/ca/5b7aca0fe26f4e6d16d063d725dfb250.gif",
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: "Custom image",
        //   footer: '<button id="salirButton" class="swal2-confirm swal2-styled">Salir</button>',
          showConfirmButton: true, 
          confirmButtonText:"Salir" // Opcional: para ocultar el botón de confirmación predeterminado
        }).then(() => {
          // Redirigir al home cuando el botón "Salir" sea presionado
          setJugadores(jugadores.map(jugador => ({
            ...jugador,
            puntos: 0
          })));
          
          navigate("/");  // Asumiendo que usas react-router-dom y que tienes la ruta "/home"
        });
      
        return;  // Salir de la función, ya que el juego ha terminado
      }
      
    else {
      // Si no hemos llegado al final del juego, avanzamos a la siguiente ronda
      setRonda((prevRonda) => prevRonda + 1);
    }
  
    // Asegurarse de que el número de cartas por jugador esté correctamente ajustado según la ronda
    // if (cartas < cartasPorJugador) {
    //   setCartas((prevCartas) => prevCartas + 1);
    // } else if (cartas === cartasPorJugador) {
    //   // Aseguramos que las cartas no se incrementen más de lo necesario
    //   setCartas(cartas);
    // }
  
    // // Si el número de cartas ha alcanzado el valor correspondiente para esta ronda, no se hace nada más
    // if (cartas === cartasPorJugador) {
    //   setFlagCartas(false); // Puede usar esto para evitar que se incremente el número de cartas después de alcanzarlo
    // } else {
    //   setFlagCartas(true);
    // }
  
    // Habilitamos los campos para la siguiente ronda
    setCamposHabilitados(true);
    setFlagPuntos(true);
  };
  
  

  const cargarPuntos = () => {
    setJugadores((prevJugadores) => {
      // Actualizamos los jugadores basados en los puntos de la ronda
      const jugadoresActualizados = prevJugadores.map((jugador) => {
        const punto = puntosRonda.find((p) => p.nombre === jugador.nombre);
        if (punto) {


          
          if (punto.bazas ===punto.bazasConseguidas) {
            let puntosActualizados = jugador.puntos + valorBaza * parseInt(punto.bazas, 10);
            puntosActualizados += 10;
            return { ...jugador, puntos: puntosActualizados };
          }

          else{
            const puntos=valorBaza * parseInt(punto.bazasConseguidas, 10);
            const diferencia = Math.abs(punto.bazas - punto.bazasConseguidas);
            let puntosActualizados = jugador.puntos + puntos - valorBaza * diferencia;
            return { ...jugador, puntos: puntosActualizados };
          }
       
        }
        return jugador; // Si no hay puntos para este jugador, lo dejamos tal cual
      });
  
      return jugadoresActualizados; // Retornamos la lista actualizada
    });
  
    setCamposHabilitados(false);
    setPuntosRonda([]); 
    setFlagPuntos(false);// Limpiamos los puntos de la ronda
  };
  

  const handleCumplioChange = (checked, nombre) => {
    setPuntosRonda((prevPuntosRonda) => {
      // Si ya existe un jugador en puntosRonda, actualiza el valor de 'cumplio'
      const updatedPuntosRonda = prevPuntosRonda.map((punto) => 
        punto.nombre === nombre ? { ...punto, cumplio: checked } : punto
      );
  
      // Si el jugador no existe, lo agregamos con el valor 'cumplio' actualizado
      if (!updatedPuntosRonda.some(punto => punto.nombre === nombre)) {
        updatedPuntosRonda.push({ nombre, cumplio: checked, bazas: '' });
      }
  
      return updatedPuntosRonda;
    });
  };
  
  
  
  const handleBazasChange = (text, nombre) => {
    const index = puntosRonda.findIndex((item) => item.nombre === nombre);

    if (index !== -1) {
      const updatedPuntosRonda = [...puntosRonda];
      updatedPuntosRonda[index].bazas = text;
      setPuntosRonda(updatedPuntosRonda);
    } else {
      setPuntosRonda([{ nombre, bazas: text }, ...puntosRonda]);
    }
  };
  const handleBazasConseguidasChange = (text, nombre) => {
    const index = puntosRonda.findIndex((item) => item.nombre === nombre);

    if (index !== -1) {
      const updatedPuntosRonda = [...puntosRonda];
      updatedPuntosRonda[index].bazasConseguidas = text;
      setPuntosRonda(updatedPuntosRonda);
    } else {
      setPuntosRonda([{ nombre, bazasConseguidas: text }, ...puntosRonda]);
    }
  };

  const jugadoresOrdenados = [...jugadores].sort((a, b) => b.puntos - a.puntos);

  return (
    <Box sx={{ p: 3, bgcolor: "#f5f5f5",  }}>
      {/* Header */}
      {/* <Box sx={{ mb: 4, display: "flex", justifyContent: "space-between", alignItems: "center" }}> */}

        <Typography className='text-center' variant="h6">MANO {ronda}</Typography>
        {/* <Typography variant="h5">Cartas: {cartas}</Typography> */}
      {/* </Box> */}

      {/* Table */}
      <Paper sx={{ mb: 4, p: 2, boxShadow: 3 }}>
        <Box
          sx={{
            display: "flex",
            bgcolor: "#1976d2",
            color: "#fff",
            p: 1,
            borderRadius: 1,
            fontWeight: "bold",
          }}
        >
       <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
  <Box sx={{ flex: 1, textAlign: 'center' ,fontSize:"12px"}}>JUGADOR</Box>
  {/* <Box sx={{ flex: 1, textAlign: 'center',fontSize:"10px" }}>CUMPLIO</Box> */}
  <Box sx={{ flex: 1, textAlign: 'center' ,fontSize:"12px"}}>BAZAS APOSTADAS</Box>
  <Box sx={{ flex: 1, textAlign: 'center' ,fontSize:"12px"}}>BAZAS CONSEGUIDAS</Box>
</Box>

        </Box>
        {jugadores.map((item) => (
  <Box
    key={item.nombre}
    sx={{
      display: 'flex',
      justifyContent: 'center', // Centra los elementos horizontalmente
      alignItems: 'center',      // Centra los elementos verticalmente
      p: 1,
      borderBottom: '1px solid #ddd',
      width: '100%',
    }}
  >
    <Box sx={{ flex: 1, textAlign: 'center' }}>{item.nombre}</Box> {/* Centra el nombre del jugador */}
    {/* <FormControlLabel
      control={
        <Checkbox
          checked={puntosRonda.some((punto) => punto.nombre === item.nombre && punto.cumplio === true)}
          onChange={(e) => handleCumplioChange(e.target.checked, item.nombre)}
          disabled={!camposHabilitados}
        />
      }
      label="SI"
      sx={{ textAlign: 'center' ,marginLeft:2}} // Centra el label de "Cumplió"
    /> */}
    <TextField
      variant="outlined"
      size="small"
      type="number"
      placeholder="Ingrese"
      
      sx={{
        flex: 1,
    marginLeft:2,
        textAlign: 'center', // Centra el texto del campo de Bazas
      }}
      onChange={(e) => handleBazasChange(e.target.value, item.nombre)}
      disabled={!camposHabilitados}
      value={puntosRonda.find((punto) => punto.nombre === item.nombre)?.bazas || ''}
    />

<TextField
      variant="outlined"
      size="small"
      type="number"
      placeholder="Ingrese"
      
      sx={{
        flex: 1,
    marginLeft:2,
        textAlign: 'center', // Centra el texto del campo de Bazas
      }}
      onChange={(e) => handleBazasConseguidasChange(e.target.value, item.nombre)}
      disabled={!camposHabilitados}
      value={puntosRonda.find((punto) => punto.nombre === item.nombre)?.bazasConseguidas || ''}
    />
  </Box>
))}

      </Paper>

      {/* Buttons */}
      <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2, mb: 4 }}>
        <Button variant="contained" color="primary" onClick={cargarPuntos}>
          Cargar Puntos
        </Button>
        <Button disabled={flagPuntos}  variant="contained" color="secondary" onClick={handleSiguienteRonda}>
          Siguiente Mano
        </Button>
      </Box>

      {/* Modal */}
      <Modal open={modalVisible} onClose={() => setModalVisible(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 250,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            Tabla de Puntos
          </Typography>
          {jugadoresOrdenados.map((item) => (
            <Box
              key={item.nombre}
              sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
            >
              <Typography variant="body2">{item.nombre}</Typography>
              <Typography variant="body2">{item.puntos}</Typography>
            </Box>
          ))}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={() => setModalVisible(false)}
          >
            Cerrar
          </Button>
        </Box>
      </Modal>

      <div className="text-center">
        <Button variant="outlined" onClick={() => setModalVisible(true)}>
          Ver Tabla
        </Button>
      </div>
    </Box>
  );
};

export default Juego;
