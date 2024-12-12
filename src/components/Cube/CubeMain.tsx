import { Canvas } from "@react-three/fiber";
import React from "react";
import BigCube from "./BigCube";

function CubeMain() {
  return (
    <Canvas style={{ height: "600px" }}>
      <ambientLight intensity={1.5} />

      <BigCube />

      {/* <Plane
        args={[10, 10]}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -1.5, 0]}
      >
        <meshPhongMaterial>
          <GradientTexture stops={[0, 1]} colors={["#68eeea", "#68ee8f"]} />
        </meshPhongMaterial>
      </Plane> */}
    </Canvas>
  );
}

export default CubeMain;
