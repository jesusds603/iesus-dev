import type { BoxProps, WheelInfoOptions } from "@react-three/cannon";
import { useBox, useRaycastVehicle } from "@react-three/cannon";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group, Mesh } from "three";
import { Chassis2 } from "./Chassis2";
import { Wheel2 } from "./Wheel2";

export type VehicleProps = Required<
  Pick<BoxProps, "angularVelocity" | "position" | "rotation">
> & {
  back?: number;
  force?: number;
  front?: number;
  height?: number;
  maxBrake?: number;
  radius?: number;
  steer?: number;
  width?: number;
};

function Vehicle2({
  angularVelocity,
  position,
  radius = 0.5,
  rotation,
}: VehicleProps) {
  const scale = 2;
  const chassisDimensions: [number, number, number] = [
    1.8 * scale,
    1.5 * scale,
    4.1 * scale,
  ]; // [Width, Height, Length]
  const radiusW = scale * radius;

  const wheels = [
    useRef<Group>(null),
    useRef<Group>(null),
    useRef<Group>(null),
    useRef<Group>(null),
  ];

  const wheelInfo: WheelInfoOptions = {
    axleLocal: [-1.2, 0, 0], // This is inverted for asymmetrical wheel models (left v. right sided)
    customSlidingRotationalSpeed: -30,
    dampingCompression: 4.4,
    dampingRelaxation: 10,
    directionLocal: [0, -1, 0], // set to same as Physics Gravity
    frictionSlip: 1,
    maxSuspensionForce: 1e4,
    maxSuspensionTravel: 0.3,
    radius: radiusW * 0.8,
    suspensionRestLength: 0.3,
    suspensionStiffness: 30,
    useCustomSlidingRotationalSpeed: true,
  };

  const wheelInfo1: WheelInfoOptions = {
    ...wheelInfo,
    chassisConnectionPointLocal: [
      -chassisDimensions[0] * 0.55,
      -scale / 2,
      chassisDimensions[2] * 0.3,
    ],
    isFrontWheel: true,
  };
  const wheelInfo2: WheelInfoOptions = {
    ...wheelInfo,
    chassisConnectionPointLocal: [
      chassisDimensions[0] * 0.55,
      -scale / 2,
      chassisDimensions[2] * 0.3,
    ],
    isFrontWheel: true,
  };
  const wheelInfo3: WheelInfoOptions = {
    ...wheelInfo,
    chassisConnectionPointLocal: [
      -chassisDimensions[0] * 0.55,
      -scale / 2,
      -chassisDimensions[2] * 0.3,
    ],
    isFrontWheel: false,
  };
  const wheelInfo4: WheelInfoOptions = {
    ...wheelInfo,
    chassisConnectionPointLocal: [
      chassisDimensions[0] * 0.55,
      -scale / 2,
      -chassisDimensions[2] * 0.3,
    ],
    isFrontWheel: false,
  };

  const [chassisBody, chassisApi] = useBox(
    () => ({
      allowSleep: false,
      angularVelocity,
      args: chassisDimensions,
      mass: 1000,
      // onCollide: (e) => console.log("bonk", e.body.userData),
      position,
      rotation,
    }),
    useRef<Mesh>(null)
  );

  const [vehicle, vehicleApi] = useRaycastVehicle(
    () => ({
      chassisBody,
      wheelInfos: [wheelInfo1, wheelInfo2, wheelInfo3, wheelInfo4],
      wheels,
    }),
    useRef<Group>(null)
  );

  const timeElapsed = useRef(0); // Tiempo transcurrido dentro del paso actual

  useFrame((_, delta) => {
    // Incrementar el tiempo transcurrido
    timeElapsed.current += delta;

    // Condicionales para aplicar fuerza y dirección
    if (timeElapsed.current < 3) {
      // Primer intervalo: Aplicar fuerza y dirección iniciales
      vehicleApi.applyEngineForce(-4000, 2); // Llanta trasera izquierda
      vehicleApi.applyEngineForce(-4000, 3); // Llanta trasera derecha
      vehicleApi.setSteeringValue(0.4, 0); // Llanta delantera izquierda
      vehicleApi.setSteeringValue(0.4, 1); // Llanta delantera derecha
    } else if (timeElapsed.current < 10) {
      // Segundo intervalo: Cambiar fuerza y dirección
      vehicleApi.applyEngineForce(-4000, 2); // Llanta trasera izquierda
      vehicleApi.applyEngineForce(-4000, 3); // Llanta trasera derecha
      vehicleApi.setSteeringValue(0, 0); // Llanta delantera izquierda
      vehicleApi.setSteeringValue(0, 1); // Llanta delantera derecha
    } else {
      // Reiniciar el tiempo transcurrido
      chassisApi.position.set(position[0], position[1], position[2]);
      chassisApi.rotation.set(0, 0, 0);
      chassisApi.velocity.set(0, 0, 0);
      chassisApi.angularVelocity.set(0, 0, 0);
      timeElapsed.current = 0;
    }
  });

  return (
    <group ref={vehicle}>
      <Chassis2 ref={chassisBody} dimensions={chassisDimensions} />
      <Wheel2
        ref={wheels[0]}
        radius={radiusW}
        chassisDimensions={chassisDimensions}
        leftSide
      />
      <Wheel2
        ref={wheels[1]}
        radius={radiusW}
        chassisDimensions={chassisDimensions}
      />
      <Wheel2
        ref={wheels[2]}
        radius={radiusW}
        chassisDimensions={chassisDimensions}
        leftSide
      />
      <Wheel2
        ref={wheels[3]}
        radius={radiusW}
        chassisDimensions={chassisDimensions}
      />
    </group>
  );
}

export default Vehicle2;
