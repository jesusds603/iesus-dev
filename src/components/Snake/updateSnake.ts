import React from "react";
import { Position, GRID_HEIGHT, GRID_WIDTH } from "./constants";
import { generateFood } from "./generateFood";

export function updateSnake(
  food: Position,
  setFood: React.Dispatch<React.SetStateAction<Position>>,
  setSnake: React.Dispatch<React.SetStateAction<Position[]>>,
  direction: Position,
  moveQueue: Position[],
  setDirection: React.Dispatch<React.SetStateAction<Position>>,
  setIsGameOver: React.Dispatch<React.SetStateAction<boolean>>,
  setCollisionMessage: React.Dispatch<React.SetStateAction<string>>
) {
  return setSnake((prevSnake) => {
    let newDirection = direction;

    // Cambia la dirección si hay una en la cola
    if (moveQueue.length > 0) {
      const queuedDirection = moveQueue[moveQueue.length - 1];

      // Asegurarse de no permitir que se aplique la dirección opuesta
      if (
        queuedDirection.x !== -direction.x ||
        queuedDirection.y !== -direction.y
      ) {
        newDirection = queuedDirection;
        setDirection(queuedDirection); // Actualiza la dirección actual
      }
    }

    const newHead: Position = {
      x: prevSnake[0].x + newDirection.x,
      y: prevSnake[0].y + newDirection.y,
    };

    // Verificar colisiones con paredes y con el propio cuerpo
    if (
      newHead.x < 0 ||
      newHead.x >= GRID_WIDTH ||
      newHead.y < 0 ||
      newHead.y >= GRID_HEIGHT
    ) {
      setIsGameOver(true);
      setCollisionMessage("You hit the wall!");
      return prevSnake;
    }

    if (
      prevSnake.some(
        (segment) => segment.x === newHead.x && segment.y === newHead.y
      )
    ) {
      setIsGameOver(true);
      setCollisionMessage("You collided with yourself!");
      return prevSnake;
    }

    // Verificar si se ha comido la comida
    const newSnake = [newHead, ...prevSnake];
    if (newHead.x === food.x && newHead.y === food.y) {
      setFood(generateFood(prevSnake));
    } else {
      newSnake.pop(); // Si no come, remueve la última parte del cuerpo
    }

    return newSnake;
  });
}
