import React, { useState } from "react";

import { GradientTexture, Box, Text, Cylinder } from "@react-three/drei";
import { keys, width, height, long } from "./keys";
import Key from "./Key";

function KeyBoard({
  colorLetters,

  setCreatedText,
}: {
  colorLetters: string;
  setCreatedText: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  const randomDirs = Array.from({ length: keys.length }, () =>
    Math.sign(Math.random() - 0.5)
  );
  return (
    <group>
      {/* Armazon */}
      <Box args={[width, height * 0.6, long]}>
        <meshPhysicalMaterial
          metalness={0.5}
          roughness={0.6}
          reflectivity={0.9}
        >
          <GradientTexture stops={[0, 1]} colors={["#f5a7b6", "#ff33ff"]} />
        </meshPhysicalMaterial>
      </Box>

      {/* Touchpad */}
      <Box args={[width * 0.3, 0.1, long * 0.3]} position={[-2, 0.3, 4]}>
        <meshPhysicalMaterial
          metalness={0.5}
          roughness={0.6}
          reflectivity={0.9}
        >
          <GradientTexture stops={[0, 1]} colors={[colorLetters, "#000000"]} />
        </meshPhysicalMaterial>
      </Box>

      {/* Botón Endendido */}
      <Cylinder
        args={[width * 0.03, width * 0.03, 0.1, 32, 12]}
        position={[9, 0.3, -5]}
      >
        <meshPhysicalMaterial
          metalness={0.5}
          roughness={0.6}
          reflectivity={0.9}
        >
          <GradientTexture stops={[0, 1]} colors={[colorLetters, "#000000"]} />
        </meshPhysicalMaterial>
      </Cylinder>

      {/* Teclas */}
      {keys.map((tecla, index) => (
        <Key
          key={index}
          colorLetters={colorLetters}
          setCreatedText={setCreatedText}
          tecla={tecla}
          randomDir={randomDirs[index]}
        />
      ))}
    </group>
  );
}

export default KeyBoard;
