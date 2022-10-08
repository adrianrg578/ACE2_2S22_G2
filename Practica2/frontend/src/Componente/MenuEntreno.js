import "bootstrap/dist/css/bootstrap.min.css";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import React from 'react';

//Componentes
import Entreno from './Entreno';

export default function MenuEntreno() {
    //Variables
    const saved = localStorage.getItem("Usuario");
    const dataUsuario = JSON.parse(saved)

    //Estilos
    const estilo = {
        "border": "none",
        "color": "white"
    };

    return (
        <div >
            <div
                defaultActiveKey="entrenamiento"
                id=""
                className="mb-3 border-light rounded d-flex justify-content-center align-items-center"
                justify
                style={estilo}>
                <Entreno />
            </div>
        </div>
    );
}