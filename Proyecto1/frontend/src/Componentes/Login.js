import "bootstrap/dist/css/bootstrap.min.css"
import fondo2 from '../Images/fondo2.jpg'

//Componentes
import LoginForm from "./LoginForm"
import Navbar from "./Navbar"

export default function Login() {
  const heightStyle = {
    height: '93vh',
  };

  const backgroundStyle = {
    "background-image": `url(${fondo2})`
  };

  return (
    <div style={backgroundStyle}>
      <Navbar/>
      <div className="container-flex">
        <div className="row d-flex justify-content-center align-items-center" style={heightStyle} >
          <div className="col-6 mx-auto">
            <LoginForm/>
          </div>
        </div>
      </div>
    </div>
  );
}
