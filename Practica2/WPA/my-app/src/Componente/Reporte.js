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
import GrafRangoMov from './DRangoMov';
import GrafCalQuemadas from './DCalorias';

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
        "textAlign": "left"
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

    const [inicio, setInicio] = useState(new Date())
    const [fin, setFin] = useState(new Date())

    function handleFechaInicio(e) {
        setInicio(new Date(e.target.value))
    }

    function handleFechaFin(e) {
        setFin(new Date(e.target.value))
    }


    function showDeltaFrecuencia() {
        const divRango = document.getElementById("graficaRango")
        const divCalorias = document.getElementById("graficaCalorias")
        const divFreciencia = document.getElementById("graficaFrecuencia")

        if(divRango) {
            divRango.style.display = 'none'
            divCalorias.style.display = 'none'
        }
        divFreciencia.style.display = 'block'
    }

    function showDeltaRango() {
        const divRango = document.getElementById("graficaRango")
        const divCalorias = document.getElementById("graficaCalorias")
        const divFreciencia = document.getElementById("graficaFrecuencia")

        if(divFreciencia) {
            divFreciencia.style.display = 'none'
            divCalorias.style.display = 'none'
        }
        divRango.style.display = 'block'
    }

    function showDeltaCalorias() {
        const divRango = document.getElementById("graficaRango")
        const divCalorias = document.getElementById("graficaCalorias")
        const divFreciencia = document.getElementById("graficaFrecuencia")

        if(divFreciencia) {
            divFreciencia.style.display = 'none'
            divRango.style.display = 'none'
        }
        divCalorias.style.display = 'block'
    }
    //console.log( 'Rango', Math.round((fin.getTime() - inicio.getTime())/(1000*60*60*24)))

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
                                    <Button className="btn outline-dark" style={InputStyle} size='sm' onClick={() => showDeltaFrecuencia()}>Delta Frecuencia Cardiaca</Button>
                                    <Button className="btn outline-dark" style={InputStyle} size='sm' onClick={() => showDeltaRango()}>Delta Rango de Movimiento</Button>
                                    <Button className="btn outline-dark" style={InputStyle} size='sm' onClick={() => showDeltaCalorias()}>Delta Calorias Quemadas</Button>
                                </Card.Body>
                            </Card>
                        </Row>
                    </Col>

                    <Col>
                        <div id='graficaFrecuencia'><GrafFrecCard 
                            //number={Math.round((fin.getTime() - inicio.getTime())/(1000*60*60*24))}
                        /></div>
                        
                        <div id='graficaRango' style={{display: 'none'}}><GrafRangoMov/></div>
                        <div id='graficaCalorias' style={{display: 'none'}}><GrafCalQuemadas/></div>
                        
                    </Col>
                </Row>

            </Container>
        </div>
    );
}