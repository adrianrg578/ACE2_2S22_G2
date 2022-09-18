import "bootstrap/dist/css/bootstrap.min.css";
import {useNavigate} from "react-router-dom"

export default function LoginForm() {
    const navigate = useNavigate()

    const InputStyle = {
        "background-color" : "rgba(5,.5,0.5,.3)",
        "border" : "none",
        "color" : "white"
    };

    const sendDashboard = async() => {
        navigate('/dashboard');
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
                        <input style={InputStyle} type="text" className="form-control" id="username" placeholder="Username" />
                    </div>
                </div>
                <div className="mb-3 row">
                    <div className="col-sm-10 mx-auto">
                        <input style={InputStyle} type="password" className="form-control" id="password" placeholder="Contraseña" />
                    </div>
                </div>
                <div className="col-2 mx-auto">
                    <button style={InputStyle}  type="button" onClick={()=>sendDashboard()} class="btn outline-dark">Igresar</button>
                </div>
            </form>
        </div>
    );
}