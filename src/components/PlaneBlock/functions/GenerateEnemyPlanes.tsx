import { Plane } from "@/components/PlaneBlock/constants";

export default function generateEnemyPlanes(
  isGridHorizontal: boolean,
  gridHeight: number,
  gridWidth: number,
  amountEnemies: number
): Plane[] {
  const planes: Plane[] = [];
  const maxDiagonalLength = Math.floor(
    (isGridHorizontal ? gridHeight : gridWidth) / 4
  ); // Número máximo de posiciones en cada diagonal
  let remainingEnemies = amountEnemies;

  // Iterar sobre diagonales comenzando con la diagonal principal
  for (let diagonal = 0; remainingEnemies > 0; diagonal++) {
    // Iterar sobre posiciones en la diagonal
    for (let i = 0; i < maxDiagonalLength && remainingEnemies > 0; i++) {
      const x = i * 4 + diagonal * 4 + 2; // Calcular x en función de la posición en la diagonal
      const y = i * 4 + 2; // Calcular y en función de la posición en la diagonal

      if (x < gridWidth) {
        // Asegurar que x esté dentro del grid
        planes.push({
          position: { x, y },
          direction: "y+", // Puedes ajustar la dirección según sea necesario
        });
        remainingEnemies--;
      }
    }
  }

  return planes;
}
