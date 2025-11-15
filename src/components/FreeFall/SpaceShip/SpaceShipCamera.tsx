import { MutableRefObject } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";

interface SpaceShipCameraProps {
  groupRef: MutableRefObject<THREE.Group>;
}

export function SpaceShipCamera({ groupRef }: SpaceShipCameraProps) {
  const { camera } = useThree();

  useFrame(() => {
    if (groupRef.current) {
      // Obtener la posición mundial de la nave
      const shipPosition = new THREE.Vector3();
      groupRef.current.getWorldPosition(shipPosition);
      
      // Obtener la dirección hacia adelante de la nave
      const shipDirection = new THREE.Vector3();
      groupRef.current.getWorldDirection(shipDirection);
      
      // Calcular la posición de la cámara: detrás y arriba de la nave
      // Usamos la dirección opuesta a la dirección de la nave para estar detrás
      const cameraOffset = new THREE.Vector3(0, 30, 40);
      
      // Crear una matriz de rotación temporal basada en la dirección de la nave
      const tempMatrix = new THREE.Matrix4();
      tempMatrix.lookAt(
        new THREE.Vector3(0, 0, 0),
        shipDirection,
        new THREE.Vector3(0, 1, 0) // Up vector
      );
      
      // Aplicar la rotación al offset
      cameraOffset.applyMatrix4(tempMatrix);
      
      // Posición final de la cámara
      const cameraTargetPosition = shipPosition.clone().add(cameraOffset);
      
      // Suavizar el movimiento de la cámara
      camera.position.lerp(cameraTargetPosition, 0.1);
      
      // La cámara siempre mira hacia la nave
      camera.lookAt(shipPosition);
    }
  });

  return null;
}