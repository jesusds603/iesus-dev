import React from "react";
import { InlineMath } from "react-katex";
import { useShip } from "@/hooks/useShip";
import { useLanguage } from "@/hooks/useLanguage";
import { useSphereGame } from "@/hooks/useSphereGame";

function CurrentInformation({
  finalKineticEnergy,
  finalPotentialEnergy,
  totalEnergy,
}: {
  finalKineticEnergy: number;
  finalPotentialEnergy: number;
  totalEnergy: number;
}) {
  const { posSphere, timeS } = useSphereGame();
  const { position } = useShip();
  const { myLanguage } = useLanguage();

  const infoItems = [
    {
      label: myLanguage === "eng" ? "Time" : "Tiempo",
      value: `${timeS.toFixed(2)} s`,
      math: "t"
    },
    {
      label: myLanguage === "eng" ? "Sphere Position" : "Posición Esfera",
      value: `X:${posSphere.x.toFixed(1)} Y:${posSphere.y.toFixed(1)} Z:${posSphere.z.toFixed(1)}`,
      math: ""
    },
    {
      label: myLanguage === "eng" ? "Ship Position" : "Posición Nave",
      value: `X:${position.x.toFixed(1)} Y:${position.y.toFixed(1)} Z:${position.z.toFixed(1)}`,
      math: ""
    },
    {
      label: myLanguage === "eng" ? "Kinetic Energy" : "Energía Cinética",
      value: `${finalKineticEnergy.toFixed(2)} J`,
      math: "E_k"
    },
    {
      label: myLanguage === "eng" ? "Potential Energy" : "Energía Potencial",
      value: `${finalPotentialEnergy.toFixed(2)} J`,
      math: "E_p"
    },
    {
      label: myLanguage === "eng" ? "Total Energy" : "Energía Total",
      value: `${totalEnergy.toFixed(2)} J`,
      math: "E_t"
    }
  ];

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border-2 border-teal-500/30 p-3 backdrop-blur-sm h-full">
      <h2 className="text-base font-bold text-teal-400 mb-2 flex items-center">
        <span className="w-1.5 h-1.5 bg-teal-400 rounded-full mr-2"></span>
        {myLanguage === "eng" ? "Current Information" : "Información Actual"}
      </h2>

      <div className="space-y-1.5">
        {infoItems.map((item, index) => (
          <div key={index} className="flex items-center justify-between text-xs">
            <div className="flex items-center text-cyan-300 font-medium flex-shrink-0">
              {item.math && <InlineMath math={item.math} />}
              <span className="truncate">{item.label}:</span>
            </div>
            <div className="text-white text-right font-mono flex-shrink-0 ml-2">
              {item.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CurrentInformation;