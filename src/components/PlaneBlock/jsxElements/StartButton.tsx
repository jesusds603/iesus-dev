import React from "react";
import { useLanguage } from "@/hooks/useLanguage";

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
  const { myLanguage } = useLanguage();

  if (gameIsOver) {
    return (
      <button
        onClick={onReset}
        className="bg-red-500 text-white p-2 rounded mb-4"
      >
        {myLanguage === "eng" ? "Restart" : "Reiniciar"}
      </button>
    );
  }

  if (levelIsPassed) {
    return (
      <button
        onClick={onNext}
        className="bg-yellow-500 text-white p-2 rounded mb-4"
      >
        {myLanguage === "eng" ? "Next Level" : "Siguiente Nivel"}
      </button>
    );
  }

  if (gameIsStarted) {
    return (
      <button
        onClick={gameIsPaused ? onStart : onPause}
        className="bg-yellow-500 text-white p-2 rounded mb-4"
      >
        {gameIsPaused
          ? myLanguage === "eng"
            ? "Continue"
            : "Continuar"
          : myLanguage === "eng"
          ? "Stop"
          : "Detener"}
      </button>
    );
  }

  return (
    <button
      onClick={onStart}
      className="bg-green-500 text-white p-2 rounded mb-4"
    >
      {myLanguage === "eng" ? "Start" : "Iniciar"}
    </button>
  );
};

export default StartButton;
