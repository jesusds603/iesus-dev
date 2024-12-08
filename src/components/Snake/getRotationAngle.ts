import { Position } from "./constants";

// Función para determinar el ángulo de rotación
export function getRotationAngle(
  snake: Position[],
  direction: Position,
  index: number
): number {
  if (snake.length > 1 && index === snake.length - 1) {
    // Si es la cola
    if (direction.x === 1) return 0; // Derecha
    if (direction.y === 1) return 90; // Abajo
    if (direction.x === -1) return 180; // Izquierda
    if (direction.y === -1) return 270; // Arriba
  } else {
    // Para cabeza y cuerpo
    if (direction.x === 1 || direction.x === -1) return 0; // Derecha o Izquierda
    if (direction.y === 1 || direction.y === -1) return 270; // Abajo o Arriba
  }
  return 0; // Por defecto
}
