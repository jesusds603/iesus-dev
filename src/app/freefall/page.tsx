"use client";
import React, { Fragment, useState } from "react";
import "katex/dist/katex.min.css";
import { useShip } from "../../hooks/useShip";
import { useSphere } from "../../hooks/useSphere";
import { FormState, defaultState } from "@/components/FreeFall/constants";
import MainC from "@/components/FreeFall/MainC";
import Formulas from "@/components/FreeFall/Formulas";
import Calculator from "@/components/FreeFall/Calculator";
import Head from "next/head";
import { useLanguage } from "@/hooks/useLanguage";

const Page = () => {
  const [formState, setFormState] = useState<FormState>(defaultState);
  const [simulationRunning, setSimulationRunning] = useState<boolean>(false);
  const [sliderTime, setSliderTime] = useState<number>(0);
  const { position, updatePosition } = useShip();
  const { posSphere, timeS } = useSphere();
  const { myLanguage } = useLanguage();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleStartSimulation = () => {
    setSimulationRunning(true);
  };

  const resetSimulation = () => {
    setSimulationRunning(false);
  };

  const setShipPosition = (x: number, y: number, z: number) => {
    updatePosition({ x, y, z });
  };

  const v0x =
    parseFloat(formState.velocity) *
    Math.cos((parseFloat(formState.angle) * Math.PI) / 180) *
    Math.cos((parseFloat(formState.theta) * Math.PI) / 180);
  const v0z =
    parseFloat(formState.velocity) *
    Math.cos((parseFloat(formState.angle) * Math.PI) / 180) *
    Math.sin((parseFloat(formState.theta) * Math.PI) / 180);
  const v0y =
    parseFloat(formState.velocity) *
    Math.sin((parseFloat(formState.angle) * Math.PI) / 180);

  const tMax = v0y > 0 ? v0y / parseFloat(formState.gravity) : 0;
  const yMax =
    v0y > 0
      ? parseFloat(formState.initialY) +
        (v0y * v0y) / (2 * parseFloat(formState.gravity))
      : parseFloat(formState.initialY);

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

  // Calcula la energía total inicial
  const initialVelocity = parseFloat(formState.velocity);
  const initialY = parseFloat(formState.initialY);
  const mass = parseFloat(formState.mass);
  const gravity = parseFloat(formState.gravity);

  const initialKineticEnergy = 0.5 * mass * Math.pow(initialVelocity, 2);
  const initialPotentialEnergy = mass * gravity * initialY;
  const totalEnergy = initialKineticEnergy + initialPotentialEnergy;

  // Valores ajustados para la posición final
  const finalY = posSphere.y < 0 ? 0 : posSphere.y;
  const finalKineticEnergy =
    posSphere.y <= 0
      ? totalEnergy
      : 0.5 *
        mass *
        (v0x * v0x +
          (v0y - gravity * timeS) * (v0y - gravity * timeS) +
          v0z * v0z);
  const finalPotentialEnergy =
    posSphere.y < 0 ? 0 : mass * gravity * posSphere.y;

  //* Para la calculadora que calcula valores en función de t
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderTime(parseFloat(e.target.value));
  };

  const handleTimeInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setSliderTime(newTime);
  };

  //* RETURN
  return (
    <Fragment>
      <Head>
        <title>3D Free Fall and Projectile Motion Calculator - Iesus Dev</title>
        <meta
          name="description"
          content="Explore free fall and projectile motion with this interactive 3D calculator. Visualize trajectories, velocities, energies, and simulate real-time physics!"
        />
        <meta
          name="keywords"
          content="Free Fall, Projectile Motion, Physics Calculator, 3D Simulation, Motion Trajectory, Energy Analysis, Iesus Dev"
        />
        <meta
          property="og:title"
          content="3D Free Fall & Projectile Motion Calculator"
        />
        <meta
          property="og:description"
          content="Simulate free fall and projectile motion in 3D! Visualize trajectories, analyze velocities, and understand energy transformations in physics."
        />
        <meta property="og:image" content="/freefall.png" />
        <meta property="og:type" content="website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="flex flex-col">
        <p className="text-center">
          {myLanguage === "eng"
            ? "Use the WASD keys to rotate the ship and the arrow keys to move it."
            : "Usa las teclas WASD para rotar la nave y las teclas de flecha para moverla."}
        </p>

        <MainC
          formState={formState}
          handleChange={handleChange}
          handleStartSimulation={handleStartSimulation}
          initialKineticEnergy={initialKineticEnergy}
          finalKineticEnergy={finalKineticEnergy}
          initialPotentialEnergy={initialPotentialEnergy}
          finalPotentialEnergy={finalPotentialEnergy}
          totalEnergy={totalEnergy}
          tMax={tMax}
          yMax={yMax}
          v0x={v0x}
          v0z={v0z}
          tFloor={tFloor}
          xFloor={xFloor}
          zFloor={zFloor}
          simulationRunning={simulationRunning}
          resetSimulation={resetSimulation}
        />

        <Calculator
          formState={formState}
          sliderTime={sliderTime}
          tFloor={tFloor}
          handleSliderChange={handleSliderChange}
          handleTimeInputChange={handleTimeInputChange}
        />

        <Formulas />
      </div>
    </Fragment>
  );
};

export default Page;
