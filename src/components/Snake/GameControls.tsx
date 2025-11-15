import React from "react";

interface GameControlsProps {
  gameStarted: boolean;
  isGameOver: boolean;
  isPaused: boolean;
  onStartGame: () => void;
  onTogglePause: () => void;
  onRestart: () => void;
}

function GameControls({
  gameStarted,
  isGameOver,
  isPaused,
  onStartGame,
  onTogglePause,
  onRestart
}: GameControlsProps) {
  return (
    <div className="flex gap-4 mb-6 flex-wrap justify-center">
      {!gameStarted || isGameOver ? (
        <button
          onClick={onStartGame}
          className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-bold shadow-lg hover:shadow-green-500/25 transition-all duration-300 hover:scale-105 active:scale-95"
        >
          {isGameOver ? "🔄 Restart Game" : "🎮 Start Game"}
        </button>
      ) : (
        <button
          onClick={onTogglePause}
          className="px-8 py-3 bg-gradient-to-r from-yellow-500 to-orange-600 text-white rounded-xl font-bold shadow-lg hover:shadow-yellow-500/25 transition-all duration-300 hover:scale-105 active:scale-95"
        >
          {isPaused ? "▶️ Resume" : "⏸️ Pause"}
        </button>
      )}
      
      {(gameStarted && !isGameOver) && (
        <button
          onClick={onRestart}
          className="px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl font-bold shadow-lg hover:shadow-gray-500/25 transition-all duration-300 hover:scale-105 active:scale-95"
        >
          🔁 Restart
        </button>
      )}
    </div>
  );
}

export default GameControls;