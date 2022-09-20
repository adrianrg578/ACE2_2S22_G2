import GaugeChart from "react-gauge-chart";
import React, { useEffect, useState } from 'react';
import socket from "../Socket/Socket";


export default function Ritmo() {
  //Hooks
  const [frecuencia, setFrecuencia] = useState({
    frecuencia: ""
  });
  const [ritmo, setRitmo] = useState("");

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
      [e.target.name]: e.target.value
    })
    console.log(frecuencia)
  };

  useEffect(() => {
    socket.on("ritmo", (arg) => {
      setRitmo(...ritmo, arg);
    });
  })

  /*const gageCalc = bmi => {
    var result = ritmo;
    if (bmi >= 16 && bmi <= 18.5) {
      result = getPercentage(bmi, 16, 18.5, 0);
    } else if (bmi > 18.5 && bmi < 25) {
      result = getPercentage(bmi, 18.5, 25, 0.33);
    } else if (bmi >= 25 && bmi <= 30) {
      result = getPercentage(bmi, 25, 30, 0.66);
    }
    return result;
  };

  function getPercentage(bmi, lowerBound, upperBound, segmentAdjustment) {
    return (
      (bmi - lowerBound) / (upperBound - lowerBound) / 3 + segmentAdjustment
    );
  }*/

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
                    onChange={handleInputChange}/>
                </div>
                <div className="col-sm-2 mx-auto">
                  <button style={InputStyle} type="button" class="btn outline-dark">Empezar Ritmo</button>
                </div>
              </div>

              <div className="mb-5 row rounded" style={BoxStyle}>
                <div className="col-sm-15 mx-auto">
                  <GaugeChart
                    percent={ritmo}
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

