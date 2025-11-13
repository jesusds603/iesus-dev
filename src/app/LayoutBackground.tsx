import React from "react";
import { useTheme } from "@/hooks/useTheme";

function LayoutBackground() {
  const { myTheme } = useTheme();
  const isDark = myTheme === "dark";

  return (
    <div className={`fixed inset-0 overflow-hidden ${isDark ? "bg-black" : "bg-white"}`}>
      
      {/* Fondo base optimizado para ambos temas */}
      <div
        className={`absolute inset-0 w-full h-full ${
          isDark
            ? "bg-gradient-to-br from-black via-purple-900/8 to-cyan-900/5"
            : "bg-gradient-to-br from-white via-blue-50/30 to-pink-50/25"
        }`}
      ></div>

      {/* Patrón de ruido sutil */}
      <div className={`absolute inset-0 w-full h-full bg-noise ${isDark ? "opacity-[0.025]" : "opacity-[0.015]"}`}></div>

      {/* Grid más visible */}
      <div className={`absolute inset-0 w-full h-full ${isDark ? "bg-grid-white opacity-[0.03]" : "bg-grid-blue opacity-[0.02]"}`}></div>

      {/* === ELEMENTOS PRINCIPALES PARA AMBOS TEMAS === */}

      {/* Destello central principal */}
      <div
        className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full ${
          isDark
            ? "bg-radial-gradient(circle, rgba(34,211,238,0.2) 0%, rgba(139,92,246,0.15) 25%, rgba(236,72,153,0.1) 40%, transparent 70%)"
            : "bg-radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(168,85,247,0.12) 25%, rgba(236,72,153,0.08) 40%, transparent 70%)"
        } animate-pulse-slow`}
      ></div>

      {/* Orbitales mejorados */}
      <div
        className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border-2 ${
          isDark
            ? "border-cyan-400/30 shadow-glow-orbital-strong"
            : "border-blue-400/25 shadow-glow-orbital-light"
        } animate-spin-slow`}
      ></div>

      <div
        className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border-2 ${
          isDark
            ? "border-purple-400/35 shadow-glow-orbital-purple-strong"
            : "border-purple-400/30 shadow-glow-orbital-purple-light"
        } animate-spin-slow-reverse`}
      ></div>

      {/* Orbital pequeño interno */}
      <div
        className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full border ${
          isDark
            ? "border-green-400/40 shadow-glow-green-orbital"
            : "border-emerald-400/35 shadow-glow-green-orbital-light"
        } animate-spin-medium`}
      ></div>

      {/* === RAYOS MEJORADOS PARA TEMA CLARO === */}

      {/* Rayos principales */}
      <div
        className={`fixed top-0 left-1/4 w-1.5 h-2/3 ${
          isDark
            ? "bg-gradient-to-b from-cyan-400/0 via-cyan-400/50 to-cyan-400/0 shadow-glow-cyan-ray-strong"
            : "bg-gradient-to-b from-blue-400/0 via-blue-400/45 to-blue-400/0 shadow-glow-cyan-ray-light"
        } transform -rotate-45 animate-pulse-ray-strong`}
      ></div>

      <div
        className={`fixed bottom-0 right-1/4 w-1.5 h-2/3 ${
          isDark
            ? "bg-gradient-to-t from-purple-400/0 via-purple-400/50 to-purple-400/0 shadow-glow-purple-ray-strong"
            : "bg-gradient-to-t from-purple-400/0 via-purple-400/45 to-purple-400/0 shadow-glow-purple-ray-light"
        } transform rotate-45 animate-pulse-ray-strong`}
        style={{ animationDelay: '2s' }}
      ></div>

      {/* Rayos diagonales cruzados */}
      <div
        className={`fixed top-1/4 right-1/5 w-1 h-1/2 ${
          isDark
            ? "bg-gradient-to-b from-pink-400/0 via-pink-400/45 to-green-400/0 shadow-glow-pink-ray-strong"
            : "bg-gradient-to-b from-pink-400/0 via-pink-400/40 to-emerald-400/0 shadow-glow-pink-ray-light"
        } transform rotate-60 animate-pulse-ray`}
        style={{ animationDelay: '1s' }}
      ></div>

      <div
        className={`fixed bottom-1/4 left-1/5 w-1 h-1/2 ${
          isDark
            ? "bg-gradient-to-t from-green-400/0 via-green-400/45 to-cyan-400/0 shadow-glow-green-ray"
            : "bg-gradient-to-t from-emerald-400/0 via-emerald-400/40 to-blue-400/0 shadow-glow-green-ray-light"
        } transform -rotate-60 animate-pulse-ray`}
        style={{ animationDelay: '1.5s' }}
      ></div>

      {/* === NODOS DE ENERGÍA MEJORADOS === */}

      {/* Nodos principales */}
      <div className="space-y-8">
        <div
          className={`fixed top-1/4 left-1/4 w-6 h-6 rounded-full animate-float-glow-strong ${
            isDark 
              ? "bg-cyan-400 shadow-glow-cyan-node-strong" 
              : "bg-blue-500 shadow-glow-cyan-node-light"
          }`}
        ></div>
        <div
          className={`fixed top-3/4 right-1/4 w-6 h-6 rounded-full animate-float-glow-strong ${
            isDark 
              ? "bg-purple-400 shadow-glow-purple-node-strong" 
              : "bg-purple-500 shadow-glow-purple-node-light"
          }`}
          style={{ animationDelay: '2s' }}
        ></div>
        <div
          className={`fixed bottom-1/4 left-3/4 w-5 h-5 rounded-full animate-float-glow-strong ${
            isDark 
              ? "bg-pink-400 shadow-glow-pink-node-strong" 
              : "bg-pink-500 shadow-glow-pink-node-light"
          }`}
          style={{ animationDelay: '1s' }}
        ></div>
        <div
          className={`fixed top-1/2 right-1/3 w-5 h-5 rounded-full animate-float-glow-strong ${
            isDark 
              ? "bg-green-400 shadow-glow-green-node" 
              : "bg-emerald-500 shadow-glow-green-node-light"
          }`}
          style={{ animationDelay: '3s' }}
        ></div>
      </div>

      {/* Nodos secundarios */}
      <div
        className={`fixed top-1/3 left-2/3 w-3 h-3 rounded-full ${
          isDark 
            ? "bg-cyan-400 shadow-glow-cyan" 
            : "bg-blue-400 shadow-glow-cyan-light"
        } animate-pulse-particle-strong`}
      ></div>
      <div
        className={`fixed bottom-2/3 right-2/3 w-3 h-3 rounded-full ${
          isDark 
            ? "bg-purple-400 shadow-glow-purple" 
            : "bg-purple-400 shadow-glow-purple-light"
        } animate-pulse-particle-strong`}
        style={{ animationDelay: '0.7s' }}
      ></div>

      {/* === LÍNEAS DE CONEXIÓN MEJORADAS === */}

      {/* Líneas de borde */}
      <div
        className={`absolute top-0 left-0 w-full h-1 ${
          isDark
            ? "bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent shadow-glow-line-strong"
            : "bg-gradient-to-r from-transparent via-blue-400/35 to-transparent shadow-glow-line-light"
        }`}
      ></div>
      <div
        className={`absolute top-0 left-0 w-1 h-full ${
          isDark
            ? "bg-gradient-to-b from-transparent via-purple-400/40 to-transparent shadow-glow-line-strong"
            : "bg-gradient-to-b from-transparent via-purple-400/35 to-transparent shadow-glow-line-light"
        }`}
      ></div>

      {/* Líneas horizontales y verticales centrales */}
      <div
        className={`absolute top-1/2 left-0 w-full h-0.5 ${
          isDark
            ? "bg-gradient-to-r from-transparent via-green-400/30 to-transparent"
            : "bg-gradient-to-r from-transparent via-emerald-400/25 to-transparent"
        }`}
      ></div>
      <div
        className={`absolute top-0 left-1/2 w-0.5 h-full ${
          isDark
            ? "bg-gradient-to-b from-transparent via-pink-400/30 to-transparent"
            : "bg-gradient-to-b from-transparent via-pink-400/25 to-transparent"
        }`}
      ></div>
    </div>
  );
}

export default LayoutBackground;