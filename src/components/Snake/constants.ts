// Constantes para el tamaño de la cuadrícula
const GRID_WIDTH: number = 20;
const GRID_HEIGHT: number = 20;
const CELL_SIZE: number = 20; // Tamaño en píxeles de cada celda
const HEAD_SIZE_ADDITIONAL: number = 4; // Tamaño adicional para la cabeza
const EYES_SIZE = 8; // Tamaño de los ojos

// Sistema de velocidad inteligente
const INITIAL_GAME_SPEED = 300; // Velocidad inicial en ms
const MIN_GAME_SPEED = 80; // Velocidad mínima permitida (más rápido)
const MAX_GAME_SPEED = 500; // Velocidad máxima permitida (más lento)

// Cálculo de puntos máximos teóricos
const MAX_THEORETICAL_SCORE = (GRID_WIDTH * GRID_HEIGHT) - 1; // -1 porque la serpiente ocupa espacio
const SPEED_INCREASE_THRESHOLDS = 5; // Número de incrementos de velocidad durante el juego

// Calcular la reducción de velocidad por nivel
const SPEED_DECREASE_PER_LEVEL = (INITIAL_GAME_SPEED - MIN_GAME_SPEED) / SPEED_INCREASE_THRESHOLDS;
const SCORE_PER_LEVEL = Math.floor(MAX_THEORETICAL_SCORE / SPEED_INCREASE_THRESHOLDS);

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
  INITIAL_GAME_SPEED,
  MIN_GAME_SPEED,
  MAX_GAME_SPEED,
  MAX_THEORETICAL_SCORE,
  SPEED_INCREASE_THRESHOLDS,
  SPEED_DECREASE_PER_LEVEL,
  SCORE_PER_LEVEL
};
export type { Position };