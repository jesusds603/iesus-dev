import constants, { Plane, Bullet } from "@/components/PlaneBlock/constants";
import { rotateAndMovePlayer } from "@/components/PlaneBlock/functions/MovePlanes";

const createPlayerBullet = (playerPlane: Plane): Bullet => {
  let newPosition;

  // Dependiendo de la dirección del avión, ajustamos la posición de la bala
  switch (playerPlane.direction) {
    case "x+":
      newPosition = {
        x: playerPlane.position.x + 1,
        y: playerPlane.position.y - 1,
      }; // Derecha
      break;
    case "x-":
      newPosition = {
        x: playerPlane.position.x - 2,
        y: playerPlane.position.y - 1,
      }; // Izquierda
      break;
    case "y+":
      newPosition = {
        x: playerPlane.position.x - 1,
        y: playerPlane.position.y + 1,
      }; // Arriba
      break;
    case "y-":
      newPosition = {
        x: playerPlane.position.x - 1,
        y: playerPlane.position.y - 2,
      }; // Abajo
      break;
    default:
      // Si la dirección no es ninguna de las anteriores, la posición será justo arriba
      newPosition = {
        x: playerPlane.position.x - 1,
        y: playerPlane.position.y + 1,
      };
  }

  return {
    position: newPosition,
    direction: playerPlane.direction,
  };
};

//+ Handles key down events
export const handleKeyDown = (
  event: KeyboardEvent,
  activeKeysRef: React.MutableRefObject<string[]>,
  isCollisionPlayer: boolean,
  setPlayerPlane: React.Dispatch<React.SetStateAction<Plane>>,
  intervalRef: React.MutableRefObject<NodeJS.Timeout | null>,
  cellSize: number,
  gridHeight: number,
  gridWidth: number,
  playerSpeed: number,
  setPlayerBullets: React.Dispatch<React.SetStateAction<Bullet[]>>,
  playerPlane: Plane
) => {
  const key = event.key.toLowerCase();

  // Si la tecla es Enter, crear una bala
  if (key === "p") {
    const newBullet = createPlayerBullet(playerPlane);
    setPlayerBullets((prevBullets) => [...prevBullets, newBullet]); // Agregar la bala a las balas del jugador
    return;
  }

  // Si la tecla no está en directionMap o ya está en activeKeysRef, no hacemos nada
  if (!constants.directionMap[key] || activeKeysRef.current.includes(key)) {
    return;
  }

  // Añade la tecla a activeKeysRef y solo ejecuta el movimiento si es la primera en la lista
  activeKeysRef.current.push(key);

  if (activeKeysRef.current.length === 1) {
    rotateAndMovePlayer(
      key,
      isCollisionPlayer,
      setPlayerPlane,
      cellSize,
      gridHeight,
      gridWidth
    );
    intervalRef.current = setInterval(() => {
      rotateAndMovePlayer(
        key,
        isCollisionPlayer,
        setPlayerPlane,
        cellSize,
        gridHeight,
        gridWidth
      );
    }, playerSpeed);
  }
};

//* Handles key up events
export const handleKeyUp = (
  event: KeyboardEvent,
  activeKeysRef: React.MutableRefObject<string[]>,
  isCollisionPlayer: boolean,
  setPlayerPlane: React.Dispatch<React.SetStateAction<Plane>>,
  intervalRef: React.MutableRefObject<NodeJS.Timeout | null>,
  cellSize: number,
  gridHeight: number,
  gridWidth: number,
  playerSpeed: number
) => {
  const key = event.key.toLowerCase();

  // Remueve la tecla de activeKeysRef cuando se suelta
  activeKeysRef.current = activeKeysRef.current.filter((k) => k !== key);

  // Filtrar solo las teclas de movimiento (W, A, S, D)
  const activeMovementKeys = activeKeysRef.current.filter((k) =>
    ["w", "a", "s", "d"].includes(k)
  );

  // Si no hay teclas activas, detener el movimiento
  if (activeKeysRef.current.length === 0) {
    clearInterval(intervalRef.current as NodeJS.Timeout);
    intervalRef.current = null;
  } else {
    // Si quedan teclas activas, tomar la primera y continuar el movimiento
    const nextKey = activeMovementKeys[0];

    rotateAndMovePlayer(
      nextKey,
      isCollisionPlayer,
      setPlayerPlane,
      cellSize,
      gridHeight,
      gridWidth
    );

    clearInterval(intervalRef.current as NodeJS.Timeout);

    intervalRef.current = setInterval(() => {
      rotateAndMovePlayer(
        nextKey,
        isCollisionPlayer,
        setPlayerPlane,
        cellSize,
        gridHeight,
        gridWidth
      );
    }, playerSpeed);
  }
};
