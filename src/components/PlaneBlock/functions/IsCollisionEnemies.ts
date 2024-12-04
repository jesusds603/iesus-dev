import { Position } from "../constants";

// Function to check if two planes are colliding based on their occupied cells
export const isCollision = (
  plane1Cells: Position[],
  plane2Cells: Position[]
) => {
  return plane1Cells.some((cell1) =>
    plane2Cells.some((cell2) => cell1.x === cell2.x && cell1.y === cell2.y)
  );
};
