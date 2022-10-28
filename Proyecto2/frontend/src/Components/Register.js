import "bootstrap/dist/css/bootstrap.min.css"

//Componentes
import RegisterForm from "./RegisterForm";

export default function Registro() {
  const heightStyle = {
    height: '100vh',
  };

  const backgroundStyle = {
    "background": "transparent"
  };

  const BoxStyle = {
    height: '90vh',
    background: "rgba(5,.5,0.5,.3)"
  };

  return (
    <div style={backgroundStyle}>
      
      <div className="container">
        <div className="row d-flex rounded justify-content-center align-items-center" style={heightStyle}>
          <div className="col-6 rounded  d-flex justify-content-center align-items-center" style={BoxStyle}>
            <RegisterForm/>
          </div>
        </div>
      </div>
    </div>
  );
}