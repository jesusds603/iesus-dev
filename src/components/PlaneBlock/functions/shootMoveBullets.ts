import { Bullet, Plane } from "../constants";

// Función para mover las balas
export const moveBullets = (
  setBullets: React.Dispatch<React.SetStateAction<Bullet[]>>,
  gridHeight: number,
  gridWidth: number
) => {
  setBullets((prevBullets) =>
    prevBullets
      .map((bullet) => {
        const { position, direction } = bullet; // Extraemos position y direction correctamente
        const { x, y } = position; // Extraemos x, y de la posición de la bala
        let newX = x;
        let newY = y;

        // Mover la bala según la dirección
        if (direction === "y+") {
          newY += 1;
        } else if (direction === "y-") {
          newY -= 1;
        } else if (direction === "x+") {
          newX += 1;
        } else if (direction === "x-") {
          newX -= 1;
        }

        // Devolver la bala con nueva posición
        return { ...bullet, position: { x: newX, y: newY } };
      })
      .filter((bullet) => {
        // Eliminar las balas que se salen del grid
        const { x, y } = bullet.position;
        return x >= 1 && x <= gridWidth && y >= 1 && y <= gridHeight;
      })
  );
};

export const moveBulletsPlayer = (
  setPlayerBullets: React.Dispatch<React.SetStateAction<Bullet[]>>,
  gridHeight: number,
  gridWidth: number
) => {
  setPlayerBullets((prevBullets) =>
    prevBullets
      .map((bullet) => {
        const { position, direction } = bullet; // Extraemos position y direction correctamente
        const { x, y } = position; // Extraemos x, y de la posición de la bala
        let newX = x;
        let newY = y;

        // Mover la bala según la dirección
        if (direction === "y+") {
          newY += 1;
        } else if (direction === "y-") {
          newY -= 1;
        } else if (direction === "x+") {
          newX += 1;
        } else if (direction === "x-") {
          newX -= 1;
        }

        // Devolver la bala con nueva posición
        return { ...bullet, position: { x: newX, y: newY } };
      })
      .filter((bullet) => {
        // Eliminar las balas que se salen del grid
        const { x, y } = bullet.position;
        return x > 0 && x <= gridWidth && y > 0 && y <= gridHeight;
      })
  );
};

// Función para disparar una bala desde un avión enemigo
export const shootBulletFromPlane = (
  plane: Plane,
  setBullets: React.Dispatch<React.SetStateAction<Bullet[]>>
) => {
  setBullets((prevBullets) => [
    ...prevBullets,
    {
      position: { ...plane.position },
      direction: plane.direction,
    },
  ]);
};

export const shootBullets = (
  currentEnemyPlanes: Plane[],
  setBullets: React.Dispatch<React.SetStateAction<Bullet[]>>
) => {
  setBullets((prevBullets) => [
    ...prevBullets,
    ...currentEnemyPlanes.map((plane) => ({
      position: { ...plane.position },
      direction: plane.direction,
    })),
  ]);
};
