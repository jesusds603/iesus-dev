// Calcular la recompensa basada en la longitud de la serpiente
export const calculateReward = (
  snakeLength: number,
  gridWidth: number,
  gridHeight: number
) => {
  //* 100,000 millones de tokens diarios
  //* = 3650 billones en 100 años
  //* 5 millones de jugadores diarios
  //* 2 horas de juego diarias
  //* Una comida cada 3 segundos
  //* = 12,000 millones de cuadritos comida diarios
  //* = 10 tokens por cuadrito comida
  const threshold1 = (3 * (gridWidth * gridHeight)) / 4;
  const threshold2 = (gridWidth * gridHeight) / 2;
  const threshold3 = (gridWidth * gridHeight) / 4;
  const threshold4 = (gridWidth * gridHeight) / 10;
  const threshold5 = (gridWidth * gridHeight) / 20;

  if (snakeLength > threshold1) {
    return snakeLength * 50;
  } else if (snakeLength > threshold2) {
    return snakeLength * 25;
  } else if (snakeLength > threshold3) {
    return snakeLength * 10;
  } else if (snakeLength > threshold4) {
    return snakeLength * 5;
  } else if (snakeLength > threshold5) {
    return snakeLength * 3;
  } else {
    return snakeLength * 2; // Si no se cumple ninguna condición
  }
};
