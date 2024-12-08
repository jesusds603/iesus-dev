import React from "react";
import { FormState } from "./constants";

function AbsoluteInformation({
  formState,
  initialKineticEnergy,
  initialPotentialEnergy,
  tMax,
  yMax,
  v0x,
  v0z,
  tFloor,
  xFloor,
  zFloor,
}: {
  formState: FormState;
  initialKineticEnergy: number;
  initialPotentialEnergy: number;
  tMax: number;
  yMax: number;
  v0x: number;
  v0z: number;
  tFloor: number;
  xFloor: number;
  zFloor: number;
}) {
  return (
    <div className="flex flex-col w-full md:w-[49%] p-2 m-1 bg-black rounded-xl border-2 border-teal-400">
      <h2 className="text-lg font-semibold text-white mb-2">
        Información absoluta
      </h2>
      <div className="break-words">{`Altura máxima: ${yMax.toFixed(2)}`}</div>
      <div className="break-words">
        Posición máxima:
        {` X: ${(parseFloat(formState.initialX) + v0x * tMax).toFixed(
          2
        )}, Y: ${(parseFloat(formState.initialZ) + v0z * tMax).toFixed(
          2
        )}, Z: ${yMax.toFixed(2)}`}
      </div>
      <div className="break-words">{`Tiempo de altura máxima: ${tMax.toFixed(
        2
      )}`}</div>
      <div className="break-words">{`Posición final: ${xFloor.toFixed(
        2
      )}, ${zFloor.toFixed(2)}, 0`}</div>
      <div className="break-words">{`Tiempo de posición final: ${tFloor.toFixed(
        2
      )}`}</div>
      <div className="break-words">{`Energía Cinética Inicial: ${initialKineticEnergy} J`}</div>
      <div className="break-words">{`Energía Potencial Inicial: ${initialPotentialEnergy.toFixed(
        2
      )} J`}</div>
    </div>
  );
}

export default AbsoluteInformation;
