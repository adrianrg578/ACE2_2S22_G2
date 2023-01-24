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
import { helpHttp } from '../Helper/helpHttp';


//Componentes

export default function Entreno() {

    //conexion API y ruta
    let urlTotal = "http://localhost:4001/totalEntreno"
    let urlTotal1 = "http://localhost:4001/Entreno1"
    let urlTotal2 = "http://localhost:4001/Entreno2"
    let urlTotal3 = "http://localhost:4001/Entreno3"
    let api = helpHttp();

    //Variables
    const saved = localStorage.getItem("Usuario");
    const dataUsuario = JSON.parse(saved)


    //Hooks
    const [dataEntreno, setDataEntreno] = useState({
        dateInit: "2022-10-26",
        dateEnd: "2022-11-10",
        user: dataUsuario.IdUser
    });

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
    //Funciones
    const handleInputChange = (e) => {
        setDataEntreno({
            ...dataEntreno,
            [e.target.name]: e.target.value
        })
    };
    console.log(dataEntreno)

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

    //total entrenamientos
    api.post(urlTotal, {body:dataEntreno}).then((response) => {
        if(!response.err){
            localStorage.setItem("nEntrenamientos", JSON.stringify({
                Cantidad: response[0].Cantidad}
                ))
        }else{
            console.log("ERROR")
        }
    });

    //total entrenamientos
    api.post(urlTotal1, {body:dataEntreno}).then((response) => {
        if(!response.err){
            localStorage.setItem("n1", JSON.stringify({
                Cantidad: response[0].Cantidad}
                ))
        }else{
            console.log("ERROR")
        }
    });

    //total entrenamientos
    api.post(urlTotal2, {body:dataEntreno}).then((response) => {
        if(!response.err){
            localStorage.setItem("n2", JSON.stringify({
                Cantidad: response[0].Cantidad}
                ))
        }else{
            console.log("ERROR")
        }
    });

    //total entrenamientos
    api.post(urlTotal3, {body:dataEntreno}).then((response) => {
        if(!response.err){
            localStorage.setItem("n3", JSON.stringify({
                Cantidad: response[0].Cantidad}
                ))
        }else{
            console.log("ERROR")
        }
    });

    const saved1 = localStorage.getItem("nEntrenamientos");
    const dataEntrenamiento = JSON.parse(saved1)

    const saved11 = localStorage.getItem("n1");
    const data1 = JSON.parse(saved11)

    const saved2 = localStorage.getItem("n2");
    const data2 = JSON.parse(saved2)

    const saved3 = localStorage.getItem("n3");
    const data3 = JSON.parse(saved3)

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
                                    <Card.Text>Edad: {dataUsuario.Edad}</Card.Text>
                                    <Card.Text>Peso: {dataUsuario.Peso}kg</Card.Text>
                                    <Card.Text>Genero: {dataUsuario.Genero}</Card.Text>
                                    <Card.Text>Estatura:  {dataUsuario.Estatura}m</Card.Text>
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
                                    <input type={'date'} style={StyleInput} name="dateInit" onChange={handleInputChange}></input>
                                    <Card.Text>Fin:</Card.Text>
                                    <input type={'date'} style={StyleInput} name="dateEnd" onChange={handleInputChange}></input>
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
                                                <Card.Text style={{ "fontSize": "80px" }}>{dataEntrenamiento.Cantidad}</Card.Text>
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
                                            <Card.Text style={{ "fontSize": "50px" }}>{data1.Cantidad}</Card.Text>
                                        </Col>
                                        <Col md={4} className="text-white text-center" >
                                            <img src={resitencia} style={{ "height": "100px" }}></img>
                                            <Card.Text style={{ "fontSize": "50px"}}>{data2.Cantidad}</Card.Text>
                                        </Col>
                                        <Col md={4} className="text-white text-center" >
                                            <img src={silueta} style={{ "height": "100px" }}></img>
                                            <Card.Text style={{ "fontSize": "50px" }}>{data3.Cantidad}</Card.Text>
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