import React from "react";
import { InlineMath, BlockMath } from "react-katex";
import { calculateValuesAtTime } from "./calculateValuesAtTime";
import { FormState } from "./constants";

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
  const valuesAtTime = calculateValuesAtTime(sliderTime, formState);

  return (
    <div className="w-full flex flex-col mt-4">
      <div className="w-full mt-4 px-4">
        <h1 className="text-xl font-bold text-teal-400 my-2">Calculadora</h1>
        <label htmlFor="timeSlider" className="text-white font-semibold">
          Tiempo (t): {sliderTime.toFixed(2)} s
        </label>
        <div className="flex flex-row">
          <p className="flex flex-row mr-2">
            0 <InlineMath math="s" />
          </p>
          <input
            id="timeSlider"
            type="range"
            min="0"
            max={tFloor}
            step="0.01"
            value={sliderTime}
            onChange={handleSliderChange}
            className="w-full mt-2"
          />

          <p className="flex flex-row ml-2">
            {tFloor.toFixed(2)}
            <InlineMath math="s" />
          </p>
        </div>

        <div className="mt-2">
          <label htmlFor="timeInput" className="text-white font-semibold mr-2">
            Tiempo (t):
          </label>
          <input
            id="timeInput"
            type="number"
            min="0"
            max={tFloor}
            step="0.01"
            value={sliderTime}
            onChange={handleTimeInputChange}
            className="p-1 rounded-lg bg-gray-700 text-white border border-teal-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent w-[100px]"
          />
        </div>
      </div>

      <div className="flex flex-col relative w-full md:w-[49%] p-2 m-1 bg-black rounded-xl border-2 border-teal-400 mt-4 ">
        <h2 className="text-lg font-semibold text-white mb-2">
          Información a Tiempo <InlineMath math="t" />
        </h2>
        <div>
          <InlineMath math="t" /> = {sliderTime.toFixed(2)} s
        </div>
        <div className="break-words">
          {<InlineMath math="x" />} = {valuesAtTime.position.x.toFixed(2)},
          {"   "}
          {<InlineMath math="y" />} = {valuesAtTime.position.y.toFixed(2)},
          {"   "}
          {<InlineMath math="z" />} = {valuesAtTime.position.z.toFixed(2)}
        </div>
        <div className="break-words">
          {<InlineMath math="v_x" />} = {valuesAtTime.velocity.vx.toFixed(2)},
          {"   "}
          {<InlineMath math="v_y" />} = {valuesAtTime.velocity.vy.toFixed(2)},
          {"   "}
          {<InlineMath math="v_z" />} = {valuesAtTime.velocity.vz.toFixed(2)}
        </div>
        <div className="break-words">
          {" "}
          {<InlineMath math="v" />} ={" "}
          {Math.sqrt(
            valuesAtTime.velocity.vx ** 2 +
              valuesAtTime.velocity.vy ** 2 +
              valuesAtTime.velocity.vz ** 2
          ).toFixed(2)}
        </div>
        <div className="break-words">
          <InlineMath math="E_k" /> = {valuesAtTime.kineticEnergy.toFixed(2)} J
        </div>
        <div className="break-words">
          <InlineMath math="E_p" /> = {valuesAtTime.potentialEnergy.toFixed(2)}{" "}
          J
        </div>
        <div className="break-words">
          <InlineMath math="E_t" /> = {valuesAtTime.totalEnergy.toFixed(2)} J
        </div>
      </div>
    </div>
  );
}

export default Calculator;
