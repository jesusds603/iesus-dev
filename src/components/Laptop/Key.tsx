import React, { useRef, useState } from "react";

import { GradientTexture, Box, Text, Cylinder } from "@react-three/drei";
import { keys, width, height, long, Keyy } from "./keys";
import { Mesh } from "three";
import { useFrame } from "@react-three/fiber";

function posVarKeys(
  posInit: number[],
  posEnd: number[],
  T: number,
  t: number,
  name: string
) {
  let newPos = [0, 0, 0];

  if (name === "I") {
    newPos = [
      posInit[0] + ((posEnd[0] - posInit[0]) / T) * t - 1,
      posInit[1] + ((posEnd[1] - posInit[1]) / T) * t,
      posInit[2] + ((posEnd[2] - posInit[2]) / T) * t - 1,
    ];
  } else if (name === "E") {
    newPos = [
      posInit[0] + ((posEnd[0] - posInit[0]) / T) * t - 0.5,
      posInit[1] + ((posEnd[1] - posInit[1]) / T) * t,
      posInit[2] + ((posEnd[2] - posInit[2]) / T) * t - 0.5,
    ];
  } else if (name === "S") {
    newPos = [
      posInit[0] + ((posEnd[0] - posInit[0]) / T) * t,
      posInit[1] + ((posEnd[1] - posInit[1]) / T) * t,
      posInit[2] + ((posEnd[2] - posInit[2]) / T) * t,
    ];
  } else if (name === "U") {
    newPos = [
      posInit[0] + ((posEnd[0] - posInit[0]) / T) * t + 0.5,
      posInit[1] + ((posEnd[1] - posInit[1]) / T) * t,
      posInit[2] + ((posEnd[2] - posInit[2]) / T) * t + 0.5,
    ];
  } else if (name === "5") {
    newPos = [
      posInit[0] + ((posEnd[0] - posInit[0]) / T) * t + 1,
      posInit[1] + ((posEnd[1] - posInit[1]) / T) * t,
      posInit[2] + ((posEnd[2] - posInit[2]) / T) * t + 1,
    ];
  }

  return newPos;
}

function Key({
  colorLetters,
  setCreatedText,
  tecla,
  randomDir,
}: {
  colorLetters: string;
  setCreatedText: React.Dispatch<React.SetStateAction<string[]>>;
  tecla: Keyy;
  randomDir: number;
}) {
  const keyRef = useRef<Mesh>(null);
  const timeElapsed = useRef<number>(0);
  const cycleTime = 20; // Tiempo total de un ciclo (subir + bajar)
  const heightUp = 10;
  const heightEsp = Math.random() + 15;
  let progress = 0;

  const posCamera: [number, number, number] = [-13, 18, 13];
  const angleGround = Math.atan(posCamera[0] / posCamera[2]);
  const angleVert = Math.atan(posCamera[1] / posCamera[0]);

  useFrame((_, delta) => {
    if (keyRef.current) {
      // Actualiza el tiempo transcurrido
      timeElapsed.current += delta;

      // Calcula la posición vertical
      let verticalOffset = 0;
      let radius = 0;
      let angle = 0;

      if (timeElapsed.current >= 2 && timeElapsed.current <= 3.5) {
        progress = (timeElapsed.current - 2) / 1.5; // entre 0 y 1
        verticalOffset = progress * heightEsp; // Movimiento lineal hacia arriba
        radius = verticalOffset / 2;
        angle = 2 * Math.PI * progress * randomDir;
        keyRef.current.position.set(
          tecla.position[0] + radius * Math.cos(angle),
          tecla.position[1] + 0.4 + verticalOffset,
          tecla.position[2] + radius * Math.sin(angle)
        );
      } else if (timeElapsed.current >= 3.5 && timeElapsed.current <= 5) {
        progress = (timeElapsed.current - 3.5) / 1.5; // entre 0 y 1
        verticalOffset = heightEsp - progress * heightEsp; // Movimiento lineal hacia arriba
        radius = verticalOffset / 2;
        angle = -2 * Math.PI * progress * randomDir;
        keyRef.current.position.set(
          tecla.position[0] + radius * Math.cos(angle),
          tecla.position[1] + 0.4 + verticalOffset,
          tecla.position[2] + radius * Math.sin(angle)
        );
      } else if (timeElapsed.current >= 5 && timeElapsed.current <= 5.5) {
        progress = (timeElapsed.current - 5) / 0.5; // entre 0 y 1

        if (
          tecla.name === "I" ||
          tecla.name === "E" ||
          tecla.name === "S" ||
          tecla.name === "U" ||
          tecla.name === "5"
        ) {
          keyRef.current.position.set(
            posVarKeys(tecla.position, posCamera, 1, progress, tecla.name)[0],
            posVarKeys(tecla.position, posCamera, 1, progress, tecla.name)[1],
            posVarKeys(tecla.position, posCamera, 1, progress, tecla.name)[2]
          );
          keyRef.current.rotation.set(-angleVert, 0, -angleGround);
        }
      } else if (timeElapsed.current >= 9.5 && timeElapsed.current <= 10) {
        progress = (timeElapsed.current - 9.5) / 0.5; // entre 0 y 1

        if (
          tecla.name === "I" ||
          tecla.name === "E" ||
          tecla.name === "S" ||
          tecla.name === "U" ||
          tecla.name === "5"
        ) {
          keyRef.current.position.set(
            posVarKeys(posCamera, tecla.position, 1, progress, tecla.name)[0],
            posVarKeys(posCamera, tecla.position, 1, progress, tecla.name)[1],
            posVarKeys(posCamera, tecla.position, 1, progress, tecla.name)[2]
          );
          keyRef.current.rotation.set(0, 0, 0);
        }
      } else if (timeElapsed.current >= 10 && timeElapsed.current <= 11.5) {
        progress = (timeElapsed.current - 10) / 1.5; // entre 0 y 1
        verticalOffset = progress * heightEsp; // Movimiento lineal hacia arriba
        radius = verticalOffset / 2;
        angle = 2 * Math.PI * progress * randomDir;
        keyRef.current.position.set(
          tecla.position[0] + radius * Math.cos(angle),
          tecla.position[1] + 0.4 + verticalOffset,
          tecla.position[2] + radius * Math.sin(angle)
        );
      } else if (timeElapsed.current >= 11.5 && timeElapsed.current <= 13) {
        progress = (timeElapsed.current - 11.5) / 1.5; // entre 0 y 1
        verticalOffset = heightEsp - progress * heightEsp; // Movimiento lineal hacia arriba
        radius = verticalOffset / 2;
        angle = -2 * Math.PI * progress * randomDir;
        keyRef.current.position.set(
          tecla.position[0] + radius * Math.cos(angle),
          tecla.position[1] + 0.4 + verticalOffset,
          tecla.position[2] + radius * Math.sin(angle)
        );
      }

      // Actualiza la posición Y de la caja
    }

    if (timeElapsed.current > cycleTime) {
      timeElapsed.current = 0;
    }
  });

  return (
    <Box
      ref={keyRef}
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
