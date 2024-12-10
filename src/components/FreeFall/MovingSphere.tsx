"use client";
import React, { useRef, useState, useEffect, useContext } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, OrbitControls, Plane, Line } from "@react-three/drei";
import { Vector3 } from "three";
import * as THREE from "three";
import "katex/dist/katex.min.css";
import { FormState } from "./constants";
import { useSphere } from "@/hooks/useSphere";

export const MovingSphere = ({
  formState,
  startSimulation,
  resetSimulation,
}: {
  formState: FormState;
  startSimulation: boolean;
  resetSimulation: () => void;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [time, setTime] = useState(0);
  const [trajectory, setTrajectory] = useState<THREE.Vector3[]>([]);
  const [maxPosition, setMaxPosition] = useState<{
    x: number;
    y: number;
    z: number;
  } | null>(null);
  const { updatePosSphere, updateTimeS } = useSphere();

  useEffect(() => {
    if (startSimulation) {
      setTime(0);
      setTrajectory([]);
      setMaxPosition(null);
      if (meshRef.current) {
        meshRef.current.position.set(
          parseFloat(formState.initialX),
          parseFloat(formState.initialY),
          parseFloat(formState.initialZ)
        );
      }
    }
  }, [
    startSimulation,
    formState.initialX,
    formState.initialY,
    formState.initialZ,
  ]);

  useFrame(() => {
    if (startSimulation && meshRef.current) {
      const t = time + 0.15;
      const angle = parseFloat(formState.angle);
      const theta = parseFloat(formState.theta);
      const velocity = parseFloat(formState.velocity);
      const gravity = parseFloat(formState.gravity);
      const mass = parseFloat(formState.mass);

      const v0x =
        velocity *
        Math.cos((angle * Math.PI) / 180) *
        Math.cos((theta * Math.PI) / 180);
      const v0z =
        velocity *
        Math.cos((angle * Math.PI) / 180) *
        Math.sin((theta * Math.PI) / 180);
      const v0y = velocity * Math.sin((angle * Math.PI) / 180);

      const x = parseFloat(formState.initialX) + v0x * t;
      const z = parseFloat(formState.initialZ) + v0z * t;
      let y = parseFloat(formState.initialY) + v0y * t - 0.5 * gravity * t * t;

      const vx = v0x;
      const vy = v0y - gravity * t;
      const vz = v0z;
      const speed = Math.sqrt(vx * vx + vy * vy + vz * vz);

      let kineticEnergy = 0.5 * mass * speed * speed;
      let potentialEnergy = mass * gravity * y;

      const tFloor =
        (parseFloat(formState.velocity) *
          Math.sin((parseFloat(formState.angle) * Math.PI) / 180) +
          Math.sqrt(
            (parseFloat(formState.velocity) *
              Math.sin((parseFloat(formState.angle) * Math.PI) / 180)) **
              2 +
              2 * parseFloat(formState.gravity) * parseFloat(formState.initialY)
          )) /
        parseFloat(formState.gravity);
      const xFloor = parseFloat(formState.initialX) + v0x * tFloor;
      const zFloor = parseFloat(formState.initialZ) + v0z * tFloor;

      if (y >= 0) {
        meshRef.current.position.set(x, y, z);
        setTrajectory((old) => [...old, new Vector3(x, y, z)]);
        setTime(t);
      } else {
        y = 0;
        potentialEnergy = 0;
        meshRef.current.position.set(x, y, z);
        setTime(t);
        resetSimulation(); //* Stop simulation
      }

      updatePosSphere({
        x: meshRef.current.position.x,
        y: meshRef.current.position.y,
        z: meshRef.current.position.z,
      });

      updateTimeS(t);

      const tMax = v0y > 0 ? v0y / gravity : 0; // Consideramos tMax solo si v0y es positivo
      const yMax =
        v0y > 0
          ? parseFloat(formState.initialY) + (v0y * v0y) / (2 * gravity)
          : parseFloat(formState.initialY); // Consideramos yMax solo si v0y es positivo

      if (t >= tMax && !maxPosition) {
        const xMax = parseFloat(formState.initialX) + v0x * tMax;
        const zMax = parseFloat(formState.initialZ) + v0z * tMax;
        setMaxPosition({ x: xMax, y: yMax, z: zMax });
      }
    }
  });

  return (
    <>
      <Sphere ref={meshRef} args={[1, 16, 16]}>
        <meshStandardMaterial color="red" />
      </Sphere>

      {trajectory.length > 1 && (
        <Line points={trajectory} color="yellow" lineWidth={2} />
      )}

      {maxPosition && (
        <Sphere
          position={[maxPosition.x, maxPosition.y, maxPosition.z]}
          args={[2, 16, 16]}
        >
          <meshStandardMaterial color="blue" />
        </Sphere>
      )}
    </>
  );
};
