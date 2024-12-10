"use client";
import React from "react";
import { BlockMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useLanguage } from "@/hooks/useLanguage";

function Formulas() {
  const { myLanguage } = useLanguage();

  return (
    <div className="w-full flex flex-col">
      <h1 className="text-xl font-bold text-teal-400 my-2">Fórmulas</h1>
      <div className="flex flex-wrap md:flex-nowrap">
        <div className="flex flex-col w-full md:w-[33%] p-2 m-1 bg-black rounded-xl border-2 border-teal-400">
          <h2 className="text-lg font-semibold text-white mb-2">
            {myLanguage === "eng" ? "Initial velocity" : "Velocidad inicial"}
          </h2>

          <BlockMath math="v_{0x} = v_{0} \cdot \cos(\varphi) \cdot \cos(\theta)" />
          <BlockMath math="v_{0y} = v_{0} \cdot \sin(\varphi)" />
          <BlockMath math="v_{0z} = v_{0} \cdot \cos(\varphi) \cdot \sin(\theta)" />

          <h2 className="text-lg font-semibold text-white mb-2">
            {myLanguage === "eng" ? "Position" : "Posición"}
          </h2>

          <BlockMath math="x(t) = x_0 + v_{0x} \cdot t" />
          <BlockMath math="y(t) = y_0 + v_{0y} \cdot t - \frac{1}{2} g t^2" />
          <BlockMath math="z(t) = z_0 + v_{0z} \cdot t" />

          <h2 className="text-lg font-semibold text-white mb-2">
            {myLanguage === "eng"
              ? "Velocity as a time function"
              : "Velocidad en función del tiempo"}
          </h2>

          <BlockMath math="v_{x}(t) = v_{0x}" />
          <BlockMath math="v_{y}(t) = v_{0y} - g \cdot t" />
          <BlockMath math="v_{z}(t) = v_{0z}" />

          <h2 className="text-lg font-semibold text-white mb-2">
            {myLanguage === "eng" ? "Energy" : "Energía"}
          </h2>

          <BlockMath math="E_k = \frac{1}{2} m v^2" />
          <BlockMath math="E_p = m g y" />
          <BlockMath math="E_t = E_k + E_p" />
        </div>

        <div className="flex flex-col w-full md:w-[33%] p-2 m-1 bg-black rounded-xl border-2 border-teal-400">
          <h2 className="text-lg font-semibold text-white mb-2">
            {myLanguage === "eng" ? "Maximum height" : "Altura máxima"}
          </h2>

          <BlockMath math="y_{max} = y_0 + \frac{v_{0y}^2}{2g}" />
          <BlockMath math="t_{max} = \frac{v_{0y}}{g}" />
          <BlockMath math="x_{max} = x_0 + v_{0x} \cdot t_{max}" />
          <BlockMath math="z_{max} = z_0 + v_{0z} \cdot t_{max}" />

          <h2 className="text-lg font-semibold text-white mb-2">
            {myLanguage === "eng"
              ? "Velocities at maximum height"
              : "Velocidades en la altura máxima"}
          </h2>
          <BlockMath math="v_{x}(t_{max}) = v_{0x}" />
          <BlockMath math="v_{y}(t_{max}) = 0" />
          <BlockMath math="v_{z}(t_{max}) = v_{0z}" />
          <BlockMath math="v(t_{max}) = \sqrt{v_{0x}^2 + v_{0z}^2}" />
        </div>

        <div className="flex flex-col w-full md:w-[33%] p-2 m-1 bg-black rounded-xl border-2 border-teal-400">
          <h2 className="text-lg font-semibold text-white mb-2">
            {myLanguage === "eng" ? "Final position" : "Posición final"}
          </h2>
          <BlockMath math="x_{final} = x_0 + v_{0x} \cdot t_{floor}" />
          <BlockMath math="y_{final} = 0" />
          <BlockMath math="z_{final} = z_0 + v_{0z} \cdot t_{floor}" />
          <BlockMath math="t_{floor} = \frac{v_{0y} + \sqrt{v_{0y}^2 + 2gy_0}}{g}" />

          <h2 className="text-lg font-semibold text-white mb-2">
            {myLanguage === "eng"
              ? "Velocities at final position"
              : "Velocidades en posición final"}
          </h2>
          <BlockMath math="v_{x}(t_{floor}) = v_{0x}" />
          <BlockMath math="v_{y}(t_{floor}) = v_{0y} - g \cdot t_{floor}" />
          <BlockMath math="v_{z}(t_{floor}) = v_{0z}" />
        </div>
      </div>
    </div>
  );
}

export default Formulas;
