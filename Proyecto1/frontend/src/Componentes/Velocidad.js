import ProgressBar from 'react-bootstrap/ProgressBar';
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from 'react';
import socket from "../Socket/Socket";

//Componentes

export default function Velocidad() {
  //Var

  //Hooks
  const [velocidad, setVelocidad] = useState("");

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
    alert("HOLA SOY Velocidad")
  }

  //Conexion
  useEffect(() => {
    socket.on("velocidad", (Velocidad) => {
      console.log(velocidad, "No se solo estoy probando VELOCIDAD")
      setVelocidad(Velocidad);
    });

  }, [velocidad]);

  return (
    <div>
      <div className="container text-center" style={BoxStyle}>
        <div className="row mb-5">
          <div className="col-sm-9 mx-auto">
            <p className="text-center rounded text-white fst-italic fw-bold" style={FontStyle}>{velocidad} hit/min</p>
          </div>
        </div>
        <div className="row mb-5">
          <div className="col-sm-10 mx-auto">
            <ProgressBar variant="info" animated now={velocidad} />
          </div>
        </div>
        <div className="row mb-5">
          <div className="col-sm-10 mx-auto">
            <button style={ButtonStyle} type="button" className="btn outline-dark" onClick={() => sendDashboard()}>Empezar velocidad de golpe</button>
          </div>
        </div>
      </div>
    </div>
  );
}
