import ProgressBar from 'react-bootstrap/ProgressBar';
import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import socket from "../Socket/Socket";
import rutina from '../Images/rutina-de-ejercicio.png'
import reloj from '../Images/reloj.png'
import saltando from '../Images/saltando.png'
import silueta from '../Images/silueta-de-persona.png'
import resitencia from '../Images/ejercicio.png'


//Componentes

export default function Entreno() {
    //Variables
    const saved = localStorage.getItem("Usuario");
    const dataUsuario = JSON.parse(saved)

    //Estilos
    const InputStyle = {
        "backgroundColor": "rgba(5,.5,0.5,.3)",
        "border": "none",
        "color": "white"
    };

    const BoxStyle = {
        height: '55vh'
    };

    const sendDashboard = async () => {
        console.log("HOLA SOY FUERZA")
    }

    //Funciones

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

    const StyleInput = {
        "borderRadius": "5px",
        "marginBottom": "10px",
        "backgroundColor": "rgba(0,.0,0.0,.1)",
        "color": "white",
        "border": "hidden",
        "padding": "16px"
    }

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
            <div className="container text-center" style={BoxStyle}>
                <Row>
                    <Col md={4}>
                        <Row>
                            <Card className="text-white" style={StyleCard2}>
                                <Card.Header>
                                    <Card.Title>Perfil</Card.Title>
                                </Card.Header>
                                <Card.Body>
                                    <Card.Text>Edad: </Card.Text>
                                    <Card.Text>Peso:  kg</Card.Text>
                                    <Card.Text>Genero: </Card.Text>
                                    <Card.Text>Estatura:  m</Card.Text>
                                </Card.Body>
                            </Card>
                        </Row>
                        <Row>
                            <Card className="text-white" style={StyleCard2}>
                                <Card.Header>
                                    <Card.Title>Rango de Fecha</Card.Title>
                                </Card.Header>
                                <Card.Body>
                                    <Card.Text>Inicio:</Card.Text>
                                    <input type={'date'} style={StyleInput}></input>
                                    <Card.Text>Fin:</Card.Text>
                                    <input type={'date'} style={StyleInput}></input>
                                </Card.Body>
                            </Card>
                        </Row>
                    </Col>
                    <Col md={8}>
                        <Row>
                            <Col md={6}>
                                <Card className="text-white" style={StyleCard3}>
                                    <Card.Header>
                                        <Card.Title>Tiempo Total de Entrenamiento</Card.Title>
                                    </Card.Header>
                                    <Card.Body>
                                        <Row>
                                            <Col md={6}>
                                                <img src={reloj} style={{ "height": "125px" }}></img>
                                            </Col>
                                            <Col md={6} className="text-white text-center" >
                                                <Card.Text style={{ "fontSize": "40px" }}>2h 30min</Card.Text>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={6}>
                                <Card className="text-white" style={StyleCard3}>
                                    <Card.Header>
                                        <Card.Title>Numero de Entrenamientos</Card.Title>
                                    </Card.Header>
                                    <Card.Body>
                                        <Row>
                                            <Col md={6}>
                                                <img src={rutina} style={{ "height": "150px" }}></img>
                                            </Col>
                                            <Col md={6} className="text-white text-center" >
                                                <Card.Text style={{ "fontSize": "80px" }}>0</Card.Text>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                        <Col md={12}>
                            <Card className="text-white" style={StyleCard3}>
                                <Card.Header>
                                    <Card.Title>Numero de Entrenamiento por Tipo</Card.Title>
                                </Card.Header>
                                <Card.Body>
                                    <Row>
                                        <Col md={4} className="text-white text-center" >
                                            <img src={saltando} style={{ "height": "100px" }}></img>
                                            <Card.Text style={{ "fontSize": "50px" }}>0</Card.Text>
                                        </Col>
                                        <Col md={4} className="text-white text-center" >
                                            <img src={resitencia} style={{ "height": "100px" }}></img>
                                            <Card.Text style={{ "fontSize": "50px"}}>0</Card.Text>
                                        </Col>
                                        <Col md={4} className="text-white text-center" >
                                            <img src={silueta} style={{ "height": "100px" }}></img>
                                            <Card.Text style={{ "fontSize": "50px" }}>0</Card.Text>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Col>
                </Row>
            </div>
        </div>
    );
}