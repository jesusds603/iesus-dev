import React from 'react';

interface GameStatsProps {
  moveCount: number;
  minMoves: number;
  message: { type: 'success' | 'error' | ''; text: string };
  myLanguage: string;
}

const GameStats: React.FC<GameStatsProps> = ({
  moveCount,
  minMoves,
  message,
  myLanguage,
}) => {
  const isOptimal = moveCount <= minMoves && moveCount > 0;

  return (
    <div className="mb-6 space-y-4">
      {/* Contador de movimientos */}
      <div className={`
        text-center p-4 rounded-xl font-bold text-lg transition-all duration-300
        ${isOptimal
          ? 'bg-gradient-to-r from-green-500 to-cyan-500 text-white shadow-lg'
          : 'bg-white/90 dark:bg-gray-800/90 text-gray-800 dark:text-gray-100 shadow-md backdrop-blur-sm'
        }
      `}>
        <div className="flex justify-center items-center gap-4 flex-wrap">
          <span className="text-gray-700 dark:text-gray-200">
            🎯 {myLanguage === "eng" ? "Moves" : "Movimientos"}:
          </span>
          <span className={`
            text-2xl font-bold ${moveCount > minMoves ? 'text-red-600 dark:text-red-400' : 'text-gray-900 dark:text-white'}
          `}>
            {moveCount}
          </span>
          <span className="text-gray-600 dark:text-gray-300 font-medium">
            / {minMoves} {myLanguage === "eng" ? "minimum" : "mínimo"}
          </span>
          {isOptimal && (
            <span className="bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-sm font-bold shadow-md">
              ⭐ {myLanguage === "eng" ? "Optimal!" : "¡Óptimo!"}
            </span>
          )}
        </div>
      </div>

      {/* Mensajes del juego */}
      {message.text && (
        <div className={`
          p-4 rounded-xl text-center font-semibold text-lg transition-all duration-300 backdrop-blur-sm
          ${message.type === 'success'
            ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg border-2 border-emerald-400'
            : message.type === 'error'
            ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg border-2 border-rose-400'
            : 'bg-gray-300/80 dark:bg-gray-700/80 text-gray-800 dark:text-gray-200 border-2 border-gray-400 dark:border-gray-600'
          }
        `}>
          {message.text}
        </div>
      )}
    </div>
  );
};

export default GameStats;