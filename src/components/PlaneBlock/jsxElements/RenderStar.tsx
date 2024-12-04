import React from "react";
import { FaStar } from "react-icons/fa";
import { Star } from "../constants";

interface RenderStarProps {
  star: Star;
  cellSize: number;
  gridHeight: number;
  gridWidth: number;
}

const RenderStar: React.FC<RenderStarProps> = ({
  star,
  cellSize,
  gridHeight,
  gridWidth,
}) => {
  const { x, y } = star.position;

  // No renderizar si la posición está fuera de los límites
  if (x < 0 || x >= gridWidth || y < 0 || y >= gridHeight) {
    return null;
  }

  return (
    <div
      style={{
        position: "absolute",
        bottom: y * cellSize,
        left: x * cellSize,
        width: cellSize,
        height: cellSize,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none", // Asegura que no interfieran con otros elementos interactivos
        zIndex: 2, // Coloca las estrellas encima del fondo
      }}
    >
      <FaStar
        style={{
          color: "rgba(218, 165, 32, 0.9)", // Dorado con menor opacidad
          fontSize: `${cellSize * 0.5}px`, // Tamaño reducido
        }}
      />
    </div>
  );
};

export default RenderStar;
