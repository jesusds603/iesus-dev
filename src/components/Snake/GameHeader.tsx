import React from "react";
import { SPEED_INCREASE_THRESHOLDS } from "./constants";

interface GameHeaderProps {
  isGameOver: boolean;
  speedBoostActive: boolean;
  score: number;
  highScore: number;
  currentLevel: number;
  speedPercentage: number;
  reward: number;
  progressToNextLevel: number;
  pointsToNextLevel: number;
}

function GameHeader({
  isGameOver,
  speedBoostActive,
  score,
  highScore,
  currentLevel,
  speedPercentage,
  reward,
  progressToNextLevel,
  pointsToNextLevel
}: GameHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-6 shadow-2xl border border-purple-400/30">
      <h1 className="text-3xl font-bold text-white text-center mb-4 flex items-center justify-center gap-2">
        {isGameOver ? "🎮 Game Over" : "🐍 Snake Game"}
        {speedBoostActive && (
          <span className="text-yellow-300 animate-pulse text-2xl">⚡</span>
        )}
      </h1>
      
      {/* Estadísticas principales */}
      <div className="grid grid-cols-4 gap-3 text-center mb-4">
        <div className="bg-black/30 rounded-lg p-3 border border-purple-400/20">
          <div className="text-purple-300 text-sm">Score</div>
          <div className="text-white text-xl font-bold">{score}</div>
        </div>
        <div className="bg-black/30 rounded-lg p-3 border border-blue-400/20">
          <div className="text-blue-300 text-sm">High Score</div>
          <div className="text-white text-xl font-bold">{highScore}</div>
        </div>
        <div className="bg-black/30 rounded-lg p-3 border border-green-400/20">
          <div className="text-green-300 text-sm">Level</div>
          <div className="text-white text-xl font-bold flex items-center justify-center gap-1">
            {currentLevel}
            {currentLevel > 1 && (
              <span className="text-xs text-yellow-300">⚡</span>
            )}
          </div>
        </div>
        <div className="bg-black/30 rounded-lg p-3 border border-amber-400/20">
          <div className="text-amber-300 text-sm">Speed</div>
          <div className="text-white text-xl font-bold">{speedPercentage}%</div>
        </div>
      </div>

      {/* Barra de progreso del nivel */}
      <div className="mb-3">
        <div className="flex justify-between text-xs text-white/70 mb-1">
          <span className="flex items-center gap-1">
            <span>Level {currentLevel}</span>
            {currentLevel <= SPEED_INCREASE_THRESHOLDS && (
              <span className="text-yellow-300">↑</span>
            )}
          </span>
          <span>
            {currentLevel <= SPEED_INCREASE_THRESHOLDS ? (
              `Next: ${pointsToNextLevel} points`
            ) : (
              "Max Level!"
            )}
          </span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2.5">
          <div 
            className="bg-gradient-to-r from-green-400 to-cyan-400 h-2.5 rounded-full transition-all duration-300 ease-out"
            style={{ 
              width: `${currentLevel <= SPEED_INCREASE_THRESHOLDS ? progressToNextLevel : 100}%` 
            }}
          />
        </div>
      </div>

      {/* Recompensa */}
      <div className="bg-black/40 rounded-lg p-3 border border-emerald-400/30 text-center">
        <div className="text-emerald-300 text-sm">Current Reward</div>
        <div className="text-white text-lg font-bold">{reward} SHUNA</div>
      </div>
    </div>
  );
}

export default GameHeader;