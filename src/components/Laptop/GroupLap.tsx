import { useFrame, useLoader } from "@react-three/fiber";
import React, { useRef } from "react";
import * as THREE from "three";
import { GradientTexture, Box } from "@react-three/drei";
import { keys, width, height, long } from "./keys";
import KeyBoard from "./KeyBoard";

function GroupLap({
  colorLetters,
  bgPath,
  createdText,
  setCreatedText,
}: {
  colorLetters: string;
  bgPath: string;
  createdText: string[];
  setCreatedText: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  const laptopRef = useRef<THREE.Group>(null);
  const topLapRef = useRef<THREE.Group>(null);
  const lastSwitchTime = useRef<number>(0);

  const texture = useLoader(THREE.TextureLoader, bgPath);
  let progress = 0;

  // Usamos el hook useFrame para actualizar la animación cada frame
  useFrame((state, delta) => {
    // Acumulamos el tiempo pasado
    lastSwitchTime.current += delta;

    const cycleTime = 20;

    if (lastSwitchTime.current % cycleTime <= 2) {
      progress = (lastSwitchTime.current - 0) / 2;
      const angleRot = -((progress * 3 * Math.PI) / 4) - Math.PI;

      topLapRef.current?.rotation.set(angleRot, Math.PI, Math.PI);

      topLapRef.current?.position.set(
        0,
        (long / 2) * Math.sin(angleRot) + 0.5,
        -(long / 2) * Math.sin(Math.PI / 2 - angleRot) - long / 2
      );
    } else if (
      lastSwitchTime.current % cycleTime >= 2 &&
      lastSwitchTime.current % cycleTime <= 5
    ) {
      progress = (lastSwitchTime.current - 2) / 3;

      const rotationSpeed = 2 * Math.PI * progress;

      laptopRef.current?.rotation.set(0, rotationSpeed, 0);
    }
    // console.log(lastSwitchTime.current);
    if (
      lastSwitchTime.current % cycleTime >= 17 &&
      lastSwitchTime.current % cycleTime <= 19
    ) {
      progress = (lastSwitchTime.current - 17) / 2;

      const angleRot = (progress * 3 * Math.PI) / 4 + Math.PI / 4;

      topLapRef.current?.rotation.set(angleRot, Math.PI, Math.PI);

      topLapRef.current?.position.set(
        0,
        (long / 2) * Math.sin(angleRot) + 0.5,
        -(long / 2) * Math.sin(Math.PI / 2 - angleRot) - long / 2
      );
    }

    if (lastSwitchTime.current > cycleTime) {
      // Reinicia lastSwitchTime cada
      lastSwitchTime.current = 0;
    }
  });

  return (
    <group ref={laptopRef}>
      {/* Teclado */}
      <KeyBoard colorLetters={colorLetters} setCreatedText={setCreatedText} />

      {/* Pantalla */}
      <group ref={topLapRef} position={[0, 0.3, 0]}>
        <Box args={[width, height * 0.6, long]}>
          <meshPhysicalMaterial
            metalness={0.5}
            roughness={0.6}
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
