"use client";
import React, { useState, useEffect } from 'react';
import { useTheme } from '@/hooks/useTheme';
import { useLanguage } from '@/hooks/useLanguage';
import { useHanoiGame } from '@/hooks/useHanoiGame';
import GameControls from '@/components/Hanoi/GameControls';
import GameStats from '@/components/Hanoi/GameStats';
import Tower from '@/components/Hanoi/Tower';

const HanoiGame: React.FC = () => {
  const { myTheme } = useTheme();
  const { myLanguage } = useLanguage();
  const [hoveredTower, setHoveredTower] = useState<number | null>(null);

  const {
    numRings,
    towers,
    moveCount,
    message,
    minMoves,
    selectedRing,
    isDragging,
    handleRingChange,
    resetGame,
    selectRing,
    dropRing,
    cancelDrag,
  } = useHanoiGame({ initialRings: 5, myLanguage });

  // Colores vibrantes para los anillos
  const ringColors = [
    '#FF6B6B', '#4ECDC4', '#FFD166', '#06D6A0', '#118AB2', 
    '#073B4C', '#EF476F', '#7209B7', '#3A86FF', '#FB5607'
  ];

  // Efecto para cancelar drag al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isDragging && !(e.target as Element).closest('.tower')) {
        cancelDrag();
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isDragging, cancelDrag]);

  const handleTowerClick = (towerIndex: number) => {
    if (selectedRing) {
      dropRing(towerIndex);
    }
  };

  const handleRingClick = (towerIndex: number, ring: number) => {
    if (selectedRing) {
      if (selectedRing.towerIndex === towerIndex && selectedRing.ring === ring) {
        cancelDrag();
      } else {
        dropRing(towerIndex);
      }
    } else {
      // Solo permitir seleccionar el anillo superior
      if (ring === towers[towerIndex][towers[towerIndex].length - 1]) {
        selectRing(towerIndex, ring);
      }
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent mb-4">
            🗼 {myLanguage === "eng" ? "Tower of Hanoi" : "Torre de Hanoi"}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {myLanguage === "eng" 
              ? "Move all rings to the rightmost tower. Larger rings cannot be placed on smaller ones."
              : "Mueve todos los anillos a la torre de la derecha. Los anillos grandes no pueden ir sobre pequeños."
            }
          </p>
        </div>

        {/* Controles del juego */}
        <GameControls
          numRings={numRings}
          onRingChange={handleRingChange}
          onReset={resetGame}
          myLanguage={myLanguage}
          myTheme={myTheme}
        />

        {/* Estadísticas y mensajes */}
        <GameStats
          moveCount={moveCount}
          minMoves={minMoves}
          message={message}
          myLanguage={myLanguage}
        />

        {/* Área del juego */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 mb-8">
          <div className="flex justify-around items-end gap-4 flex-wrap tower">
            {towers.map((towerRings, towerIndex) => (
              <Tower
                key={towerIndex}
                towerIndex={towerIndex}
                rings={towerRings}
                isHovered={hoveredTower === towerIndex}
                isDropTarget={isDragging && hoveredTower === towerIndex && selectedRing?.towerIndex !== towerIndex}
                selectedRing={selectedRing}
                onRingClick={handleRingClick}
                onTowerClick={handleTowerClick}
                onTowerHover={setHoveredTower}
                ringColors={ringColors}
                myLanguage={myLanguage}
                myTheme={myTheme}
              />
            ))}
          </div>
        </div>

        {/* Instrucciones detalladas */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
            📖 {myLanguage === "eng" ? "How to Play" : "Cómo Jugar"}
          </h3>
          <ul className="grid md:grid-cols-2 gap-3 text-gray-600 dark:text-gray-400">
            <li>• {myLanguage === "eng" ? "Click top rings to select" : "Click en anillos superiores para seleccionar"}</li>
            <li>• {myLanguage === "eng" ? "Click towers to move selected ring" : "Click en torres para mover anillo seleccionado"}</li>
            <li>• {myLanguage === "eng" ? "Right-click to cancel selection" : "Click derecho para cancelar selección"}</li>
            <li>• {myLanguage === "eng" ? "Large rings can't go on small ones" : "Anillos grandes no van sobre pequeños"}</li>
            <li>• {myLanguage === "eng" ? "Goal: Move all rings to right tower" : "Objetivo: Mover todos a la torre derecha"}</li>
            <li>• {myLanguage === "eng" ? "Try to solve in minimum moves" : "Intenta resolver en movimientos mínimos"}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HanoiGame;