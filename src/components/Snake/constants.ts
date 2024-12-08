// Constantes para el tamaño de la cuadrícula
const GRID_WIDTH: number = 20;
const GRID_HEIGHT: number = 20;
const CELL_SIZE: number = 20; // Tamaño en píxeles de cada celda
const HEAD_SIZE_ADDITIONAL: number = 4; // Tamaño adicional para la cabeza
const EYES_SIZE = 8; //Tamaño de los ojos

// Tipos
interface Position {
  x: number;
  y: number;
}

const INITIAL_SNAKE: Position[] = [{ x: 1, y: Math.floor(GRID_HEIGHT / 2) }];
const INITIAL_DIRECTION: Position = { x: 1, y: 0 }; // Comienza moviéndose a la derecha

export {
  GRID_HEIGHT,
  GRID_WIDTH,
  CELL_SIZE,
  HEAD_SIZE_ADDITIONAL,
  EYES_SIZE,
  INITIAL_DIRECTION,
  INITIAL_SNAKE,
};
export type { Position };
