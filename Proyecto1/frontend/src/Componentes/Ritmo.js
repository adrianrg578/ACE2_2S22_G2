import GaugeChart from "react-gauge-chart";
import React, { useEffect, useState } from 'react';
import socket from "../Socket/Socket";


export default function Ritmo() {
  //Hooks
  const [frecuencia, setFrecuencia] = useState({ 
    frecuencia: 0 
  });
  const [ritmo, setRitmo] = useState("");
  const [tiempo, setTiempo] = useState("");

  //Estilos
  const InputStyle = {
    "backgroundColor": "rgba(5,.5,0.5,.3)",
    "border": "none",
    "color": "white"
  };

  const BoxStyle = {
    background: "rgba(5,.5,0.5,.3)"
  };

  //Funciones
  const handleInputChange = (e) => {
    setFrecuencia({
      ...frecuencia,
      [e.target.name] : e.target.value
  })
  };


  useEffect(() => {
    socket.on("ritmo", (datos) => {
      setRitmo(datos.ritmo);
      setTiempo(datos.tiempo);
      /*callback({
        IdUser: "dataUsuario.IdUser"
      });*/
    });
  }, [ritmo, tiempo])

  const sendDashboard = async () => {
    console.log(frecuencia.frecuencia)
    console.log(tiempo)
  }


  return (
    <div className="container">
      <div className="row d-flex rounded justify-content-center align-items-center" >
        <div className="col-6 rounded  d-flex justify-content-center align-items-center" >
          <div className="container">
            <form className="container-flex">

              <div className="mb-3 row" >
                <div className="col-10 mx-auto">
                  <input
                    style={InputStyle}
                    className="form-control-lg"
                    placeholder="Frecuencia 0.5 a 1.5 seg"
                    name="frecuencia"
                    onChange={handleInputChange} />
                </div>
                <div className="col-sm-2 mx-auto">
                  <button style={InputStyle} onClick={()=>sendDashboard()} type="button" class="btn outline-dark">Empezar Ritmo</button>
                </div>
              </div>

              <div className="mb-5 row rounded" style={BoxStyle}>
                <div className="col-sm-15 mx-auto">
                  <GaugeChart
                    percent={((tiempo*100/(frecuencia.frecuencia))/100)}
                    nrOfLevels={3}
                    colors={["#566573", "#2C3E50", "#566573"]}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

