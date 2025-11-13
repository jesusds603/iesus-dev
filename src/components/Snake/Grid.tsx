import React from "react";
import {
  GRID_HEIGHT,
  GRID_WIDTH,
  CELL_SIZE,
  HEAD_SIZE_ADDITIONAL,
  EYES_SIZE,
  Position,
} from "@/components/Snake/constants";
import { useTheme } from "@/hooks/useTheme";
import { getRotationAngle } from "./getRotationAngle";

function Grid({
  snake,
  direction,
  food,
}: {
  snake: Position[];
  direction: Position;
  food: Position;
}) {
  const { myTheme } = useTheme();

  return (
    <div
      style={{
        width: GRID_WIDTH * CELL_SIZE,
        height: GRID_HEIGHT * CELL_SIZE,
        display: "grid",
        gridTemplateColumns: `repeat(${GRID_WIDTH}, ${CELL_SIZE}px)`,
        outline: "2px solid teal", // Elige el color `teal-400`
        outlineOffset: "2px", // Aumenta la distancia del borde exterior
        position: "relative",
      }}
    >
      {/* Lineas de la cuadricula */}
      {Array.from({ length: GRID_WIDTH * GRID_HEIGHT }).map((_, index) => (
        <div
          key={index}
          style={{
            width: CELL_SIZE,
            height: CELL_SIZE,
            borderRight:
              index % GRID_WIDTH === GRID_WIDTH - 1
                ? "none"
                : myTheme === "dark"
                ? "1px solid teal"
                : "1px solid black", // Línea vertical
            borderBottom:
              index >= GRID_WIDTH * (GRID_HEIGHT - 1)
                ? "none"
                : myTheme === "dark"
                ? "1px solid teal"
                : "1px solid black", // Línea horizontal
          }}
        />
      ))}


      {/* Snake */}
      {snake.map((segment, index) => (
        <div
          key={index}
          className={`absolute transition-all ease-in-out duration-100 ${
            index === 0
              ? "bg-yellow-500"
              : index === snake.length - 1
              ? "bg-purple-600 border border-fuchsia-400"
              : "bg-green-900 border border-green-500"
          }`}
          style={{
            width: index === 0 ? CELL_SIZE + HEAD_SIZE_ADDITIONAL : CELL_SIZE,
            height: index === 0 ? CELL_SIZE + HEAD_SIZE_ADDITIONAL : CELL_SIZE,

            position: "absolute",
            left:
              segment.x * CELL_SIZE +
              (index === 0 ? -HEAD_SIZE_ADDITIONAL / 2 : 0), // Centrar la cabeza
            top:
              segment.y * CELL_SIZE +
              (index === 0 ? -HEAD_SIZE_ADDITIONAL / 2 : 0), // Centrar la cabeza
            borderRadius: "50%", // Hacer la cabeza redonda
            transition: "all 0.1s ease", // Suaviza la transición de tamaño
            clipPath:
              index === snake.length - 1 && snake.length > 1
                ? "polygon(0 50%, 100% 100%, 100% 0)"
                : "none", // Forma triangular para la cola
            transform:
              index === 0 // Rotación para la cabeza
                ? `rotate(${getRotationAngle(snake, direction, index)}deg)`
                : index === snake.length - 1 // Rotación para la cola
                ? `rotate(${getRotationAngle(
                    snake,
                    {
                      x: snake[index - 1].x - segment.x,
                      y: snake[index - 1].y - segment.y,
                    },
                    index
                  )}deg)`
                : `rotate(${getRotationAngle(
                    snake,
                    {
                      x: snake[index - 1].x - segment.x,
                      y: snake[index - 1].y - segment.y,
                    },
                    index
                  )}deg)`, // Rotación para el cuerpo
          }}
        >
          {/* Cara */}
          {index === 0 && (
            <>
              {/* Ojos */}
              <div
                style={{
                  position: "absolute",
                  width: EYES_SIZE,
                  height: EYES_SIZE,
                  backgroundColor: "black",
                  borderRadius: "50%",
                  left: 2,
                  top: (CELL_SIZE + HEAD_SIZE_ADDITIONAL) / 4 - 2,
                }}
              />

              <div
                style={{
                  position: "absolute",
                  width: EYES_SIZE,
                  height: EYES_SIZE,
                  backgroundColor: "black",
                  borderRadius: "50%",
                  left: EYES_SIZE + 4,
                  top: (CELL_SIZE + HEAD_SIZE_ADDITIONAL) / 4 - 2,
                }}
              />

              {/* Boca */}
              <svg
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "70%",
                  transform: "translate(-50%, -50%)",
                  width: "50%",
                  height: "30%",
                }}
              >
                <path
                  d="M -10 0 Q 10 10 10 0"
                  stroke="black"
                  fill="transparent"
                  strokeWidth="3"
                />
              </svg>
            </>
          )}

          {/* Patas curvas para los segmentos del cuerpo (excluyendo la cabeza y la cola) */}
          {index > 0 && index < snake.length - 1 && (
            <>
              {/* Pata izquierda */}
              <svg
                style={{
                  position: "absolute",
                  left: "10%",
                  top: "60%",
                  width: "40%",
                  height: "50%",
                }}
              >
                <path
                  d="M 5 0 Q 0 10 5 20"
                  stroke="white"
                  fill="transparent"
                  strokeWidth="1"
                />
              </svg>

              {/* Pata derecha */}
              <svg
                style={{
                  position: "absolute",
                  right: "0%",
                  top: "60%",
                  width: "40%",
                  height: "50%",
                }}
              >
                <path
                  d="M 0 0 Q 5 10 0 20"
                  stroke="white"
                  fill="transparent"
                  strokeWidth="1"
                />
              </svg>
            </>
          )}
        </div>
      ))}

      {/* Food */}
      <div
        className={`rounded-full border border-fuchsia-500`}
        style={{
          width: CELL_SIZE,
          height: CELL_SIZE,
          backgroundColor: "red",
          position: "absolute",
          left: food.x * CELL_SIZE,
          top: food.y * CELL_SIZE,
        }}
      />
    </div>
  );
}

export default Grid;
