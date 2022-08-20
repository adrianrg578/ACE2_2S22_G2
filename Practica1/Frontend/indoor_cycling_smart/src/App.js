import './App.css';
import React, {useState, useEffect, useReducer, useSyncExternalStore} from "react";
import io from 'socket.io-client';
import { Chart, Line } from 'react-chartjs-2';
import LineChart from './graficas/LineChart';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const socket = io.connect("http://localhost:4001");
const axios = require("axios");

function App() {

  //pruebas de datos en tiempo real
    const [peso, setPeso]=useState("");
    const [temperatura, setTemperatura] = useState("");
    const [distancia, setDistancia] = useState("");
    const [tiempo, setTiempo] = useState("");
    const [velocidad, setVelocidad] = useState("");
    const [bpm, setBpm]=useState("");
    const [arreglolabels,setArreglolabels]=useState([]);
    const [graphdata, setGraphdata]=useState([]);
    const [graphdata_2, setGraphdata_2] = useState([]);
    const [respuesta_db, setRespuesta_db] = useState('');
    const [dia, setDia] = useState('19');

    function solicitud(dato_dia){
      React.useEffect(()=>{
        axios.get('http://localhost:4001/retomar_datos',{
        params:{
          fecha: dato_dia
        }
      }).then(response=>{
        setRespuesta_db(response.data);
        console.log(respuesta_db);
        //console.log(contesta);
      });
      console.log(dato_dia)
      },[])
    }

    const [areagrafica, setGrafica] = useState("");
    
    function llenarlabels(data){
      var aux = [];
      var aux2 = [];
      var aux3 = [];
      console.log(data.indoor.registros.length)
      for(var i=0;i<data.indoor.registros.length;i++){
        aux[i] = data.indoor.registros[i].tiempo;
        aux2[i] = data.indoor.registros[i].distancia;
        aux3[i] = 0.049*(peso*2.2)*(data.indoor.registros[i].tiempo);
      }      
      setArreglolabels(aux);
      setGraphdata(aux2);
      setGraphdata_2(aux3);

      //console.log(userData);
    }

    //gancho que escucha los datos que envia el servidor
    /*const [datosgrafica, setDatosgrafica] = useState('');
    useEffect(()=>{
      socket.on('datos_arduino',(data)=>{
        setTemperatura(data.temperatura);
        setDistancia(data.distancia);
        setTiempo(data.tiempo);
        setVelocidad(data.velocidad);
        setBpm(data.BPM);
      });
    }, [socket]);*/
    
    //configuraciones para las graficas.

    /*socket.on('datos_arduino',(data)=>{
      setTemperatura(data.temperatura);
      setDistancia(data.distancia);
      setTiempo(data.tiempo);
      setVelocidad(data.velocidad);
      setBpm(data.BPM);
    });*/

    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom',
        },
        title: {
          display: true,
          text: 'Distancia vs Tiempo',
        },
      },
    };

   const [userData, setUserData]=useState({
      labels: [],
      datasets:[{
        label: "Distancia vs Tiempo",
        data : [],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }]
   });

   function funcion1(){
    llenarlabels(respuesta_db);
    setUserData(prevState=>({labels: arreglolabels, datasets:[{label: 'Distancia vs Tiempo', data: graphdata}]}));
    //const dataG = { labels: arreglolabels, datasets:[{label:'Distancia vs Tiempo', data: graphdata}]};
    setGrafica((<div><Line options={options} data={userData}/></div>));
    //console.log(dataG);
   }

   function funcion2(){
    llenarlabels(respuesta_db);
    setUserData(prevState=>({labels: arreglolabels, datasets:[{label: 'Calorias vs Tiempo', data: graphdata_2}]}));
    //const dataG = { labels: arreglolabels, datasets:[{label:'Distancia vs Tiempo', data: graphdata}]};
    setGrafica((<div><Line options={options} data={userData}/></div>));
    //console.log(dataG);
   }


const enviar_peso =()=>{
    socket.emit('envio_peso',peso);
};



  return (
    <div className="App">
      <div style={{width:700}}>
      </div>
     <div>
      <h2>Bienvenido/a a Indoor Cycling Smart</h2>
      <div>
        <label>
        Ingrese su nombre:
        <input type="text" name = "name" placeholder='nombre'></input>
      </label>
      <p></p>
      </div>
      <div>
      <label>
        Ingrese su peso aproximado:
        </label>
        <input 
        type="text" 
        name = "peso" 
        placeholder='peso' 
        onChange={(event)=>{setPeso(event.target.value);}}></input>

        <button onClick={enviar_peso}>Enviar peso</button>

      </div>
      <p></p>
      <div>
        <label>
          Seleccione el dia a consultar:
        </label>
        <select 
        name="dias" 
        id="dias"
        onChange ={(event)=>{setDia(event.target.value);}}>
          <option value='17'>17</option>
          <option value='18'>18</option>
          <option value='19'>19</option>
        </select>
      </div>
     </div>
      <p></p>

      <div>
        <button onClick={solicitud(dia)} >
          Empezar
        </button>
      </div>
      <div>
        <p></p>
        <button onClick={funcion1}>
          Experimento #1  Distancia Recorrida vs tiempo
        </button>
          {areagrafica}
      </div>

      <div>
        <p></p>
        <button onClick={funcion2}>
          Experimento #2  Calorias vs tiempo
        </button>
      </div>
      
    </div>
  );
}

export default App;
