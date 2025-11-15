import { useRef, useState, MutableRefObject } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { KeysPressed } from "./useSpaceShipControls";

interface UseSpaceshipMovementProps {
  groupRef: MutableRefObject<THREE.Group>;
  keysPressed: KeysPressed;
  onPositionUpdate: (position: { x: number; y: number; z: number }) => void;
}

export function useSpaceShipMovement({
  groupRef,
  keysPressed,
  onPositionUpdate,
}: UseSpaceshipMovementProps) {
  const { camera } = useThree();
  const [engineIntensity, setEngineIntensity] = useState(0);

  useFrame((state) => {
    if (groupRef.current) {
      let moving = false;
      const moveSpeed = 0.2;
      const rotationSpeed = 0.02;

      // Crear un vector de dirección basado en la orientación actual de la nave
      const direction = new THREE.Vector3();
      groupRef.current.getWorldDirection(direction);

      // Flechas: Movimiento hacia adelante/atrás
      if (keysPressed["ArrowUp"]) {
        groupRef.current.position.add(direction.clone().multiplyScalar(moveSpeed));
        moving = true;
      }
      if (keysPressed["ArrowDown"]) {
        groupRef.current.position.add(direction.clone().multiplyScalar(-moveSpeed));
        moving = true;
      }

      // Flechas laterales: Rotación izquierda/derecha (giro en Y)
      if (keysPressed["ArrowLeft"]) {
        groupRef.current.rotateY(rotationSpeed);
        moving = true;
      }
      if (keysPressed["ArrowRight"]) {
        groupRef.current.rotateY(-rotationSpeed);
        moving = true;
      }

      // W/S: Inclinación hacia arriba/abajo (rotación en X)
      if (keysPressed["w"]) {
        groupRef.current.rotateX(rotationSpeed);
        moving = true;
      }
      if (keysPressed["s"]) {
        groupRef.current.rotateX(-rotationSpeed);
        moving = true;
      }

      // A/D: Balanceo izquierda/derecha (rotación en Z)
      if (keysPressed["a"]) {
        groupRef.current.rotateZ(rotationSpeed);
        moving = true;
      }
      if (keysPressed["d"]) {
        groupRef.current.rotateZ(-rotationSpeed);
        moving = true;
      }

      // Control de intensidad de luces de propulsores
      const targetIntensity = moving ? 3 : 0.5;
      setEngineIntensity(prev => 
        THREE.MathUtils.lerp(prev, targetIntensity, 0.1)
      );

      // Efecto de balanceo suave cuando está en movimiento
      if (moving) {
        const wave = Math.sin(state.clock.elapsedTime * 2) * 0.005;
        groupRef.current.rotation.x += wave;
        groupRef.current.rotation.z += wave * 0.5;
      }

      // Actualiza la posición en el contexto
      onPositionUpdate({
        x: groupRef.current.position.x,
        y: groupRef.current.position.y,
        z: groupRef.current.position.z,
      });

      return { moving, engineIntensity };
    }
  });

  return { engineIntensity };
}