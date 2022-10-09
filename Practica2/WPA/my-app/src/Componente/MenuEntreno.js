import "bootstrap/dist/css/bootstrap.min.css";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import React from 'react';
import { useState, useEffect } from 'react';

//Componentes
import Entreno from './Entreno';
import Reporte from "./Reporte";

export default function MenuEntreno() {
    //Variables
    const saved = localStorage.getItem("Usuario");
    const dataUsuario = JSON.parse(saved)

    const [timepo, setTimepo] = useState(new Date())

    //Estilos
    const estilo = {
        "border": "none",
        "color": "white",
    };

    const Pstyle = {
        "color": "white"
    }


    useEffect(() => {
        setInterval(() => setTimepo(new Date()), 1000)
    }, []);

    return (
        <div >
            <h2 style={Pstyle}>{dataUsuario.Username}</h2>
            <p style={Pstyle}>
                {timepo.toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                })
                } {timepo.toLocaleString('en-US', {
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric',
                })
                }</p>
            <Tabs
                defaultActiveKey="entrenamiento"
                id=""
                className="mb-3 border-light rounded d-flex justify-content-center align-items-center"
                justify
                style={estilo}>

                <Tab eventKey="entrenamiento" title="Entrenamiento">
                    <Entreno/>
                </Tab>
                <Tab eventKey="perfil" title="Reporte">
                    <Reporte/>
                </Tab>
            </Tabs>
        </div>
    );
}