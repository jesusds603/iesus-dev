"use client";
import React, { useState } from "react";
import { useTheme } from "@/hooks/useTheme";
import { useLanguage } from "@/hooks/useLanguage";
import {
  MainBackgroundGradient,
  AdditionalBackgroundLayer1,
  AdditionalBackgroundLayer2,
} from "@/components/BackgroundGradients";

type Tower = number[];

function HanoiGame() {
  const { myTheme } = useTheme();
  const { myLanguage } = useLanguage();

  // Estado para gestionar el número de anillos y las torres
  const [numRings, setNumRings] = useState<number>(5);
  const [towers, setTowers] = useState<Tower[]>([
    Array.from({ length: numRings }, (_, i) => numRings - i), // Inicializa la torre 1 con anillos de mayor a menor
    [],
    [],
  ]);
  const [moveCount, setMoveCount] = useState<number>(0);
  const [message, setMessage] = useState<{ type: string; text: string }>({
    type: "",
    text: "",
  });
  const [hoveredTower, setHoveredTower] = useState<number | null>(null); // Estado para la torre en hover
  const minMoves = 2 ** numRings - 1;
  const upperBoundMoves = Math.ceil(minMoves * 1.2);

  // Colores intensos para los anillos
  const ringColors = ["#a008e7", "#e7082e", "#e8d706", "#24e806", "#06e8d7"];

  //* Función para manejar el movimiento de anillos entre torres
  const moveRing = (from: number, to: number): void => {
    if (towers[from].length === 0) return; // Si no hay anillos en la torre 'from', no hacer nada
    const newTowers = towers.map((tower) => [...tower]);
    const ring = newTowers[from].pop() as number;

    if (
      !newTowers[to].length ||
      ring < newTowers[to][newTowers[to].length - 1]
    ) {
      newTowers[to].push(ring);
      setTowers(newTowers);
      setMessage({ type: "", text: "" });
      checkWin(newTowers);

      if (from !== to) {
        setMoveCount(moveCount + 1); // Aumentar el contador de movimientos
      }
    } else {
      // Mensaje de error si el movimiento no es válido
      setMessage({
        type: "error",
        text:
          myLanguage === "eng"
            ? "Invalid move! You can't place a larger ring on a smaller one."
            : "¡Movimiento no válido! No puedes colocar un anillo más grande sobre uno más pequeño.",
      });
    }
  };

  //* Función para actualizar la cantidad de anillos
  const handleRingChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const newNumRings = parseInt(e.target.value, 10);
    setNumRings(newNumRings);
    setTowers([
      Array.from({ length: newNumRings }, (_, i) => newNumRings - i), // Reiniciar torre 1 con nuevos anillos
      [],
      [],
    ]);
    setMoveCount(0); // Reiniciar el contador de movimientos
    setMessage({ type: "", text: "" });
  };

  //* Función para verificar la victoria
  const checkWin = (newTowers: Tower[]): void => {
    if (
      newTowers[2].length === numRings &&
      newTowers[2].every((ring, i) => ring === numRings - i)
    ) {
      let reward;
      // existe un retraso en el contador
      if (moveCount + 1 <= minMoves) {
        reward = 3 * minMoves;
      } else if (moveCount + 1 <= upperBoundMoves) {
        reward = 2 * minMoves;
      } else {
        reward = minMoves;
      }

      setMessage({
        type: "success",
        text:
          myLanguage === "eng"
            ? `Congratulations! You solved the Tower of Hanoi.\nYou earned ${reward} SHUNA!`
            : `¡Felicidades! Has resuelto la Torre de Hanoi.\nGanaste ${reward} SHUNA!`,
      });
    }
  };

  //* Función para reiniciar el juego
  const resetGame = (rings: number = numRings): void => {
    setTowers([Array.from({ length: rings }, (_, i) => rings - i), [], []]);
    setMoveCount(0); // Reiniciar el contador de movimientos
    setMessage({ type: "", text: "" });
  };

  return (
    <div className={`min-h-screen flex flex-col items-center`}>
      <h1 className="text-3xl font-bold my-4">
        {myLanguage === "eng"
          ? "Tower of Hanoi Game"
          : "Juego de la Torre de Hanoi"}
      </h1>

      {/* Objetivo del juego */}
      <p className="text-lg mb-4">
        {myLanguage === "eng"
          ? "Objective: Move all rings to the third tower."
          : "Objetivo: Mover todos los anillos a la tercera torre."}
      </p>

      {/* Contador de movimientos */}
      <p
        className={`text-lg mb-4 ${moveCount > minMoves ? "text-red-500" : ""}`}
      >
        {myLanguage === "eng" ? "Moves:" : "Movimientos:"} {moveCount} /{" "}
        {minMoves}
      </p>

      {/* Selector de cantidad de anillos */}
      <div className="mb-4">
        <label htmlFor="numRings" className="mr-2">
          {myLanguage === "eng" ? "Number of Rings:" : "Número de anillos:"}
        </label>
        <select
          id="numRings"
          value={numRings}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            handleRingChange(e)
          }
          className="p-1 border rounded bg-gradient-to-r from-rose-100 to-teal-100 text-black"
        >
          {Array.from({ length: 8 }, (_, i) => i + 3).map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </div>

      {/* Botón de reiniciar */}
      <button
        onClick={() => resetGame()}
        className="px-4 py-2 bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white rounded mb-4"
      >
        {myLanguage === "eng" ? "Reset" : "Reiniciar"}
      </button>

      {/* Mensaje de error o victoria */}
      {message.text && (
        <div className="relative mt-6">
          {message.type === "success" ? (
            <>
              {/* Fondo y efectos para el mensaje de éxito */}
              <div className="absolute inset-0 bg-gradient-to-r from-green-300 via-yellow-200 to-red-300 rounded-lg shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-t from-purple-500 via-blue-500 to-green-500 rounded-lg"></div>
              </div>

              <div
                className="relative p-4 rounded-lg text-lg font-semibold text-white z-10"
                style={{ whiteSpace: "pre-line" }}
              >
                {message.text}
              </div>

              {/* Círculos brillantes para el mensaje de éxito */}
              <div className="absolute top-0 left-0 w-10 h-10 bg-red-500 rounded-full opacity-60 animate-pulse"></div>
              <div className="absolute bottom-0 right-0 w-10 h-10 bg-yellow-500 rounded-full opacity-60 animate-pulse"></div>
              <div className="absolute top-0 right-0 w-8 h-8 bg-blue-500 rounded-full opacity-60 animate-pulse"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 bg-purple-500 rounded-full opacity-60 animate-pulse"></div>
            </>
          ) : (
            /* Mensaje de error sin fondo ni círculos */
            <div
              className={`p-4 rounded-lg text-lg font-semibold ${
                myTheme === "dark"
                  ? "bg-black text-red-500"
                  : "bg-white text-red-600"
              }`}
            >
              {message.text}
            </div>
          )}
        </div>
      )}

      {/* Torres */}
      <div className="relative w-full mt-8 overflow-x-auto mb-8 p-2 rounded-md border border-teal-400 transition-all duration-100 ease-in-out">
        <MainBackgroundGradient />
        <AdditionalBackgroundLayer1 />
        <AdditionalBackgroundLayer2 />

        <div className="flex justify-around min-w-[768px] z-10">
          {towers.map((tower, i) => (
            <div key={i} className="relative flex flex-col items-center">
              <h2 className="font-bold mb-2">
                {myLanguage === "eng" ? `Tower ${i + 1}` : `Torre ${i + 1}`}
              </h2>

              {/* Torres */}
              <div
                className={`relative h-64 w-4 ${
                  hoveredTower === i
                    ? "bg-teal-400"
                    : myTheme === "dark"
                    ? "bg-gradient-to-r from-fuchsia-600 to-pink-600"
                    : "bg-gradient-to-b from-gray-900 to-gray-600"
                } mb-4 rounded-md`}
              >
                {/* {i + 1} */}
              </div>

              {/* Anillos */}
              {tower.slice(0).map((ring, j) => (
                <div
                  key={j}
                  style={{
                    width: `${10 + ring * 20}px`,
                    height: "20px",
                    backgroundColor: ringColors[(ring - 1) % ringColors.length],
                    top: `calc(266px - ${j * 21}px)`,
                  }}
                  className={`absolute rounded-md `}
                />
              ))}

              {/* Botones de movimiento */}
              <div className="flex flex-col mt-2 items-center">
                <div className="mb-2">
                  {myLanguage === "eng" ? `Move to tower:` : `Mover a torre:`}
                </div>

                <div className="flex space-x-2">
                  {towers.map((_, j) => (
                    <button
                      key={j}
                      onMouseEnter={() => setHoveredTower(j)} // Cambia la torre en hover
                      onMouseLeave={() => setHoveredTower(null)} // Restablece la torre en hover
                      onClick={() => moveRing(i, j)}
                      className={`px-1 py-2 w-[40px] break-words ${
                        myTheme !== "dark"
                          ? "bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white"
                          : "bg-gradient-to-r from-orange-400 to-rose-400 text-black"
                      }   rounded hover:scale-110`}
                    >
                      {`${j + 1}`}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HanoiGame;
