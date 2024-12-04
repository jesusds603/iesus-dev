import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import React, { useRef, useState } from "react";
import * as THREE from "three";
import {
  GradientTexture,
  Box,
  Text,
  OrbitControls,
  Plane,
  Cylinder,
} from "@react-three/drei";
import { keys, width, height, long } from "./keys";
import Screens from "./Screens";

function GroupLap({
  colorLetters,
  bgPath,
}: {
  colorLetters: string;
  bgPath: string;
}) {
  const laptopRef = useRef<THREE.Group>(null);
  const topLapRef = useRef<THREE.Group>(null);
  const lastSwitchTime = useRef<number>(0); // Usamos estado para el tiempo

  const rotAngle = -Math.PI * 0.7;
  const lonRetrZ = (long / 2) * Math.sin(rotAngle - Math.PI / 2);
  const lonRetrY = (long / 2) * Math.sin(Math.PI - rotAngle);

  const texture = useLoader(THREE.TextureLoader, bgPath);

  // Usamos el hook useFrame para actualizar la animación cada frame
  useFrame((state, delta) => {
    // Acumulamos el tiempo pasado
    lastSwitchTime.current += delta;

    // topLapRef.current?.rotation.set(0, -Math.PI, 0);

    if (lastSwitchTime.current % 10 <= 2) {
      // Aplica la rotación acumulativa durante los primeros 8 segundos
      const rotationSpeed = Math.PI;
      laptopRef.current?.rotation.set(
        0,
        (lastSwitchTime.current % 10) * rotationSpeed, // Reinicia la rotación cada 15 segundos
        0
      );
    } else {
      // laptopRef.current?.rotation.set(0, 2 * Math.PI, 0);

      if (lastSwitchTime.current % 10 <= 5) {
        const angleRot =
          -((lastSwitchTime.current % 10) * Math.PI) / 4 - Math.PI / 2;
        topLapRef.current?.rotation.set(angleRot, Math.PI, Math.PI);

        topLapRef.current?.position.set(
          0,
          (long / 2) * Math.sin(angleRot) + 0.5,
          -(long / 2) * Math.sin(Math.PI / 2 - angleRot) - long / 2
        );
      }
    }

    // Reinicia lastSwitchTime cada 15 segundos
    if (lastSwitchTime.current > 10) {
      lastSwitchTime.current = 0;
    }
  });

  return (
    <group ref={laptopRef}>
      {/* Parte del teclado */}
      <group>
        {/* Armazon */}
        <Box args={[width, height * 0.6, long]}>
          <meshPhysicalMaterial
            // emissive={"#ffffff"}
            // emissiveIntensity={1}
            metalness={0.5}
            roughness={0.6}
            // transmission={1}
            // opacity={0.9}
            // transparent={true}
            reflectivity={0.9}
          >
            <GradientTexture stops={[0, 1]} colors={["#f5a7b6", "#ff33ff"]} />
          </meshPhysicalMaterial>
        </Box>

        {/* Touchpad */}
        <Box args={[width * 0.3, 0.1, long * 0.3]} position={[-2, 0.3, 4]}>
          <meshPhysicalMaterial
            // emissive={"#ffffff"}
            // emissiveIntensity={1}
            metalness={0.5}
            roughness={0.6}
            // transmission={1}
            // opacity={0.9}
            // transparent={true}
            reflectivity={0.9}
          >
            <GradientTexture
              stops={[0, 1]}
              colors={[colorLetters, "#000000"]}
            />
          </meshPhysicalMaterial>
        </Box>

        {/* Botón Endendido */}
        <Cylinder
          args={[width * 0.03, width * 0.03, 0.1, 32, 12]}
          position={[9, 0.3, -5]}
        >
          <meshPhysicalMaterial
            // emissive={"#ffffff"}
            // emissiveIntensity={1}
            metalness={0.5}
            roughness={0.6}
            // transmission={1}
            // opacity={0.9}
            // transparent={true}
            reflectivity={0.9}
          >
            <GradientTexture
              stops={[0, 1]}
              colors={[colorLetters, "#000000"]}
            />
          </meshPhysicalMaterial>
        </Cylinder>

        {/* Teclas */}
        {keys.map((key, index) => (
          <Box
            key={index}
            args={[key.size[0], key.size[1], key.size[2]]}
            position={[key.position[0], key.position[1] + 0.5, key.position[2]]}
            onClick={() => console.log(`Tecla presionada: ${key.name}`)}
          >
            <meshStandardMaterial color="black" />
            <Text
              color={colorLetters}
              position={[0, key.size[1] + 0.05, 0]}
              fontSize={
                key.symbol.length > 2
                  ? Math.min(key.size[0], key.size[2]) * 0.3
                  : Math.min(key.size[0], key.size[2]) * 0.8
              }
              rotation={[-Math.PI / 2, 0, 0]}
            >
              {key.symbol}
            </Text>
          </Box>
        ))}
      </group>

      {/* Parte de la pantalla */}
      <group
        ref={topLapRef}
        position={[0, -lonRetrY + height / 2, -lonRetrZ - long / 2]}
      >
        <Box args={[width, height * 0.6, long]}>
          <meshPhysicalMaterial
            // emissive={"#ffffff"}
            // emissiveIntensity={1}
            metalness={0.5}
            roughness={0.6}
            // transmission={1}
            // opacity={0.9}
            // transparent={true}
            reflectivity={0.9}
          >
            <GradientTexture stops={[0, 1]} colors={["#f5a7b6", "#ff33ff"]} />
          </meshPhysicalMaterial>
        </Box>

        <Box
          args={[width * 0.95, 0.01, long * 0.9]}
          position={[0, -height * 0.5, 0]}
        >
          <meshStandardMaterial map={texture} />
        </Box>
      </group>
    </group>
  );
}

export default GroupLap;
