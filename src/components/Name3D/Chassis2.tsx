import { forwardRef } from "react";
import {
  Box,
  GradientTexture,
  Sphere,
  Cylinder,
  Text,
} from "@react-three/drei";
import * as THREE from "three";

export const Chassis2 = forwardRef<
  THREE.Mesh,
  { dimensions: [number, number, number] }
>(({ dimensions }, ref) => {
  const [width, height, length] = dimensions;

  return (
    <mesh ref={ref}>
      {/* Chassis group */}
      <group position={[0, -height / 2, 0]}>
        {/* Piso */}
        <Box
          castShadow
          position={[0, height * 0.1, 0]}
          scale={[width, height * 0.05, length]}
        >
          <meshPhongMaterial>
            <GradientTexture
              stops={[0, 1]}
              colors={["#555555", "#ff33ff"]}
              size={1024}
            />
          </meshPhongMaterial>
        </Box>

        {/* Hood */}
        <Box
          castShadow
          position={[0, height * 0.6, length * 0.36]}
          scale={[width, height * 0.05, length * 0.26]}
        >
          <meshPhongMaterial>
            <GradientTexture
              stops={[0, 1]}
              colors={["#c06af9", "#ff33ff"]}
              size={1024}
            />
          </meshPhongMaterial>
          <Text
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, 0.6, 0]}
            fontSize={width * 0.07}
            fontWeight="Bold"
            color="#2bf4ee"
          >
            🌟
          </Text>
        </Box>

        {/* Roof */}
        <Box
          castShadow
          position={[0, height * 1, -length * 0.14]}
          scale={[width, height * 0.05, length * 0.5]}
        >
          <meshPhongMaterial>
            <GradientTexture
              stops={[0, 1]}
              colors={["#c06af9", "#ff33ff"]}
              size={1024}
            />
          </meshPhongMaterial>
          <Text
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, 0.6, 0]}
            fontWeight="Bold"
            fontSize={width * 0.07}
            color="#2bf4ee"
          >
            ⊹₊⟡⋆{"\n"} IESUS
          </Text>
        </Box>

        {/* Front windshield */}
        <Trapezoid
          topWidth={width * 0.9} //UpperWidth
          bottomWidth={width} // bottomWidth
          height={length * 0.2} // alto
          depth={length * 0.01} // bottomLength or depth
          position={[0, height * 0.8, length * 0.18]}
          rotation={[-Math.PI * 0.25, 0, 0]}
          color="skyblue"
          opacity={0.7}
        />

        {/* Rear windshield */}
        <Trapezoid
          topWidth={width * 0.9} //UpperWidth
          bottomWidth={width} // bottomWidth
          height={length * 0.2} // alto
          depth={length * 0.01} // bottomLength or depth
          position={[0, height * 0.8, -length * 0.44]}
          rotation={[Math.PI * 0.25, 0, 0]}
          color="skyblue"
          opacity={0.7}
        />

        {/* Parte trasera alta*/}
        <Box
          castShadow
          position={[0, height * 0.4, -length * 0.5]}
          scale={[width, height * 0.4, length * 0.01]}
        >
          <meshPhongMaterial>
            <GradientTexture
              stops={[0, 1]}
              colors={["#c06af9", "#ff33ff"]}
              size={1024}
            />
          </meshPhongMaterial>
        </Box>

        {/* Parte trasera baja*/}
        <Box
          castShadow
          position={[0, height * 0.1, -length * 0.43]}
          scale={[width, height * 0.24, length * 0.01]}
          rotation={[-Math.PI * 0.3, 0, 0]}
        >
          <meshPhongMaterial>
            <GradientTexture
              stops={[0, 1]}
              colors={["#970a2c", "#ff33ff"]}
              size={1024}
            />
          </meshPhongMaterial>
        </Box>

        {/* Parte delantera baja*/}
        <Box
          castShadow
          position={[0, height * 0.1, length * 0.44]}
          scale={[width, height * 0.24, length * 0.01]}
          rotation={[Math.PI * 0.3, 0, 0]}
        >
          <meshPhongMaterial>
            <GradientTexture
              stops={[0, 1]}
              colors={["#970a2c", "#ff33ff"]}
              size={1024}
            />
          </meshPhongMaterial>
        </Box>

        {/* Right door */}
        <Box
          castShadow
          position={[-width * 0.5, height * 0.4, 0]}
          scale={[width * 0.05, height * 0.4, length]}
        >
          <meshPhongMaterial>
            <GradientTexture
              stops={[0, 1]}
              colors={["#c06af9", "#ff33ff"]}
              size={1024}
            />
          </meshPhongMaterial>
        </Box>

        {/* Left door */}
        <Box
          castShadow
          position={[width * 0.5, height * 0.4, 0]}
          scale={[width * 0.05, height * 0.4, length]}
        >
          <meshPhongMaterial>
            <GradientTexture
              stops={[0, 1]}
              colors={["#c06af9", "#ff33ff"]}
              size={1024}
            />
          </meshPhongMaterial>
        </Box>

        {/* Parte baja derecha */}
        <Trapezoid
          topWidth={length} //UpperWidth
          bottomWidth={length * 0.8} // bottomWidth
          height={height * 0.1} // alto
          depth={width * 0.05} // bottomLength or depth
          position={[-width * 0.5, height * 0.15, 0]}
          rotation={[0, Math.PI / 2, 0]}
          color="skyblue"
          opacity={1}
        />

        {/* Parte baja izquierda */}
        <Trapezoid
          topWidth={length} //UpperWidth
          bottomWidth={length * 0.8} // bottomWidth
          height={height * 0.1} // alto
          depth={width * 0.05} // bottomLength or depth
          position={[width * 0.5, height * 0.15, 0]}
          rotation={[0, Math.PI / 2, 0]}
          color="skyblue"
          opacity={1}
        />

        {/* Cristal derecho */}
        <Trapezoid
          topWidth={length * 0.5} //UpperWidth
          bottomWidth={length * 0.5 + 0.7 * height} // bottomWidth
          height={height * 0.4} // alto
          depth={width * 0.02} // bottomLength or depth
          position={[-width * 0.48, height * 0.8, -length * 0.14]}
          rotation={[0, Math.PI * 0.5, 0]}
          color="skyblue"
          opacity={0.5}
        />

        {/* Cristal izquierdo */}
        <Trapezoid
          topWidth={length * 0.5} //UpperWidth
          bottomWidth={length * 0.5 + 0.7 * height} // bottomWidth
          height={height * 0.4} // alto
          depth={width * 0.02} // bottomLength or depth
          position={[width * 0.48, height * 0.8, -length * 0.14]}
          rotation={[0, Math.PI * 0.5, 0]}
          color="skyblue"
          opacity={0.5}
        />

        {/* Front bumper */}
        <Box
          castShadow
          position={[0, height / 10, length * 0.5]}
          scale={[width, height / 5, length / 20]}
        >
          <meshPhongMaterial>
            <GradientTexture
              stops={[0, 1]}
              colors={["#333333", "#07676a"]}
              size={1024}
            />
          </meshPhongMaterial>
        </Box>

        {/* Rear bumper */}
        <Box
          castShadow
          position={[0, height / 10, -length * 0.5]}
          scale={[width, height / 5, length / 20]}
        >
          <meshPhongMaterial>
            <GradientTexture
              stops={[0, 1]}
              colors={["#333333", "#07676a"]}
              size={1024}
            />
          </meshPhongMaterial>
        </Box>

        {/* Front grille */}
        <Box
          castShadow
          position={[0, height / 3, length * 0.5]}
          scale={[width, height / 2, length / 100]}
        >
          <meshPhongMaterial>
            <GradientTexture
              stops={[0, 1]}
              colors={["#970a2c", "#ab0cf5"]}
              size={1024}
            />
          </meshPhongMaterial>
        </Box>

        {/* Side mirrors */}
        <Sphere
          castShadow
          position={[-width * 0.55, height * 0.6, length * 0.2]}
          scale={[width / 12, height / 10, length * 0.05]}
        >
          <meshPhongMaterial>
            <GradientTexture
              stops={[0, 1]}
              colors={["#07676a", "#172e2e"]}
              size={1024}
            />
          </meshPhongMaterial>
        </Sphere>
        <Sphere
          castShadow
          position={[width * 0.55, height * 0.6, length * 0.2]}
          scale={[width / 12, height / 10, length * 0.05]}
        >
          <meshPhongMaterial>
            <GradientTexture
              stops={[0, 1]}
              colors={["#07676a", "#172e2e"]}
              size={1024}
            />
          </meshPhongMaterial>
        </Sphere>

        {/* Luces delanteras */}
        <Sphere
          castShadow
          position={[width * 0.4, height * 0.55, length * 0.5]}
          scale={[width / 10, height / 10, length * 0.05]}
        >
          <meshPhongMaterial>
            <GradientTexture
              stops={[0, 1]}
              colors={["#e7f50c", "#f5360c"]}
              size={1024}
            />
          </meshPhongMaterial>
        </Sphere>
        <Sphere
          castShadow
          position={[-width * 0.4, height * 0.55, length * 0.5]}
          scale={[width / 10, height / 10, length * 0.05]}
        >
          <meshPhongMaterial>
            <GradientTexture
              stops={[0, 1]}
              colors={["#e7f50c", "#f5360c"]}
              size={1024}
            />
          </meshPhongMaterial>
        </Sphere>

        {/* Rear lights */}
        <Sphere
          castShadow
          position={[width * 0.4, height / 3, -length * 0.51]}
          scale={[width / 10, height / 10, length / 50]}
        >
          <meshPhongMaterial>
            <GradientTexture
              stops={[0, 1]}
              colors={["#e7f50c", "#f5360c"]}
              size={1024}
            />
          </meshPhongMaterial>
        </Sphere>
        <Sphere
          castShadow
          position={[-width * 0.4, height / 3, -length * 0.51]}
          scale={[width / 10, height / 10, length / 50]}
        >
          <meshPhongMaterial>
            <GradientTexture
              stops={[0, 1]}
              colors={["#e7f50c", "#f5360c"]}
              size={1024}
            />
          </meshPhongMaterial>
        </Sphere>

        {/* Tubos */}
        {/* Derecho trasero */}
        <Cylinder
          args={[width * 0.02, width * 0.02, height * 0.5, 32]}
          position={[-width * 0.48, height * 0.8, -length * 0.45]}
          rotation={[Math.PI * 0.25, 0, 0]}
        >
          <meshPhongMaterial>
            <GradientTexture
              stops={[0, 1]}
              colors={["#e7f50c", "#f5360c"]}
              size={1024}
            />
          </meshPhongMaterial>
        </Cylinder>
        {/* Izquierdo trasero */}
        <Cylinder
          args={[width * 0.02, width * 0.02, height * 0.5, 32]}
          position={[width * 0.48, height * 0.8, -length * 0.45]}
          rotation={[Math.PI * 0.25, 0, 0]}
        >
          <meshPhongMaterial>
            <GradientTexture
              stops={[0, 1]}
              colors={["#e7f50c", "#f5360c"]}
              size={1024}
            />
          </meshPhongMaterial>
        </Cylinder>
        {/* Derecho delantero */}
        <Cylinder
          args={[width * 0.02, width * 0.02, height * 0.5, 32]}
          position={[-width * 0.48, height * 0.8, length * 0.17]}
          rotation={[-Math.PI * 0.25, 0, 0]}
        >
          <meshPhongMaterial>
            <GradientTexture
              stops={[0, 1]}
              colors={["#e7f50c", "#f5360c"]}
              size={1024}
            />
          </meshPhongMaterial>
        </Cylinder>
        {/* Izquierdo trasero */}
        <Cylinder
          args={[width * 0.02, width * 0.02, height * 0.5, 32]}
          position={[width * 0.48, height * 0.8, length * 0.17]}
          rotation={[-Math.PI * 0.25, 0, 0]}
        >
          <meshPhongMaterial>
            <GradientTexture
              stops={[0, 1]}
              colors={["#e7f50c", "#f5360c"]}
              size={1024}
            />
          </meshPhongMaterial>
        </Cylinder>

        {/* Derecho Intermedio 1*/}
        <Cylinder
          args={[width * 0.02, width * 0.02, height * 0.4, 32]}
          position={[-width * 0.48, height * 0.8, length * 0]}
        >
          <meshPhongMaterial>
            <GradientTexture
              stops={[0, 1]}
              colors={["#e7f50c", "#f5360c"]}
              size={1024}
            />
          </meshPhongMaterial>
        </Cylinder>
        {/* Derecho Intermedio 2*/}
        <Cylinder
          args={[width * 0.02, width * 0.02, height * 0.4, 32]}
          position={[-width * 0.48, height * 0.8, -length * 0.25]}
        >
          <meshPhongMaterial>
            <GradientTexture
              stops={[0, 1]}
              colors={["#e7f50c", "#f5360c"]}
              size={1024}
            />
          </meshPhongMaterial>
        </Cylinder>

        {/* Izquierdo Intermedio 1*/}
        <Cylinder
          args={[width * 0.02, width * 0.02, height * 0.4, 32]}
          position={[width * 0.48, height * 0.8, length * 0]}
        >
          <meshPhongMaterial>
            <GradientTexture
              stops={[0, 1]}
              colors={["#e7f50c", "#f5360c"]}
              size={1024}
            />
          </meshPhongMaterial>
        </Cylinder>
        {/* Izquierdo Intermedio 2*/}
        <Cylinder
          args={[width * 0.02, width * 0.02, height * 0.4, 32]}
          position={[width * 0.48, height * 0.8, -length * 0.25]}
        >
          <meshPhongMaterial>
            <GradientTexture
              stops={[0, 1]}
              colors={["#e7f50c", "#f5360c"]}
              size={1024}
            />
          </meshPhongMaterial>
        </Cylinder>
      </group>
    </mesh>
  );
});

const Trapezoid = forwardRef<
  THREE.Mesh,
  {
    topWidth: number;
    bottomWidth: number;
    height: number;
    depth: number;
    position?: [number, number, number];
    rotation?: [number, number, number];
    color?: string;
    opacity?: number;
  }
>(
  (
    {
      topWidth,
      bottomWidth,
      height,
      depth,
      position = [0, 0, 0],
      rotation = [0, 0, 0],
      color = "skyblue",
      opacity = 1,
    },
    ref
  ) => {
    // Crear los vértices para el trapezoide
    const vertices = [
      // Cara superior
      -topWidth / 2,
      height / 2,
      depth / 2, // 0
      topWidth / 2,
      height / 2,
      depth / 2, // 1
      topWidth / 2,
      height / 2,
      -depth / 2, // 2
      -topWidth / 2,
      height / 2,
      -depth / 2, // 3

      // Cara inferior
      -bottomWidth / 2,
      -height / 2,
      depth / 2, // 4
      bottomWidth / 2,
      -height / 2,
      depth / 2, // 5
      bottomWidth / 2,
      -height / 2,
      -depth / 2, // 6
      -bottomWidth / 2,
      -height / 2,
      -depth / 2, // 7
    ];

    // Crear las caras del trapezoide
    const indices = [
      // Cara frontal
      0, 1, 4, 1, 5, 4,

      // Cara trasera
      2, 3, 6, 3, 7, 6,

      // Cara superior
      0, 1, 2, 0, 2, 3,

      // Cara inferior
      4, 5, 6, 4, 6, 7,

      // Cara izquierda
      0, 4, 7, 0, 7, 3,

      // Cara derecha
      1, 5, 6, 1, 6, 2,
    ];

    return (
      <mesh ref={ref} position={position} rotation={rotation}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={new Float32Array(vertices)}
            count={vertices.length / 3}
            itemSize={3}
          />
          <bufferAttribute
            attach="index"
            array={new Uint16Array(indices)}
            count={indices.length}
            itemSize={1}
          />
        </bufferGeometry>
        <meshPhongMaterial
          color={color}
          transparent={opacity < 1}
          opacity={opacity}
        />
      </mesh>
    );
  }
);
