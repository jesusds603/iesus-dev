import { Canvas, useFrame } from "@react-three/fiber";
import React, { useRef, useState } from "react";
import * as THREE from "three";
import {
  GradientTexture,
  Box,
  Text,
  OrbitControls,
  Plane,
} from "@react-three/drei";
import { keys, width, height, long } from "./keys";
import Screens from "./Screens";

function Laptop() {
  const rotAngle = -Math.PI * 0.7;
  const lonRetrZ = (long / 2) * Math.sin(rotAngle - Math.PI / 2);
  const lonRetrY = (long / 2) * Math.sin(Math.PI - rotAngle);

  const [bgImg, setBgImg] = useState<string>("bg0");

  return (
    <Canvas
      camera={{ position: [0, 25, 20] }}
      style={{
        width: "300px",
        height: "300px",
      }}
      className=" border border-teal-400"
    >
      <ambientLight />
      <OrbitControls />
      <group>
        {/* Parte del teclado */}
        <group>
          <Box args={[width, height * 0.6, long]}>
            <meshPhysicalMaterial
              // emissive={"#ffffff"}
              // emissiveIntensity={1}
              metalness={0.5}
              roughness={0.6}
              // transmission={1}
              // opacity={0.9}
              // transparent={true}
              reflectivity={0.9}
            >
              <GradientTexture stops={[0, 1]} colors={["#f5a7b6", "#ff33ff"]} />
            </meshPhysicalMaterial>
          </Box>

          {/* Teclas */}
          {keys.map((key, index) => (
            <Box
              key={index}
              args={[key.size[0], key.size[1], key.size[2]]}
              position={[
                key.position[0],
                key.position[1] + 0.5,
                key.position[2],
              ]}
              onClick={() => console.log(`Tecla presionada: ${key.name}`)}
            >
              <meshStandardMaterial color="black" />
              <Text
                color="#ffffff"
                position={[0, key.size[1] + 0.05, 0]}
                fontSize={
                  key.symbol.length > 2
                    ? Math.min(key.size[0], key.size[2]) * 0.2
                    : Math.min(key.size[0], key.size[2]) * 0.5
                }
                rotation={[-Math.PI / 2, 0, 0]}
              >
                {key.symbol}
              </Text>
            </Box>
          ))}
        </group>

        {/* Parte de la pantalla */}
        <group
          rotation={[rotAngle, 0, 0]}
          position={[0, -lonRetrY + height / 2, -lonRetrZ - long / 2]}
        >
          <Box args={[width, height * 0.6, long]}>
            <meshPhysicalMaterial
              // emissive={"#ffffff"}
              // emissiveIntensity={1}
              metalness={0.5}
              roughness={0.6}
              // transmission={1}
              // opacity={0.9}
              // transparent={true}
              reflectivity={0.9}
            >
              <GradientTexture stops={[0, 1]} colors={["#f5a7b6", "#ff33ff"]} />
            </meshPhysicalMaterial>
          </Box>
          <Screens bg={bgImg} />
        </group>
      </group>
    </Canvas>
  );
}

export default Laptop;
