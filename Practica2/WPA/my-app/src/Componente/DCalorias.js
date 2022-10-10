import { Chart, registerables } from 'chart.js';
import React, { useState, useEffect } from 'react';
import socket from "../Socket/Socket";
import { Line } from 'react-chartjs-2';
import { helpHttp } from "../Helper/helpHttp";

import { CategoryScale } from 'chart.js';

Chart.register(...registerables);

export default function GrafCalQuemadas() {


  //Variables
  const saved = localStorage.getItem("Usuario");
  const dataUsuario = JSON.parse(saved)

  const [lista, setLista] = useState([]);

 


  let urlRegister = "http://localhost:4001/calorias"
  //const navigate = useNavigate()
  let api = helpHttp();

  useEffect(() => {
    let list = []
    api.post(urlRegister, { body: dataUsuario }).then((response) => {
      if (!response.err) {
        console.log('response', response.data)
        for(let i = 0; i < response.data.length; i++) {
            let res = Math.round(0.049 * (response.data[i].peso/2.205) * 2.2 * (i / 60))
            list[i] = res
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
        label: 'Calorias quemadas (cal)',
        data: datapoints,
        borderColor: "rgba(52, 152, 219, 1)",
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
      <h4>Delta Calorias Quemadas</h4>
      <Line
        data={data}

        style={StyleGraf}
      />
    </div>
  );
}