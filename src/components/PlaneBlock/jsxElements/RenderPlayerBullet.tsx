import React from "react";
import { Bullet } from "@/components/PlaneBlock/constants";

// Tipo para las propiedades de RenderPlayerBullet
interface RenderPlayerBulletProps {
  bullet: Bullet;
  cellSize: number;
  gridHeight: number;
  gridWidth: number;
}

const RenderPlayerBullet: React.FC<RenderPlayerBulletProps> = ({
  bullet,
  cellSize,
  gridHeight,
  gridWidth,
}) => {
  const { x, y } = bullet.position;
  const direction = bullet.direction;

  // Ajusta la posición y rotación de la bala según su dirección
  const bottom = y * cellSize;
  const left = x * cellSize;
  let rotation = 0;

  switch (direction) {
    case "x+":
      rotation = 90; // Apunta a la derecha
      break;
    case "x-":
      rotation = 270; // Apunta a la izquierda
      break;
    case "y+":
      rotation = 0; // Apunta hacia abajo
      break;
    case "y-":
      rotation = 180; // Apunta hacia arriba
      break;
    default:
      break;
  }

  // Si la posición de la bala está fuera del área de la cuadrícula, no la renderizamos
  if (x >= gridWidth - 1 || y >= gridHeight - 1 || x < 1 || y < 1) {
    return null;
  }

  return (
    <div
      className="bg-gradient-to-t from-red-800 via-yellow-600 to-yellow-500"
      style={{
        position: "absolute",
        width: cellSize * 1.2,
        height: cellSize * 1.5,
        bottom: bottom - 0.25 * cellSize,
        left: left - 0.1 * cellSize,
        transform: `rotate(${rotation}deg)`,
        clipPath:
          "polygon(50% 0%, 20% 30%, 20% 70%, 30% 80%, 10% 100%, 90% 100%, 70% 80%, 80% 70%, 80% 30%)", // Triángulo apuntando hacia abajo
      }}
    />
  );
};

export default RenderPlayerBullet;
