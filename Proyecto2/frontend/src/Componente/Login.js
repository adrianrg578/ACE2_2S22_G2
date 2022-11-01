import "bootstrap/dist/css/bootstrap.min.css"

//Componentes
import LoginForm from "./LoginForm"

export default function Login() {
  //Estilos
  const heightStyle = {
    height: "90vh",
  };

  const backgroundStyle = {
    background: "transparent"
  };

  const BoxStyle = {
    height: "60vh",
    background: "rgba(5,.5,0.5,.3)"
  };

  return (
    <div style={backgroundStyle}>
      
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