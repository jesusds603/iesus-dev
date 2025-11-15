import React from "react";
import { FormState } from "./constants";
import { useLanguage } from "@/hooks/useLanguage";
import { InlineMath } from "react-katex";

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

  const infoItems = [
    {
      label: myLanguage === "eng" ? "Max Height" : "Altura Máx",
      value: `${yMax.toFixed(1)}m`,
      math: "y_{max}"
    },
    {
      label: myLanguage === "eng" ? "Max Pos" : "Pos Máx",
      value: `X:${(parseFloat(formState.initialX) + v0x * tMax).toFixed(1)} Z:${(parseFloat(formState.initialZ) + v0z * tMax).toFixed(1)}`,
      math: ""
    },
    {
      label: myLanguage === "eng" ? "Time Max H" : "Tiempo Alt Máx",
      value: `${tMax.toFixed(2)}s`,
      math: "t_{max}"
    },
    {
      label: myLanguage === "eng" ? "Final Pos" : "Pos Final",
      value: `X:${xFloor.toFixed(1)} Z:${zFloor.toFixed(1)}`,
      math: ""
    },
    {
      label: myLanguage === "eng" ? "Time Final" : "Tiempo Final",
      value: `${tFloor.toFixed(2)}s`,
      math: "t_{floor}"
    },
    {
      label: myLanguage === "eng" ? "Init Kinetic" : "En Cinética Ini",
      value: `${initialKineticEnergy.toFixed(1)}J`,
      math: "E_{k0}"
    },
    {
      label: myLanguage === "eng" ? "Init Potential" : "En Potencial Ini",
      value: `${initialPotentialEnergy.toFixed(1)}J`,
      math: "E_{p0}"
    }
  ];

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border-2 border-purple-500/30 p-3 backdrop-blur-sm h-full">
      <h2 className="text-base font-bold text-purple-400 mb-2 flex items-center">
        <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-2"></span>
        {myLanguage === "eng" ? "Absolute Info" : "Info Absoluta"}
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

export default AbsoluteInformation;