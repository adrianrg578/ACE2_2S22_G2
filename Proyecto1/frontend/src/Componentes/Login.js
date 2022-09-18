import "bootstrap/dist/css/bootstrap.min.css"
import fondo2 from '../Images/fondo2.jpg'

//Componentes
import LoginForm from "./LoginForm"
import Navbar from "./Navbar"

export default function Login() {
  const heightStyle = {
    height: '90vh',
  };

  const backgroundStyle = {
    "background": "transparent"
  };

  const BoxStyle = {
    height: '60vh',
    background: "rgba(5,.5,0.5,.3)"
  };

  return (
    <div style={backgroundStyle}>
      <Navbar/>
      <div className="container">
        <div className="row d-flex rounded justify-content-center align-items-center" style={heightStyle}>
          <div className="col-6 rounded  d-flex justify-content-center align-items-center" style={BoxStyle}>
            <LoginForm/>
          </div>
        </div>
      </div>
    </div>
  );
}
