import { Canvas } from "@react-three/fiber";
import React from "react";
import { MovingSphere } from "./MovingSphere";
import { OrbitControls, Plane } from "@react-three/drei";
import Spaceship from "./SpaceShip";
import * as THREE from "three";
import { FormState } from "./constants";

function CanvasC({
  formState,
  simulationRunning,
  resetSimulation,
}: {
  formState: FormState;
  simulationRunning: boolean;
  resetSimulation: () => void;
}) {
  return (
    <Canvas
      style={{
        height: "400px",
        width: "100%",
      }}
    >
      <ambientLight />
      <MovingSphere
        formState={formState}
        startSimulation={simulationRunning}
        resetSimulation={resetSimulation}
      />
      <OrbitControls />
      <Plane
        args={[100000, 100000]}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
      >
        <meshStandardMaterial
          attach="material"
          color="lightblue"
          side={THREE.DoubleSide}
        />
      </Plane>
      {/* <gridHelper
              args={[100000, 100000, "#000000", "#CA49F9"]}
              position={[0, 0, 0]}
            /> */}
      <Spaceship />
    </Canvas>
  );
}

export default CanvasC;
