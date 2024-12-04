import {
  Plane,
  PlayerPlane,
  Bullet,
  Position,
} from "@/components/PlaneBlock/constants";

// Tipo para representar una coordenada en el espacio 2D
type Coordinate = [number, number];

const getCollisionArea = (x: number, y: number): Coordinate[] => {
  return [
    [x, y],
    [x - 1, y],
    [x + 1, y],
    [x, y - 1],
    [x, y + 1],
    [x - 1, y - 1],
    [x + 1, y - 1],
    [x - 1, y + 1],
    [x + 1, y + 1],
  ];
};

const getPlayerOccupiedCells = (position: Position) => {
  const occupiedCells = [];

  // Loop through to create a 5x5 grid of occupied cells
  for (let dx = -2; dx <= 2; dx++) {
    for (let dy = -2; dy <= 2; dy++) {
      occupiedCells.push([position.x + dx, position.y + dy]);
    }
  }

  return occupiedCells;
};

const getBulletPlayerArea = (
  x: number,
  y: number,
  direction: string
): Coordinate[] => {
  switch (direction) {
    case "x+":
      return [
        [x, y],
        [x + 1, y], // Celda hacia la derecha
      ];
    case "x-":
      return [
        [x, y],
        [x - 1, y], // Celda hacia la izquierda
      ];
    case "y+":
      return [
        [x, y],
        [x, y - 1], // Celda hacia arriba
      ];
    case "y-":
      return [
        [x, y],
        [x, y + 1], // Celda hacia abajo
      ];
    default:
      return [[x, y]]; // Si no hay dirección, solo devuelve la posición actual
  }
};

//* ---------------------------------------------
//* ---------------------------------------------

//* Función que verifica si hay colisión entre el área 3x3 del jugador y las áreas 3x3 de los enemigos
export const checkCollisionPlayer = (
  playerPlane: PlayerPlane,
  enemyPlanes: Plane[]
): boolean => {
  const playerArea = getPlayerOccupiedCells(playerPlane.position);

  return enemyPlanes.some((enemy) => {
    const enemyArea = getCollisionArea(enemy.position.x, enemy.position.y);

    // Verificar si alguna celda en el área del jugador coincide con alguna en el área del enemigo
    return playerArea.some(([px, py]) =>
      enemyArea.some(([ex, ey]) => px === ex && py === ey)
    );
  });
};

export const checkCollisionPlayerBullet = (
  playerPlane: PlayerPlane,
  bullets: Bullet[]
): boolean => {
  const playerArea = getCollisionArea(
    playerPlane.position.x,
    playerPlane.position.y
  );

  return bullets.some((bullet) => {
    //* Ajustar la posición de la bala según su dirección porque hay un atraso en la posicion no por actualizar sino por definición
    let adjustedBulletPosition = { ...bullet.position };
    switch (bullet.direction) {
      case "x+":
        adjustedBulletPosition.x += 2;
        break;
      case "x-":
        adjustedBulletPosition.x -= 2;
        break;
      case "y+":
        adjustedBulletPosition.y += 2;
        break;
      case "y-":
        adjustedBulletPosition.y -= 2;

        break;
      default:
        break;
    }

    // Verificar colisión con el área del jugador
    return playerArea.some(([px, py]) => {
      const collisionDetected =
        px === adjustedBulletPosition.x && py === adjustedBulletPosition.y;
      if (collisionDetected) {
        console.log(
          `¡Colisión detectada! Coordenadas del jugador: (${px}, ${py}), Coordenadas ajustadas de la bala: (${adjustedBulletPosition.x}, ${adjustedBulletPosition.y})`
        );
      }
      return collisionDetected;
    });
  });
};

//* ---------------------------------------------
//* ---------------------------------------------

export const checkCollisionBullets = (
  bullets: Bullet[],
  bulletsPlayer: Bullet[]
): { bullets: Bullet[]; bulletsPlayer: Bullet[] } => {
  // Lista para almacenar las posiciones de colisión
  const collisions = new Set<string>();

  // Detecta colisiones y almacena las posiciones de las balas que colisionan
  bulletsPlayer.forEach((bulletP) => {
    const bulletPlayerArea = getBulletPlayerArea(
      bulletP.position.x,
      bulletP.position.y,
      bulletP.direction
    );

    bullets.forEach((bulletE) => {
      // Crea una copia ajustada de la posición de la bala enemiga según su dirección
      let adjustedBulletPosition = { ...bulletE.position };

      switch (bulletE.direction) {
        case "x+":
          adjustedBulletPosition.x += 2;
          adjustedBulletPosition.y -= 1;
          break;
        case "x-":
          adjustedBulletPosition.x -= 2;
          adjustedBulletPosition.y -= 1;
          break;
        case "y+":
          adjustedBulletPosition.x -= 1;
          adjustedBulletPosition.y += 2;
          break;
        case "y-":
          adjustedBulletPosition.x -= 1;
          adjustedBulletPosition.y -= 2;
          break;
        default:
          break;
      }

      const collisionDetected = bulletPlayerArea.some(
        ([px, py]) =>
          px === adjustedBulletPosition.x && py === adjustedBulletPosition.y
      );

      if (collisionDetected) {
        const positionKeyP = `${bulletP.position.x},${bulletP.position.y}`;
        const positionKeyE = `${adjustedBulletPosition.x},${adjustedBulletPosition.y}`;
        collisions.add(positionKeyP); // Almacena la posición de la bala del jugador
        collisions.add(positionKeyE); // Almacena la posición ajustada de la bala enemiga
        console.log(
          `¡Colisión detectada! Coordenadas de la bala del jugador: (${bulletP.position.x}, ${bulletP.position.y}), Coordenadas ajustadas de la bala enemiga: (${adjustedBulletPosition.x}, ${adjustedBulletPosition.y})`
        );
      }
    });
  });

  // Filtra las balas que no colisionaron en ambas listas
  const updatedBullets = bullets.filter((bulletE) => {
    // Crea una copia ajustada de la posición de la bala enemiga para la verificación
    let adjustedBulletPosition = { ...bulletE.position };
    switch (bulletE.direction) {
      case "x+":
        adjustedBulletPosition.x += 2;
        adjustedBulletPosition.y -= 1;
        break;
      case "x-":
        adjustedBulletPosition.x -= 2;
        adjustedBulletPosition.y -= 1;
        break;
      case "y+":
        adjustedBulletPosition.x -= 1;
        adjustedBulletPosition.y += 2;
        break;
      case "y-":
        adjustedBulletPosition.x -= 1;
        adjustedBulletPosition.y -= 2;
        break;
      default:
        break;
    }
    return !collisions.has(
      `${adjustedBulletPosition.x},${adjustedBulletPosition.y}`
    );
  });

  const updatedBulletsPlayer = bulletsPlayer.filter(
    (bulletP) => !collisions.has(`${bulletP.position.x},${bulletP.position.y}`)
  );

  return { bullets: updatedBullets, bulletsPlayer: updatedBulletsPlayer };
};

//* Función para verificar colisiones entre aviones enemigos y balas del jugador
export const checkCollisionEnemyBullets = (
  enemyPlanes: Plane[],
  bulletsPlayer: Bullet[],
  setAmountKilledEnemies: React.Dispatch<React.SetStateAction<number>>
): { enemyPlanes: Plane[]; bulletsPlayer: Bullet[] } => {
  const collidedEnemies = new Set<string>();
  const collidedBullets = new Set<string>();

  bulletsPlayer.forEach((bulletP) => {
    const bulletPlayerArea = getBulletPlayerArea(
      bulletP.position.x,
      bulletP.position.y,
      bulletP.direction
    );

    enemyPlanes.forEach((enemy) => {
      // Ajustar posición del avión enemigo según su dirección
      let adjustedEnemyPosition = { ...enemy.position };
      switch (enemy.direction) {
        case "x+":
          adjustedEnemyPosition.x -= 1;
          adjustedEnemyPosition.y -= 1;
          break;
        case "x-":
          adjustedEnemyPosition.x -= 1;
          adjustedEnemyPosition.y -= 1;
          break;
        case "y+":
          adjustedEnemyPosition.x -= 1;
          adjustedEnemyPosition.y -= 1;
          break;
        case "y-":
          adjustedEnemyPosition.x -= 1;
          adjustedEnemyPosition.y -= 1;
          break;
        default:
          break;
      }

      const enemyArea = getCollisionArea(
        adjustedEnemyPosition.x,
        adjustedEnemyPosition.y
      );

      const collisionDetected = bulletPlayerArea.some(([bx, by]) =>
        enemyArea.some(([ex, ey]) => bx === ex && by === ey)
      );

      if (collisionDetected) {
        collidedEnemies.add(`${enemy.position.x},${enemy.position.y}`);
        collidedBullets.add(`${bulletP.position.x},${bulletP.position.y}`);

        setAmountKilledEnemies((prev) => prev + 1);
        console.log(
          `¡Colisión detectada! Coordenadas de la bala del jugador: (${bulletP.position.x}, ${bulletP.position.y}), Coordenadas del avión enemigo: (${enemy.position.x}, ${enemy.position.y})`
        );
      }
    });
  });

  // Filtra los aviones enemigos y balas que no colisionaron
  const updatedEnemyPlanes = enemyPlanes.filter(
    (enemy) => !collidedEnemies.has(`${enemy.position.x},${enemy.position.y}`)
  );
  const updatedBulletsPlayer = bulletsPlayer.filter(
    (bulletP) =>
      !collidedBullets.has(`${bulletP.position.x},${bulletP.position.y}`)
  );

  return {
    enemyPlanes: updatedEnemyPlanes,
    bulletsPlayer: updatedBulletsPlayer,
  };
};
