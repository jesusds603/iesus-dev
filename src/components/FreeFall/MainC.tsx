"use client";
import React from "react";
import "katex/dist/katex.min.css";
import { FormState } from "./constants";
import CanvasC from "./CanvasC";
import InitialConfiguration from "./InitialConfiguration";
import CurrentInformation from "./CurrentInformation";
import AbsoluteInformation from "./AbsoluteInformation";

interface MainCProps {
  formState: FormState;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleStartSimulation: () => void;
  initialKineticEnergy: number;
  finalKineticEnergy: number;
  initialPotentialEnergy: number;
  finalPotentialEnergy: number;
  totalEnergy: number;
  tMax: number;
  yMax: number;
  v0x: number;
  v0z: number;
  tFloor: number;
  xFloor: number;
  zFloor: number;
  simulationRunning: boolean;
  resetSimulation: () => void;
}

function MainC({
  formState,
  handleChange,
  handleStartSimulation,
  initialKineticEnergy,
  finalKineticEnergy,
  initialPotentialEnergy,
  finalPotentialEnergy,
  totalEnergy,
  tMax,
  yMax,
  v0x,
  v0z,
  tFloor,
  xFloor,
  zFloor,
  simulationRunning,
  resetSimulation,
}: MainCProps) {
  return (
    <div className="flex flex-col md:flex-row">
      <InitialConfiguration
        formState={formState}
        handleChange={handleChange}
        handleStartSimulation={handleStartSimulation}
      />

      <div className="flex flex-col w-full mt-2 md:mt-0 md:ml-2">
        <div className="flex flex-wrap md:flex-nowrap">
          <CurrentInformation
            finalKineticEnergy={finalKineticEnergy}
            finalPotentialEnergy={finalPotentialEnergy}
            totalEnergy={totalEnergy}
          />

          <AbsoluteInformation
            formState={formState}
            initialKineticEnergy={initialKineticEnergy}
            initialPotentialEnergy={initialPotentialEnergy}
            tMax={tMax}
            yMax={yMax}
            v0x={v0x}
            v0z={v0z}
            tFloor={tFloor}
            xFloor={xFloor}
            zFloor={zFloor}
          />
        </div>

        <CanvasC
          formState={formState}
          simulationRunning={simulationRunning}
          resetSimulation={resetSimulation}
        />
      </div>
    </div>
  );
}

export default MainC;
