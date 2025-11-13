import React from 'react';

interface GameControlsProps {
  numRings: number;
  onRingChange: (rings: number) => void;
  onReset: () => void;
  myLanguage: string;
  myTheme: string;
}

const GameControls: React.FC<GameControlsProps> = ({
  numRings,
  onRingChange,
  onReset,
  myLanguage,
  myTheme,
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 mb-6 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
      {/* Selector de anillos */}
      <div className="flex items-center gap-3">
        <label htmlFor="numRings" className="font-semibold text-gray-700 dark:text-gray-300">
          {myLanguage === "eng" ? "Rings:" : "Anillos:"}
        </label>
        <select
          id="numRings"
          value={numRings}
          onChange={(e) => onRingChange(Number(e.target.value))}
          className={`
            px-3 py-2 rounded-lg border-2 font-medium transition-all duration-200
            ${myTheme === 'dark'
              ? 'bg-gray-700 border-gray-600 text-white hover:border-cyan-400'
              : 'bg-gray-100 border-gray-300 text-gray-800 hover:border-cyan-500'
            }
            focus:outline-none focus:ring-2 focus:ring-cyan-500
          `}
        >
          {[3, 4, 5, 6, 7, 8].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </div>

      {/* Botón de reinicio */}
      <button
        onClick={onReset}
        className={`
          px-6 py-2 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105
          bg-gradient-to-r from-purple-500 to-pink-500 text-white
          shadow-lg hover:shadow-xl hover:from-purple-600 hover:to-pink-600
          focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50
        `}
      >
        {myLanguage === "eng" ? "🔄 Reset" : "🔄 Reiniciar"}
      </button>

      {/* Instrucciones rápidas */}
      <div className="text-sm text-gray-600 dark:text-gray-400 text-center sm:text-left">
        {myLanguage === "eng" 
          ? "💡 Click top rings to move • Right-click to deselect"
          : "💡 Click en anillos superiores • Click derecho para deseleccionar"
        }
      </div>
    </div>
  );
};

export default GameControls;