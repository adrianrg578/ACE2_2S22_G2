import ProgressBar from 'react-bootstrap/ProgressBar';
import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import GaugeChart from "react-gauge-chart";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import socket from "../Socket/Socket";


//Componentes
import Velocidad from "./Velocidad";
import Fuerza from "./Fuerza";
import Ritmo from "./Ritmo";
import InfoUsuario from "./InfoUsuario";
import Graficas from "./Graficas";

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
    useEffect(() => {
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

    }, [fuerza, velocidad, ritmo, tiempo]);
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
                        <div className="row mb-5">
                            <div className="col-sm-7 mx-auto">
                                <p className="text-center rounded text-white fst-italic fw-bold" style={FontStyle}>{fuerza} kg</p>
                            </div>
                        </div>
                        <div className="row mb-5">
                            <div className="col-sm-10 mx-auto">
                                <ProgressBar variant="info" animated now={fuerza} />
                            </div>
                        </div>
                        <div className="row mb-5">
                            <div className="col-sm-10 mx-auto">
                                <button style={ButtonStyle} type="button" className="btn outline-dark" onClick={() => sendDashboard()}>Empezar fuerza de golpe</button>
                            </div>
                        </div>
                    </div>
                </Tab>
                <Tab eventKey="velocidad" title="Velocidad">
                    <div>
                        <div className="container text-center" style={BoxStyle}>
                            <div className="row mb-5">
                                <div className="col-sm-9 mx-auto">
                                    <p className="text-center rounded text-white fst-italic fw-bold" style={FontStyle}>{velocidad} hit/min</p>
                                </div>
                            </div>
                            <div className="row mb-5">
                                <div className="col-sm-10 mx-auto">
                                    <ProgressBar variant="info" animated now={velocidad} />
                                </div>
                            </div>
                            <div className="row mb-5">
                                <div className="col-sm-10 mx-auto">
                                    <button style={ButtonStyle} type="button" className="btn outline-dark" onClick={() => sendDashboard()}>Empezar velocidad de golpe</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Tab>
                <Tab eventKey="ritmo" title="Ritmo">
                    <div className="container">
                        <div className="row d-flex rounded justify-content-center align-items-center" >
                            <div className="col-6 rounded  d-flex justify-content-center align-items-center" >
                                <div className="container">
                                    <form className="container-flex">

                                        <div className="mb-3 row" >
                                            <div className="col-10 mx-auto">
                                                <input
                                                    style={InputStyle}
                                                    className="form-control"
                                                    placeholder="Frecuencia 0.5 a 1.5 seg"
                                                    name="frecuencia"
                                                    onChange={handleInputChange} />
                                            </div>
                                            <div className="col-sm-2 mx-auto">
                                                <button style={InputStyle} onClick={() => sendDashboard()} type="button" class="btn outline-dark">Empezar Ritmo</button>
                                            </div>
                                        </div>

                                        <div className="mb-5 row rounded" style={BoxStyle2}>
                                            <div className="col-sm-15 mx-auto">
                                                <GaugeChart
                                                    percent={((tiempo * 100 / (frecuencia.frecuencia * 5)) / 100)}
                                                    nrOfLevels={3}
                                                    colors={["#566573", "#2C3E50", "#566573"]}
                                                />
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </Tab>
                <Tab eventKey="infou" title="Perfil">
                    <InfoUsuario />
                </Tab>
                <Tab eventKey="historia" title="Historial">
                    <Graficas />
                </Tab>
            </Tabs>
        </div>
    );
}

