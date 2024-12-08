"use client";
import {
  useRef,
  useState,
  useEffect,
  useContext,
  MutableRefObject,
} from "react";
import * as THREE from "three";
import { useLoader, useFrame, useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { useShip } from "../../hooks/useShip";

// Tipos para el manejo de teclas
type KeysPressed = { [key: string]: boolean };

export default function Spaceship() {
  const groupRef: MutableRefObject<THREE.Group> = useRef(new THREE.Group());
  const { scene, camera } = useThree();
  const [keysPressed, setKeysPressed] = useState<KeysPressed>({});
  const { updatePosition } = useShip();

  // Cargar la nave con GLTFLoader
  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load("/Spaceship.glb", (gltf) => {
      const ship = gltf.scene;
      ship.position.set(0, 0, 0); // Centra la nave en el grupo
      ship.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          switch (mesh.name) {
            case "Plane":
              mesh.material = materials.Plane;
              break;
            case "Plane_1":
              mesh.material = materials.Plane_1;
              break;
            case "Plane_2":
              mesh.material = materials.Plane_2;
              break;
            case "Plane_3":
            case "Plane005_3":
              mesh.material = materials.Plane_3;
              break;
            case "Plane_4":
            case "Plane006_4":
              mesh.material = materials.Plane_4;
              break;
            case "Plane_5":
              mesh.material = materials.Plane_5;
              break;
          }
        }
      });

      groupRef.current.add(ship);
      scene.add(groupRef.current);
    });

    // Configuración de la cámara
    camera.position.set(0, 8, -10);
    groupRef.current.add(camera);
  }, [scene, camera]);

  // Manejo de teclas
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      setKeysPressed((prev) => ({ ...prev, [event.key]: true }));
    };
    const handleKeyUp = (event: KeyboardEvent) => {
      setKeysPressed((prev) => ({ ...prev, [event.key]: false }));
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  // Frame loop para movimiento de la nave
  useFrame(() => {
    if (groupRef.current) {
      if (keysPressed["ArrowLeft"]) {
        groupRef.current.rotateY(0.05);
      }
      if (keysPressed["ArrowRight"]) {
        groupRef.current.rotateY(-0.05);
      }
      if (keysPressed["ArrowUp"]) {
        groupRef.current.translateZ(2);
      }
      if (keysPressed["ArrowDown"]) {
        groupRef.current.translateZ(-2);
      }
      if (keysPressed["w"]) {
        groupRef.current.rotateX(0.05);
      }
      if (keysPressed["s"]) {
        groupRef.current.rotateX(-0.05);
      }
      if (keysPressed["a"]) {
        groupRef.current.rotateZ(-0.05);
      }
      if (keysPressed["d"]) {
        groupRef.current.rotateZ(0.05);
      }

      // Actualiza la posición en el contexto
      updatePosition({
        x: groupRef.current.position.x,
        y: groupRef.current.position.y,
        z: groupRef.current.position.z,
      });

      camera.lookAt(
        new THREE.Vector3().setFromMatrixPosition(groupRef.current.matrixWorld)
      );
    }
  });

  return <group ref={groupRef} position={[0, 10, -20]} />;
}

// Materiales de la nave
const materials = {
  Plane: new THREE.MeshPhongMaterial({
    color: "#021714", //* cuerpo
    specular: 0xffffff,
    shininess: 30,
    reflectivity: 1,
  }),
  Plane_1: new THREE.MeshPhongMaterial({
    color: "#035205", //* Laterales
    specular: 0x222222,
    shininess: 10,
    reflectivity: 0.5,
  }),
  Plane_2: new THREE.MeshPhongMaterial({
    color: "#ffffff", //* Ventana
    specular: 0x222222,
    shininess: 40,
    reflectivity: 1,
    opacity: 0.9,
  }),
  Plane_3: new THREE.MeshPhongMaterial({
    color: "#CC1FF6", //* Propulsores y parte pequeña de arriba
    specular: 0x222222,
    shininess: 40,
    reflectivity: 0.5,
  }),
  Plane_4: new THREE.MeshPhongMaterial({
    color: "#11F8DF", //* Lineas
    specular: 0x222222,
    shininess: 10,
    reflectivity: 0.5,
  }),
  Plane_5: new THREE.MeshPhongMaterial({
    color: "#D244F5", //* Pequeños huecos
    specular: 0x222222,
    shininess: 40,
    reflectivity: 1,
  }),
};
