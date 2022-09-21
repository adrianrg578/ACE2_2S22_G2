import ProgressBar from 'react-bootstrap/ProgressBar';
import "bootstrap/dist/css/bootstrap.min.css"
import React, {useState, useEffect} from 'react';
import socket from "../Socket/Socket";

//Componentes

export default function Fuerza() {
  //Variables
  const saved = localStorage.getItem("Usuario");
  const dataUsuario = JSON.parse(saved)


  //Hooks
  const [fuerza, setFuerza] = useState("");

  //Estilos
  const BoxStyle = {
    height: '55vh'
  };

  const FontStyle = {
    "fontSize": "13vh",
    "backgroundColor": "rgba(5,.5,0.5,.3)"
  };

  const ButtonStyle = {
    "backgroundColor": "rgba(5,.5,0.5,.3)",
    "border": "none",
    "color": "white"
  };

  const sendDashboard = async () => {
    console.log("HOLA SOY FUERZA")
  } 

  //Conexion
  useEffect(() => {
    socket.on("fuerza", (Fuerza, callback) => {
      console.log(fuerza, "No se solo estoy probando FUERZA")
      setFuerza(Fuerza);
      callback({
        IdUser: dataUsuario.IdUser
      });
    });
     
  }, [fuerza]);

  return (
    <div className="container text-center" style={BoxStyle}>
      <div className="row mb-5">
        <div className="col-sm-7 mx-auto">
          <p className="text-center rounded text-white fst-italic fw-bold" style={FontStyle}>{fuerza} kg</p>
        </div>
      </div>
      <div className="row mb-5">
        <div className="col-sm-10 mx-auto">
          <ProgressBar variant="info" animated now={fuerza} />
        </div>
      </div>
      <div className="row mb-5">
        <div className="col-sm-10 mx-auto">
          <button style={ButtonStyle} type="button" className="btn outline-dark" onClick={() => sendDashboard()}>Empezar fuerza de golpe</button>
        </div>
      </div>
    </div>
  );
}