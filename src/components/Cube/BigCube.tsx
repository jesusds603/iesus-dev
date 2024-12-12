import React, { Fragment, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import SingleCube from "./SingleCube";

function BigCube() {
  const { camera } = useThree();
  const center: [number, number, number] = [0, 0, 0];

  const timeElapsed = useRef(0); // Acumula el tiempo total
  const lastPosition = useRef({ cameraY: 5, lookAtY: 0 }); // Guarda la última posición alcanzada

  const initialCameraY = 5; // Posición inicial de la cámara
  const initialLookAtY = 0; // Posición inicial del lookAt

  useFrame((_, delta) => {
    timeElapsed.current += delta;

    if (timeElapsed.current >= 30) {
      timeElapsed.current = 0;
      lastPosition.current = {
        cameraY: initialCameraY,
        lookAtY: initialLookAtY,
      };
    }

    let { cameraY, lookAtY } = lastPosition.current;

    // Movimiento del segundo 3 al 6: sube lentamente 1 unidad
    if (timeElapsed.current >= 3 && timeElapsed.current < 6) {
      const progress = (timeElapsed.current - 3) / 3; // 0 a 1
      cameraY = initialCameraY + progress; // Movimiento acumulativo
      lookAtY = initialLookAtY + progress;
    }

    // Movimiento del segundo 9 al 12: sube 1 unidad adicional
    if (timeElapsed.current >= 9 && timeElapsed.current < 12) {
      const progress = (timeElapsed.current - 9) / 3; // 0 a 1
      cameraY = initialCameraY + 1 + progress; // Sube otra unidad
      lookAtY = initialLookAtY + 1 + progress;
    }

    // Actualiza la última posición solo cuando está en movimiento
    if (
      (timeElapsed.current >= 3 && timeElapsed.current < 6) ||
      (timeElapsed.current >= 9 && timeElapsed.current < 12)
    ) {
      lastPosition.current = { cameraY, lookAtY };
    }

    // Actualiza la posición de la cámara y el lookAt
    camera.position.set(-5, cameraY, 5);
    camera.lookAt(0, lookAtY, 0);
  });

  const cubes = [];

  // Generar cubos pequeños alrededor del centro
  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      for (let z = -1; z <= 1; z++) {
        const position: [number, number, number] = [
          center[0] + x,
          center[1] + y,
          center[2] + z,
        ];
        cubes.push(
          <SingleCube
            key={`${x}-${y}-${z}`}
            position={position}
            relative={[x, y, z]}
          />
        );
      }
    }
  }

  return <Fragment>{cubes}</Fragment>;
}

export default BigCube;
