import ProgressBar from 'react-bootstrap/ProgressBar';
import "bootstrap/dist/css/bootstrap.min.css"

//Componentes

export default function Velocidad() {
  //Var
  var progreso = 0;

  //Estilos
  const BoxStyle = {
    height: '55vh'
  };

  const FontStyle = {
    "fontSize": "15vh",
    "backgroundColor": "rgba(5,.5,0.5,.3)"
  };

  const ButtonStyle = {
    "backgroundColor": "rgba(5,.5,0.5,.3)",
    "border": "none",
    "color": "white"
  };

  const sendDashboard = async () => {
    progreso += 50;
    alert(progreso)
  }
  return (
    <div>
      <div className="container text-center" style={BoxStyle}>
        <div className="row mb-5">
          <div className="col-sm-4 mx-auto">
            <p className="text-center rounded text-white fst-italic fw-bold" style={FontStyle}>123 kg</p>
          </div>
        </div>
        <div className="row mb-5">
          <div className="col-sm-10 mx-auto">
            <ProgressBar variant="info" animated now={100} />
          </div>
        </div>
        <div className="row mb-5">
          <div className="col-sm-10 mx-auto">
            <button style={ButtonStyle} type="button" className="btn outline-dark" onClick={() => sendDashboard()}>Empezar velocidad de golpe</button>
          </div>
        </div>
      </div>
    </div>
  );
}
