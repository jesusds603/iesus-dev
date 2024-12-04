import React from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { Box, GradientTexture } from "@react-three/drei";
import { width, height, long } from "./keys";

function Screens({ bg }: { bg: string }) {
  if (bg === "Down") {
    return (
      <Box
        args={[width * 0.95, 0.01, long * 0.9]}
        position={[0, -height * 0.5, 0]}
      >
        <meshPhysicalMaterial emissive={"#000000"} opacity={0.5}>
          <GradientTexture stops={[0, 1]} colors={["#000000", "#082d2b"]} />
        </meshPhysicalMaterial>
      </Box>
    );
  }

  // Determina la ruta y el formato de la textura
  let texturePath = "";

  switch (bg) {
    case "bg0":
      texturePath = "/Bg/bg0.png";
      break;
    case "bg1":
      texturePath = "/Bg/bg1.png";
      break;
    case "bg2":
      texturePath = "/Bg/bg2.png";
      break;
    default:
      console.warn(`No valid texture found for bg: ${bg}, defaulting to bg1`);
      texturePath = "/Bg/bg1.png"; // Valor por defecto
  }

  const texture = useLoader(THREE.TextureLoader, texturePath);

  return (
    <Box
      args={[width * 0.95, 0.01, long * 0.9]}
      position={[0, -height * 0.5, 0]}
    >
      <meshStandardMaterial map={texture} />
    </Box>
  );
}

export default Screens;
