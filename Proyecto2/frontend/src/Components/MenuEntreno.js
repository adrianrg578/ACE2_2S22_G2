import ProgressBar from 'react-bootstrap/ProgressBar';
import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import GaugeChart from "react-gauge-chart";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import socket from "../Socket/Socket";


//Componentes

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

    //Conexion
    /*useEffect(() => {
        socket.on("datos", (data, callback) => {
            console.log(data, "No se solo estoy probando FUERZA Y VELOCIDAD")
            setFuerza(data.fuerza);
            setVelocidad(data.velocidad);
            setRitmo(data.ritmo);
            setTiempo(data.tiempo);
            callback({
                IdUser: dataUsuario.IdUser
            });
        });

    }, [fuerza, velocidad, ritmo, tiempo]);*/
    return (
        <div >
            <Tabs
                defaultActiveKey="fuerza"
                id=""
                className="mb-3 border-light rounded d-flex justify-content-center align-items-center"
                justify
                style={estilo}>

                <Tab eventKey="fuerza" title="Fuerza">
                    <div className="container text-center" style={BoxStyle}>
                        
                    </div>
                </Tab>
                <Tab eventKey="velocidad" title="Velocidad">
                    <div>
                        
                    </div>
                </Tab>
                <Tab eventKey="ritmo" title="Ritmo">
                    <div className="container">
                        
                    </div>
                </Tab>
                <Tab eventKey="calorias" title="Calorias">
                    <div className="container">
                        
                    </div>
                </Tab>
                <Tab eventKey="peso" title="Peso">
                    <div className="container">
                        
                    </div>
                </Tab>
            </Tabs>
        </div>
    );
}