import "bootstrap/dist/css/bootstrap.min.css";
import React, {useState} from 'react';
import socket from "../Socket/Socket";
import { Field } from "formik"
import FechaP from "./FechaP";

//Componentes

export default function InfoUsuario() {


    //Hooks
    //const [edad, setEdad] = useState('');
    //const [peso, setPeso] = useState('');
    //const [genero, setGenero] = useState('');
    //const [estatura, setEstatura] = useState('');

    const usuario = JSON.parse(localStorage.getItem('Usuario'))

    
  
    //Estilos
    const BoxStyle = {
      height: '55vh'
    };
  
    const FontStyle = {
      "fontSize": "15vh",
      "backgroundColor": "rgba(5,.5,0.5,.3)"
    };
  
    const ButtonStyle = {
      "backgroundColor": "rgba(5,.5,0.5,.3)",
      "border": "none",
      "color": "white"
    };
  
    //Conexion
   // socket.on("fuerza", (arg) => {
    //  setFuerza(...fuerza, arg); // world
    //});
  
    const sendDashboard = async () => {
      console.log("HOLA SOY UN USUARIO")
    }
  
    return (
      <div className="container text-white" style={BoxStyle}>
        <div className="row mb-5">
          <div className="col-sm-4 mx-auto">
            <dl class="dl-horizontal">
                <dt>Edad:</dt><dd>{usuario.Edad}</dd>
                <dt>Peso: </dt><dd>{usuario.Peso} lb</dd>
                <dt>Genero: </dt><dd>{usuario.Genero} </dd>
                <dt>Estatura: </dt><dd>{usuario.Estatura} m</dd>
            </dl>            
          </div>
        </div>
        <div>
       
        </div>
        <FechaP />
      </div>
    );
  }