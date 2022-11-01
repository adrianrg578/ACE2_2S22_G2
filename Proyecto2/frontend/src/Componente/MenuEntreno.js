import ProgressBar from 'react-bootstrap/ProgressBar';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { helpHttp } from "../Helper/helpHttp";
import Button from 'react-bootstrap/Button';
import GaugeChart from "react-gauge-chart";
import Tabs from 'react-bootstrap/Tabs';
import socket from "../Socket/Socket";
import Tab from 'react-bootstrap/Tab';

export default function MenuEntreno() {
    //Rutas
    let urlState = "http://localhost:4001/start"

    //Variables
    const saved = localStorage.getItem("Usuario");
    const dataUsuario = JSON.parse(saved)
    let api = helpHttp();

    //Hooks
    const [frecuencia, setFrecuencia] = useState({ frecuencia: 0 });
    const [velocidad, setVelocidad] = useState("");
    const [calorias, setCalorias] = useState("");
    const [fuerza, setFuerza] = useState("");
    const [tiempo, setTiempo] = useState("");
    const [fecha, setFecha] = useState("");
    const [ritmo, setRitmo] = useState("");
    const [time, setTime] = useState("");
    const [peso, setPeso] = useState("");

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

    //Funciones
    const handleInputChange = (e) => {
        setFrecuencia({
            ...frecuencia,
            [e.target.name]: e.target.value
        })
    };

    const sendStart = async () => {
        api.post(urlState, { body: { state: 1 } }).then((response) => {
            if (!response.err) {
                console.log("Inicio del entreno")
            } else {
                console.log("ERROR")
            }
        })

        let datos = {
            IdUsuario: dataUsuario.IdUsuario,
        }
        socket.emit('dato', datos);
        console.log("Enviado: "+datos.IdUsuario)
        console.log("local storage: "+dataUsuario.IdUsuario)
    }

    const sendEnd = async () => {
        setTime(time)
        api.post(urlState, { body: { state: 0 } }).then((response) => {
            if (!response.err) {
                console.log("Finalizo del entreno")

            } else {
                console.log("ERROR")
            }
        })
    }

    //Conexion
    useEffect(() => {
        socket.on("datos", (data, callback) => {
            setFuerza(data.FuerzaImpulso);
            setPeso(data.peso_arduino);
            setFecha(data.fecha);
            setTime(data.tiempo);
            
            callback({
                IdUser: ""
            });
        });

    }, [fuerza, peso, time, fecha]);

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
                                <Button className="btn outline-dark" style={InputStyle} onClick={() => sendStart()}>Iniciar</Button>
                                <Button className="btn outline-dark" style={InputStyle} onClick={() => sendEnd()}>Finalizar</Button>
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
                                <p className="text-center rounded text-white fst-italic fw-bold" style={FontStyle}>{velocidad} hit/min</p>
                            </div>
                        </div>
                        <div className="row mb-5">
                            <div className="col-sm-10 mx-auto">
                                <ProgressBar variant="success" animated now={velocidad} />
                            </div>
                        </div>
                        <div className="col-3 mx-auto">
                            <ButtonGroup className="d-flex justify-content-center align-items-center" aria-label="Basic example">
                                <Button className="btn outline-dark" style={InputStyle} onClick={() => sendStart()}>Iniciar</Button>
                                <Button className="btn outline-dark" style={InputStyle} onClick={() => sendEnd()}>Finalizar</Button>
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
                                    className="rounded"
                                    percent={((time * 100 / (peso * 5)) / 100)}
                                    nrOfLevels={3}
                                    colors={["#566573", "#2C3E50", "#566573"]}
                                />
                            </div>
                        </div>
                        <div className="row mb-4" >
                            <div className="col-3 mx-auto">
                                <ButtonGroup className="d-flex justify-content-center align-items-center" aria-label="Basic example">
                                    <Button className="btn outline-dark" style={InputStyle} onClick={() => sendStart()}>Iniciar</Button>
                                    <Button className="btn outline-dark" style={InputStyle} onClick={() => sendEnd()}>Finalizar</Button>
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
                                <p className="text-center rounded text-white fst-italic fw-bold" style={FontStyle}>{calorias} cal</p>
                            </div>
                        </div>
                        <div className="row mb-5">
                            <div className="col-sm-10 mx-auto">
                                <ProgressBar variant="success" animated now={calorias} />
                            </div>
                        </div>
                        <div className="col-3 mx-auto">
                            <ButtonGroup className="d-flex justify-content-center align-items-center" aria-label="Basic example">
                                <Button className="btn outline-dark" style={InputStyle} onClick={() => sendStart()}>Iniciar</Button>
                                <Button className="btn outline-dark" style={InputStyle} onClick={() => sendEnd()}>Finalizar</Button>
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
                                <p className="text-center rounded text-white fst-italic fw-bold" style={FontStyle}>{peso} kg</p>
                            </div>
                        </div>
                        <div className="row mb-5">
                            <div className="col-sm-10 mx-auto">
                                <ProgressBar variant="success" animated now={peso} />
                            </div>
                        </div>
                        <div className="col-3 mx-auto">
                            <ButtonGroup className="d-flex justify-content-center align-items-center" aria-label="Basic example">
                                <Button className="btn outline-dark" style={InputStyle} onClick={() => sendStart()}>Iniciar</Button>
                                <Button className="btn outline-dark" style={InputStyle} onClick={() => sendEnd()}>Finalizar</Button>
                            </ButtonGroup>
                        </div>
                    </div>
                </Tab>
            </Tabs>
        </div>
    );
}

