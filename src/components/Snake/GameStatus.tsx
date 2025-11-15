import React from "react";

interface GameStatusProps {
  isGameOver: boolean;
  collisionMessage: string;
  score: number;
  currentLevel: number;
  reward: number;
  isPaused: boolean;
}

function GameStatus({
  isGameOver,
  collisionMessage,
  score,
  currentLevel,
  reward,
  isPaused
}: GameStatusProps) {
  if (isGameOver) {
    return (
      <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-4 mb-4 text-center animate-pulse max-w-md w-full">
        <div className="text-red-400 font-bold text-lg mb-2">{collisionMessage}</div>
        <div className="text-white">
          Final Score: <span className="font-bold">{score}</span> | 
          Level: <span className="font-bold">{currentLevel}</span> | 
          Reward: <span className="font-bold text-emerald-300">{reward} SHUNA</span>
        </div>
      </div>
    );
  }

  if (isPaused) {
    return (
      <div className="bg-yellow-500/20 border border-yellow-500/50 rounded-xl p-4 mb-4 text-center max-w-md w-full">
        <div className="text-yellow-400 font-bold text-lg mb-2">⏸️ Game Paused</div>
        <div className="text-white text-sm">Press SPACE to continue</div>
      </div>
    );
  }

  return null;
}

export default GameStatus;