import { RiSpaceShipFill } from "react-icons/ri";
import { Position, Direction } from "../constants";
import { getRotation } from "../functions/GetDirectionAndRotation";

// Definición de colores para el tema claro y oscuro
const lightThemeColors = {
  top: "bg-gradient-to-t from-rose-600 to-pink-600",
  sides: "bg-gradient-to-t from-rose-700 to-pink-700",
  middle: "bg-gradient-to-r from-rose-800 to-pink-800",
  bottom: "bg-gradient-to-t from-rose-900 to-pink-900",
};

const darkThemeColors = {
  top: "bg-gradient-to-t from-rose-400 to-pink-300",
  sides: "bg-gradient-to-t from-rose-500 to-pink-400",
  middle: "bg-gradient-to-r from-rose-800 to-pink-700",
  bottom: "bg-gradient-to-t from-rose-600 to-pink-600",
};

//* Function to render a plane at the given position
export const renderPlane = (
  position: Position,
  direction: Direction,
  isPlayer: boolean,
  planeId: number,
  cellSize: number,
  myTheme: string
) => {
  const rotationStyle = getRotation(direction);
  const fontSize = 0.9 * cellSize; // Calculando el tamaño de la fuente

  // Seleccionar colores dependiendo del tema
  const colors = myTheme === "dark" ? darkThemeColors : lightThemeColors;

  // Colores del jugador que también cambian con el tema
  const playerColors = {
    top:
      myTheme === "dark"
        ? "bg-gradient-to-t from-sky-400 to-cyan-300"
        : "bg-gradient-to-t from-gray-500 via-purple-600 to-violet-600",
    sides:
      myTheme === "dark"
        ? "bg-gradient-to-t from-sky-500 to-cyan-400"
        : "bg-gradient-to-t from-gray-500 via-purple-600 to-violet-600",
    middle:
      myTheme === "dark"
        ? "bg-gradient-to-t from-sky-600 to-cyan-500"
        : "bg-gradient-to-t from-gray-600 via-purple-700 to-violet-700",
    bottom:
      myTheme === "dark"
        ? "bg-gradient-to-t from-sky-700 to-cyan-600"
        : "bg-gradient-to-t from-gray-700 via-purple-800 to-violet-800",
  };

  return (
    <div
      key={planeId}
      style={{
        position: "absolute",
        left: cellSize * (position.x - 2),
        bottom: cellSize * (position.y - 2),
        width: cellSize * 3,
        height: cellSize * 3,
        transform: rotationStyle,
        transformOrigin: "center center",
      }}
    >
      <div
        key={`${planeId}-top-left`}
        className={isPlayer ? playerColors.sides : colors.sides}
        style={{
          position: "absolute",
          left: 0,
          bottom: 2 * cellSize,
          width: cellSize,
          height: cellSize,
          clipPath: "polygon(70% 60%, 85% 60%, 85% 100%, 70% 100%)",
        }}
      />
      <div
        key={`${planeId}-top-middle`}
        className={isPlayer ? playerColors.top : colors.top}
        style={{
          position: "absolute",
          left: cellSize,
          bottom: 2 * cellSize,
          width: cellSize,
          height: cellSize,
          clipPath: "polygon(30% 0, 70% 0, 120% 100%, -20% 100%)",
        }}
      />
      <div
        key={`${planeId}-top-right`}
        className={isPlayer ? playerColors.sides : colors.sides}
        style={{
          position: "absolute",
          left: 2 * cellSize,
          bottom: 2 * cellSize,
          width: cellSize,
          height: cellSize,
          clipPath: "polygon(30% 60%, 15% 60%, 15% 100%, 30% 100%)",
        }}
      />
      <div
        key={`${planeId}-left`}
        className={isPlayer ? playerColors.sides : colors.sides}
        style={{
          position: "absolute",
          left: 0,
          bottom: cellSize,
          width: cellSize,
          height: cellSize,
          clipPath: "polygon(60% 0, 100% 0, 100% 100%, 0 100%)",
        }}
      />
      <div
        key={`${planeId}-middle`}
        className={isPlayer ? playerColors.middle : colors.middle}
        style={{
          position: "absolute",
          left: cellSize,
          bottom: cellSize,
          width: cellSize,
          height: cellSize,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span className="text-white font-bold" style={{ fontSize }}>
          {planeId === 0 ? <RiSpaceShipFill /> : planeId}
        </span>
      </div>
      <div
        key={`${planeId}-right`}
        className={isPlayer ? playerColors.sides : colors.sides}
        style={{
          position: "absolute",
          left: cellSize * 2,
          bottom: cellSize,
          width: cellSize,
          height: cellSize,
          clipPath: "polygon(0 0, 40% 0, 100% 100%, 0 100%)",
        }}
      />
      <div
        key={`${planeId}-bottom-left`}
        className={isPlayer ? playerColors.bottom : colors.bottom}
        style={{
          position: "absolute",
          left: 0,
          bottom: 0,
          width: cellSize,
          height: cellSize,
          clipPath:
            "polygon(0 0, 100% 0, 100% 70%, 70% 70%, 80% 100%, 20% 100%, 30% 70%, 0 70%)",
        }}
      />
      <div
        key={`${planeId}-bottom-middle`}
        className={isPlayer ? playerColors.bottom : colors.bottom}
        style={{
          position: "absolute",
          left: cellSize,
          bottom: 0,
          width: cellSize,
          height: cellSize,
          clipPath:
            "polygon(0 0, 100% 0, 100% 30%, 70% 30%, 80% 60%, 20% 60%, 30% 30%, 0 30%)",
        }}
      />
      <div
        key={`${planeId}-bottom-right`}
        className={isPlayer ? playerColors.bottom : colors.bottom}
        style={{
          position: "absolute",
          left: 2 * cellSize,
          bottom: 0,
          width: cellSize,
          height: cellSize,
          clipPath:
            "polygon(0 0, 100% 0, 100% 70%, 70% 70%, 80% 100%, 20% 100%, 30% 70%, 0 70%)",
        }}
      />
    </div>
  );
};
