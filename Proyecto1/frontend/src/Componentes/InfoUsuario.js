import "bootstrap/dist/css/bootstrap.min.css";
import React, {useState} from 'react';
import DatePicker from "react-datepicker"
import moment from 'moment';
import socket from "../Socket/Socket";
import "react-datepicker/dist/react-datepicker.css";
const axios = require("axios")

//Componentes

export default function InfoUsuario() {

    const usuario = JSON.parse(localStorage.getItem('Usuario'))

    //Hooks
    //const [edad, setEdad] = useState('');
    //const [peso, setPeso] = useState('');
    //const [genero, setGenero] = useState('');
    //const [estatura, setEstatura] = useState('');
    const [datos_ritmo, setDatosRitmo] = useState("");
    const [datos_fuerza, setDatosFuerza] = useState("");
    const [datos_velocidad, setDatosVelocidad] = useState("");
    const [dataUsuario, setDataUsuario] = useState({
        textUsuario: usuario.IdUser,
    });

    

    const [fechaInicio, setFechaInicio] = useState(null);
    const [fechaFinal, setFechaFinal] = useState(null);
    const[totalEntrenamientos, setTotalEntrenamientos] = useState(null);
    const[eFuerza, setEFuerza] = useState(null);
    const[eRitmo, setERitmo] = useState(null);
    const[eVelocidad, setEVelocidad] = useState(null);

    const handleFechaInicio = (date) => {
        setFechaInicio(date);
        setFechaFinal(null);
      };
    
      const handleFechaFinal = (date) => {
        setFechaFinal(date);
        //llenarDatos();
        

      };

    
  
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

    const filtrarFechas = async () => {
        axios.post('http://localhost:5000/datos_ritmo', {textUsuario: dataUsuario.textUsuario}).then(response=>{
            setDatosRitmo(response.data);
            console.log(datos_ritmo);
        })

        axios.post('http://localhost:5000/datos_fuerza', {textUsuario: dataUsuario.textUsuario}).then(response=>{
            setDatosFuerza(response.data);
            console.log(datos_fuerza);
        })

        axios.post('http://localhost:5000/datos_velocidad', {textUsuario: dataUsuario.textUsuario}).then(response=>{
            setDatosVelocidad(response.data);
            console.log(datos_velocidad);
        })

        let entrenos_ritmo = 0;
        let entrenos_fuerza = 0;
        let entrenos_velocidad = 0;
        let fecha_aux = fechaInicio;

        console.log(datos_ritmo.data.length)


        for(var i = 0; i < datos_ritmo.data.length; i++)
        {
            if(datos_ritmo.data[i].fecha == fecha_aux)
            {
                entrenos_ritmo = entrenos_ritmo + 1;
                fecha_aux++;
                console.log(fecha_aux)
                console.log(entrenos_ritmo)
            }
        }

        fecha_aux = fechaInicio

        for(var i = 0; i < datos_fuerza.data.length; i++)
        {
            if(datos_fuerza.data[i].fecha >= fechaInicio && datos_fuerza.data[i].fecha <= fechaFinal && datos_fuerza.data[i].fecha === fecha_aux)
            {
                entrenos_fuerza++;
                fecha_aux++;
            }
        }

        fecha_aux = fechaInicio

        for(var i = 0; i < datos_velocidad.data.length; i++)
        {
            if(datos_velocidad.data[i].fecha >= fechaInicio && datos_velocidad.data[i].fecha <= fechaFinal && datos_velocidad.data[i].fecha === fecha_aux)
            {
                entrenos_velocidad++;
                fecha_aux++;
            }
        }
        setEFuerza(entrenos_fuerza);
        setEVelocidad(entrenos_velocidad);
        setERitmo(entrenos_ritmo);


        let entrenos = entrenos_fuerza + entrenos_ritmo + entrenos_velocidad;

        setTotalEntrenamientos(entrenos)
    }

    function llenarDatos() {
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
        <div className="input-container">
        <div>
          <label>Fecha Inicio</label>
          <DatePicker
            selected={fechaInicio}
            onChange={handleFechaInicio}
          />
        </div>
        <div>
          <label>Fecha Final</label>
          <DatePicker
            selected={fechaFinal}
            minDate={fechaInicio}
            onChange={handleFechaFinal}
          />
        </div>
        <div>
        <button style={ButtonStyle} type="button" className="btn outline-dark" onClick={() => filtrarFechas()}>Filtrar</button>
        </div>
      </div>
      {fechaInicio && fechaFinal && (
        <div className="summary">
          <dl class="dl-horizontal">
                <dt>Fuerza:</dt><dd>{eFuerza}</dd>
                <dt>Velocidad: </dt><dd>{eVelocidad}</dd>
                <dt>Ritmo: </dt><dd>{eRitmo} </dd>
                <dt>Total entrenamientos: </dt><dd>{totalEntrenamientos} </dd>
            </dl>
        </div>
      )}
    </div>
    );
  }