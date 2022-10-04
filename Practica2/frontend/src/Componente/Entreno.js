import ProgressBar from 'react-bootstrap/ProgressBar';
import React, {useState, useEffect} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Card from 'react-bootstrap/Card';
import socket from "../Socket/Socket";


//Componentes

export default function Entreno() {
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
          <button style={ButtonStyle} type="button" className="btn outline-dark" onClick={() => sendDashboard()}>Empezar entreno</button>
        </div>
      </div>
      <Card border="primary" style={{ width: '18rem' }}>
        <Card.Header>Header</Card.Header>
        <Card.Body>
          <Card.Title>Primary Card Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}