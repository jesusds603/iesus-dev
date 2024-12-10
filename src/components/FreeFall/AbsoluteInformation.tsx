import React from "react";
import { FormState } from "./constants";
import { useLanguage } from "@/hooks/useLanguage";

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
  const { myLanguage } = useLanguage();

  return (
    <div className="flex flex-col w-full md:w-[49%] p-2 m-1 bg-black rounded-xl border-2 border-teal-400">
      <h2 className="text-lg font-semibold text-white mb-2">
        {myLanguage === "eng" ? "Absolute Information" : "Información absoluta"}
      </h2>

      <div className="break-words">
        {myLanguage === "eng" ? "Max height: " : "Altura máxima: "}
        {` ${yMax.toFixed(2)}`}
      </div>

      <div className="break-words">
        {myLanguage === "eng" ? "Highest Position" : "Posición máxima"}

        {` X: ${(parseFloat(formState.initialX) + v0x * tMax).toFixed(
          2
        )}, Y: ${(parseFloat(formState.initialZ) + v0z * tMax).toFixed(
          2
        )}, Z: ${yMax.toFixed(2)}`}
      </div>

      <div className="break-words">
        {myLanguage === "eng"
          ? "Maximum height time: "
          : "Tiempo de altura máxima: "}
        {` ${tMax.toFixed(2)}`}
      </div>
      <div className="break-words">
        {myLanguage === "eng" ? "Final position: " : "Posición final: "}
        {`${xFloor.toFixed(2)}, ${zFloor.toFixed(2)}, 0`}
      </div>

      <div className="break-words">
        {myLanguage === "eng"
          ? "Final position time: "
          : "Tiempo de posición final :"}
        {`${tFloor.toFixed(2)}`}
      </div>

      <div className="break-words">
        {myLanguage === "eng"
          ? "Initial kinectic energy: "
          : "Energía cinética inicial: "}
        {`${initialKineticEnergy} J`}
      </div>

      <div className="break-words">
        {myLanguage === "eng"
          ? "Initial potential energy: "
          : "Energía potencial inicial: "}
        {`${initialPotentialEnergy.toFixed(2)} J`}
      </div>
    </div>
  );
}

export default AbsoluteInformation;
