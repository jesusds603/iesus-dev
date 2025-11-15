"use client";
import React, { Fragment, useState } from "react";
import "katex/dist/katex.min.css";
import MainC from "@/components/FreeFall/MainC";
import Formulas from "@/components/FreeFall/Formulas";
import Calculator from "@/components/FreeFall/Calculator";
import Head from "next/head";
import { useLanguage } from "@/hooks/useLanguage";
import { useSphereGame } from "@/hooks/useSphereGame";
import { FormState, defaultState } from "@/components/FreeFall/constants";

const Page = () => {
  const [formState, setFormState] = useState<FormState>(defaultState);
  const [simulationRunning, setSimulationRunning] = useState<boolean>(false);
  const [sliderTime, setSliderTime] = useState<number>(0);
  const { posSphere, timeS } = useSphereGame();
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

  // Cálculos optimizados
  const angleRad = (parseFloat(formState.angle) * Math.PI) / 180;
  const thetaRad = (parseFloat(formState.theta) * Math.PI) / 180;
  const velocity = parseFloat(formState.velocity);
  const gravity = parseFloat(formState.gravity);
  const initialY = parseFloat(formState.initialY);

  const v0x = velocity * Math.cos(angleRad) * Math.cos(thetaRad);
  const v0z = velocity * Math.cos(angleRad) * Math.sin(thetaRad);
  const v0y = velocity * Math.sin(angleRad);

  const tMax = v0y > 0 ? v0y / gravity : 0;
  const yMax = v0y > 0 ? initialY + (v0y * v0y) / (2 * gravity) : initialY;

  const discriminant = (v0y * v0y) + (2 * gravity * initialY);
  const tFloor = (v0y + Math.sqrt(discriminant)) / gravity;
  const xFloor = parseFloat(formState.initialX) + v0x * tFloor;
  const zFloor = parseFloat(formState.initialZ) + v0z * tFloor;

  // Cálculos de energía
  const mass = parseFloat(formState.mass);
  const initialKineticEnergy = 0.5 * mass * Math.pow(velocity, 2);
  const initialPotentialEnergy = mass * gravity * initialY;
  const totalEnergy = initialKineticEnergy + initialPotentialEnergy;

  const finalKineticEnergy = posSphere.y <= 0
    ? totalEnergy
    : 0.5 * mass * (v0x * v0x + Math.pow(v0y - gravity * timeS, 2) + v0z * v0z);
  
  const finalPotentialEnergy = posSphere.y < 0 ? 0 : mass * gravity * posSphere.y;

  // Handlers
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderTime(parseFloat(e.target.value));
  };

  const handleTimeInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderTime(parseFloat(e.target.value));
  };

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

      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-cyan-900/10">
        {/* Header con instrucciones */}
        <div className="bg-black/50 backdrop-blur-sm border-b border-cyan-500/30 py-3">
          <p className="text-center text-cyan-300 text-sm font-medium px-4">
            {myLanguage === "eng"
              ? "Use WASD to rotate the ship and arrow keys to move it. Configure parameters and start simulation."
              : "Usa WASD para rotar la nave y flechas para moverla. Configura parámetros e inicia simulación."}
          </p>
        </div>

        {/* Contenido principal */}
        <div className="container mx-auto px-4 py-6">
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
      </div>
    </Fragment>
  );
};

export default Page;