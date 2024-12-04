import React from "react";

interface StartButtonProps {
  gameIsStarted: boolean;
  gameIsPaused: boolean;
  gameIsOver: boolean;
  levelIsPassed: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onNext: () => void;
}

const StartButton: React.FC<StartButtonProps> = ({
  gameIsStarted,
  gameIsPaused,
  gameIsOver,
  levelIsPassed,

  onStart,
  onPause,
  onReset,
  onNext,
}) => {
  if (gameIsOver) {
    return (
      <button
        onClick={onReset}
        className="bg-red-500 text-white p-2 rounded mb-4"
      >
        Restart
      </button>
    );
  }

  if (levelIsPassed) {
    return (
      <button
        onClick={onNext}
        className="bg-yellow-500 text-white p-2 rounded mb-4"
      >
        Next Level
      </button>
    );
  }

  if (gameIsStarted) {
    return (
      <button
        onClick={gameIsPaused ? onStart : onPause}
        className="bg-yellow-500 text-white p-2 rounded mb-4"
      >
        {gameIsPaused ? "Continue" : "Stop"}
      </button>
    );
  }

  return (
    <button
      onClick={onStart}
      className="bg-green-500 text-white p-2 rounded mb-4"
    >
      Start
    </button>
  );
};

export default StartButton;
