"use client";
import React, { useState, useEffect, Fragment } from "react";
import { useTheme } from "@/hooks/useTheme";
import {
  Position,
  INITIAL_DIRECTION,
  INITIAL_SNAKE,
} from "@/components/Snake/constants";
import { generateFood } from "@/components/Snake/generateFood";
import { getNewDirection } from "@/components/Snake/getNewDirection";
import Grid from "@/components/Snake/Grid";
import { updateSnake } from "@/components/Snake/updateSnake";
import Head from "next/head";

function SnakeGame() {
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
  const [direction, setDirection] = useState<Position>(INITIAL_DIRECTION);
  const [food, setFood] = useState<Position>(generateFood(snake));
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [collisionMessage, setCollisionMessage] = useState<string>("");
  const [moveQueue, setMoveQueue] = useState<Position[]>([]);
  const { myTheme } = useTheme();

  useEffect(() => {
    if (isGameOver) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const newDirection = getNewDirection(e.key);

      // Asegurarse de que no se agregue la dirección opuesta
      if (newDirection) {
        setMoveQueue((prevQueue) => [...prevQueue, newDirection]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isGameOver]);

  useEffect(() => {
    if (!gameStarted || isGameOver) return;

    const gameInterval = setInterval(() => {
      updateSnake(
        food,
        setFood,
        setSnake,
        direction,
        moveQueue,
        setDirection,
        setIsGameOver,
        setCollisionMessage
      );
    }, 200);

    return () => clearInterval(gameInterval);
  }, [direction, food, isGameOver, moveQueue, gameStarted]);

  //* Rewards
  // const reward = calculateReward(snake.length, GRID_WIDTH, GRID_HEIGHT);

  const startGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setFood(generateFood(INITIAL_SNAKE));
    setIsGameOver(false);
    setCollisionMessage("");
    setMoveQueue([]);
    setGameStarted(true);
  };

  // const handleClaimReward = () => {
  //   // Lógica para reclamar recompensas
  //   console.log("Recompensas reclamadas:", reward);
  //   // Resetear el juego o manejar recompensas aquí
  // };

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

      <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center">
        <div
          className={`text-2xl font-bold mb-4 p-4 rounded-xl text-center ${
            myTheme === "dark"
              ? "bg-gradient-to-b from-gray-900 via-purple-900 to-violet-600"
              : "bg-gradient-to-r from-green-500 to-blue-500"
          } opacity-90`}
        >
          {isGameOver ? (
            <>
              <div>Game Over</div>
              <div className="">
                <p className="text-red-600">{collisionMessage}</p>
                {/* <p>Recompensas: {reward} SHUNA</p> */}
              </div>

              {/* <button
              onClick={handleClaimReward}
              className="mt-4 px-4 py-2 bg-teal-500 text-white font-semibold rounded-lg shadow-lg hover:bg-teal-600 transition duration-200"
            >
              Reclamar Recompensas
            </button> */}
            </>
          ) : (
            "Snake Game"
          )}
        </div>

        <h2 className="text-lg mb-4">
          Food Count: <span className="font-bold">{snake.length}</span>
        </h2>

        {!gameStarted ? (
          <button
            onClick={startGame}
            className="mb-4 p-2 bg-blue-500 text-white rounded"
          >
            Start Game
          </button>
        ) : (
          isGameOver && (
            <button
              onClick={startGame}
              className="mb-4 p-2 bg-blue-500 text-white rounded"
            >
              Restart Game
            </button>
          )
        )}

        <Grid snake={snake} direction={direction} food={food} />
      </div>
    </Fragment>
  );
}

export default SnakeGame;
