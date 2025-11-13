import React from "react";
import { Plane, Bullet, Star } from "@/components/PlaneBlock/constants";
import { useTheme } from "@/hooks/useTheme";
import { renderPlane } from "@/components/PlaneBlock/jsxElements/RenderPlane";
import RenderBullet from "./RenderBullet";
import RenderPlayerBullet from "./RenderPlayerBullet";
import RenderStar from "./RenderStar";

interface GridPlaneProps {
  playerPlane: Plane;
  enemyPlanes: Plane[];
  cellSize: number;
  gridHeight: number;
  gridWidth: number;
  bullets: Bullet[];
  playerBullets: Bullet[];
  stars: Star[];
}

function GridPlane({
  playerPlane,
  enemyPlanes,
  cellSize,
  gridHeight,
  gridWidth,
  bullets,
  playerBullets,
  stars,
}: GridPlaneProps) {
  const { myTheme } = useTheme();

  return (
    <div
      style={{
        width: gridWidth * cellSize,
        height: gridHeight * cellSize,
        display: "grid",
        gridTemplateColumns: `repeat(${gridWidth}, ${cellSize}px)`,
        outline: "2px solid teal",
        outlineOffset: "2px",
        position: "relative",
      }}
    >
      {/* Lineas de la cuadricula */}
      {Array.from({
        length: gridWidth * gridHeight,
      }).map((_, index) => (
        <div
          key={index}
          style={{
            width: cellSize,
            height: cellSize,
            borderRight:
              index % gridWidth === gridWidth - 1
                ? "none"
                : myTheme === "dark"
                ? "1px solid teal"
                : "1px solid black", // Línea vertical
            borderBottom:
              index >= gridWidth * (gridHeight - 1)
                ? "none"
                : myTheme === "dark"
                ? "1px solid teal"
                : "1px solid black", // Línea horizontal
          }}
        />
      ))}

      {/* Fondos */}
     

      {stars.map((star, index) => (
        <RenderStar
          key={index}
          star={star}
          cellSize={cellSize}
          gridHeight={gridHeight}
          gridWidth={gridWidth}
        />
      ))}

      {enemyPlanes.map((plane, index) =>
        renderPlane(
          plane.position,
          plane.direction,
          false,
          index + 1,
          cellSize,
          myTheme
        )
      )}

      {renderPlane(
        playerPlane.position,
        playerPlane.direction,
        true,
        0,
        cellSize,
        myTheme
      )}

      {bullets.map((bullet, index) => (
        <RenderBullet
          key={index}
          bullet={bullet}
          cellSize={cellSize}
          gridHeight={gridHeight}
          gridWidth={gridWidth}
        />
      ))}

      {playerBullets.map((bullet, index) => (
        <RenderPlayerBullet
          key={index}
          bullet={bullet}
          cellSize={cellSize}
          gridHeight={gridHeight}
          gridWidth={gridWidth}
        />
      ))}
    </div>
  );
}

export default GridPlane;
