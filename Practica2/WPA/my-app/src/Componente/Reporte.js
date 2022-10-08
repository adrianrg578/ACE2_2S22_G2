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
import { helpHttp } from "../Helper/helpHttp";


//Componentes

import GrafFrecCard from './DFrecuencia';

export default function Reporte() {
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
        "text-align": "left"
    };

    const InputStyle = {
        "backgroundColor": "rgba(5,.5,0.5,.3)",
        "border": "none",
        "color": "white",
        "width": "200px",
        "margin": "5px"
    };

    //Variables
    const saved = localStorage.getItem("Usuario");
    const dataUsuario = JSON.parse(saved)


    //Hooks
    const [repeticion, setRepeticion] = useState("");
    const [rango, setRango] = useState("");
    const [calorias, setCalorias] = useState("");
    const [BPM, setBPM] = useState("");

    const [inicio, setInicio] = useState(new Date())
    const [fin, setFin] = useState(new Date())

    const sendDashboard = async () => {
        console.log("HOLA SOY FUERZA")
    }

    function handleFechaInicio(e) {
        setInicio(new Date(e.target.value))
    }

    function handleFechaFin(e) {
        setFin(new Date(e.target.value))
    }

    const [genero, setGenero] = useState('')
    //Conexion
    useEffect(() => {
        socket.on("datos", (data, callback) => {
            setRepeticion(data.repeticion);
            setRango(data.rango);
            setCalorias(data.calorias);
            setBPM(data.bpm);
            callback({
                IdUser: dataUsuario.IdUser
            });
        });

        if (dataUsuario.Genero == 'm') {
            setGenero('Hombre')
        } else {
            setGenero('Mujer')
        }

        

    }, [repeticion, rango, calorias, BPM]);

    console.log( 'Rango', Math.round((fin.getTime() - inicio.getTime())/(1000*60*60*24)))

    return (
        <div className="container text-center" style={BoxStyle}>

            <Container className="rounded">
                <Row>
                    <Col md= {3}>
                        <Row lg={100}>
                            <Card className="text-white" style={StyleCard2}>
                                <Card.Header>RANGO DE FECHA</Card.Header>
                                <Card.Body>
                                    <Card.Title>Inicio</Card.Title>
                                    <input type="date" name='fechaInicio' onChange={handleFechaInicio}></input>
                                    <Card.Title>Fin</Card.Title>
                                    <input type="date" name='fechaFin' onChange={handleFechaFin}></input>
                                </Card.Body>
                            </Card>
                        </Row>
                        <Row>
                            <Card className="text-white" style={StyleCard2}>
                                <Card.Header>TIPOS DE GRÁFICAS</Card.Header>
                                <Card.Body>
                                    <Button className="btn outline-dark" style={InputStyle} size='sm' /*onClick={() => sendDashboard()}*/>Delta Frecuencia Cardiaca</Button>
                                    <Button className="btn outline-dark" style={InputStyle} size='sm'  /*onClick={() => sendRegistro()}*/>Delta Rango de Movimiento</Button>
                                    <Button className="btn outline-dark" style={InputStyle} size='sm'  /*onClick={() => sendRegistro()}*/>Delta Calorias Quemadas</Button>
                                </Card.Body>
                            </Card>
                        </Row>
                    </Col>

                    <Col>
                        <GrafFrecCard 
                            //number={Math.round((fin.getTime() - inicio.getTime())/(1000*60*60*24))}
                        />
                    </Col>
                </Row>

            </Container>
        </div>
    );
}