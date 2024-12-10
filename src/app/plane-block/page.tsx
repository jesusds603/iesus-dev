"use client";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { Plane, Bullet, Star } from "@/components/PlaneBlock/constants";
import {
  handleKeyDown,
  handleKeyUp,
} from "@/components/PlaneBlock/functions/useKeyHandlers";
import GridPlane from "@/components/PlaneBlock/jsxElements/Grid";
import EnemyPlaneUpdater from "@/components/PlaneBlock/functions/EnemyPlaneUpdater";
import ParagraphPosition from "@/components/PlaneBlock/jsxElements/ParagraphPosition";
import EnemyPlanesInfo from "@/components/PlaneBlock/jsxElements/EnemyPlanesInfo";
import generateEnemyPlanes from "@/components/PlaneBlock/functions/GenerateEnemyPlanes";
import GridOrientationToggle from "@/components/PlaneBlock/jsxElements/GridOrientationToggle";
import StartButton from "@/components/PlaneBlock/jsxElements/StartButton";
import CellSizeSelector from "@/components/PlaneBlock/jsxElements/CellSizeSelector";
import {
  checkCollisionPlayer,
  checkCollisionPlayerBullet,
  checkCollisionBullets,
  checkCollisionEnemyBullets,
} from "@/components/PlaneBlock/functions/checkCollisionPlayer";
import {
  moveBullets,
  moveBulletsPlayer,
} from "@/components/PlaneBlock/functions/shootMoveBullets";
import {
  resetGame,
  handleStart,
  handlePause,
  handleEndGame,
  handleNextLevel,
} from "@/components/PlaneBlock/functions/gameFunctions";
import GenerateStars from "@/components/PlaneBlock/functions/GenerateStars";
import Head from "next/head";

function PlaneBlockPage() {
  const { myLanguage } = useLanguage();
  const MIN_DIM = 40;
  const MAX_DIM = 50;
  const [cellSize, setCellSize] = useState<number>(10);
  const [isGridHorizontal, setIsGridHorizontal] = useState<boolean>(false);
  const [gridHeight, setGridHeight] = useState<number>(
    isGridHorizontal ? MIN_DIM : MAX_DIM
  );
  const [gridWidth, setGridWidth] = useState<number>(
    isGridHorizontal ? MAX_DIM : MIN_DIM
  );

  type LevelKeys = `L${number}`; // Tipos de claves válidas
  const amountToKill: Record<LevelKeys, number> = {
    L1: 8,
    L2: 10,
    L3: 12,
    L4: 14,
    L5: 16,
    L6: 18,
    L7: 20,
    L8: 22,
    L9: 24,
    L10: 26,
  };
  const amountInScreen: Record<LevelKeys, number> = {
    L1: 4,
    L2: 5,
    L3: 6,
    L4: 7,
    L5: 8,
    L6: 9,
    L7: 10,
    L8: 11,
    L9: 12,
    L10: 13,
  };

  const [amountEnemies, setAmountEnemies] = useState<number>(amountInScreen.L1);
  const [amountKilledEnemies, setAmountKilledEnemies] = useState<number>(0);

  const [levelIsPassed, setLevelIsPassed] = useState<boolean>(false);
  const [currentLevel, setCurrentLevel] = useState<number>(1);

  const [gameIsStarted, setGameIsStarted] = useState<boolean>(false);
  const [gameIsPaused, setGameIsPaused] = useState<boolean>(false);
  const [gameIsOver, setGameIsOver] = useState<boolean>(false);
  const [isCollisionPlayer, setIsCollisionPlayer] = useState<boolean>(false);

  const initialPlayerPlane: Plane = {
    position: { x: 2, y: 30 },
    direction: "y+",
  };

  // const [enemySpeed, setEnemySpeed] = useState<number>(400); // Intervalo de tiempo de cada cuánto un enemigo se mueve un cuadrito
  // const [playerSpeed, setPlayerSpeed] = useState<number>(100); // Intervalo de tiempo el jugador se mueve un cuadrito

  const enemySpeed: number = 400;
  const playerSpeed: number = 100;

  const [playerPlane, setPlayerPlane] = useState<Plane>(initialPlayerPlane);
  const [enemyPlanes, setEnemyPlanes] = useState<Plane[]>(
    generateEnemyPlanes(isGridHorizontal, gridHeight, gridWidth, amountEnemies)
  );
  const enemyPlanesRef = useRef<Plane[]>(enemyPlanes);

  const [bullets, setBullets] = useState<Bullet[]>([]);
  const [playerBullets, setPlayerBullets] = useState<Bullet[]>([]);

  // const [amountStars, setAmountStars] = useState<number>(50);
  const amountStars: number = 50;
  const [stars, setStars] = useState<Star[]>(
    GenerateStars(gridHeight, gridWidth, amountStars)
  );

  // const [amountPlanets, setAmountPlanets] = useState<number>(10);
  // const [planets, setPlanets] = useState<Planet[]>([]);

  const activeKeysRef = useRef<string[]>([]); // Para rastrear teclas activas
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const bulletIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // const [firingSpeed, setFiringSpeed] = useState<number>(200); // Intervalo de tiempo de cada cuánto una bala enemiga se mueve un cuadrito
  const firingSpeed: number = 200;
  // const [firingSpeedPlayer, setFiringSpeedPlayer] = useState<number>(70); // Intervalo de tiempo de cada cuánto una bala se mueve un cuadrito
  const firingSpeedPlayer = 70;
  // const [intervalFiringPlintervalFiringPlaneane, setIntervalFiringPlane] = useState<number>(4000); // Distancia de tiempo de cada cuánto un avión dispara una bala
  const intervalFiringPlane: number = 4000;
  // const [intervalBetweenPlanesShoot, setIntervalBetweenPlanesShoot] =
  useState<number>(500); // Distancia de disparos entre dos aviones consecutivos
  const intervalBetweenPlanesShoot: number = 500;

  const { updateEnemyPlanes } = EnemyPlaneUpdater({
    setEnemyPlanes,
    enemyPlanesRef,
    cellSize,
    gridHeight,
    gridWidth,
  });

  const toggleGridOrientation = () => {
    setIsGridHorizontal((prev) => !prev);
    setGridWidth((prevWidth) => (prevWidth === MIN_DIM ? MAX_DIM : MIN_DIM));
    setGridHeight((prevHeight) => (prevHeight === MAX_DIM ? MIN_DIM : MAX_DIM));
  };

  //* useEffect para regenerar los aviones y estrellas cuando cambian gridWidth o gridHeight
  useEffect(() => {
    setEnemyPlanes(
      generateEnemyPlanes(
        isGridHorizontal,
        gridHeight,
        gridWidth,
        amountEnemies
      )
    );

    setStars(GenerateStars(gridHeight, gridWidth, amountStars));
  }, [gridWidth, gridHeight, amountEnemies, amountStars, isGridHorizontal]);

  //* Movimiento del avión del jugador mediante teclas y generación de balas
  useEffect(() => {
    if (!gameIsStarted || gameIsPaused || gameIsOver || isCollisionPlayer)
      return;

    const keyDownHandler = (event: KeyboardEvent) =>
      handleKeyDown(
        event,
        activeKeysRef,
        isCollisionPlayer,
        setPlayerPlane,
        intervalRef,
        cellSize,
        gridHeight,
        gridWidth,
        playerSpeed,
        setPlayerBullets,
        playerPlane
      );

    const keyUpHandler = (event: KeyboardEvent) =>
      handleKeyUp(
        event,
        activeKeysRef,
        isCollisionPlayer,
        setPlayerPlane,
        intervalRef,
        cellSize,
        gridHeight,
        gridWidth,
        playerSpeed
      );

    // console.log(playerBullets);

    window.addEventListener("keydown", keyDownHandler);
    window.addEventListener("keyup", keyUpHandler);

    return () => {
      window.removeEventListener("keydown", keyDownHandler);
      window.removeEventListener("keyup", keyUpHandler);
    };
  }, [
    activeKeysRef,
    gameIsStarted,
    gameIsPaused,
    gameIsOver,
    isCollisionPlayer,
    playerPlane,
    playerBullets,
    cellSize,
    gridHeight,
    gridWidth,
    playerSpeed,
  ]);

  //* Update positions of enemy planes every interval of time and detect collisions among them
  useEffect(() => {
    if (!gameIsStarted || gameIsPaused) return;

    const interval = setInterval(updateEnemyPlanes, enemySpeed);

    return () => clearInterval(interval);
  }, [gameIsStarted, gameIsPaused, enemySpeed, updateEnemyPlanes]);

  //* Update positions of enemy planes every interval of time and detect collisions
  useEffect(() => {
    if (!gameIsStarted || gameIsPaused || gameIsOver) return;

    const checkCollision = () => {
      const collision = checkCollisionPlayer(playerPlane, enemyPlanes);

      if (collision) {
        setIsCollisionPlayer(true);
        setGameIsOver(true);
        handleEndGame({
          setGameIsStarted,
          setGameIsPaused,
          setGameIsOver,
          bulletIntervalRef,
          activeKeysRef,
          intervalRef,
        });
      }
    };

    checkCollision();
  }, [gameIsStarted, gameIsPaused, gameIsOver, playerPlane, enemyPlanes]);

  //* Usar setInterval para mover las balas a intervalos definidos
  useEffect(() => {
    if (!gameIsStarted || gameIsPaused) return;

    const moveBulletsInterval = setInterval(() => {
      if (!gameIsPaused) moveBullets(setBullets, gridHeight, gridWidth);
    }, firingSpeed);

    return () => {
      clearInterval(moveBulletsInterval);
    };
  }, [gameIsStarted, gameIsPaused, firingSpeed, gridHeight, gridWidth]);

  //* Update positions bullets every interval of time and detect collisions
  useEffect(() => {
    if (!gameIsStarted || gameIsPaused || gameIsOver) return;

    const checkCollisionBullet = () => {
      const collision = checkCollisionPlayerBullet(playerPlane, bullets);

      if (collision) {
        setIsCollisionPlayer(true);
        setGameIsOver(true);
        handleEndGame({
          setGameIsStarted,
          setGameIsPaused,
          setGameIsOver,
          bulletIntervalRef,
          activeKeysRef,
          intervalRef,
        });
      }
    };

    checkCollisionBullet();
  }, [gameIsStarted, gameIsPaused, gameIsOver, playerPlane, bullets]);

  //* Mover balas del jugador
  useEffect(() => {
    if (!gameIsStarted || gameIsPaused) return;

    const moveBulletsInterval = setInterval(() => {
      if (!gameIsPaused)
        moveBulletsPlayer(setPlayerBullets, gridHeight, gridWidth);
    }, firingSpeedPlayer);

    return () => {
      clearInterval(moveBulletsInterval);
    };
  }, [gameIsStarted, gameIsPaused, firingSpeedPlayer, gridHeight, gridWidth]);

  //* Detectar colisiones entre balas del jugador y balas enemigas
  useEffect(() => {
    if (!gameIsStarted || gameIsPaused || gameIsOver) return;

    // Verificar y actualizar las listas de balas en caso de colisión
    const { bullets: updatedBullets, bulletsPlayer: updatedPlayerBullets } =
      checkCollisionBullets(bullets, playerBullets);

    // Actualizar los estados solo si hay algún cambio
    if (
      updatedBullets.length !== bullets.length ||
      updatedPlayerBullets.length !== playerBullets.length
    ) {
      setBullets(updatedBullets);
      setPlayerBullets(updatedPlayerBullets);
    }
  }, [bullets, playerBullets, gameIsStarted, gameIsPaused, gameIsOver]);

  //* Detectar clsiiones entre balas del jugador y aviones enemigos
  useEffect(() => {
    if (!gameIsStarted || gameIsPaused || gameIsOver) return;

    // Verificar y actualizar las listas de balas en caso de colisión
    const {
      enemyPlanes: updatedEnemyPlanes,
      bulletsPlayer: updatedPlayerBullets,
    } = checkCollisionEnemyBullets(
      enemyPlanes,
      playerBullets,
      setAmountKilledEnemies
    );

    // Actualizar los estados solo si hay algún cambio
    if (
      updatedEnemyPlanes.length !== enemyPlanes.length ||
      updatedPlayerBullets.length !== playerBullets.length
    ) {
      setEnemyPlanes(updatedEnemyPlanes);
      setPlayerBullets(updatedPlayerBullets);
    }
  }, [
    enemyPlanes,
    playerBullets,
    gameIsStarted,
    gameIsPaused,
    gameIsOver,
    amountKilledEnemies,
  ]);

  //* Cambiar el botón cuando se matan a todos los enemigos
  useEffect(() => {
    if (
      amountKilledEnemies >= amountToKill[`L${currentLevel}`] &&
      gameIsStarted
    ) {
      setGameIsPaused(true); // Detiene el juego automáticamente
      setLevelIsPassed(true);
    }
  }, [amountKilledEnemies, currentLevel, gameIsStarted, amountToKill]);

  return (
    <Fragment>
      <Head>
        <title>Space Shooter - Iesus Dev</title>
        <meta
          name="description"
          content="Engage in intense space battles in the ultimate space shooter game. Destroy enemy ships, level up, and become the ultimate space warrior!"
        />
        <meta
          name="keywords"
          content="Space Shooter, Space Battle, Space Game, Level Up, Arcade Game, Shoot 'Em Up, Iesus Dev"
        />
        <meta
          property="og:title"
          content="Space Shooter - Become the Ultimate Space Warrior"
        />
        <meta
          property="og:description"
          content="A thrilling space shooter where you battle enemies in the galaxy, destroy their ships, and level up your own ship to become the strongest."
        />
        <meta property="og:image" content="/plane.png" />
        <meta property="og:type" content="article" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-[calc(100vh-48px)] flex flex-col items-center justify-center">
        {!gameIsStarted && (
          <GridOrientationToggle
            isGridHorizontal={isGridHorizontal}
            onToggle={toggleGridOrientation}
          />
        )}

        {!gameIsStarted && (
          <CellSizeSelector cellSize={cellSize} onChange={setCellSize} />
        )}

        <StartButton
          gameIsStarted={gameIsStarted}
          gameIsPaused={gameIsPaused}
          gameIsOver={gameIsOver}
          levelIsPassed={levelIsPassed}
          onStart={() =>
            handleStart({
              gameIsOver,
              setGameIsStarted,
              setGameIsPaused,
              enemyPlanes,
              setEnemyPlanes,
              setBullets,
              intervalFiringPlane,
              intervalBetweenPlanesShoot,
              bulletIntervalRef,
              activeKeysRef,
              gridWidth,
              gridHeight,
              amountInScreen,
              currentLevel,
              enemyPlanesRef,
              playerPlane,
            })
          }
          onPause={() => handlePause({ setGameIsPaused, bulletIntervalRef })}
          onReset={() =>
            resetGame({
              initialPlayerPlane,
              isGridHorizontal,
              gridHeight,
              gridWidth,
              amountEnemies,
              setPlayerPlane,
              setEnemyPlanes,
              setIsCollisionPlayer,
              setGameIsOver,
              setGameIsPaused,
              activeKeysRef,
              setBullets,
              intervalRef,
              bulletIntervalRef,
              setPlayerBullets,
              setAmountKilledEnemies,
            })
          }
          onNext={() =>
            handleNextLevel({
              currentLevel,
              setCurrentLevel,
              amountInScreen,
              setAmountEnemies,
              setGameIsStarted,
              bulletIntervalRef,
              activeKeysRef,
              intervalRef,
              setBullets,
              setPlayerBullets,
              initialPlayerPlane,
              isGridHorizontal,
              gridHeight,
              gridWidth,
              amountEnemies,
              setPlayerPlane,
              setEnemyPlanes,
              setIsCollisionPlayer,
              setGameIsOver,
              setGameIsPaused,
              setAmountKilledEnemies,
              setLevelIsPassed,
            })
          }
        />

        <ParagraphPosition position={playerPlane.position} />

        <div>
          <p>
            {myLanguage === "eng" ? "Killed enemies:" : "Enemigos muertos:"}{" "}
            {amountKilledEnemies} / {amountToKill[`L${currentLevel}`]}
          </p>
          <p>
            {" "}
            {myLanguage === "eng" ? "Level:" : "Nivel:"} {currentLevel}
          </p>
        </div>

        {levelIsPassed ? (
          <p>
            {" "}
            {myLanguage === "eng"
              ? "Contratulations! You passed to the level:"
              : "¡Felicidades! Pasaste al nivel:"}{" "}
            {currentLevel}
          </p>
        ) : (
          ""
        )}

        <GridPlane
          playerPlane={playerPlane}
          enemyPlanes={enemyPlanes}
          cellSize={cellSize}
          gridHeight={gridHeight}
          gridWidth={gridWidth}
          bullets={bullets}
          playerBullets={playerBullets}
          stars={stars}
        />

        <p className="text-[24px] mt-2">
          {myLanguage === "eng" ? (
            <span>
              Use the <span className="font-mono">WASD</span> keys to move and
              the <span className="font-mono">P</span> key to shoot.
            </span>
          ) : (
            <span>
              Usa las teclas <span className="font-mono ">WASD</span> para
              moverte y la <span className="font-mono ">P</span> para disparar.
            </span>
          )}
        </p>

        <EnemyPlanesInfo enemyPlanes={enemyPlanes} />
      </div>
    </Fragment>
  );
}

export default PlaneBlockPage;
