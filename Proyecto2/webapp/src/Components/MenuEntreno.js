import ProgressBar from 'react-bootstrap/ProgressBar';
import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import GaugeChart from "react-gauge-chart";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import socket from "../Socket/Socket";

//components
import Entreno from './Entreno';
import Reporte from "./Reporte";



export default function MenuEntreno() {
    //Variables
    const saved = localStorage.getItem("Usuario");
    const dataUsuario = JSON.parse(saved)

    //Hooks
    const [velocidad, setVelocidad] = useState("");
    const [fuerza, setFuerza] = useState("");
    const [frecuencia, setFrecuencia] = useState({
        frecuencia: 0
    });
    const [ritmo, setRitmo] = useState("");
    const [tiempo, setTiempo] = useState("");

    //Estilos
    const InputStyle = {
        "backgroundColor": "rgba(5,.5,0.5,.3)",
        "border": "none",
        "color": "white"
    };

    const BoxStyle2 = {
        background: "rgba(5,.5,0.5,.3)"
    };
    const BoxStyle = {
        height: '55vh'
    };

    const estilo = {
        "border": "none",
        "color": "white"
    };

    const FontStyle = {
        "fontSize": "13vh",
        "backgroundColor": "rgba(5,.5,0.5,.3)"
    };

    const ButtonStyle = {
        "backgroundColor": "rgba(5,.5,0.5,.3)",
        "border": "none",
        "color": "white"
    };

    const sendDashboard = async () => {
        console.log("HOLA SOY FUERZA")
    }

    //Funciones
    const handleInputChange = (e) => {
        setFrecuencia({
            ...frecuencia,
            [e.target.name]: e.target.value
        })
    };

    const StyleCard2 = {
        "backgroundColor": "rgba(5,.5,0.5,.3)",
        "border": "rgba(0, 0, 0, 0.5)",
        "width": "18rem",
        "textAlign": "left",
        "marginBottom": "10px"
    };

    const StyleCard3 = {
        "backgroundColor": "rgba(5,.5,0.5,.3)",
        "border": "rgba(0, 0, 0, 0.5)",
        "textAlign": "left",
        "marginBottom": "10px"
    };

    return (
        <div >
            <h2 className="text-white">{dataUsuario.Nombre}</h2>
            <Tabs
                defaultActiveKey="entreno"
                id=""
                className="mb-3 border-light rounded d-flex justify-content-center align-items-center"
                justify
                style={estilo}>

                <Tab eventKey="entreno" title="Entreno">
                    <Entreno/>
                </Tab>
                <Tab eventKey="reporte" title="Reporte">
                    <Reporte/>
                </Tab>
            </Tabs>
        </div>
    );
}