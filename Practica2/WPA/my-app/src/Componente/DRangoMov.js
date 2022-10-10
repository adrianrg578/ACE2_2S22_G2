import { Chart, registerables } from 'chart.js';
import React, { useState, useEffect } from 'react';
import socket from "../Socket/Socket";
import { Line } from 'react-chartjs-2';
import { helpHttp } from "../Helper/helpHttp";

import { CategoryScale } from 'chart.js';

Chart.register(...registerables);

export default function GrafRangoMov() {


  //Variables
  const saved = localStorage.getItem("Usuario");
  const dataUsuario = JSON.parse(saved)

  const [lista, setLista] = useState([]);

 


  let urlRegister = "http://localhost:4001/rango"
  //const navigate = useNavigate()
  let api = helpHttp();

  useEffect(() => {
    let list = []
    api.post(urlRegister, { body: dataUsuario }).then((response) => {
      if (!response.err) {
        //console.log('response', response.data)
        for(let i = 0; i < response.data.length; i++) {
          list[i] = response.data[i].distancia
        }
      } else {
        console.log("ERROR")
      }
    })
    //console.log('list', list)
    setLista(list)
  }, []);

  
  const datapoints = lista;

  //console.log('lista', lista)

  const DATA_COUNT = datapoints.length;
  //const DATA_COUNT = props.number;
  const labels = [];

  for (let i = 0; i < DATA_COUNT; ++i) {
    labels.push(i.toString());
  }

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Rango de Movimiento (mts)',
        data: datapoints,
        borderColor: "rgba(46, 204, 113, 1)",
        fill: false,
        tension: 0.4
      }
    ]
  };



  const StyleGraf = {
    'height': '100px',
    'width': '100px',
    'background': "white"
  };

  return (
    <div >
      <h4>Delta Rango de Movimiento</h4>
      <Line
        data={data}

        style={StyleGraf}
      />
    </div>
  );
}