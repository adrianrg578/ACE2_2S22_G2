import "bootstrap/dist/css/bootstrap.min.css";
import {useNavigate} from "react-router-dom"

export default function LoginForm() {
    const navigate = useNavigate()

    const estilo = {
        height: '60vh',
        background: "rgba(5,.5,0.5,.3)"
    };

    const sendDashboard = async() => {
        navigate('/dashboard');
    }
    return (
        <div className="container border-light rounded  d-flex justify-content-center align-items-center" style={estilo}>
            <form className="container-flex">
                <div className="mb-3 row" >
                    <div className="col-sm-10 mx-auto">
                        <h3 className="text-center">Login</h3>
                    </div>
                </div>
                <div className="mb-3 row" >
                    <div className="col-sm-10 mx-auto">
                        <input type="text" readonly className="form-control" id="input" placeholder="Username" />
                    </div>
                </div>
                <div className="mb-3 row">
                    <div className="col-sm-10 mx-auto">
                        <input type="password" className="form-control" id="inputPassword" placeholder="Contraseña" />
                    </div>
                </div>
                <div className="col-7 mx-auto">
                    <button type="button" onClick={()=>sendDashboard()} class="btn btn-success">Iniciar Sesion</button>
                </div>
            </form>
        </div>
    );
}