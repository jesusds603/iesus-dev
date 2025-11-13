import { Canvas } from "@react-three/fiber";
import React from "react";
import BigCube from "./BigCube";

function CubeMain() {
  return (
    <Canvas
      style={{ height: "600px" }}
      gl={{
        antialias: false,
        powerPreference: "high-performance",
      }}
      camera={{ position: [-5, 5, 5], fov: 50 }}
    >
      <fog attach="fog" args={['#000011', 10, 25]} />
      <ambientLight intensity={0.8} />
      <pointLight position={[10, 10, 10]} intensity={1.5} />
      
      <BigCube />
    </Canvas>
  );
}

export default CubeMain;