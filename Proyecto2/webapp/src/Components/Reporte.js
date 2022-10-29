import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import socket from "../Socket/Socket";

import { GrafFuerza, GrafCaloria, GrafRitmo } from './graficas';

//Componentes

export default function Reporte() {
    //Variables
    const saved = localStorage.getItem("Usuario");
    const dataUsuario = JSON.parse(saved)

    //Estilos
    const InputStyle = {
        "backgroundColor": "rgba(5,.5,0.5,.3)",
        "border": "none",
        "color": "white"
    };

    const ButtonStyle = {
        "backgroundColor": "rgba(5,.5,0.5,.3)",
        "border": "none",
        "color": "white",
        "width": "200px",
        "margin": "5px"
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



    function showFuerza() {
        const divFuerza = document.getElementById('grafFuerza')
        const divCaloria = document.getElementById('grafCalorias')
        const divRitmo = document.getElementById('grafRitmo')
        if (divCaloria && divRitmo) {
            divCaloria.style.display = 'none'
            divRitmo.style.display = 'none'
        }
        divFuerza.style.display = 'block'
    }

    function showCaloria() {
        const divFuerza = document.getElementById('grafFuerza')
        const divCaloria = document.getElementById('grafCalorias')
        const divRitmo = document.getElementById('grafRitmo')
        if (divFuerza && divRitmo) {
            divFuerza.style.display = 'none'
            divRitmo.style.display = 'none'
        }
        divCaloria.style.display = 'block'
    }

    function showRitmo() {
        const divFuerza = document.getElementById('grafFuerza')
        const divCaloria = document.getElementById('grafCalorias')
        const divRitmo = document.getElementById('grafRitmo')
        if (divFuerza && divCaloria) {
            divFuerza.style.display = 'none'
            divCaloria.style.display = 'none'
        }
        divRitmo.style.display = 'block'
    }


    return (
        <div >
            <div className="container text-center" style={BoxStyle}>
                <Row>
                    <Col md={4}>
                        <Row>
                            <Card className="text-white" style={StyleCard2}>
                                <Card.Header>
                                    <Card.Title>Rango de Fecha Informacion</Card.Title>
                                </Card.Header>
                                <Card.Body>
                                    <Card.Text>Inicio:</Card.Text>
                                    <input type={'date'} style={StyleInput}></input>
                                    <Card.Text>Fin:</Card.Text>
                                    <input type={'date'} style={StyleInput}></input>
                                </Card.Body>
                            </Card>
                        </Row>
                        <Row>
                            <Card className="text-white" style={StyleCard2}>
                                <Card.Header>
                                    <Card.Title>Tipos Graficos</Card.Title>
                                </Card.Header>
                                <Card.Body>
                                    <Button className="btn outline-dark" style={ButtonStyle} onClick={() => showFuerza()}>Delta Fuerza</Button>
                                    <Button className="btn outline-dark" style={ButtonStyle} onClick={() => showCaloria()}>Delta Calorias</Button>
                                    <Button className="btn outline-dark" style={ButtonStyle} onClick={() => showRitmo()}>Zona de Ritmo</Button>
                                </Card.Body>
                            </Card>
                        </Row>
                    </Col>
                    <Col md={8}>
                        <div id='grafFuerza'>
                            <GrafFuerza />
                        </div>
                        <div id='grafCalorias' style={{ display: 'none' }}>
                            <GrafCaloria />
                        </div>
                        <div id='grafRitmo' style={{ display: 'none' }}>
                            <GrafRitmo />
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
}