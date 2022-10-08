import ProgressBar from 'react-bootstrap/ProgressBar';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import "bootstrap/dist/css/bootstrap.min.css";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import socket from "../Socket/Socket";


//Componentes

export default function Entreno() {
    //Variables
    const saved = localStorage.getItem("Usuario");
    const dataUsuario = JSON.parse(saved)


    //Hooks
    const [fuerza, setFuerza] = useState("");

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
        "border": "rgba(0, 0, 0, 0.5)"
    };

    const InputStyle = {
        "backgroundColor": "rgba(5,.5,0.5,.3)",
        "border": "none",
        "color": "white"
    };
    //style={{ width: '18rem' }}

    const sendDashboard = async () => {
        console.log("HOLA SOY FUERZA")
    }

    //Conexion
    useEffect(() => {
        socket.on("fuerza", (Fuerza, callback) => {
            console.log(fuerza, "No se solo estoy probando FUERZA")
            setFuerza(Fuerza);
            callback({
                IdUser: dataUsuario.IdUser
            });
        });

    }, [fuerza]);

    return (
        <div className="container text-center" style={BoxStyle}>
            <Container className="rounded">
                <Row lg={100} >
                    <Col style={BoxHeight} className="border-light rounded d-flex justify-content-center align-items-center">
                        <Card className="text-white" style={StyleCard}>
                            <Card.Header>NUMERO DE REPETICIONES</Card.Header>
                            <Card.Body>
                                <Card.Title>0 REP</Card.Title>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the
                                    bulk of the card's content.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col style={BoxHeight} className="border-light rounded d-flex justify-content-center align-items-center">
                        <Card className="text-white" style={StyleCard}>
                            <Card.Header>RANGO DE MOVIMIENTO DE LA ULTIMA REPETICION</Card.Header>
                            <Card.Body>
                                <Card.Title>0-6 </Card.Title>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the
                                    bulk of the card's content.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col style={BoxHeight} className="border-light rounded d-flex justify-content-center align-items-center">
                        <Card className="text-white" style={StyleCard}>
                            <Card.Header>CANTIDAD DE CALORIAS QUEMADAS</Card.Header>
                            <Card.Body>
                                <Card.Title>0 CAL</Card.Title>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the
                                    bulk of the card's content.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col style={BoxHeight} className="border-light rounded d-flex justify-content-center align-items-center">
                        <Card className="text-white bold" style={StyleCard}>
                            <Card.Header>FRECUENCIA CARDIACA</Card.Header>
                            <Card.Body>
                                <Card.Title>0 BPM</Card.Title>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the
                                    bulk of the card's content.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <ButtonGroup aria-label="Basic example">
                            <Button className="btn outline-dark" style={InputStyle} /*onClick={() => sendDashboard()}*/>Iniciar Entreno</Button>
                            <Button className="btn outline-dark" style={InputStyle} /*onClick={() => sendRegistro()}*/>Finalizar Entreno</Button>
                        </ButtonGroup>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}