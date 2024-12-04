import React, { useEffect, useRef, useState } from "react";
import {
  useBox,
  useCompoundBody,
  useRaycastVehicle,
  WheelInfoOptions,
  useCylinder,
} from "@react-three/cannon";
import * as THREE from "three";
import CarLoader from "./CarLoader"; // Importas CarLoader

const Car: React.FC = () => {
  // Cargar el modelo desde CarLoader
  const [car, setCar] = useState<THREE.Group | null>(null); // Estado para almacenar el modelo cargado

  // Usamos un useEffect para cargar el modelo del coche
  useEffect(() => {
    const loadCar = async () => {
      const loadedCar = await CarLoader(); // Asegúrate de que CarLoader devuelve una promesa
      setCar(loadedCar);
    };

    loadCar();
  }, []);

  // Definir las opciones de las ruedas (WheelInfoOptions)
  const wheelInfo: WheelInfoOptions = {
    axleLocal: [-1, 0, 0], // Eje de las ruedas (invertido para modelos asimétricos)
    customSlidingRotationalSpeed: -30,
    dampingCompression: 4.4,
    dampingRelaxation: 10,
    directionLocal: [0, -1, 0], // Dirección de la suspensión
    frictionSlip: 2,
    maxSuspensionForce: 1e4,
    maxSuspensionTravel: 0.3,
    radius: 0.4, // Radio de la rueda
    suspensionRestLength: 0.3,
    suspensionStiffness: 30,
    useCustomSlidingRotationalSpeed: true,
  };

  // Configurar las ruedas delanteras y traseras con sus respectivas posiciones
  const wheelInfo1: WheelInfoOptions = {
    ...wheelInfo,
    chassisConnectionPointLocal: [-1.2, -0.5, 2], // Posición de la rueda delantera izquierda
    isFrontWheel: true,
  };
  const wheelInfo2: WheelInfoOptions = {
    ...wheelInfo,
    chassisConnectionPointLocal: [1.2, -0.5, 2], // Posición de la rueda delantera derecha
    isFrontWheel: true,
  };
  const wheelInfo3: WheelInfoOptions = {
    ...wheelInfo,
    chassisConnectionPointLocal: [-1.2, -0.5, -2], // Posición de la rueda trasera izquierda
    isFrontWheel: false,
  };
  const wheelInfo4: WheelInfoOptions = {
    ...wheelInfo,
    chassisConnectionPointLocal: [1.2, -0.5, -2], // Posición de la rueda trasera derecha
    isFrontWheel: false,
  };

  // Usamos useBox para el chasis
  const [chassisBody, chassisApi] = useBox(
    () => ({
      allowSleep: false,
      mass: 1500, // Masa del coche
      position: [0, 10, 0], // Posición inicial del chasis
      rotation: [0, 0, 0], // Rotación inicial
    }),
    useRef<THREE.Mesh>(null)
  );

  const [wheelF1, wheelF1Api] = useCylinder(
    () => ({
      mass: 1,
    }),
    useRef<THREE.Mesh>(null)
  );

  const [wheelF2, wheelF2Api] = useCylinder(
    () => ({
      mass: 1,
    }),
    useRef<THREE.Mesh>(null)
  );

  const [wheelB1, wheelB1Api] = useCylinder(
    () => ({
      mass: 1,
    }),
    useRef<THREE.Mesh>(null)
  );

  const [wheelB2, wheelB2Api] = useCylinder(
    () => ({
      mass: 1,
    }),
    useRef<THREE.Mesh>(null)
  );

  // Usamos useRaycastVehicle para crear el vehículo
  const [vehicle, vehicleApi] = useRaycastVehicle(
    () => ({
      chassisBody,
      wheelInfos: [wheelInfo1, wheelInfo2, wheelInfo3, wheelInfo4],
      wheels: [wheelF1, wheelF2, wheelB1, wheelB2],
    }),
    useRef<THREE.Group>(null)
  );

  useEffect(
    () => vehicleApi.sliding.subscribe((v) => console.log("sliding", v)),
    []
  );

  // Añadir el resto de las partes del coche al chasis según sea necesario

  return (
    <group ref={vehicle} position={[0, 20, 0]}>
      <mesh ref={chassisBody}>
        <group>
          car.children[0] car.children[1] car.children[2] car.children[3]
          car.children[5] car.children[6] car.children[7] car.children[8]
          car.children[17] car.children[14] car.children[9]
        </group>
      </mesh>
      <mesh ref={wheelF1}>
        <group>car.children[16] car.children[10]</group>
      </mesh>
      <mesh ref={wheelF2}>
        <group>car.children[18] car.children[13]</group>
      </mesh>
      <mesh ref={wheelB1}>
        <group>car.children[15] car.children[11]</group>
      </mesh>
      <mesh ref={wheelB2}>
        <group>car.children[4] car.children[12]</group>
      </mesh>
    </group>
  );
};

export default Car;
