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
    <div className="flex flex-col gap-4 mb-6">
      {/* Fila superior: Tres componentes que se adaptan al espacio disponible */}
      <div className="flex flex-col md:flex-row flex-wrap gap-3 min-w-0">
        {/* Configuración inicial - Ancho flexible */}
        <div className="flex-1 min-w-[180px] max-w-[300px] lg:max-w-none">
          <InitialConfiguration
            formState={formState}
            handleChange={handleChange}
            handleStartSimulation={handleStartSimulation}
          />
        </div>

        {/* Información actual - Ancho flexible */}
        <div className="flex-1 min-w-[180px] max-w-[300px] lg:max-w-none">
          <CurrentInformation
            finalKineticEnergy={finalKineticEnergy}
            finalPotentialEnergy={finalPotentialEnergy}
            totalEnergy={totalEnergy}
          />
        </div>

        {/* Información absoluta - Ancho flexible */}
        <div className="flex-1 min-w-[180px] max-w-[300px] lg:max-w-none">
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
      </div>

      {/* Canvas 3D - Ancho completo siempre */}
      <div className="bg-black/40 rounded-xl border-2 border-cyan-500/30 backdrop-blur-sm overflow-hidden min-h-[500px] w-full">
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