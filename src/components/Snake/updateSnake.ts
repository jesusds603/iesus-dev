import React from "react";
import { 
  Position, 
  GRID_HEIGHT, 
  GRID_WIDTH, 
  INITIAL_GAME_SPEED,
  MIN_GAME_SPEED,
  SPEED_DECREASE_PER_LEVEL,
  SCORE_PER_LEVEL,
  SPEED_INCREASE_THRESHOLDS
} from "./constants";
import { generateFood } from "./generateFood";

export function updateSnake(
  food: Position,
  setFood: React.Dispatch<React.SetStateAction<Position>>,
  setSnake: React.Dispatch<React.SetStateAction<Position[]>>,
  direction: Position,
  moveQueue: Position[],
  setDirection: React.Dispatch<React.SetStateAction<Position>>,
  setMoveQueue: React.Dispatch<React.SetStateAction<Position[]>>,
  setIsGameOver: React.Dispatch<React.SetStateAction<boolean>>,
  setCollisionMessage: React.Dispatch<React.SetStateAction<string>>,
  setScore: React.Dispatch<React.SetStateAction<number>>,
  setGameSpeed: React.Dispatch<React.SetStateAction<number>>
) {
  return setSnake((prevSnake) => {
    let newDirection = direction;

    // Procesar la cola de movimientos
    if (moveQueue.length > 0) {
      const queuedDirection = moveQueue[0]; // Tomar el primer movimiento en la cola

      // Verificar que no sea la dirección opuesta
      if (
        !(queuedDirection.x === -direction.x && queuedDirection.y === -direction.y)
      ) {
        newDirection = queuedDirection;
        setDirection(queuedDirection);
      }

      // Remover el movimiento procesado de la cola
      setMoveQueue(prev => prev.slice(1));
    }

    const newHead: Position = {
      x: prevSnake[0].x + newDirection.x,
      y: prevSnake[0].y + newDirection.y,
    };

    // Verificar colisiones
    if (
      newHead.x < 0 ||
      newHead.x >= GRID_WIDTH ||
      newHead.y < 0 ||
      newHead.y >= GRID_HEIGHT
    ) {
      setIsGameOver(true);
      setCollisionMessage("💥 You hit the wall!");
      return prevSnake;
    }

    if (
      prevSnake.some(
        (segment) => segment.x === newHead.x && segment.y === newHead.y
      )
    ) {
      setIsGameOver(true);
      setCollisionMessage("💥 You collided with yourself!");
      return prevSnake;
    }

    // Verificar si comió la comida
    const ateFood = newHead.x === food.x && newHead.y === food.y;
    const newSnake = [newHead, ...prevSnake];
    
    if (ateFood) {
      // Generar nueva comida
      setFood(generateFood(newSnake));
      
      // Actualizar puntuación y velocidad
      setScore(prevScore => {
        const newScore = prevScore + 10;
        
        // Calcular el nivel actual basado en el score
        const currentLevel = Math.floor(newScore / SCORE_PER_LEVEL);
        const previousLevel = Math.floor(prevScore / SCORE_PER_LEVEL);
        
        // Aumentar velocidad solo cuando se cambia de nivel
        if (currentLevel > previousLevel && currentLevel <= SPEED_INCREASE_THRESHOLDS) {
          const newSpeed = Math.max(
            MIN_GAME_SPEED,
            INITIAL_GAME_SPEED - (currentLevel * SPEED_DECREASE_PER_LEVEL)
          );
          
          setGameSpeed(newSpeed);
          
          // Efecto visual opcional: mostrar mensaje de nivel
          if (typeof window !== 'undefined') {
            console.log(`🎮 Level ${currentLevel + 1}! Speed: ${newSpeed}ms`);
          }
        }
        
        return newScore;
      });
    } else {
      newSnake.pop(); // Remover la cola si no comió
    }

    return newSnake;
  });
}

// Función auxiliar para calcular la velocidad actual basada en el score
export function calculateCurrentSpeed(score: number): number {
  const currentLevel = Math.floor(score / SCORE_PER_LEVEL);
  
  if (currentLevel >= SPEED_INCREASE_THRESHOLDS) {
    return MIN_GAME_SPEED;
  }
  
  const newSpeed = Math.max(
    MIN_GAME_SPEED,
    INITIAL_GAME_SPEED - (currentLevel * SPEED_DECREASE_PER_LEVEL)
  );
  
  return newSpeed;
}