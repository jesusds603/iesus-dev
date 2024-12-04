import { Canvas, useFrame } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import {
  GradientTexture,
  Box,
  Text,
  OrbitControls,
  Plane,
} from "@react-three/drei";
import GroupLap from "./GroupLap";

function Laptop() {
  const [colorLetters, setColorLetters] = useState<string>("#ec12f0");
  const [bgPath, setBgPath] = useState<string>("/Bg/bg0.png");
  const colors = ["#ec12f0", "#d8f012", "#f0ed14", "#b40a21", "#2bf014"]; // Colores predefinidos
  const bgPaths = [
    "/Bg/bg0.png",
    "/Bg/bg1.png",
    "/Bg/bg2.png",
    "/Bg/bg3.png",
    "/Bg/bg5.png",
    "/Bg/bg6.png",
  ];

  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      index = (index + 1) % colors.length; // Incrementar y reiniciar índice circularmente
      setColorLetters(colors[index]);
    }, 2000);

    return () => clearInterval(interval); // Limpiar intervalo al desmontar
  }, []);

  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      index = (index + 1) % bgPaths.length; // Incrementar y reiniciar índice circularmente
      setBgPath(bgPaths[index]);
    }, 8000);

    return () => clearInterval(interval); // Limpiar intervalo al desmontar
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 20, 30] }}
      style={{
        width: "900px",
        height: "600px",
      }}
      className=" border border-teal-400"
    >
      <ambientLight />
      <OrbitControls />

      <GroupLap colorLetters={colorLetters} bgPath={bgPath} />
    </Canvas>
  );
}

export default Laptop;
