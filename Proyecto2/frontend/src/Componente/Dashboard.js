import React from "react";

//Componentes
import MenuEntreno from "./MenuEntreno";

export default function Dashboard() {
    //Variables
    const saved = localStorage.getItem("Usuario");
    const dataUsuario = JSON.parse(saved)

    //Estilos
    const heightStyle = {
        height: "90vh",
    };

    const backgroundStyle = {
        background: "transparent"
    };

    const BoxStyle = {
        height: "87vh",
        background: "rgba(5,.5,0.5,.3)"
    };

    return (
        <div style={backgroundStyle}>

            <div className="container rounded">
                <div className="row rounded d-flex justify-content-center align-items-center" style={heightStyle} >
                    <div className="col-10 rounded mx-auto">
                        <h1 className="text-center text-white">Bienvenido {dataUsuario.Nombre}</h1>
                    </div>
                    <div className="col-10 rounded mx-auto" style={BoxStyle}>
                        <MenuEntreno />
                    </div>
                </div>
            </div>
        </div>
    );
}