import React, {useState} from 'react';
import socket from "../Socket/Socket";

import GaugeChart from "react-gauge-chart";

export default function Ritmo() {
  //Hooks
  const [bmi, setBmi] = useState(0);
  const [ritmo, setRitmo] = useState("");

  const handleChangeBmi = event => setBmi(event.target.value);

  socket.on("ritmo", (arg) => {
    setRitmo(...ritmo, arg); // world
  });

  const gageCalc = bmi => {
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
  }

  return (
    <div>
      <input value={bmi} onChange={handleChangeBmi} />
      <GaugeChart
        id="gauge-chart"
        percent={gageCalc(bmi)}
        nrOfLevels={3}
        colors={["#FFFF00", "#228B22", "#FF0000"]}
      />
    </div>
  );
}