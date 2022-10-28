import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { helpHttp } from "../Helper/helpHttp";
import React, {useState} from 'react';

export default function RegistroForm() {
    //Rutas
    let urlRegister = "http://192.168.1.5:4001/register"
    //Variables
    const navigate = useNavigate()
    let api = helpHttp();

    //Hooks
    const [dataUsuario, setDataUsuario] = useState({
        Username: "",
        Contrasena: "",
        Nombre: "",
        Apellido: "Perez",
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
        api.post(urlRegister, {body:dataUsuario}).then((res) => {
            console.log(res)
            if(!res.err){
                alert("Se agregó el usuario")
                navigate('/');
            }else{
                console.log("ERROR")
            }
          })
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
                            name="Username" 
                            placeholder="Username" 
                            onChange={handleInputChange}/>
                    </div>
                </div>
                <div className="mb-3 row" >
                    <div className="col-sm-10 mx-auto">
                        <input 
                            style={InputStyle} type="text" 
                            className="form-control" 
                            name="Nombre" 
                            placeholder="Nombre" 
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
                            <option value="M">Masculino</option>
                            <option value="F">Femenino</option>
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
                            placeholder="Estatura(cm)" 
                            onChange={handleInputChange}/>
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
                            onChange={handleInputChange}/>
                    </div>
                </div>
                <div className="col-3 mx-auto d-flex justify-content-center align-items-center">
                    <button 
                        style={InputStyle} 
                        type="button" 
                        onClick={() => sendLogin()} 
                        className="btn outline-dark">Registrar datos</button>
                </div>
            </form>
        </div>
    );
}