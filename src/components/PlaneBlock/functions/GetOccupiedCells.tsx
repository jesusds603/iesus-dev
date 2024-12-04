import { Position } from "../constants";

//* Helper function to get the cells occupied by a 3x3 plane centered at the given position
export const getOccupiedCells = (position: Position) => {
  return [
    { x: position.x, y: position.y + 1 }, // Head
    { x: position.x - 1, y: position.y }, // Left
    { x: position.x, y: position.y }, // Center
    { x: position.x + 1, y: position.y }, // Right
    { x: position.x - 1, y: position.y - 1 }, // Bottom Left
    { x: position.x + 1, y: position.y - 1 }, // Bottom Right

    //Tal vez los huecos
    { x: position.x - 1, y: position.y + 1 }, // Superior derecho
    { x: position.x + 1, y: position.y + 1 }, // Superior izquierdo
    { x: position.x, y: position.y - 1 }, // Inferior medio
  ];
};

export const getPlayerOccupiedCells = (position: Position) => {
  const occupiedCells = [];

  // Loop through to create a 5x5 grid of occupied cells
  for (let dx = -2; dx <= 2; dx++) {
    for (let dy = -2; dy <= 2; dy++) {
      occupiedCells.push({ x: position.x + dx, y: position.y + dy });
    }
  }

  return occupiedCells;
};
