import React, { useState } from "react";

import { GradientTexture, Box, Text, Cylinder } from "@react-three/drei";
import { keys, width, height, long, Keyy } from "./keys";

function Key({
  colorLetters,
  setCreatedText,

  tecla,
}: {
  colorLetters: string;
  setCreatedText: React.Dispatch<React.SetStateAction<string[]>>;
  tecla: Keyy;
}) {
  return (
    <Box
      args={[tecla.size[0], tecla.size[1], tecla.size[2]]}
      position={[tecla.position[0], tecla.position[1] + 0.5, tecla.position[2]]}
      onClick={() => {
        setCreatedText((prev) => [...prev, tecla.name]);
        // console.log(`Tecla presionada: ${tecla.name}`);
      }}
    >
      <meshStandardMaterial color="black" />
      <Text
        color={colorLetters}
        position={[0, tecla.size[1] + 0.05, 0]}
        fontSize={
          tecla.symbol.length > 2
            ? Math.min(tecla.size[0], tecla.size[2]) * 0.3
            : Math.min(tecla.size[0], tecla.size[2]) * 0.8
        }
        rotation={[-Math.PI / 2, 0, 0]}
      >
        {tecla.symbol}
      </Text>
    </Box>
  );
}

export default Key;
