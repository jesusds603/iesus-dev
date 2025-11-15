export const calculateReward = (
  score: number,
  gridWidth: number,
  gridHeight: number
) => {
  const maxPossibleScore = gridWidth * gridHeight;
  const scorePercentage = score / maxPossibleScore;

  // Sistema de recompensas basado en porcentaje del score máximo
  if (scorePercentage >= 0.8) {
    return Math.floor(score * 5); // 50 SHUNA por punto
  } else if (scorePercentage >= 0.6) {
    return Math.floor(score * 3); // 30 SHUNA por punto
  } else if (scorePercentage >= 0.4) {
    return Math.floor(score * 2); // 20 SHUNA por punto
  } else if (scorePercentage >= 0.2) {
    return Math.floor(score * 1.5); // 15 SHUNA por punto
  } else {
    return Math.floor(score * 1); // 10 SHUNA por punto
  }
};