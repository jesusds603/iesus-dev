// components/Hanoi/Tower.tsx
import React from 'react';
import Ring from './Ring';

interface TowerProps {
  towerIndex: number;
  rings: number[];
  isHovered: boolean;
  isDropTarget: boolean;
  selectedRing: { towerIndex: number; ring: number } | null;
  onRingClick: (towerIndex: number, ring: number) => void;
  onTowerClick: (towerIndex: number) => void;
  onTowerHover: (towerIndex: number | null) => void;
  ringColors: string[];
  myLanguage: string;
  myTheme: string;
}

const Tower: React.FC<TowerProps> = ({
  towerIndex,
  rings,
  isHovered,
  isDropTarget,
  selectedRing,
  onRingClick,
  onTowerClick,
  onTowerHover,
  ringColors,
  myLanguage,
  myTheme,
}) => {
  const isSelectedTower = selectedRing?.towerIndex === towerIndex;
  const topRing = rings.length > 0 ? rings[rings.length - 1] : null;

  // ✅ CORRECCIÓN: Invertir el orden de visualización para que los anillos más grandes estén abajo
  const displayedRings = [...rings].reverse(); // Esto pone los anillos más grandes al final del array (abajo visualmente)

  return (
    <div className="flex flex-col items-center">
      {/* Label de la torre con indicador de anillo superior */}
      <h3 className="text-lg font-bold mb-3 text-gray-700 dark:text-gray-300">
        {myLanguage === "eng" ? `Tower ${towerIndex + 1}` : `Torre ${towerIndex + 1}`}
        {topRing && (
          <span className="text-sm font-normal ml-2 text-gray-500">
            (Top: {topRing})
          </span>
        )}
      </h3>

      {/* Área de la torre */}
      <div
        className={`
          relative w-32 flex flex-col items-center justify-end
          transition-all duration-300 cursor-pointer
          ${isHovered ? 'transform scale-105' : ''}
          ${isDropTarget ? 'bg-green-200 dark:bg-green-800 bg-opacity-50' : ''}
          ${isSelectedTower ? 'ring-2 ring-yellow-400 ring-opacity-60' : ''}
        `}
        onClick={() => onTowerClick(towerIndex)}
        onMouseEnter={() => onTowerHover(towerIndex)}
        onMouseLeave={() => onTowerHover(null)}
      >
        {/* Poste de la torre */}
        <div
          className={`
            w-3 h-64 rounded-t-lg transition-colors duration-300
            ${isHovered || isSelectedTower
              ? 'bg-gradient-to-t from-cyan-500 to-purple-500'
              : myTheme === 'dark'
              ? 'bg-gradient-to-t from-gray-600 to-gray-400'
              : 'bg-gradient-to-t from-gray-400 to-gray-200'
            }
            shadow-lg
          `}
        />

        {/* Base de la torre */}
        <div
          className={`
            w-24 h-3 rounded-lg -mt-1
            ${myTheme === 'dark' 
              ? 'bg-gradient-to-r from-gray-600 to-gray-400' 
              : 'bg-gradient-to-r from-gray-400 to-gray-200'
            }
            shadow-md
          `}
        />

        {/* Anillos apilados - ✅ ORDEN CORREGIDO */}
        <div className="absolute bottom-3 flex flex-col items-center space-y-1 space-y-reverse pb-1">
          {displayedRings.map((ring, displayIndex) => {
            // Calcular el índice original para determinar si es el anillo superior
            const originalIndex = rings.length - 1 - displayIndex;
            const isTopRing = originalIndex === rings.length - 1;
            const isSelectable = isTopRing; // Solo el anillo superior es seleccionable
            
            return (
              <Ring
                key={originalIndex}
                size={ring}
                color={ringColors[(ring - 1) % ringColors.length]}
                isSelected={selectedRing?.towerIndex === towerIndex && selectedRing?.ring === ring}
                onClick={() => onRingClick(towerIndex, ring)}
                isDraggable={isSelectable}
                isTopRing={isTopRing}
              />
            );
          })}
        </div>

        {/* Indicador de drop target */}
        {isDropTarget && (
          <div className="absolute inset-0 border-2 border-dashed border-green-400 rounded-lg pointer-events-none animate-pulse" />
        )}
      </div>
    </div>
  );
};

export default Tower;