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

  const isDark = myTheme === "dark";

  return (
    <div className="relative">
      {/* Grid Container con mejor diseño */}
      <div
        style={{
          width: GRID_WIDTH * CELL_SIZE,
          height: GRID_HEIGHT * CELL_SIZE,
          display: "grid",
          gridTemplateColumns: `repeat(${GRID_WIDTH}, ${CELL_SIZE}px)`,
          border: isDark ? "3px solid #0d9488" : "3px solid #059669",
          borderRadius: "12px",
          background: isDark 
            ? "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)"
            : "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)",
          position: "relative",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
          overflow: "hidden",
        }}
      >
        {/* Patrón de fondo del grid */}
        {Array.from({ length: GRID_WIDTH * GRID_HEIGHT }).map((_, index) => (
          <div
            key={index}
            style={{
              width: CELL_SIZE,
              height: CELL_SIZE,
              borderRight: index % GRID_WIDTH === GRID_WIDTH - 1 ? "none" : 
                isDark ? "1px solid #1e40af20" : "1px solid #0369a120",
              borderBottom: index >= GRID_WIDTH * (GRID_HEIGHT - 1) ? "none" : 
                isDark ? "1px solid #1e40af20" : "1px solid #0369a120",
              background: "transparent",
            }}
          />
        ))}

        {/* Efecto de brillo en los bordes */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: "9px",
            boxShadow: isDark 
              ? "inset 0 0 20px #0d948840" 
              : "inset 0 0 20px #05966940",
            pointerEvents: "none",
          }}
        />

        {/* Snake con diseño mejorado */}
        {snake.map((segment, index) => {
          const isHead = index === 0;
          const isTail = index === snake.length - 1;
          const isBody = !isHead && !isTail;

          return (
            <div
              key={index}
              className={`absolute transition-all duration-150 ease-out ${
                isHead
                  ? "bg-gradient-to-br from-yellow-400 to-orange-500 shadow-lg shadow-yellow-500/50"
                  : isTail
                  ? "bg-gradient-to-br from-purple-600 to-fuchsia-600 shadow-md shadow-purple-500/30"
                  : "bg-gradient-to-br from-green-600 to-emerald-600 shadow-sm shadow-green-500/20"
              }`}
              style={{
                width: isHead ? CELL_SIZE + HEAD_SIZE_ADDITIONAL : CELL_SIZE - 2,
                height: isHead ? CELL_SIZE + HEAD_SIZE_ADDITIONAL : CELL_SIZE - 2,
                left: segment.x * CELL_SIZE + (isHead ? -HEAD_SIZE_ADDITIONAL / 2 : 1),
                top: segment.y * CELL_SIZE + (isHead ? -HEAD_SIZE_ADDITIONAL / 2 : 1),
                borderRadius: isHead ? "40% 40% 30% 30%" : isTail ? "30%" : "35%",
                transform: `rotate(${getRotationAngle(snake, direction, index)}deg)`,
                zIndex: snake.length - index,
                border: isHead 
                  ? "2px solid #fbbf24" 
                  : isTail 
                  ? "1px solid #c084fc" 
                  : "1px solid #10b981",
              }}
            >
              {/* Cara de la serpiente */}
              {isHead && (
                <>
                  {/* Ojos con efecto de brillo */}
                  <div
                    style={{
                      position: "absolute",
                      width: EYES_SIZE,
                      height: EYES_SIZE,
                      background: "radial-gradient(circle, #000 30%, #333 100%)",
                      borderRadius: "50%",
                      left: 4,
                      top: (CELL_SIZE + HEAD_SIZE_ADDITIONAL) / 4 - 2,
                      boxShadow: "0 0 4px #000",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      width: EYES_SIZE,
                      height: EYES_SIZE,
                      background: "radial-gradient(circle, #000 30%, #333 100%)",
                      borderRadius: "50%",
                      right: 4,
                      top: (CELL_SIZE + HEAD_SIZE_ADDITIONAL) / 4 - 2,
                      boxShadow: "0 0 4px #000",
                    }}
                  />

                  {/* Pupilas */}
                  <div
                    style={{
                      position: "absolute",
                      width: EYES_SIZE / 2,
                      height: EYES_SIZE / 2,
                      background: "#fff",
                      borderRadius: "50%",
                      left: 5,
                      top: (CELL_SIZE + HEAD_SIZE_ADDITIONAL) / 4 - 1,
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      width: EYES_SIZE / 2,
                      height: EYES_SIZE / 2,
                      background: "#fff",
                      borderRadius: "50%",
                      right: 5,
                      top: (CELL_SIZE + HEAD_SIZE_ADDITIONAL) / 4 - 1,
                    }}
                  />

                  {/* Boca sonriente */}
                  <svg
                    style={{
                      position: "absolute",
                      left: "50%",
                      top: "70%",
                      transform: "translate(-50%, -50%)",
                      width: "40%",
                      height: "25%",
                    }}
                  >
                    <path
                      d="M 2 2 Q 10 6 18 2"
                      stroke="#dc2626"
                      fill="transparent"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </>
              )}

              {/* Detalles del cuerpo */}
              {isBody && (
                <>
                  <div
                    style={{
                      position: "absolute",
                      width: "60%",
                      height: "20%",
                      background: "linear-gradient(90deg, transparent 0%, #10b981 50%, transparent 100%)",
                      top: "40%",
                      left: "20%",
                      borderRadius: "2px",
                    }}
                  />
                </>
              )}
            </div>
          );
        })}

        {/* Comida con efecto de animación */}
        <div
          className="animate-pulse"
          style={{
            width: CELL_SIZE - 4,
            height: CELL_SIZE - 4,
            background: "radial-gradient(circle, #ef4444 0%, #dc2626 100%)",
            borderRadius: "50%",
            position: "absolute",
            left: food.x * CELL_SIZE + 2,
            top: food.y * CELL_SIZE + 2,
            boxShadow: `
              0 0 8px #ef4444,
              0 0 16px #ef4444,
              inset 0 0 8px #fca5a5
            `,
            border: "2px solid #fecaca",
            zIndex: 10,
          }}
        >
          {/* Efecto de brillo interno */}
          <div
            style={{
              position: "absolute",
              width: "30%",
              height: "30%",
              background: "#fff",
              borderRadius: "50%",
              top: "25%",
              left: "25%",
              opacity: 0.8,
              filter: "blur(1px)",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Grid;