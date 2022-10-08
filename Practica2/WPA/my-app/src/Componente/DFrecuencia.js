import { Chart, registerables } from 'chart.js';
import React, { useState, useEffect } from 'react';
import socket from "../Socket/Socket";
import { Line } from 'react-chartjs-2';

import {CategoryScale} from 'chart.js'; 

Chart.register(...registerables);

export default function GrafFrecCard() {
      const DATA_COUNT = 12;
      //const DATA_COUNT = props.number;
      const labels = [];

      for (let i = 0; i < DATA_COUNT; ++i) {
        labels.push(i.toString());
      }

      const datapoints = [0, 20, 20, 60, 60, 120, 80, 180, 120, 125, 105, 110, 170];

      const data = {
        labels: labels,
        datasets: [
          {
            label: 'Cubic interpolation (monotone)',
            data: datapoints,
            borderColor: "rgba(231, 76, 60,1)",
            fill: false,
            tension: 0.4
          }, {
            label: 'Cubic interpolation',
            data: datapoints,
            borderColor: "rgba(52, 152, 219 ,1)",
            fill: false,
            tension: 0.4
          }, {
            label: 'Linear interpolation (default)',
            data: datapoints,
            borderColor: "rgba(46, 204, 113, 1)",
            fill: false
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