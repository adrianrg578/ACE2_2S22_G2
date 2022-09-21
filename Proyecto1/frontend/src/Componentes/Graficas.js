import "bootstrap/dist/css/bootstrap.min.css"
import { Chart, Line } from 'react-chartjs-2';
import LineChart from './LineChart';
import socket from "../Socket/Socket";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const axios = require("axios")


//cuerpo

export default function Graficas(){

    const usuario = JSON.parse(localStorage.getItem('Usuario'))
    const [dataUsuario, setDataUsuario] = useState({
        IdUser: usuario.IdUser,
    });
    const [rdb_fueza, setRdb_fueza]=useState("");
    const [rdb_ritmo, setRdb_ritmo]=useState("");
    const [rdb_velocidad, setRdb_velocidad]=useState("");
    const [arreglolabels,setArreglolabels]=useState([]);
    const [graphdata, setGraphdata]=useState([]);


    const [areagrafica, setGrafica] = useState("");
    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
          },
          title: {
            display: true,
            text: 'Fuerza vs Tiempo',
          },
        },
      };

      const [userData, setUserData]=useState({
        labels: [],
        datasets:[{
          label: "Fuerza vs Tiempo",
          data : [],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
     });


    function solicitud(){        
            axios.post('http://localhost:5000/datos_fuerza',{
            textUsuario: dataUsuario.IdUser}).then(response=>{
               setRdb_fueza(response.data)
                console.log(rdb_fueza);
            })     
    };

    function llenarlabels(data,fecha){
        var tiempo = [];
        var fuerza = [];
        var fecha = fecha;
        for (var i=0 ;i < data.data.length; i++){

                tiempo[i] = i;
                fuerza[i] = data.data[i].fuerza;
                console.log(tiempo[i]+"    " +fuerza[i]);
            
        }
        setArreglolabels(tiempo);
        setGraphdata(fuerza);

    }

    function grafica1(){
        solicitud();
        llenarlabels(rdb_fueza,"9/20/2022");
        setUserData(prevState=>({labels: arreglolabels, datasets:[{label: 'Fuerza vs Tiempo', data: graphdata}]}));
        setGrafica((<div><Line options={options} data={userData}/></div>));
        console.log("he sido presionado");
    }


    //
    const BoxStyle = {
        height: '55vh'
      };
      const ButtonStyle = {
        "backgroundColor": "rgba(5,.5,0.5,.3)",
        "border": "none",
        "color": "white"
      };
    //

      return (  
        <div className="container text-white" style={BoxStyle}>
            <div className="row mb-5">
                <div className="col-sm-4 mx-auto">
                <button style={ButtonStyle} type="button" className="btn outline-dark" onClick={grafica1}>Delta Fuerza</button>
                <p></p>
                {areagrafica}
                </div>
            </div>
        
        </div>
    );  

}
