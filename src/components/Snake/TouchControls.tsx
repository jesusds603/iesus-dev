"use client";
import React from "react";
import { Position } from "./constants";

interface TouchControlsProps {
  onDirectionChange: (direction: Position) => void;
}

function TouchControls({ onDirectionChange }: TouchControlsProps) {
  const handleSwipe = (direction: Position) => {
    onDirectionChange(direction);
  };

  const buttonStyle = `
    w-14 h-14 rounded-full flex items-center justify-center 
    text-white font-bold text-lg shadow-lg transition-all duration-200 
    active:scale-90 select-none touch-none
    bg-gradient-to-br from-purple-600 to-blue-600 
    border-2 border-purple-400/50
    active:from-purple-700 active:to-blue-700
    active:border-purple-300
    active:shadow-purple-500/50
  `;

  return (
    <div className="flex flex-col items-center p-4 bg-black/30 backdrop-blur-sm rounded-2xl border border-purple-500/30 w-full">
      <h3 className="text-purple-300 font-bold text-lg mb-4">Touch Controls</h3>
      
      <div className="relative w-40 h-40">
        {/* Centro */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-10 h-10 bg-purple-600/30 rounded-full border border-purple-400/50"></div>
        </div>

        {/* Arriba */}
        <button
          className={`${buttonStyle} absolute top-0 left-1/2 transform -translate-x-1/2 -mt-1`}
          onClick={() => handleSwipe({ x: 0, y: -1 })}
          onTouchStart={(e) => {
            e.preventDefault();
            handleSwipe({ x: 0, y: -1 });
          }}
        >
          ↑
        </button>

        {/* Abajo */}
        <button
          className={`${buttonStyle} absolute bottom-0 left-1/2 transform -translate-x-1/2 -mb-1`}
          onClick={() => handleSwipe({ x: 0, y: 1 })}
          onTouchStart={(e) => {
            e.preventDefault();
            handleSwipe({ x: 0, y: 1 });
          }}
        >
          ↓
        </button>

        {/* Izquierda */}
        <button
          className={`${buttonStyle} absolute left-0 top-1/2 transform -translate-y-1/2 -ml-1`}
          onClick={() => handleSwipe({ x: -1, y: 0 })}
          onTouchStart={(e) => {
            e.preventDefault();
            handleSwipe({ x: -1, y: 0 });
          }}
        >
          ←
        </button>

        {/* Derecha */}
        <button
          className={`${buttonStyle} absolute right-0 top-1/2 transform -translate-y-1/2 -mr-1`}
          onClick={() => handleSwipe({ x: 1, y: 0 })}
          onTouchStart={(e) => {
            e.preventDefault();
            handleSwipe({ x: 1, y: 0 });
          }}
        >
          →
        </button>
      </div>
    </div>
  );
}

export default TouchControls;