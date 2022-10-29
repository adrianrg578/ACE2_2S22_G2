import { Chart, registerables } from 'chart.js';
import React, { useState, useEffect } from 'react';
import socket from "../Socket/Socket";
import { Line } from 'react-chartjs-2';
import { helpHttp } from "../Helper/helpHttp";
import { CategoryScale } from 'chart.js';

Chart.register(...registerables);



export function GrafFuerza() {

    const StyleGraf = {
        'height': '100px',
        'width': '100px',
        'background': "white",
        'boxShadow': "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        'borderRadius': '5px'
    };

    const datapoints = [10, 5, 9, 4, 5];
    const DATA_COUNT = datapoints.length;
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
                tension: 0.0, // 0.4
                //stepped: true,
            }
        ]
    };

    const config = {
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: false
            }
        }
    };


    return (
        <div>
            <h1 style={{ "color": "white" }}>Delta Fuerza</h1>
            <Line
                data={data}
                style={StyleGraf}
                options={config}
            />
        </div>
    )
}

export function GrafCaloria() {

    const StyleGraf = {
        'height': '100px',
        'width': '100px',
        'background': "white",
        'boxShadow': "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        'borderRadius': '5px'
    };

    const datapoints = [10, 5, 9, 4, 5];
    const DATA_COUNT = datapoints.length;
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
                borderColor: "rgba(231, 76, 60, 1)",
                fill: false,
                tension: 0.0, // 0.4
                //stepped: true,
            }
        ]
    };

    const config = {
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: false
            }
        }
    };

    return (
        <div>
            <h1 style={{ "color": "white" }}>Delta Calorias</h1>
            <Line
                data={data}
                style={StyleGraf}
                options={config}
            />
        </div>
    )
}

export function GrafRitmo() {

    const StyleGraf = {
        'height': '100px',
        'width': '100px',
        'background': "white",
        'boxShadow': "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        'borderRadius': '5px'
    };

    const datapoints = [10, 5, 9, 4, 5];
    const DATA_COUNT = datapoints.length;
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
                borderColor: "rgba(46, 204, 113, 1)",
                fill: false,
                tension: 0.0, // 0.4
                //stepped: true,
            }
        ]
    };

    const config = {
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: false
            }
        }
    };

    return (
        <div>
            <h1 style={{ "color": "white" }}>% Tiempo Zona de Ritmo</h1>
            <Line
                data={data}
                style={StyleGraf}
                options={config}
            />
        </div>
    )
}