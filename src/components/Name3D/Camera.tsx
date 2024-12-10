import { useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";

function Camera() {
  const camera = useThree((state) => state.camera);
  const clock = useRef(0);
  const originalP = [-20, 10, 15];
  const angleXZ = Math.atan(originalP[0] / originalP[2]);
  const angleToMove = Math.PI * 0.3;
  const radius = Math.sqrt(originalP[0] ** 2 + originalP[2] ** 2);

  useFrame((state, delta) => {
    clock.current += delta; // Acumula tiempo transcurrido
    const cycleTime = 10; // Duración de un ciclo completo en segundos
    const time = clock.current % cycleTime; // Tiempo actual dentro del ciclo de 10 segundos

    if (time >= 3 && time <= 5) {
      // Movimiento entre segundos 7 y 9
      const t = (time - 3) / 2; // Normalizar entre 0 y 1

      camera.position.set(
        Math.sin(angleXZ + t * angleToMove) * radius,
        10,
        Math.cos(angleXZ + t * angleToMove) * radius
      );
    } else if (time >= 5 && time <= 7) {
      // Movimiento entre segundos 7 y 9
      const t = (time - 5) / 2; // Normalizar entre 0 y 1

      camera.position.set(
        Math.sin(angleXZ + angleToMove * (1 - t)) * 21.21,
        10,
        Math.cos(angleXZ + angleToMove * (1 - t)) * 21.21
      );
    } else {
      camera.position.set(originalP[0], originalP[1], originalP[2]); // Posición por defecto fuera del rango
    }
    camera.lookAt(0, 0, 0); // Que la cámara siempre mire al centro de la escena
  });

  return null; // No es necesario renderizar ningún elemento JSX
}

export default Camera;
