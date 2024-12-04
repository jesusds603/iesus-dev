import { Star } from "../constants";

function GenerateStars(
  gridHeight: number,
  gridWidth: number,
  amountStars: number
): Star[] {
  const stars: Star[] = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));

  // Ajustar el centro dependiendo del modo
  const centerX = Math.floor(gridWidth / 2);
  const centerY = Math.floor(gridHeight / 2);

  for (let i = 0; i < amountStars; i++) {
    let x: number, y: number;

    // Espiral aurea para distribución armónica
    const radius = (Math.max(gridHeight, gridWidth) / 2) * (i / amountStars);
    const angle = i * goldenAngle;

    x = centerX + radius * Math.cos(angle);
    y = centerY + radius * Math.sin(angle);

    // Redondear valores para asegurar que las estrellas caigan en las celdas
    x = Math.round(x);
    y = Math.round(y);

    // Asegurarnos de que las estrellas estén dentro de los límites
    if (x >= 0 && x < gridWidth && y >= 0 && y < gridHeight) {
      stars.push({ position: { x, y } });
    }
  }

  return stars;
}

export default GenerateStars;
