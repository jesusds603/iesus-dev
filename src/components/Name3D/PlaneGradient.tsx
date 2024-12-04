import * as THREE from "three";
import { usePlane } from "@react-three/cannon";
import { useRef } from "react";

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

  const material = new THREE.ShaderMaterial({
    uniforms: {
      color1: { value: new THREE.Color(color1) },
      color2: { value: new THREE.Color(color2) },
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 color1;
      uniform vec3 color2;
      varying vec2 vUv;
      void main() {
        gl_FragColor = vec4(mix(color1, color2, vUv.y), 1.0);
      }
    `,
  });

  return (
    <mesh ref={ref} {...props}>
      <planeGeometry args={dimensions} />
      <primitive attach="material" object={material} />
    </mesh>
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

      {/* Techo */}
      {/* <PlaneGradient
        color1="#f64191"
        color2="#f67280"
        dimensions={[width, length]}
        position={[0, 50, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      /> */}
    </group>
  );
}

export default PlaneGroup;
