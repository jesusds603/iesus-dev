import { Direction, Plane } from "../constants";

//* Function to update the position of a plane based on its direction
export const movePlane = (
  plane: Plane,
  cellSize: number,
  gridHeight: number,
  gridWidth: number
): Plane => {
  const { position, direction } = plane;
  const newPosition = { ...position };

  switch (direction) {
    case "x+":
      if (position.x >= gridWidth - 1) {
        return { position: newPosition, direction: "x-" }; // Revertimos la dirección
      } else {
        newPosition.x += 1; // Mover a la derecha
      }
      break;

    case "x-":
      if (position.x <= 2) {
        return { position: newPosition, direction: "x+" }; // Revertimos la dirección
      } else {
        newPosition.x -= 1; // Mover a la izquierda
      }
      break;

    case "y+":
      if (position.y >= gridHeight - 1) {
        return { position: newPosition, direction: "y-" }; // Revertimos la dirección
      } else {
        newPosition.y += 1; // Mover hacia abajo
      }
      break;

    case "y-":
      if (position.y <= 2) {
        return { position: newPosition, direction: "y+" }; // Revertimos la dirección
      } else {
        newPosition.y -= 1; // Mover hacia arriba
      }
      break;

    default:
      return { position, direction }; // Si la dirección no es válida, devuelve la posición original y dirección
  }

  return { position: newPosition, direction }; // Retorna la nueva posición y dirección
};

//* -------------------------------------------------------------
//* ------------------------------------------------------------

export const rotateAndMovePlayer = (
  key: string,
  isCollisionPlayer: boolean,
  setPlayerPlane: React.Dispatch<React.SetStateAction<Plane>>,
  cellSize: number,
  gridHeight: number,
  gridWidth: number
) => {
  let newDirection: Direction;
  // let advance1: number = isCollisionPlayer ? 0 : 1;

  // Determina la nueva dirección según la tecla presionada
  switch (key) {
    case "w": // Mover hacia arriba
      newDirection = "y+";
      break;
    case "s": // Mover hacia abajo
      newDirection = "y-";
      break;
    case "a": // Mover hacia la izquierda
      newDirection = "x-";
      break;
    case "d": // Mover hacia la derecha
      newDirection = "x+";
      break;
    default:
      return; // Si la tecla no es válida, no hacemos nada
  }

  setPlayerPlane((prev: Plane) => {
    // Calcula la nueva posición según la nueva dirección
    const newPosition = { ...prev.position };

    switch (newDirection) {
      case "x+":
        newPosition.x = Math.min(newPosition.x + 1, gridWidth - 1);
        break;
      case "x-":
        newPosition.x = Math.max(newPosition.x - 1, 2);
        break;
      case "y+":
        newPosition.y = Math.min(newPosition.y + 1, gridHeight - 1);
        break;
      case "y-":
        newPosition.y = Math.max(newPosition.y - 1, 2);
        break;
    }

    return {
      position: newPosition,
      direction: newDirection,
    };
  });
};
