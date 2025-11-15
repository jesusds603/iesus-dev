"use client";
import React from "react";
import { BlockMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useLanguage } from "@/hooks/useLanguage";

function Formulas() {
  const { myLanguage } = useLanguage();

  return (
    <div className="w-full flex flex-col">
      <h1 className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent my-4 text-center">
        {myLanguage === "eng" ? "Physics Formulas" : "Fórmulas de Física"}
      </h1>
      
      <div className="flex flex-col md:flex-row gap-4">
        {/* Columna 1 - Movimiento Básico */}
        <div className="flex-1 bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 border border-teal-500/30 shadow-2xl shadow-teal-500/10 hover:shadow-teal-500/20 transition-all duration-300 hover:border-teal-400/50">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-8 bg-gradient-to-b from-teal-400 to-cyan-400 rounded-full"></div>
            <h2 className="text-xl font-bold text-white">
              {myLanguage === "eng" ? "Basic Motion" : "Movimiento Básico"}
            </h2>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-teal-300 font-semibold mb-3 text-sm uppercase tracking-wider">
                {myLanguage === "eng" ? "Initial Velocity" : "Velocidad Inicial"}
              </h3>
              <div className="space-y-2 bg-gray-800/30 p-4 rounded-lg border-l-4 border-teal-500">
                <BlockMath math="v_{0x} = v_{0} \cdot \cos(\varphi) \cdot \cos(\theta)" />
                <BlockMath math="v_{0y} = v_{0} \cdot \sin(\varphi)" />
                <BlockMath math="v_{0z} = v_{0} \cdot \cos(\varphi) \cdot \sin(\theta)" />
              </div>
            </div>

            <div>
              <h3 className="text-teal-300 font-semibold mb-3 text-sm uppercase tracking-wider">
                {myLanguage === "eng" ? "Position" : "Posición"}
              </h3>
              <div className="space-y-2 bg-gray-800/30 p-4 rounded-lg border-l-4 border-cyan-500">
                <BlockMath math="x(t) = x_0 + v_{0x} \cdot t" />
                <BlockMath math="y(t) = y_0 + v_{0y} \cdot t - \frac{1}{2} g t^2" />
                <BlockMath math="z(t) = z_0 + v_{0z} \cdot t" />
              </div>
            </div>

            <div>
              <h3 className="text-teal-300 font-semibold mb-3 text-sm uppercase tracking-wider">
                {myLanguage === "eng" ? "Velocity" : "Velocidad"}
              </h3>
              <div className="space-y-2 bg-gray-800/30 p-4 rounded-lg border-l-4 border-teal-500">
                <BlockMath math="v_{x}(t) = v_{0x}" />
                <BlockMath math="v_{y}(t) = v_{0y} - g \cdot t" />
                <BlockMath math="v_{z}(t) = v_{0z}" />
              </div>
            </div>
          </div>
        </div>

        {/* Columna 2 - Punto Máximo */}
        <div className="flex-1 bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 border border-purple-500/30 shadow-2xl shadow-purple-500/10 hover:shadow-purple-500/20 transition-all duration-300 hover:border-purple-400/50">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-8 bg-gradient-to-b from-purple-400 to-pink-400 rounded-full"></div>
            <h2 className="text-xl font-bold text-white">
              {myLanguage === "eng" ? "Maximum Height" : "Altura Máxima"}
            </h2>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-purple-300 font-semibold mb-3 text-sm uppercase tracking-wider">
                {myLanguage === "eng" ? "Peak Values" : "Valores en el Pico"}
              </h3>
              <div className="space-y-2 bg-gray-800/30 p-4 rounded-lg border-l-4 border-purple-500">
                <BlockMath math="y_{max} = y_0 + \frac{v_{0y}^2}{2g}" />
                <BlockMath math="t_{max} = \frac{v_{0y}}{g}" />
                <BlockMath math="x_{max} = x_0 + v_{0x} \cdot t_{max}" />
                <BlockMath math="z_{max} = z_0 + v_{0z} \cdot t_{max}" />
              </div>
            </div>

            <div>
              <h3 className="text-purple-300 font-semibold mb-3 text-sm uppercase tracking-wider">
                {myLanguage === "eng" ? "Peak Velocities" : "Velocidades en el Pico"}
              </h3>
              <div className="space-y-2 bg-gray-800/30 p-4 rounded-lg border-l-4 border-pink-500">
                <BlockMath math="v_{x}(t_{max}) = v_{0x}" />
                <BlockMath math="v_{y}(t_{max}) = 0" />
                <BlockMath math="v_{z}(t_{max}) = v_{0z}" />
                <BlockMath math="v(t_{max}) = \sqrt{v_{0x}^2 + v_{0z}^2}" />
              </div>
            </div>
          </div>
        </div>

        {/* Columna 3 - Energía y Final */}
        <div className="flex-1 bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 border border-amber-500/30 shadow-2xl shadow-amber-500/10 hover:shadow-amber-500/20 transition-all duration-300 hover:border-amber-400/50">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-8 bg-gradient-to-b from-amber-400 to-orange-400 rounded-full"></div>
            <h2 className="text-xl font-bold text-white">
              {myLanguage === "eng" ? "Energy & Impact" : "Energía e Impacto"}
            </h2>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-amber-300 font-semibold mb-3 text-sm uppercase tracking-wider">
                {myLanguage === "eng" ? "Energy" : "Energía"}
              </h3>
              <div className="space-y-2 bg-gray-800/30 p-4 rounded-lg border-l-4 border-amber-500">
                <BlockMath math="E_k = \frac{1}{2} m v^2" />
                <BlockMath math="E_p = m g y" />
                <BlockMath math="E_t = E_k + E_p" />
              </div>
            </div>

            <div>
              <h3 className="text-amber-300 font-semibold mb-3 text-sm uppercase tracking-wider">
                {myLanguage === "eng" ? "Final Position" : "Posición Final"}
              </h3>
              <div className="space-y-2 bg-gray-800/30 p-4 rounded-lg border-l-4 border-orange-500">
                <BlockMath math="t_{floor} = \frac{v_{0y} + \sqrt{v_{0y}^2 + 2gy_0}}{g}" />
                <BlockMath math="x_{final} = x_0 + v_{0x} \cdot t_{floor}" />
                <BlockMath math="z_{final} = z_0 + v_{0z} \cdot t_{floor}" />
                <BlockMath math="y_{final} = 0" />
              </div>
            </div>

            <div>
              <h3 className="text-amber-300 font-semibold mb-3 text-sm uppercase tracking-wider">
                {myLanguage === "eng" ? "Final Velocities" : "Velocidades Finales"}
              </h3>
              <div className="space-y-2 bg-gray-800/30 p-4 rounded-lg border-l-4 border-amber-500">
                <BlockMath math="v_{x}(t_{floor}) = v_{0x}" />
                <BlockMath math="v_{y}(t_{floor}) = v_{0y} - g \cdot t_{floor}" />
                <BlockMath math="v_{z}(t_{floor}) = v_{0z}" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Leyenda de Variables */}
      <div className="mt-6 p-4 bg-gray-900/50 rounded-xl border border-gray-700">
        <h3 className="text-teal-300 font-semibold mb-3 text-center">
          {myLanguage === "eng" ? "Variables Legend" : "Leyenda de Variables"}
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-300">
          <div><span className="text-teal-400">v₀</span> - {myLanguage === "eng" ? "Initial velocity" : "Velocidad inicial"}</div>
          <div><span className="text-teal-400">φ, θ</span> - {myLanguage === "eng" ? "Angles" : "Ángulos"}</div>
          <div><span className="text-teal-400">g</span> - {myLanguage === "eng" ? "Gravity" : "Gravedad"}</div>
          <div><span className="text-teal-400">t</span> - {myLanguage === "eng" ? "Time" : "Tiempo"}</div>
          <div><span className="text-teal-400">Eₖ</span> - {myLanguage === "eng" ? "Kinetic energy" : "Energía cinética"}</div>
          <div><span className="text-teal-400">Eₚ</span> - {myLanguage === "eng" ? "Potential energy" : "Energía potencial"}</div>
          <div><span className="text-teal-400">Eₜ</span> - {myLanguage === "eng" ? "Total energy" : "Energía total"}</div>
          <div><span className="text-teal-400">m</span> - {myLanguage === "eng" ? "Mass" : "Masa"}</div>
        </div>
      </div>
    </div>
  );
}

export default Formulas;