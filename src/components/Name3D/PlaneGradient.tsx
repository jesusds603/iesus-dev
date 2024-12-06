import * as THREE from "three";
import { usePlane } from "@react-three/cannon";
import { useRef } from "react";
import { GradientTexture, Plane } from "@react-three/drei";

function PlaneGradient({
  color1,
  color2,
  dimensions,
  position,
  rotation,
  ...props
}: {
  color1: string;
  color2: string;
  dimensions: [number, number];
  position: [number, number, number];
  rotation: [number, number, number];
} & JSX.IntrinsicElements["mesh"]) {
  const [ref] = usePlane(
    () => ({
      position,
      rotation,
      type: "Static",
    }),
    useRef<THREE.Mesh>(null)
  );

  return (
    <Plane ref={ref} {...props} args={dimensions}>
      <meshPhongMaterial>
        <GradientTexture
          stops={[0, 1]}
          colors={["#e00d3d", "#222222"]}
          size={1024}
        />
      </meshPhongMaterial>
    </Plane>
  );
}

function PlaneGroup({
  width,
  length,
  height,
}: {
  width: number;
  length: number;
  height: number;
}) {
  return (
    <group>
      {/* Suelo */}
      <PlaneGradient
        color1="#f64191"
        color2="#f67280"
        dimensions={[width, length]}
        position={[0, 0, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      />

      {/* Pared Frontal */}
      <PlaneGradient
        color1="#f8b195"
        color2="#f67280"
        dimensions={[width, height]}
        position={[0, height / 2, -length / 2]}
        rotation={[0, 0, 0]}
      />
      {/* Pared Trasera */}
      <PlaneGradient
        color1="#c06c84"
        color2="#6c5b7b"
        dimensions={[width, height]}
        position={[0, height / 2, length / 2]}
        rotation={[0, Math.PI, 0]}
      />
      {/* Pared Izquierda */}
      <PlaneGradient
        color1="#355c7d"
        color2="#6c5b7b"
        dimensions={[length, height]}
        position={[-width / 2, height / 2, 0]}
        rotation={[0, Math.PI / 2, 0]}
      />
      {/* Pared Derecha */}
      <PlaneGradient
        color1="#355c7d"
        color2="#f67280"
        dimensions={[length, height]}
        position={[width / 2, height / 2, 0]}
        rotation={[0, -Math.PI / 2, 0]}
      />
    </group>
  );
}

export default PlaneGroup;
