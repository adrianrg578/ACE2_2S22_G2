import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom"
import socket from "../Socket/Socket";
import React, {useState} from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function RegistroForm() {
    //Variables
    const navigate = useNavigate()

    //Hooks
    const [dataUsuario, setDataUsuario] = useState({
        IdUser: uuidv4(),
        Contra: "",
        Nombre: "",
        Edad: "",
        Peso: "",
        Genero: "",
        Estatura: ""
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
            [e.target.name] : e.target.value
        })
        console.log(dataUsuario)
    };

    const sendLogin = async () => {
        socket.emit("registro", dataUsuario, (response) => {
            if(response.message !== "Error al ingresar usuario"){
                navigate('/');
            }
            alert(response.message); 
        });
        
    }
    return (
        <div className="container">
            <form className="container-flex">
                <div className="mb-3 row" >
                    <div className="col-sm-10 mx-auto">
                        <h3 className="text-center text-white">Registro</h3>
                    </div>
                </div>
                <div className="mb-3 row" >
                    <div className="col-sm-10 mx-auto">
                        <input 
                            style={InputStyle} type="text" 
                            className="form-control" 
                            name="Nombre" 
                            placeholder="Username" 
                            onChange={handleInputChange}/>
                    </div>
                </div>
                <div className="mb-3 row" >
                    <div className="col-sm-10 mx-auto">
                        <input 
                            style={InputStyle} 
                            type="text" 
                            className="form-control" 
                            name="Edad" 
                            placeholder="Edad" 
                            onChange={handleInputChange}/>
                    </div>
                </div>
                <div className="mb-3 row" >
                    <div className="col-sm-10 mx-auto">
                        <input 
                            style={InputStyle} 
                            type="text" 
                            className="form-control" 
                            name="Peso" 
                            placeholder="Peso(lb)" 
                            onChange={handleInputChange}/>
                    </div>
                </div>
                <div className="mb-3 row" >
                    <div className="col-sm-10 mx-auto">
                        <select 
                            className="form-select" 
                            style={InputStyle}
                            name="Genero" 
                            onChange={handleInputChange}>
                            <option value="Masculino">Masculino</option>
                            <option value="Femenino">Femenino</option>
                        </select>
                    </div>
                </div>
                <div className="mb-3 row" >
                    <div className="col-sm-10 mx-auto">
                        <input 
                            style={InputStyle} 
                            type="text" 
                            className="form-control" 
                            name="Estatura" 
                            placeholder="Estatura(m)" 
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
                <div className="col-3 mx-auto">
                    <button style={InputStyle} type="button" onClick={() => sendLogin()} class="btn outline-dark">Registrar datos</button>
                </div>
            </form>
        </div>
    );
}