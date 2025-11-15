import React from "react";
import { SCORE_PER_LEVEL, SPEED_INCREASE_THRESHOLDS } from "./constants";

function GameInstructions() {
  return (
    <div className="text-gray-300 text-sm">
      <div className="grid grid-cols-1 gap-4">
        <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700">
          <h3 className="font-bold text-cyan-300 mb-2">🎮 Controls</h3>
          <p className="mb-1">• Arrow Keys or Swipe to move</p>
          <p>• SPACE to pause/resume</p>
        </div>
        <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700">
          <h3 className="font-bold text-emerald-300 mb-2">⚡ Game Features</h3>
          <p className="mb-1">• Speed increases every {SCORE_PER_LEVEL} points</p>
          <p>• Max Level: {SPEED_INCREASE_THRESHOLDS + 1}</p>
        </div>
      </div>
      
      <div className="bg-gray-800/30 p-3 rounded-lg border border-purple-500/30 mt-4">
        <p className="font-semibold text-purple-300 text-center">
          🎯 Objective: Grow as long as possible without hitting walls or yourself!
        </p>
      </div>
    </div>
  );
}

export default GameInstructions;