import socket from "../Socket/Socket";
import React from "react";

//Componentes
import MenuEntreno from "./MenuEntreno";
import Navbar from "./Navbar";


export default function Dashboard() {
    //Variables
    const saved = localStorage.getItem("Usuario");
    const dataUsuario = JSON.parse(saved)

    //Estilos
    const heightStyle = {
        height: '90vh',
    };

    const backgroundStyle = {
        "background": "transparent"
    };

    const BoxStyle = {
        height: '70vh',
        background: "rgba(5,.5,0.5,.3)"
    };

    return (
        <div style={backgroundStyle}>

            <div className="container rounded">
                <div className="row rounded d-flex justify-content-center align-items-center" style={heightStyle} >
                    <div className="col-10 rounded mx-auto">
                        <h2 className="text-center text-white">Elija el tipo de entrenamiento</h2>
                    </div>
                    <div className="col-10 rounded mx-auto" style={BoxStyle}>
                        <MenuEntreno />
                    </div>
                </div>
            </div>
        </div>
    );
}

//<Navbar />