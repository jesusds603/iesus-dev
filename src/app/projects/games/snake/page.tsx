"use client";
import React, { useState, useEffect, Fragment, useCallback } from "react";
import { useTheme } from "@/hooks/useTheme";
import {
  Position,
  INITIAL_DIRECTION,
  INITIAL_SNAKE,
  GRID_WIDTH,
  GRID_HEIGHT,
  INITIAL_GAME_SPEED,
  SCORE_PER_LEVEL,
  SPEED_INCREASE_THRESHOLDS,
  MIN_GAME_SPEED
} from "@/components/Snake/constants";
import { generateFood } from "@/components/Snake/generateFood";
import { getNewDirection } from "@/components/Snake/getNewDirection";
import Grid from "@/components/Snake/Grid";
import { updateSnake } from "@/components/Snake/updateSnake";
import { calculateReward } from "@/components/Snake/calculateReward";
import Head from "next/head";
import TouchControls from "@/components/Snake/TouchControls";
import GameHeader from "@/components/Snake/GameHeader";
import GameControls from "@/components/Snake/GameControls";
import GameStatus from "@/components/Snake/GameStatus";
import GameInstructions from "@/components/Snake/GameInstructions";

function SnakeGame() {
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
  const [direction, setDirection] = useState<Position>(INITIAL_DIRECTION);
  const [food, setFood] = useState<Position>(generateFood(snake));
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [collisionMessage, setCollisionMessage] = useState<string>("");
  const [moveQueue, setMoveQueue] = useState<Position[]>([]);
  const [score, setScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(0);
  const [gameSpeed, setGameSpeed] = useState<number>(INITIAL_GAME_SPEED);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [currentLevel, setCurrentLevel] = useState<number>(1);
  const [speedBoostActive, setSpeedBoostActive] = useState<boolean>(false);
  const { myTheme } = useTheme();

  // Cargar high score desde localStorage
  useEffect(() => {
    const savedHighScore = localStorage.getItem('snakeHighScore');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore));
    }
  }, []);

  // Guardar high score
  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('snakeHighScore', score.toString());
    }
  }, [score, highScore]);

  // Efecto para actualizar el nivel actual
  useEffect(() => {
    const level = Math.floor(score / SCORE_PER_LEVEL) + 1;
    const newLevel = Math.min(level, SPEED_INCREASE_THRESHOLDS + 1);
    setCurrentLevel(newLevel);
    
    // Efecto visual cuando se sube de nivel
    if (level > 1 && score % SCORE_PER_LEVEL === 10) {
      setSpeedBoostActive(true);
      const timer = setTimeout(() => setSpeedBoostActive(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [score]);

  // Controles de teclado
  useEffect(() => {
    if (isGameOver || !gameStarted || isPaused) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'Spacebar') {
        setIsPaused(prev => !prev);
        return;
      }

      const newDirection = getNewDirection(e.key);
      if (newDirection) {
        setMoveQueue((prevQueue) => [...prevQueue, newDirection]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isGameOver, gameStarted, isPaused]);

  // Game loop
  useEffect(() => {
    if (!gameStarted || isGameOver || isPaused) return;

    const gameInterval = setInterval(() => {
      updateSnake(
        food,
        setFood,
        setSnake,
        direction,
        moveQueue,
        setDirection,
        setMoveQueue,
        setIsGameOver,
        setCollisionMessage,
        setScore,
        setGameSpeed
      );
    }, gameSpeed);

    return () => clearInterval(gameInterval);
  }, [direction, food, isGameOver, moveQueue, gameStarted, gameSpeed, isPaused]);

  const startGame = useCallback(() => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setFood(generateFood(INITIAL_SNAKE));
    setIsGameOver(false);
    setCollisionMessage("");
    setMoveQueue([]);
    setGameStarted(true);
    setScore(0);
    setGameSpeed(INITIAL_GAME_SPEED);
    setIsPaused(false);
    setCurrentLevel(1);
    setSpeedBoostActive(false);
  }, []);

  const handleDirectionChange = useCallback((newDirection: Position) => {
    setMoveQueue((prevQueue) => [...prevQueue, newDirection]);
  }, []);

  const reward = calculateReward(score, GRID_WIDTH, GRID_HEIGHT);

  // Calcular porcentaje de velocidad para mostrar
  const speedPercentage = Math.round(
    ((INITIAL_GAME_SPEED - gameSpeed) / (INITIAL_GAME_SPEED - MIN_GAME_SPEED)) * 100
  );

  // Calcular progreso hacia el siguiente nivel
  const progressToNextLevel = (score % SCORE_PER_LEVEL) / SCORE_PER_LEVEL * 100;
  const pointsToNextLevel = Math.max(0, SCORE_PER_LEVEL - (score % SCORE_PER_LEVEL));

  return (
    <Fragment>
      <Head>
        <title>Snake Game - Iesus Dev</title>
        <meta
          name="description"
          content="Play Snake game, earn rewards, and improve your score. Challenge yourself with each level and claim your achievements!"
        />
        <meta
          name="keywords"
          content="Snake Game, Rewards, Challenge, Iesus Dev, High Score, Fun Game"
        />
        <meta
          property="og:title"
          content="Snake Game - Play and Earn Rewards"
        />
        <meta
          property="og:description"
          content="An interactive Snake game where you can improve your skills, achieve high scores, and earn rewards."
        />
        <meta property="og:image" content="/snake.png" />
        <meta property="og:type" content="article" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-[calc(100vh-64px)] flex flex-col lg:flex-row items-center justify-center p-4 bg-gradient-to-br from-gray-900 to-gray-800 gap-6">
        
        {/* Sección izquierda: Juego y Header */}
        <div className="flex flex-col items-center lg:items-start w-full lg:w-auto">
          {/* Header del juego */}
          <div className="w-full max-w-2xl lg:max-w-none mb-6">
            <GameHeader 
              isGameOver={isGameOver}
              speedBoostActive={speedBoostActive}
              score={score}
              highScore={highScore}
              currentLevel={currentLevel}
              speedPercentage={speedPercentage}
              reward={reward}
              progressToNextLevel={progressToNextLevel}
              pointsToNextLevel={pointsToNextLevel}
            />
          </div>

          {/* Mensajes de estado del juego */}
          <GameStatus 
            isGameOver={isGameOver}
            collisionMessage={collisionMessage}
            score={score}
            currentLevel={currentLevel}
            reward={reward}
            isPaused={isPaused}
          />

          {/* Controles del juego */}
          <GameControls 
            gameStarted={gameStarted}
            isGameOver={isGameOver}
            isPaused={isPaused}
            onStartGame={startGame}
            onTogglePause={() => setIsPaused(!isPaused)}
            onRestart={startGame}
          />

          {/* Grid del juego */}
          <div className="relative">
            <Grid snake={snake} direction={direction} food={food} />
            
            {/* Overlay para cuando el juego no está activo */}
            {(!gameStarted || isPaused) && (
              <div className="absolute inset-0 bg-black/70 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <div className="text-white text-center p-6 bg-gray-800/90 rounded-2xl border border-white/20 max-w-xs">
                  <div className="text-2xl font-bold mb-3">
                    {!gameStarted ? "🎯 Ready to Play?" : "⏸️ Game Paused"}
                  </div>
                  <div className="text-lg mb-4 opacity-90">
                    {!gameStarted ? "Eat food, grow longer!" : "Take a break..."}
                  </div>
                  <div className="text-sm opacity-75 bg-black/30 p-3 rounded-lg border border-white/10">
                    {!gameStarted ? "🎮 Press Start to begin!" : "⌨️ Press SPACE to continue"}
                  </div>
                  {!gameStarted && highScore > 0 && (
                    <div className="mt-4 text-amber-300 text-sm">
                      🏆 Personal Best: {highScore}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sección derecha: Controles e Instrucciones (solo en desktop) */}
        <div className="hidden lg:flex flex-col gap-6 min-w-80">
          {/* Controles táctiles */}
          <div className="w-full">
            <TouchControls onDirectionChange={handleDirectionChange} />
          </div>

          {/* Instrucciones del juego */}
          <GameInstructions />
        </div>

        {/* Sección inferior: Controles e Instrucciones (solo en móvil) */}
        <div className="flex lg:hidden flex-col gap-6 w-full max-w-md mt-6">
          {/* Controles táctiles */}
          <div className="w-full">
            <TouchControls onDirectionChange={handleDirectionChange} />
          </div>

          {/* Instrucciones del juego */}
          <GameInstructions />
        </div>
      </div>
    </Fragment>
  );
}

export default SnakeGame;