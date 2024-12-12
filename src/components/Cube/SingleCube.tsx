import { Box, Edges, GradientTexture } from "@react-three/drei";
import React, { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Group, Mesh } from "three";
import { getAmountSteps, getTimeStart } from "./motionManagers";

function SingleCube({
  position,
  relative,
}: {
  position: [number, number, number];
  relative: [number, number, number];
}) {
  const groupRef = useRef<Group>(null);
  const boxRef = useRef<Mesh>(null);
  const [x, y, z] = position;
  const [ix, iy, iz] = relative; // Posición relativa al centro, nunca cambia para cada cubo
  const timeElapsed = useRef(0); // Tiempo transcurrido en el ciclo

  const amountSteps = getAmountSteps(iz);
  const timeStart = getTimeStart(ix, iy, iz);

  // Se actualiza la posición Y en cada frame
  useFrame((_, delta) => {
    timeElapsed.current += delta;

    if (timeElapsed.current >= 25) {
      timeElapsed.current = 0;
      if (groupRef.current) {
        groupRef.current.position.set(x, y, z);
      }
    }

    if (
      timeElapsed.current >= timeStart * 0.5 &&
      timeElapsed.current < (timeStart + 7) * 0.5
    ) {
      const rotationAngle = -(timeElapsed.current - timeStart * 0.5) * Math.PI;

      if (groupRef.current) {
        //Movimiento en z+
        if (
          timeElapsed.current >= timeStart * 0.5 &&
          timeElapsed.current < timeStart * 0.5 + amountSteps.zP * 0.5
        ) {
          groupRef.current.position.z += delta * 2;
        }

        // Movimiento en y+
        if (
          timeElapsed.current >= timeStart * 0.5 + amountSteps.zP * 0.5 &&
          timeElapsed.current < timeStart * 0.5 + amountSteps.zP * 0.5 + 3 * 0.5
        ) {
          groupRef.current.position.y += delta * 2;
        }

        // Movimiento en z-
        if (
          timeElapsed.current >=
            timeStart * 0.5 + amountSteps.zP * 0.5 + 3 * 0.5 &&
          timeElapsed.current < timeStart * 0.5 + 7 * 0.5
        ) {
          groupRef.current.position.z -= delta * 2;
        }
      }

      if (boxRef.current) {
        boxRef.current.rotation.set(rotationAngle, 0, 0);
      }
    }
  });

  // Aplicar las posiciones x, y, z al grupo
  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.position.set(x, y, z);
    }
  }, [x, y, z]);

  return (
    <group ref={groupRef} key={`${x}-${y}-${z}`}>
      <Box
        ref={boxRef}
        // Clave única para React
        args={[1, 1, 1]} // Tamaño del cubo: 1x1x1
      >
        <meshPhongMaterial attach="material">
          <GradientTexture stops={[0, 1]} colors={["#ef37ef", "#b568ee"]} />
        </meshPhongMaterial>

        <Edges color="#ffffff" />
      </Box>
    </group>
  );
}

export default SingleCube;
