import React from "react";
import constants, { Bullet } from "@/components/PlaneBlock/constants";

// Tipo para las propiedades de RenderBullet
interface RenderBulletProps {
  bullet: Bullet;
  cellSize: number;
  gridHeight: number;
  gridWidth: number;
}

const RenderBullet: React.FC<RenderBulletProps> = ({
  bullet,
  cellSize,
  gridHeight,
  gridWidth,
}) => {
  const { x, y } = bullet.position;
  const direction = bullet.direction;

  // Ajusta la posición en base a la dirección
  let bottom = y * cellSize;
  let left = x * cellSize;
  let rotation = 0;

  switch (direction) {
    case "x+":
      bottom = (y - 1) * cellSize;
      left = (x + 1) * cellSize;
      rotation = 90; // Apunta a la derecha
      break;
    case "x-":
      bottom = (y - 1) * cellSize;
      left = (x - 2) * cellSize;
      rotation = 270; // Apunta a la izquierda
      break;
    case "y+":
      bottom = (y + 1) * cellSize;
      left = (x - 1) * cellSize;
      rotation = 0; // Apunta hacia abajo
      break;
    case "y-":
      bottom = (y - 2) * cellSize;
      left = (x - 1) * cellSize;
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
      className="bg-gradient-to-t from-red-700 via-red-500 to-yellow-500"
      style={{
        position: "absolute",
        width: cellSize,
        height: cellSize * 1.5,
        bottom: bottom - 0.25 * cellSize,
        left,
        transform: `rotate(${rotation}deg)`,
        clipPath:
          "polygon(50% 0%, 30% 30%, 30% 70%, 40% 80%, 10% 100%, 90% 100%, 60% 80%, 70% 70%, 70% 30%)", // los porcentajes empiezan desde la esquina inferior izquierda en sentido antihorario con balas apuntando hacia abajo
      }}
    />
  );
};

export default RenderBullet;
