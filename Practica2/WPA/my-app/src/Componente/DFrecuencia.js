import { Chart, registerables } from 'chart.js';
import React, { useState, useEffect } from 'react';
import socket from "../Socket/Socket";
import { Line } from 'react-chartjs-2';
import { helpHttp } from "../Helper/helpHttp";

import { CategoryScale } from 'chart.js';

Chart.register(...registerables);

export default function GrafFrecCard(props) {


  //Variables
  const saved = localStorage.getItem("Usuario");
  const dataUsuario = JSON.parse(saved)

  const [lista, setLista] = useState([]);

  let urlRegister = "http://localhost:4001/frecuencia"
  let api = helpHttp();

  useEffect(() => {
    let list = []

    let usuario = {
      Username: dataUsuario.Username,
      FechaInicio: props.fechainicio,
      FechaFin: props.fechafin
    }

    api.post(urlRegister, { body: dataUsuario }).then((response) => {
      if (!response.err) {
        for(let i = 0; i < response.data.length; i++) {
          list[i] = response.data[i].bpm
        }
      } else {
        console.log("ERROR")
      }
    })
    setLista(list)
  }, []);

  
  const datapoints = lista;

  const DATA_COUNT = datapoints.length;

  const labels = [];

  for (let i = 0; i < DATA_COUNT; ++i) {
    labels.push(i.toString());
  }

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Frecuencia (BPM)',
        data: datapoints,
        borderColor: "rgba(231, 76, 60, 1)",
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
      <h4>Delta Frecuencia Cardiaca</h4>
      <Line
        data={data}

        style={StyleGraf}
      />
    </div>
  );
}