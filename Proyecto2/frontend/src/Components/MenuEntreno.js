import ProgressBar from 'react-bootstrap/ProgressBar';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Button from 'react-bootstrap/Button';
import GaugeChart from "react-gauge-chart";
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import socket from "../Socket/Socket";


//Componentes

export default function MenuEntreno() {
    //Variables
    const saved = localStorage.getItem("Usuario");
    const dataUsuario = JSON.parse(saved)

    //Hooks
    const [frecuencia, setFrecuencia] = useState({ frecuencia: 0 });
    const [velocidad, setVelocidad] = useState(0);

    const [calorias, setCalorias] = useState(0);
    const [fuerza, setFuerza] = useState(0);
    const [tiempo, setTiempo] = useState(0);
    const [fecha, setFecha] = useState(0);
    const [ritmo, setRitmo] = useState(0);
    const [time, setTime] = useState(0);
    const [peso, setPeso] = useState(0);

    //Estilos
    const InputStyle = {
        backgroundColor: "rgba(5,.5,0.5,.3)",
        border: "none",
        color: "white"
    };

    const BoxStyle2 = {
        background: "rgba(5,.5,0.5,.3)"
    };
    const BoxStyle = {
        height: '55vh'
    };

    const estilo = {
        border: "none",
        color: "white"
    };

    const FontStyle = {
        fontSize: "13vh",
        backgroundColor: "rgba(5,.5,0.5,.3)"
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
                        <div className="row mb-5">
                            <div className="col-sm-7 mx-auto">
                                <h3 className="text-center text-white rounded" style={BoxStyle2}>
                                    Fecha y Hora: {fecha} Tiempo Total: {time} min
                                </h3>
                            </div>
                        </div>
                        <div className="row mb-5">
                            <div className="col-sm-7 mx-auto">
                                <p className="text-center rounded text-white fst-italic fw-bold" style={FontStyle}>{fuerza} kg</p>
                            </div>
                        </div>
                        <div className="row mb-5">
                            <div className="col-sm-10 mx-auto">
                                <ProgressBar variant="success" animated now={fuerza} />
                            </div>
                        </div>
                        <div className="col-3 mx-auto">
                            <ButtonGroup className="d-flex justify-content-center align-items-center" aria-label="Basic example">
                                <Button className="btn outline-dark" style={InputStyle} /*onClick={() => sendDashboard()}*/>Iniciar</Button>
                                <Button className="btn outline-dark" style={InputStyle} /*onClick={() => sendRegistro()}*/>Finalizar</Button>
                            </ButtonGroup>
                        </div>
                    </div>
                </Tab>
                <Tab eventKey="velocidad" title="Velocidad">
                    <div className="container text-center" style={BoxStyle}>
                        <div className="row mb-5">
                            <div className="col-sm-7 mx-auto">
                                <h3 className="text-center text-white rounded" style={BoxStyle2}>
                                    Fecha y Hora: {fecha} Tiempo Total: {time} min
                                </h3>
                            </div>
                        </div>
                        <div className="row mb-5">
                            <div className="col-sm-7 mx-auto">
                                <p className="text-center rounded text-white fst-italic fw-bold" style={FontStyle}>{fuerza} hit/min</p>
                            </div>
                        </div>
                        <div className="row mb-5">
                            <div className="col-sm-10 mx-auto">
                                <ProgressBar variant="success" animated now={fuerza} />
                            </div>
                        </div>
                        <div className="col-3 mx-auto">
                            <ButtonGroup className="d-flex justify-content-center align-items-center" aria-label="Basic example">
                                <Button className="btn outline-dark" style={InputStyle} /*onClick={() => sendDashboard()}*/>Iniciar</Button>
                                <Button className="btn outline-dark" style={InputStyle} /*onClick={() => sendRegistro()}*/>Finalizar</Button>
                            </ButtonGroup>
                        </div>
                    </div>
                </Tab>
                <Tab eventKey="ritmo" title="Ritmo">
                    <div className="row d-flex rounded justify-content-center align-items-center" >
                        <div className="row mb-2">
                            <div className="col-sm-7 mx-auto">
                                <h3 className="text-center text-white rounded" style={BoxStyle2}>
                                    Fecha y Hora: {fecha} Tiempo Total: {time} min
                                </h3>
                            </div>
                        </div>
                        <div className="row mb-4" >
                            <div className="col-5 mx-auto">
                                <form className="container-flex">
                                    <input
                                        style={InputStyle}
                                        className="form-control"
                                        placeholder="Frecuencia 0.5 a 1.5 seg"
                                        name="frecuencia"
                                        onChange={handleInputChange} />
                                </form>
                            </div>
                        </div>
                        <div className="row mb-4 rounded " >
                            <div className="col-6 mx-auto">
                                <GaugeChart
                                    style={BoxStyle2}
                                    className = "rounded"
                                    percent={((tiempo * 100 / (frecuencia.frecuencia * 5)) / 100)}
                                    nrOfLevels={3}
                                    colors={["#566573", "#2C3E50", "#566573"]}
                                />
                            </div>
                        </div>
                        <div className="row mb-4" >
                            <div className="col-3 mx-auto">
                                <ButtonGroup className="d-flex justify-content-center align-items-center" aria-label="Basic example">
                                    <Button className="btn outline-dark" style={InputStyle} /*onClick={() => sendDashboard()}*/>Iniciar</Button>
                                    <Button className="btn outline-dark" style={InputStyle} /*onClick={() => sendRegistro()}*/>Finalizar</Button>
                                </ButtonGroup>
                            </div>
                        </div>
                    </div>
                </Tab>
                <Tab eventKey="calorias" title="Calorias">
                    <div className="container text-center" style={BoxStyle}>
                        <div className="row mb-5">
                            <div className="col-sm-7 mx-auto">
                                <h3 className="text-center text-white rounded" style={BoxStyle2}>
                                    Fecha y Hora: {fecha} Tiempo Total: {time} min
                                </h3>
                            </div>
                        </div>
                        <div className="row mb-5">
                            <div className="col-sm-7 mx-auto">
                                <p className="text-center rounded text-white fst-italic fw-bold" style={FontStyle}>{fuerza} cal</p>
                            </div>
                        </div>
                        <div className="row mb-5">
                            <div className="col-sm-10 mx-auto">
                                <ProgressBar variant="success" animated now={fuerza} />
                            </div>
                        </div>
                        <div className="col-3 mx-auto">
                            <ButtonGroup className="d-flex justify-content-center align-items-center" aria-label="Basic example">
                                <Button className="btn outline-dark" style={InputStyle} /*onClick={() => sendDashboard()}*/>Iniciar</Button>
                                <Button className="btn outline-dark" style={InputStyle} /*onClick={() => sendRegistro()}*/>Finalizar</Button>
                            </ButtonGroup>
                        </div>
                    </div>
                </Tab>
                <Tab eventKey="peso" title="Peso">
                    <div className="container text-center" style={BoxStyle}>
                        <div className="row mb-5">
                            <div className="col-sm-7 mx-auto">
                                <h3 className="text-center text-white rounded" style={BoxStyle2}>
                                    Fecha y Hora: {fecha} Tiempo Total: {time} min
                                </h3>
                            </div>
                        </div>
                        <div className="row mb-5">
                            <div className="col-sm-7 mx-auto">
                                <p className="text-center rounded text-white fst-italic fw-bold" style={FontStyle}>{fuerza} kg</p>
                            </div>
                        </div>
                        <div className="row mb-5">
                            <div className="col-sm-10 mx-auto">
                                <ProgressBar variant="success" animated now={fuerza} />
                            </div>
                        </div>
                        <div className="col-3 mx-auto">
                            <ButtonGroup className="d-flex justify-content-center align-items-center" aria-label="Basic example">
                                <Button className="btn outline-dark" style={InputStyle} /*onClick={() => sendDashboard()}*/>Iniciar</Button>
                                <Button className="btn outline-dark" style={InputStyle} /*onClick={() => sendRegistro()}*/>Finalizar</Button>
                            </ButtonGroup>
                        </div>
                    </div>
                </Tab>
            </Tabs>
        </div>
    );
}