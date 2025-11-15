import React from "react";
import { StyledInput } from "./StyledInput";
import { InlineMath } from "react-katex";
import { FormState } from "./constants";
import { useLanguage } from "@/hooks/useLanguage";

function InitialConfiguration({
  formState,
  handleChange,
  handleStartSimulation,
}: {
  formState: FormState;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleStartSimulation: () => void;
}) {
  const { myLanguage } = useLanguage();

  // Agrupar las configuraciones en dos columnas
  const leftColumnConfigs = [
    { name: "initialX", label: <InlineMath math="x_{0}" />, unit: "m" },
    { name: "initialY", label: <InlineMath math="y_{0}" />, unit: "m" },
    { name: "initialZ", label: <InlineMath math="z_{0}" />, unit: "m" },
    { name: "angle", label: <InlineMath math="\\varphi" />, unit: "°" },
  ];

  const rightColumnConfigs = [
    { name: "velocity", label: <InlineMath math="v_{0}" />, unit: "m/s" },
    { name: "theta", label: <InlineMath math="\\theta" />, unit: "°" },
    { name: "mass", label: <InlineMath math="m" />, unit: "kg" },
    { name: "gravity", label: <InlineMath math="g" />, unit: "m/s²" },
  ];

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border-2 border-cyan-500/30 p-4 backdrop-blur-sm h-full">
      <h2 className="text-lg font-bold text-cyan-400 mb-4 text-center flex items-center justify-center">
        <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full mr-2"></span>
        {myLanguage === "eng" ? "Configuration" : "Configuración"}
      </h2>

      <div className="grid grid-cols-2 gap-3 mb-4">
        {/* Columna izquierda - Posiciones y ángulo */}
        <div className="space-y-3">
          {leftColumnConfigs.map((config) => (
            <StyledInput
              key={config.name}
              label={
                <div className="flex items-center space-x-1">
                  <span className="text-cyan-300 text-sm">{config.label}</span>
                  <span className="text-gray-400 text-xs">({config.unit})</span>
                </div>
              }
              type="text"
              name={config.name}
              value={formState[config.name as keyof FormState]}
              onChange={handleChange}
            />
          ))}
        </div>

        {/* Columna derecha - Velocidad, masa y gravedad */}
        <div className="space-y-3">
          {rightColumnConfigs.map((config) => (
            <StyledInput
              key={config.name}
              label={
                <div className="flex items-center space-x-1">
                  <span className="text-cyan-300 text-sm">{config.label}</span>
                  <span className="text-gray-400 text-xs">({config.unit})</span>
                </div>
              }
              type="text"
              name={config.name}
              value={formState[config.name as keyof FormState]}
              onChange={handleChange}
            />
          ))}
        </div>
      </div>

      {/* Botón de inicio centrado en el ancho completo */}
      <button
        onClick={handleStartSimulation}
        className="w-full py-2 px-4 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/25 text-sm"
      >
        {myLanguage === "eng" ? "Start Simulation" : "Iniciar Simulación"}
      </button>
    </div>
  );
}

export default InitialConfiguration;