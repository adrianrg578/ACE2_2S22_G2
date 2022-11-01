import ButtonGroup from 'react-bootstrap/ButtonGroup';
import "bootstrap/dist/css/bootstrap.min.css";
import { helpHttp } from "../Helper/helpHttp";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';

export default function LoginForm() {
    //Rutas
    let urlLogin = "http://localhost:4001/login"

    //Variables
    const navigate = useNavigate()
    let api = helpHttp();

    //Hooks
    const [dataUsuario, setDataUsuario] = useState({
        Contrasena: "",
        Username: "",
    });

    //Estilos
    const InputStyle = {
        "backgroundColor": "rgba(5,.5,0.5,.3)",
        "border": "none",
        "color": "white"
    };

    //Funciones
    const handleInputChange = (e) => {
        setDataUsuario({
            ...dataUsuario,
            [e.target.name]: e.target.value
        })
        console.log(dataUsuario)
    };

    const sendDashboard = async () => {
        api.post(urlLogin, {body:dataUsuario}).then((response) => {
          if(!response.err){
                localStorage.setItem("Usuario", JSON.stringify({
                IdUsuario: response[0].id_user, 
                Username:response[0].username,
                Nombre: response[0].nombre,
                Edad: response[0].edad,
                Peso: response[0].peso,
                Genero: response[0].genero,
                Estatura: response[0].estatura}
                ))
              alert("Se inicio sesion")
              navigate('/dashboard');
          }else{
              console.log("ERROR")
          }
        })
    }

    const sendRegistro = async () => {
        navigate('/registro');
    }

        return (
            <div className="container">
                <form className="container-flex">
                    <div className="mb-3 row" >
                        <div className="col-sm-10 mx-auto">
                            <h3 className="text-center text-white">Iniciar Sesion</h3>
                        </div>
                    </div>
                    <div className="mb-3 row" >
                        <div className="col-sm-10 mx-auto">
                            <input
                                style={InputStyle}
                                type="text"
                                className="form-control"
                                name="Username"
                                placeholder="Username"
                                onChange={handleInputChange} />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <div className="col-sm-10 mx-auto">
                            <input
                                style={InputStyle}
                                type="password"
                                className="form-control"
                                name="Contrasena"
                                placeholder="Contraseña"
                                onChange={handleInputChange} />
                        </div>
                    </div>
                    <div className="col-3 mx-auto">
                        <ButtonGroup className="d-flex justify-content-center align-items-center" aria-label="Basic example">
                            <Button className="btn outline-dark" style={InputStyle} onClick={() => sendDashboard()}>Ingresar</Button>
                            <Button className="btn outline-dark" style={InputStyle} onClick={() => sendRegistro()}>Registrar</Button>
                        </ButtonGroup>
                    </div>
                </form>
            </div>
        );
}  