import { Position, GRID_HEIGHT, GRID_WIDTH } from "./constants";

export function generateFood(snake: Position[]): Position {
  let newFood: Position;
  const occupiedPositions = new Set<string>(); // Usamos un conjunto para almacenar posiciones ocupadas

  // Agregar las posiciones ocupadas por la serpiente al conjunto
  snake.forEach((segment) => {
    occupiedPositions.add(`${segment.x},${segment.y}`);
  });

  do {
    newFood = {
      x: Math.floor(Math.random() * GRID_WIDTH),
      y: Math.floor(Math.random() * GRID_HEIGHT),
    };
  } while (occupiedPositions.has(`${newFood.x},${newFood.y}`)); // Verificar si la nueva posición está ocupada

  return newFood;
}
