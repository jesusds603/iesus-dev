"use client";
import { useSpaceShipControls } from "@/hooks/useSpaceShipControls";
import React from "react";

export function TouchControls() {
  const { updateKey } = useSpaceShipControls();

  // Estilos comunes para los botones - Más pequeños para móviles
  const buttonStyle = `
    w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center 
    text-white font-bold text-lg md:text-xl shadow-lg transition-all duration-200 
    active:scale-95 select-none touch-none
    bg-gradient-to-br from-cyan-500 to-blue-600 
    border-2 border-cyan-300/50
    active:from-cyan-600 active:to-blue-700
    active:border-cyan-400
    active:shadow-cyan-500/50
  `;

  const arrowButtonStyle = `
    w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center 
    text-white font-bold text-lg md:text-xl shadow-lg transition-all duration-200 
    active:scale-95 select-none touch-none
    bg-gradient-to-br from-purple-500 to-pink-600 
    border-2 border-purple-300/50
    active:from-purple-600 active:to-pink-700
    active:border-purple-400
    active:shadow-purple-500/50
  `;

  // Handlers para eventos táctiles
  const handleTouchStart = (key: string) => (e: React.TouchEvent) => {
    e.preventDefault();
    updateKey(key, true);
  };

  const handleTouchEnd = (key: string) => (e: React.TouchEvent) => {
    e.preventDefault();
    updateKey(key, false);
  };

  // Handlers para eventos de mouse (para testing en desktop)
  const handleMouseDown = (key: string) => () => {
    updateKey(key, true);
  };

  const handleMouseUp = (key: string) => () => {
    updateKey(key, false);
  };

  const handleMouseLeave = (key: string) => () => {
    updateKey(key, false);
  };

  return (
    <div className="flex flex-col items-center p-3 bg-black/30 backdrop-blur-sm rounded-xl border border-cyan-500/30 w-full max-w-2xl mx-auto">
      {/* Título más compacto */}
      <h3 className="text-cyan-300 font-bold text-base md:text-lg mb-3">Controles de Nave</h3>
      
      {/* Contenedor principal en fila */}
      <div className="flex flex-row justify-between items-start w-full gap-4 md:gap-6 lg:gap-8">
        
        {/* Grupo WASD - Izquierda */}
        <div className="flex flex-col items-center flex-1">
          <h4 className="text-cyan-200 text-xs md:text-sm font-semibold mb-2">Rotación</h4>
          <div className="grid grid-cols-3 gap-1 md:gap-2">
            {/* Espacio vacío arriba */}
            <div></div>
            
            {/* W - Inclinar arriba */}
            <button
              className={buttonStyle}
              onTouchStart={handleTouchStart("w")}
              onTouchEnd={handleTouchEnd("w")}
              onMouseDown={handleMouseDown("w")}
              onMouseUp={handleMouseUp("w")}
              onMouseLeave={handleMouseLeave("w")}
            >
              W
            </button>
            <div></div>
            
            {/* A - Balanceo izquierda */}
            <button
              className={buttonStyle}
              onTouchStart={handleTouchStart("a")}
              onTouchEnd={handleTouchEnd("a")}
              onMouseDown={handleMouseDown("a")}
              onMouseUp={handleMouseUp("a")}
              onMouseLeave={handleMouseLeave("a")}
            >
              A
            </button>
            
            {/* S - Inclinar abajo */}
            <button
              className={buttonStyle}
              onTouchStart={handleTouchStart("s")}
              onTouchEnd={handleTouchEnd("s")}
              onMouseDown={handleMouseDown("s")}
              onMouseUp={handleMouseUp("s")}
              onMouseLeave={handleMouseLeave("s")}
            >
              S
            </button>
            
            {/* D - Balanceo derecha */}
            <button
              className={buttonStyle}
              onTouchStart={handleTouchStart("d")}
              onTouchEnd={handleTouchEnd("d")}
              onMouseDown={handleMouseDown("d")}
              onMouseUp={handleMouseUp("d")}
              onMouseLeave={handleMouseLeave("d")}
            >
              D
            </button>
          </div>
        </div>

        {/* Grupo Flechas - Derecha */}
        <div className="flex flex-col items-center flex-1">
          <h4 className="text-purple-200 text-xs md:text-sm font-semibold mb-2">Movimiento</h4>
          <div className="grid grid-cols-3 gap-1 md:gap-2">
            {/* Espacio vacío arriba */}
            <div></div>
            
            {/* Flecha Arriba - Adelante */}
            <button
              className={arrowButtonStyle}
              onTouchStart={handleTouchStart("ArrowUp")}
              onTouchEnd={handleTouchEnd("ArrowUp")}
              onMouseDown={handleMouseDown("ArrowUp")}
              onMouseUp={handleMouseUp("ArrowUp")}
              onMouseLeave={handleMouseLeave("ArrowUp")}
            >
              ↑
            </button>
            <div></div>
            
            {/* Flecha Izquierda - Girar izquierda */}
            <button
              className={arrowButtonStyle}
              onTouchStart={handleTouchStart("ArrowLeft")}
              onTouchEnd={handleTouchEnd("ArrowLeft")}
              onMouseDown={handleMouseDown("ArrowLeft")}
              onMouseUp={handleMouseUp("ArrowLeft")}
              onMouseLeave={handleMouseLeave("ArrowLeft")}
            >
              ←
            </button>
            
            {/* Flecha Abajo - Atrás */}
            <button
              className={arrowButtonStyle}
              onTouchStart={handleTouchStart("ArrowDown")}
              onTouchEnd={handleTouchEnd("ArrowDown")}
              onMouseDown={handleMouseDown("ArrowDown")}
              onMouseUp={handleMouseUp("ArrowDown")}
              onMouseLeave={handleMouseLeave("ArrowDown")}
            >
              ↓
            </button>
            
            {/* Flecha Derecha - Girar derecha */}
            <button
              className={arrowButtonStyle}
              onTouchStart={handleTouchStart("ArrowRight")}
              onTouchEnd={handleTouchEnd("ArrowRight")}
              onMouseDown={handleMouseDown("ArrowRight")}
              onMouseUp={handleMouseUp("ArrowRight")}
              onMouseLeave={handleMouseLeave("ArrowRight")}
            >
              →
            </button>
          </div>
        </div>
      </div>

      {/* Leyenda de controles - Más compacta */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[10px] md:text-xs text-gray-400 text-center mt-3 w-full max-w-md">
        <div className="text-left">
          <p><span className="text-cyan-300">W/S</span>: Inclinar</p>
          <p><span className="text-cyan-300">A/D</span>: Balanceo</p>
        </div>
        <div className="text-right">
          <p><span className="text-purple-300">↑/↓</span>: Adelante/Atrás</p>
          <p><span className="text-purple-300">←/→</span>: Girar</p>
        </div>
      </div>
    </div>
  );
}