import ProgressBar from 'react-bootstrap/ProgressBar';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import "bootstrap/dist/css/bootstrap.min.css";
import { helpHttp } from "../Helper/helpHttp";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import socket from "../Socket/Socket";



//Componentes

export default function Entreno() {
    //Rutas
    let urlState = "http://localhost:4001/start"

    //Variables
    const saved = localStorage.getItem("Usuario");
    const dataUsuario = JSON.parse(saved)
    let api = helpHttp();

    //Hooks
    const [repeticion, setRepeticion] = useState("");
    const [calorias, setCalorias] = useState("");
    const [rango, setRango] = useState("");
    const [fecha, setFecha] = useState("");
    const [time, setTime] = useState("");
    const [BPM, setBPM] = useState("");

    //Estilos
    const BoxStyle = {
        height: '55vh'
    };

    const FontStyle = {
        "fontSize": "7vh",
    };

    const ButtonStyle = {
        "backgroundColor": "rgba(5,.5,0.5,.3)",
        "border": "none",
        "color": "white"
    };

    const BoxHeight = {
        height: "11rem"
    };

    const StyleCard = {
        "backgroundColor": "rgba(5,.5,0.5,.3)",
        "border": "rgba(0, 0, 0, 0.5)",
        "width": "18rem",
        "height": "25vh"
    };

    const InputStyle = {
        "backgroundColor": "rgba(5,.5,0.5,.3)",
        "border": "none",
        "color": "white"
    };

    const sendStart = async () => {
        api.post(urlState, { body: { state: 1 } }).then((response) => {
            if (!response.err) {
                console.log("Inicio del entreno")
            } else {
                console.log("ERROR")
            }
        })
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
            setRepeticion(data.repeticion);
            setCalorias(data.calorias);
            setFecha(data.fecha);
            setRango(data.rango);
            setTime(data.tiempo);
            setBPM(data.bpm);

            callback({
                IdUser: dataUsuario.IdUser
            });
        });

    }, [repeticion, rango, calorias, BPM, time, fecha]);

    return (
        <div className="container text-center" style={BoxStyle}>
            <h3 className="text-center text-white">Fecha y Hora: {fecha} Tiempo Total: {time} min</h3>   
            <Container className="rounded">
                <Row lg={100} >
                    <Col style={BoxHeight} className="border-light rounded d-flex justify-content-center align-items-center">
                        <Card className="text-white" style={StyleCard}>
                            <Card.Header>NUMERO DE REPETICIONES</Card.Header>
                            <Card.Body>
                                <Card.Title style={FontStyle}>{repeticion} REP</Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col style={BoxHeight} className="border-light rounded d-flex justify-content-center align-items-center">
                        <Card className="text-white" style={StyleCard}>
                            <Card.Header>RANGO DE MOVIMIENTO DE LA ULTIMA REPETICION</Card.Header>
                            <Card.Body>
                                <Card.Title style={FontStyle}>{rango} CM</Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col style={BoxHeight} className="border-light rounded d-flex justify-content-center align-items-center">
                        <Card className="text-white" style={StyleCard}>
                            <Card.Header>CANTIDAD DE CALORIAS QUEMADAS</Card.Header>
                            <Card.Body>
                                <Card.Title style={FontStyle}>{calorias} CAL</Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col style={BoxHeight} className="border-light rounded d-flex justify-content-center align-items-center">
                        <Card className="text-white bold" style={StyleCard}>
                            <Card.Header>FRECUENCIA CARDIACA</Card.Header>
                            <Card.Body>
                                <Card.Title style={FontStyle}>{BPM} BPM</Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <ButtonGroup aria-label="Basic example">
                            <Button className="btn outline-dark" style={InputStyle} onClick={() => sendStart()}>Iniciar Entreno</Button>
                            <Button className="btn outline-dark" style={InputStyle} onClick={() => sendEnd()}>Finalizar Entreno</Button>
                        </ButtonGroup>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}