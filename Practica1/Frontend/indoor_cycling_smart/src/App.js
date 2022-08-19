import './App.css';
import React, {useState, useEffect} from "react";
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

import ChartStreaming from 'chartjs-plugin-streaming';


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);


ChartJS.register(ChartStreaming);

ChartJS.defaults.set('plugins.streaming', {
  duration: 5000
});


const ctx = document.getElementById('myChart');

/*const options = {
  responsive: true,
  plugins: {
    title:{
      display: true,
      text:'Grafica de prueba',
    }
  }
};*/


/*const [Adata, setData] = useState({
  datasets: [{
    data: [5,8,10,4,9], //resultado del sensor
  }],
  labels: [] //tiempo recurrido
})*/

const socket = io.connect("http://localhost:4001");
const axios = require("axios");

function solicitud(){
    var respuesta;
    axios.get('http://localhost:4001/retomar_datos',{
      params:{
        fecha: '18'
      }
    }).then(response=>{
      respuesta = response.data.indoor;
      console.log(respuesta);
    });
    
    return respuesta;
}


function App() {

 /* var myChartL = new ChartJS(ctx, {
    options: {
      plugins: {
        // Change options for ALL axes of THIS CHART
        streaming: {
          duration: 5000
        }
      },
      scales: {
        x: {
          type: 'realtime',
          // Change options only for THIS AXIS
          realtime: {
            duration: 5000
          }
        }
      }
    }
  });*/
  //pruebas de datos en tiempo real
  
    const [temperatura, setTemperatura] = useState("");
    const [distancia, setDistancia] = useState("");
    const [tiempo, setTiempo] = useState("");
    const [velocidad, setVelocidad] = useState("");
    const [bpm, setBpm]=useState("");
    //gancho que escucha los datos que envia el servidor
    const [datosgrafica, setDatosgrafica] = useState('');
    useEffect(()=>{
      socket.on('datos_arduino',(data)=>{
        setTemperatura(data.temperatura);
        setDistancia(data.distancia);
        setTiempo(data.tiempo);
        setVelocidad(data.velocidad);
        setBpm(data.BPM);

       /* myChartL.data.datasets[0].data.push({
          x: tiempo,
          y: distancia
        })
  
        myChartL.update('quiet');*/
      });
    }, [socket]);
    
    //configuraciones para las graficas.


    const [chartData, setChartData] = useState({
      datasets: [],
    })

    /*socket.on('datos_arduino',(data)=>{
      setTemperatura(data.temperatura);
      setDistancia(data.distancia);
      setTiempo(data.tiempo);
      setVelocidad(data.velocidad);
      setBpm(data.BPM);
    });*/

    /*const data = {
      datasets: [
        {
          label: "Dataset 1",
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
          lineTension: 0,
          borderDash: [8, 4],
          data: []
        }
      ]
    };

   // var tiemp;
    //var dist;

    /*socket.on('datos_arduino',(data)=>{
      tiemp = data.tiempo });

      socket.on('datos_arduino',(data)=>{
        dist = data.distancia })

    const options = {
      scales: {
        xAxes: [
          {
            type: "realtime",
            realtime: {
              onRefresh: function() {
                data.datasets[0].data.push({
                  x: distancia,
                  y: tiempo
                });
              },
              delay: 2000
            }
          }
        ]
      }
    };*/

    

   /* function onReceive(event) {
      myChart.data.datasets[0].data.push({
        x: tiempo,
        y: distancia
      })

      myChart.update('quiet');
    }*/

  return (
    <div className="App">
      <h1>Recibiendo de arduino....</h1>
      <div>
        <p>Temperatura: {}</p>
        <p>distancia: {distancia}</p>
        <p>tiempo: {tiempo}</p>
        <p>velocidad: {}</p>
        <p>BPM {}</p>
      </div>
      <div style={{width:700}}>
      </div>

     

      <div>
        <button onClick={solicitud} >
          Solicitar datos
        </button>
      </div>

    </div>
  );
}

export default App;
