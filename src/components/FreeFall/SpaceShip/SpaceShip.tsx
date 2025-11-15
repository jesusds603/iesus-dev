"use client";
import { useRef, useEffect, MutableRefObject } from "react";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { useShip } from "../../../hooks/useShip";
import { materials } from "./materials";
import { useSpaceShipMovement } from "../../../hooks/useSpaceShipMovement";
import { SpaceShipCamera } from "./SpaceShipCamera";
import { EngineParticles } from "./EngineParticles";
import { useSpaceShipControls } from "@/hooks/useSpaceShipControls";

export default function Spaceship() {
  const groupRef: MutableRefObject<THREE.Group> = useRef(new THREE.Group());
  const engineLightRef = useRef<THREE.PointLight | null>(null);
  const { scene, camera } = useThree();
  const { updatePosition } = useShip();
  
  // Cambiado para usar el nuevo hook
  const { keysPressed } = useSpaceShipControls();
  
  const { engineIntensity } = useSpaceShipMovement({
    groupRef,
    keysPressed,
    onPositionUpdate: updatePosition,
  });

  // ... resto del código sin cambios
  // Cargar la nave con GLTFLoader
  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load("/Spaceship.glb", (gltf) => {
      const ship = gltf.scene;
      ship.position.set(0, 0, 0);
      
      // Escalar la nave para que sea más visible
      ship.scale.set(1.5, 1.5, 1.5);
      
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
          
          // Habilitar sombras para todos los meshes
          mesh.castShadow = true;
          mesh.receiveShadow = true;
        }
      });

      groupRef.current.add(ship);
      scene.add(groupRef.current);
      
      // Añadir luces de propulsores
      const engineLight = new THREE.PointLight("#00ffff", 2, 20);
      engineLight.position.set(0, 0, -8);
      groupRef.current.add(engineLight);
      engineLightRef.current = engineLight;
    });

    // Configuración inicial de la cámara
    camera.position.set(0, 8, 15);
    camera.lookAt(0, 0, 0);
  }, [scene, camera]);

  // Control de intensidad de luces de propulsores
  useEffect(() => {
    const engineLight = groupRef.current?.children.find(
      child => child instanceof THREE.PointLight
    ) as THREE.PointLight;
    
    if (engineLight) {
      engineLight.intensity = engineIntensity;
    }
  }, [engineIntensity]);

  return (
    <group ref={groupRef} position={[0, 15, -30]}>
      {/* Luz ambiental adicional para la nave */}
      <pointLight 
        position={[0, 2, 0]} 
        color="#4f46e5" 
        intensity={0.3} 
        distance={10} 
      />
      
      {/* Componentes separados */}
      <SpaceShipCamera groupRef={groupRef} />
      <EngineParticles groupRef={groupRef} />
    </group>
  );
}