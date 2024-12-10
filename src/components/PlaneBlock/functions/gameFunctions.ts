import { Dispatch, SetStateAction, MutableRefObject } from "react";
import { Plane, Bullet, Direction } from "@/components/PlaneBlock/constants";
import generateEnemyPlanes from "@/components/PlaneBlock/functions/GenerateEnemyPlanes";
import { shootBulletFromPlane } from "@/components/PlaneBlock/functions/shootMoveBullets";

interface ResetGameParams {
  initialPlayerPlane: Plane;
  isGridHorizontal: boolean;
  gridHeight: number;
  gridWidth: number;
  amountEnemies: number;
  setPlayerPlane: Dispatch<SetStateAction<Plane>>;
  setEnemyPlanes: Dispatch<SetStateAction<Plane[]>>;
  setIsCollisionPlayer: Dispatch<SetStateAction<boolean>>;
  setGameIsOver: Dispatch<SetStateAction<boolean>>;
  setGameIsPaused: Dispatch<SetStateAction<boolean>>;
  activeKeysRef: MutableRefObject<string[]>;
  setBullets: Dispatch<SetStateAction<Bullet[]>>;
  intervalRef: MutableRefObject<NodeJS.Timeout | null>;
  bulletIntervalRef: MutableRefObject<NodeJS.Timeout | null>;
  setPlayerBullets: Dispatch<SetStateAction<Bullet[]>>;
  setAmountKilledEnemies: React.Dispatch<React.SetStateAction<number>>;
}

export function resetGame({
  initialPlayerPlane,
  isGridHorizontal,
  gridHeight,
  gridWidth,
  amountEnemies,
  setPlayerPlane,
  setEnemyPlanes,
  setIsCollisionPlayer,
  setGameIsOver,
  setGameIsPaused,
  activeKeysRef,
  setBullets,
  intervalRef,
  bulletIntervalRef,
  setPlayerBullets,
  setAmountKilledEnemies,
}: ResetGameParams) {
  setPlayerPlane(initialPlayerPlane);
  setEnemyPlanes(
    generateEnemyPlanes(isGridHorizontal, gridHeight, gridWidth, amountEnemies)
  );
  setIsCollisionPlayer(false);
  setGameIsOver(false);
  setGameIsPaused(false);
  activeKeysRef.current = [];
  setBullets([]);
  setPlayerBullets([]);
  setAmountKilledEnemies(0);

  if (intervalRef.current) {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  }
  if (bulletIntervalRef.current) {
    clearInterval(bulletIntervalRef.current);
    bulletIntervalRef.current = null;
  }
}

//* --------------------------------------------------------

export const updateEnemyPlanes = (
  updatedPlanes: Plane[],
  enemyPlanesRef: MutableRefObject<Plane[]>,
  setEnemyPlanes: Dispatch<SetStateAction<Plane[]>>
) => {
  enemyPlanesRef.current = updatedPlanes;
  setEnemyPlanes(updatedPlanes); // Esto asegura el re-render
};

interface HandleStartParams {
  gameIsOver: boolean;
  setGameIsStarted: Dispatch<SetStateAction<boolean>>;
  setGameIsPaused: Dispatch<SetStateAction<boolean>>;
  enemyPlanes: Plane[];
  setEnemyPlanes: Dispatch<SetStateAction<Plane[]>>;
  setBullets: Dispatch<SetStateAction<Bullet[]>>;
  intervalFiringPlane: number;
  intervalBetweenPlanesShoot: number;
  bulletIntervalRef: MutableRefObject<NodeJS.Timeout | null>;
  activeKeysRef: MutableRefObject<string[]>;
  gridWidth: number;
  gridHeight: number;
  amountInScreen: Record<string, number>;
  currentLevel: number;
  enemyPlanesRef: MutableRefObject<Plane[]>;
  playerPlane: Plane;
}

export function handleStart({
  gameIsOver,
  setGameIsStarted,
  setGameIsPaused,
  enemyPlanes,
  setEnemyPlanes,
  setBullets,
  intervalFiringPlane,
  intervalBetweenPlanesShoot,
  bulletIntervalRef,
  activeKeysRef,
  gridWidth,
  gridHeight,
  amountInScreen,
  currentLevel,
  enemyPlanesRef,
  playerPlane,
}: HandleStartParams) {
  setGameIsStarted(true);
  activeKeysRef.current = [];
  setGameIsPaused(false);

  // Configurar los tiempos de disparo iniciales de forma escalonada
  const lastShotTimes = enemyPlanes.map(
    (_, index) => Date.now() + index * intervalBetweenPlanesShoot
  );

  bulletIntervalRef.current = setInterval(() => {
    const currentTime = Date.now();

    setEnemyPlanes((prevPlanes) =>
      prevPlanes.map((plane, index) => {
        if (currentTime - lastShotTimes[index] >= intervalFiringPlane) {
          shootBulletFromPlane(plane, setBullets);
          lastShotTimes[index] += intervalFiringPlane;
        }
        return plane;
      })
    );

    // Sincronizar referencia
    enemyPlanesRef.current = enemyPlanesRef.current;
  }, intervalBetweenPlanesShoot);

  // Intervalo para agregar nuevos enemigos
  const addEnemyInterval = setInterval(() => {
    const diffEnemies =
      amountInScreen[`L${currentLevel}`] - enemyPlanesRef.current.length;

    if (diffEnemies >= 1) {
      // Función para encontrar una posición válida
      const findValidPosition = () => {
        for (let x = 2; x < gridWidth - 1; x++) {
          for (let y = 2; y < gridHeight - 1; y++) {
            const isFarEnoughFromEnemies = enemyPlanesRef.current.every(
              (plane) =>
                Math.abs(plane.position.x - x) >= 4 &&
                Math.abs(plane.position.y - y) >= 4
            );

            const isFarEnoughFromPlayer =
              Math.abs(playerPlane.position.x - x) >= 5 &&
              Math.abs(playerPlane.position.y - y) >= 5;

            if (isFarEnoughFromEnemies && isFarEnoughFromPlayer) {
              return { x, y };
            }
          }
        }

        return null; // Si no encuentra ninguna posición válida
      };

      const position = findValidPosition();

      if (position) {
        const directions: Direction[] = ["x+", "x-", "y+", "y-"];
        const randomDirection: Direction =
          directions[Math.floor(Math.random() * directions.length)];

        const newPlane: Plane = {
          position,
          direction: randomDirection,
        };

        // Agregar el nuevo avión a la referencia y al estado
        updateEnemyPlanes(
          [...enemyPlanesRef.current, newPlane],
          enemyPlanesRef,
          setEnemyPlanes
        );
      }
    }
  }, 2000); // Checar cada 2 segundos

  // Limpiar intervalos si el juego termina
  if (gameIsOver) {
    clearInterval(bulletIntervalRef.current!);
    clearInterval(addEnemyInterval);
  }
}

//* --------------------------------------------------------

interface HandlePauseParams {
  setGameIsPaused: Dispatch<SetStateAction<boolean>>;
  bulletIntervalRef: MutableRefObject<NodeJS.Timeout | null>;
}

export function handlePause({
  setGameIsPaused,
  bulletIntervalRef,
}: HandlePauseParams) {
  setGameIsPaused(true);

  if (bulletIntervalRef.current) clearInterval(bulletIntervalRef.current);
}

//* --------------------------------------------------------

interface HandleEndGameParams {
  setGameIsStarted: Dispatch<SetStateAction<boolean>>;
  setGameIsPaused: Dispatch<SetStateAction<boolean>>;
  setGameIsOver: Dispatch<SetStateAction<boolean>>;
  bulletIntervalRef: MutableRefObject<NodeJS.Timeout | null>;
  activeKeysRef: MutableRefObject<string[]>;
  intervalRef: MutableRefObject<NodeJS.Timeout | null>;
}

export function handleEndGame({
  setGameIsStarted,
  setGameIsPaused,
  setGameIsOver,
  bulletIntervalRef,
  activeKeysRef,
  intervalRef,
}: HandleEndGameParams) {
  setGameIsStarted(false);
  setGameIsPaused(false);
  setGameIsOver(true);
  activeKeysRef.current = [];

  if (intervalRef.current) {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  }
  if (bulletIntervalRef.current) {
    clearInterval(bulletIntervalRef.current);
    bulletIntervalRef.current = null;
  }

  alert("Game Over!");
}

//*  ------------------------------------------
interface HandleNextLevelParams {
  currentLevel: number;
  setCurrentLevel: Dispatch<SetStateAction<number>>;
  amountInScreen: { [level: string]: number };
  setAmountEnemies: Dispatch<SetStateAction<number>>;
  setGameIsStarted: Dispatch<SetStateAction<boolean>>;
  bulletIntervalRef: MutableRefObject<NodeJS.Timeout | null>;
  activeKeysRef: MutableRefObject<string[]>;
  intervalRef: MutableRefObject<NodeJS.Timeout | null>;
  setBullets: Dispatch<SetStateAction<Bullet[]>>;
  setPlayerBullets: Dispatch<SetStateAction<Bullet[]>>;
  initialPlayerPlane: Plane;
  isGridHorizontal: boolean;
  gridHeight: number;
  gridWidth: number;
  amountEnemies: number;
  setPlayerPlane: Dispatch<SetStateAction<Plane>>;
  setEnemyPlanes: Dispatch<SetStateAction<Plane[]>>;
  setIsCollisionPlayer: Dispatch<SetStateAction<boolean>>;
  setGameIsOver: Dispatch<SetStateAction<boolean>>;
  setGameIsPaused: Dispatch<SetStateAction<boolean>>;
  setAmountKilledEnemies: React.Dispatch<React.SetStateAction<number>>;
  setLevelIsPassed: Dispatch<SetStateAction<boolean>>;
}

export const handleNextLevel = ({
  currentLevel,
  setCurrentLevel,
  amountInScreen,
  setAmountEnemies,
  setGameIsStarted,
  bulletIntervalRef,
  activeKeysRef,
  intervalRef,
  setBullets,
  setPlayerBullets,
  initialPlayerPlane,
  isGridHorizontal,
  gridHeight,
  gridWidth,
  amountEnemies,
  setPlayerPlane,
  setEnemyPlanes,
  setIsCollisionPlayer,
  setGameIsOver,
  setGameIsPaused,
  setAmountKilledEnemies,
  setLevelIsPassed,
}: HandleNextLevelParams) => {
  const nextLevel = currentLevel + 1;
  const key = `L${nextLevel}` as keyof typeof amountInScreen;

  setLevelIsPassed(false);

  if (amountInScreen[key]) {
    setCurrentLevel((prev) => prev + 1);
    setAmountEnemies(amountInScreen[`L${currentLevel + 1}`] || 10);
    setGameIsStarted(false);
    setPlayerPlane(initialPlayerPlane);
    setEnemyPlanes(
      generateEnemyPlanes(
        isGridHorizontal,
        gridHeight,
        gridWidth,
        amountEnemies
      )
    );
    setIsCollisionPlayer(false);
    setGameIsOver(false);
    setGameIsPaused(false);
    activeKeysRef.current = [];
    setBullets([]);
    setPlayerBullets([]);
    setAmountKilledEnemies(0);

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (bulletIntervalRef.current) {
      clearInterval(bulletIntervalRef.current);
      bulletIntervalRef.current = null;
    }
  } else {
    alert("¡Has completado todos los niveles!");
  }
};
