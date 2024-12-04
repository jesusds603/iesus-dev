import React from "react";
import { Plane } from "@/components/PlaneBlock/constants";
import { getRandomDirection } from "@/components/PlaneBlock/functions/GetDirectionAndRotation";
import { getOccupiedCells } from "@/components/PlaneBlock/functions/GetOccupiedCells";
import { isCollision } from "@/components/PlaneBlock/functions/IsCollisionEnemies";
import { movePlane } from "@/components/PlaneBlock/functions/MovePlanes";
import { reverseDirection } from "@/components/PlaneBlock/functions/ReverseDirection";

interface EnemyPlaneUpdaterProps {
  setEnemyPlanes: React.Dispatch<React.SetStateAction<Plane[]>>;
  enemyPlanesRef: React.MutableRefObject<Plane[]>;
  cellSize: number;
  gridHeight: number;
  gridWidth: number;
}

const EnemyPlaneUpdater = ({
  setEnemyPlanes,
  enemyPlanesRef,
  cellSize,
  gridHeight,
  gridWidth,
}: EnemyPlaneUpdaterProps) => {
  // Lógica de actualización de enemigos
  const updateEnemyPlanes = () => {
    setEnemyPlanes((prevPlanes) => {
      const updatedPlanes = prevPlanes.map((plane, index, planes) => {
        const { position: newPosition, direction: wallDirection } = movePlane(
          plane,
          cellSize,
          gridHeight,
          gridWidth
        );

        const randomDirection =
          Math.random() < 0.2 ? getRandomDirection() : plane.direction;

        const newOccupiedCells = getOccupiedCells(newPosition);

        const collisionWithEnemies = planes.some((otherPlane, otherIndex) => {
          if (index !== otherIndex) {
            const otherOccupiedCells = getOccupiedCells(otherPlane.position);
            return isCollision(newOccupiedCells, otherOccupiedCells);
          }
          return false;
        });

        let finalDirection = plane.direction;

        if (collisionWithEnemies) {
          finalDirection = reverseDirection(plane.direction);
        } else if (wallDirection !== plane.direction) {
          finalDirection = wallDirection;
        } else {
          finalDirection = randomDirection;
        }

        return {
          position: collisionWithEnemies ? plane.position : newPosition,
          direction: finalDirection,
        };
      });

      // Sincronizar la referencia
      enemyPlanesRef.current = updatedPlanes;
      return updatedPlanes;
    });
  };

  return { updateEnemyPlanes };
};

export default EnemyPlaneUpdater;
