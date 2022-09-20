import "bootstrap/dist/css/bootstrap.min.css"

//Componentes
import RegistroForm from "./RegistroForm";
import Navbar from "./Navbar"

export default function Registro() {
  const heightStyle = {
    height: '90vh',
  };

  const backgroundStyle = {
    "background": "transparent"
  };

  const BoxStyle = {
    height: '80vh',
    background: "rgba(5,.5,0.5,.3)"
  };

  return (
    <div style={backgroundStyle}>
      <Navbar/>
      <div className="container">
        <div className="row d-flex rounded justify-content-center align-items-center" style={heightStyle}>
          <div className="col-6 rounded  d-flex justify-content-center align-items-center" style={BoxStyle}>
            <RegistroForm/>
          </div>
        </div>
      </div>
    </div>
  );
}
