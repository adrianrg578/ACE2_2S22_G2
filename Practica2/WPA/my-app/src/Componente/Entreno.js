import ButtonGroup from 'react-bootstrap/ButtonGroup';
import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import "bootstrap/dist/css/bootstrap.min.css";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import socket from "../Socket/Socket";
import { helpHttp } from "../Helper/helpHttp";


//Componentes

export default function Entreno() {

    //conexion API y ruta
    let urlState = "http://localhost:4001/start"
    let api = helpHttp();


    //Variables
    const saved = localStorage.getItem("Usuario");
    const dataUsuario = JSON.parse(saved)


    //Hooks
    const [repeticion, setRepeticion] = useState("");
    const [rango, setRango] = useState("");
    const [calorias, setCalorias] = useState("");
    const [BPM, setBPM] = useState("");
    const [fecha, setFecha] = useState("");
    const [time, setTime] = useState("");

    //Estilos
    const BoxStyle = {
        height: '55vh'
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

    const BoxHeight = {
        height: "31vh"
    };

    const StyleCard = {
        "backgroundColor": "rgba(5,.5,0.5,.3)",
        "border": "rgba(0, 0, 0, 0.5)",
        "width": "15rem"
    };

    const StyleCard2 = {
        "backgroundColor": "rgba(5,.5,0.5,.3)",
        "border": "rgba(0, 0, 0, 0.5)",
        "width": "18rem",
        "textAlign": "left"
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

    const [genero, setGenero] = useState('')
    //Conexion
    useEffect(() => {
        socket.on("datos", (data, callback) => {
            setRepeticion(data.repeticion);
            setRango(data.rango);
            setCalorias(data.calorias);
            setFecha(data.fecha);
            setBPM(data.bpm);
            setTime(data.tiempo);

            callback({
                IdUser: dataUsuario.IdUser
            });
        });

        if (dataUsuario.Genero === 'm' || dataUsuario.Genero === 'M') {
            setGenero('Hombre')
        } else {
            setGenero('Mujer')
        }

    }, [repeticion, rango, calorias, BPM, time, fecha]);

    return (
        <div className="container text-center" style={BoxStyle}>

            <Container className="rounded">
                <Row>
                    <Col md={4}>
                        <Row lg={100}>
                            <Card className="text-white" style={StyleCard2}>
                                <Card.Header>INFORMACION DEL USUARIO </Card.Header>
                                <Card.Body>
                                    <Card.Title>Edad: {dataUsuario.Edad}</Card.Title>
                                    <Card.Title>Peso: {dataUsuario.Peso} kg</Card.Title>
                                    <Card.Title>Genero: {genero}</Card.Title>
                                    <Card.Title>Estatura: {dataUsuario.Estatura} m</Card.Title>
                                </Card.Body>
                            </Card>
                        </Row>
                        <Row>
                            <Card className="text-white" style={StyleCard2}>
                                <Card.Header>RANGO DE FECHA</Card.Header>
                                <Card.Body>
                                    <Card.Title>Inicio</Card.Title>
                                    <input type="date"></input>
                                    <Card.Title>Fin</Card.Title>
                                    <input type="date"></input>
                                </Card.Body>
                            </Card>
                        </Row>
                    </Col>

                    <Col>
                        <Row >
                            <Col style={BoxHeight} className="border-light rounded d-flex justify-content-center align-items-center">
                                <Card className="text-white" style={StyleCard}>
                                    <Card.Header>NUMERO DE REPETICIONES</Card.Header>
                                    <Card.Body>
                                        <Card.Title>{repeticion} REP</Card.Title>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col style={BoxHeight} className="border-light rounded d-flex justify-content-center align-items-center">
                                <Card className="text-white" style={StyleCard}>
                                    <Card.Header>RANGO DE MOVIMIENTO DE LA ULTIMA REPETICION</Card.Header>
                                    <Card.Body>
                                        <Card.Title>{rango} </Card.Title>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col style={BoxHeight} className="border-light rounded d-flex justify-content-center align-items-center">
                                <Card className="text-white" style={StyleCard}>
                                    <Card.Header>CANTIDAD DE CALORIAS QUEMADAS</Card.Header>
                                    <Card.Body>
                                        <Card.Title>{calorias} CAL</Card.Title>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col style={BoxHeight} className="border-light rounded d-flex justify-content-center align-items-center">
                                <Card className="text-white bold" style={StyleCard}>
                                    <Card.Header>FRECUENCIA CARDIACA</Card.Header>
                                    <Card.Body>
                                        <Card.Title>{BPM} BPM</Card.Title>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col style={BoxHeight} className="border-light rounded d-flex justify-content-center align-items-center">
                                <Card className="text-white" style={StyleCard}>
                                    <Card.Header>TIEMPO De entrenamiento</Card.Header>
                                    <Card.Body>
                                        <Card.Title style={FontStyle}>{time} min</Card.Title>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
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