import "bootstrap/dist/css/bootstrap.min.css";
import { helpHttp } from "../Helper/helpHttp";
import {useNavigate} from "react-router-dom";
import React, {useState} from 'react';

export default function LoginForm() {
    //Rutas
    let urlLogin = "estaseraunaruta"

    //Variables
    const navigate = useNavigate()
    let api = helpHttp();

    //Hooks
    const [dataUsuario, setDataUsuario] = useState({
        Contra: "",
        IdUser: "",
    });

    //Estilos
    const InputStyle = {
        "backgroundColor" : "rgba(5,.5,0.5,.3)",
        "border" : "none",
        "color" : "white"
    };

    //Funciones
    const handleInputChange = (e) => {
        setDataUsuario({
            ...dataUsuario,
            [e.target.name] : e.target.value
        })
        console.log(dataUsuario)
    };


    const sendDashboard = async() => {
      navigate('/dashboard');
      /*api.post(urlLogin, {body:dataUsuario}).then((response) => {
        if(!response.err){
            localStorage.setItem("Usuario", JSON.stringify({
              IdUser:response.data[0].IdUser,
              Nombre: response.data[0].Nombre,
              Edad: response.data[0].Edad,
              Peso: response.data[0].peso,
              Genero: response.data[0].Genero,
              Estatura: response.data[0].Estatura,
          }))
            alert("Se inicio sesion")
            navigate('/dashboard');
        }else{
            console.log("ERROR")
        }
      })*/
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
                            name="IdUser" 
                            placeholder="Username" 
                            onChange={handleInputChange}/>
                    </div>
                </div>
                <div className="mb-3 row">
                    <div className="col-sm-10 mx-auto">
                        <input 
                            style={InputStyle} 
                            type="password" 
                            className="form-control" 
                            name="Contra" 
                            placeholder="Contraseña" 
                            onChange={handleInputChange}/>
                    </div>
                </div>
                <div className="col-2 mx-auto">
                    <button style={InputStyle}  type="button" onClick={()=>sendDashboard()} class="btn outline-dark">Ingresar</button>
                </div>
            </form>
        </div>
    );
}