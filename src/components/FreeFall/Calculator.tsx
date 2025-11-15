import React from "react";
import { InlineMath } from "react-katex";
import { calculateValuesAtTime } from "./calculateValuesAtTime";
import { FormState } from "./constants";
import { useLanguage } from "@/hooks/useLanguage";

function Calculator({
  formState,
  sliderTime,
  tFloor,
  handleSliderChange,
  handleTimeInputChange,
}: {
  formState: FormState;
  sliderTime: number;
  tFloor: number;
  handleSliderChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleTimeInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const { myLanguage } = useLanguage();

  const valuesAtTime = calculateValuesAtTime(sliderTime, formState);

  const infoItems = [
    { label: <InlineMath math="x" />, value: valuesAtTime.position.x.toFixed(2), unit: "m" },
    { label: <InlineMath math="y" />, value: valuesAtTime.position.y.toFixed(2), unit: "m" },
    { label: <InlineMath math="z" />, value: valuesAtTime.position.z.toFixed(2), unit: "m" },
    { label: <InlineMath math="v_x" />, value: valuesAtTime.velocity.vx.toFixed(2), unit: "m/s" },
    { label: <InlineMath math="v_y" />, value: valuesAtTime.velocity.vy.toFixed(2), unit: "m/s" },
    { label: <InlineMath math="v_z" />, value: valuesAtTime.velocity.vz.toFixed(2), unit: "m/s" },
    { label: <InlineMath math="v" />, value: Math.sqrt(
      valuesAtTime.velocity.vx ** 2 +
      valuesAtTime.velocity.vy ** 2 +
      valuesAtTime.velocity.vz ** 2
    ).toFixed(2), unit: "m/s" },
    { label: <InlineMath math="E_k" />, value: valuesAtTime.kineticEnergy.toFixed(2), unit: "J" },
    { label: <InlineMath math="E_p" />, value: valuesAtTime.potentialEnergy.toFixed(2), unit: "J" },
    { label: <InlineMath math="E_t" />, value: valuesAtTime.totalEnergy.toFixed(2), unit: "J" }
  ];

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border-2 border-teal-500/30 p-6 backdrop-blur-sm mb-8">
      <h2 className="text-xl font-bold text-teal-400 mb-4 flex items-center">
        <span className="w-2 h-2 bg-teal-400 rounded-full mr-2"></span>
        {myLanguage === "eng" ? "Time Calculator" : "Calculadora de Tiempo"}
      </h2>

      {/* Control de tiempo */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <label className="text-white font-semibold">
            {myLanguage === "eng" ? "Time" : "Tiempo"} <InlineMath math="t" />: 
            <span className="text-cyan-300 ml-1">{sliderTime.toFixed(2)} s</span>
          </label>
          
          <div className="flex items-center">
            <input
              type="number"
              min="0"
              max={tFloor}
              step="0.01"
              value={sliderTime}
              onChange={handleTimeInputChange}
              className="p-2 rounded-lg bg-gray-700 text-white border border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-500 w-24 text-center"
            />
            <span className="text-white ml-2">s</span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <span className="text-sm text-gray-400">0 s</span>
          <input
            type="range"
            min="0"
            max={tFloor}
            step="0.01"
            value={sliderTime}
            onChange={handleSliderChange}
            className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-thumb"
          />
          <span className="text-sm text-gray-400">{tFloor.toFixed(2)} s</span>
        </div>
      </div>

      {/* Información en el tiempo seleccionado */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-3">
          {myLanguage === "eng" ? "Values at time" : "Valores en tiempo"} <InlineMath math="t" /> = {sliderTime.toFixed(2)} s
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {infoItems.map((item, index) => (
            <div key={index} className="bg-black/40 rounded-lg p-3 border border-cyan-500/20">
              <div className="flex items-center justify-between">
                <span className="text-cyan-300 font-medium">{item.label}</span>
                <span className="text-white font-bold">
                  {item.value} <span className="text-sm text-gray-400">{item.unit}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Calculator;