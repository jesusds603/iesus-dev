import React from "react";
import { InlineMath } from "react-katex";
import { useSphere } from "@/hooks/useSphere";
import { useShip } from "@/hooks/useShip";
import { useLanguage } from "@/hooks/useLanguage";

function CurrentInformation({
  finalKineticEnergy,
  finalPotentialEnergy,
  totalEnergy,
}: {
  finalKineticEnergy: number;
  finalPotentialEnergy: number;
  totalEnergy: number;
}) {
  const { posSphere, timeS } = useSphere();
  const { position } = useShip();
  const { myLanguage } = useLanguage();

  return (
    <div className="flex flex-col relative w-full md:w-[49%] p-2 m-1 bg-black rounded-xl border-2 border-teal-400">
      <h2 className="text-lg font-semibold text-white mb-2">
        {myLanguage === "eng" ? "Current information" : "Información actual"}
      </h2>
      <div>
        <InlineMath math="t" />
        {`: ${timeS.toFixed(2)} `} <InlineMath math="s" />
      </div>

      <div className="break-words">
        {myLanguage === "eng" ? "Sphere position: " : "Posición esfera: "}

        <InlineMath math="x" />
        {`: ${posSphere.x.toFixed(2)}, Y: ${posSphere.y.toFixed(
          2
        )}, Z: ${posSphere.z.toFixed(2)}`}
      </div>

      <div className="break-words">
        {myLanguage === "eng" ? "Ship position: " : "Posición esfera: "}

        {` X: ${position.x.toFixed(2)}, Y: ${position.y.toFixed(
          2
        )}, Z: ${position.z.toFixed(2)}`}
      </div>

      <div className="break-words">
        {myLanguage === "eng" ? "Kinetic enegery: " : "Energía cinética: "}

        {`${finalKineticEnergy.toFixed(2)} J`}
      </div>
      <div className="break-words">
        {myLanguage === "eng" ? "Potential energy: " : "Energía potencial: "}

        {`${finalPotentialEnergy.toFixed(2)} J`}
      </div>
      <div className="break-words">
        {myLanguage === "eng" ? "Total energy: " : "Energía total: "}

        {`${totalEnergy.toFixed(2)} J`}
      </div>
    </div>
  );
}

export default CurrentInformation;
