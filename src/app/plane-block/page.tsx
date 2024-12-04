"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Plane,
  PlayerPlane,
  Bullet,
  Direction,
  Star,
  Planet,
} from "@/components/PlaneBlock/constants";
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

function PlaneBlockPage() {
  const MIN_DIM = 40;
  const MAX_DIM = 70;
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
    L1: 10,
    L2: 12,
    L3: 14,
    L4: 18,
  };
  const amountInScreen: Record<LevelKeys, number> = {
    L1: 5,
    L2: 6,
    L3: 7,
    L4: 9,
  };

  const [amountEnemies, setAmountEnemies] = useState<number>(amountInScreen.L1);
  const [amountKilledEnemies, setAmountKilledEnemies] = useState<number>(0);

  const [levelIsPassed, setLevelIsPassed] = useState<boolean>(false);
  const [currentLevel, setCurrentLevel] = useState<number>(1);

  const [gameIsStarted, setGameIsStarted] = useState<boolean>(false);
  const [gameIsPaused, setGameIsPaused] = useState<boolean>(false);
  const [gameIsOver, setGameIsOver] = useState<boolean>(false);
  const [isCollisionPlayer, setIsCollisionPlayer] = useState<boolean>(false);

  const initialPlayerPlane: PlayerPlane = {
    position: { x: 2, y: 30 },
    direction: "y+",
  };

  const [enemySpeed, setEnemySpeed] = useState<number>(400); // Intervalo de tiempo de cada cuánto un enemigo se mueve un cuadrito
  const [playerSpeed, setPlayerSpeed] = useState<number>(100); // Intervalo de tiempo el jugador se mueve un cuadrito

  const [playerPlane, setPlayerPlane] =
    useState<PlayerPlane>(initialPlayerPlane);
  const [enemyPlanes, setEnemyPlanes] = useState<Plane[]>(
    generateEnemyPlanes(isGridHorizontal, gridHeight, gridWidth, amountEnemies)
  );
  const enemyPlanesRef = useRef<Plane[]>(enemyPlanes);

  const [bullets, setBullets] = useState<Bullet[]>([]);
  const [playerBullets, setPlayerBullets] = useState<Bullet[]>([]);

  const [amountStars, setAmountStars] = useState<number>(50);
  const [stars, setStars] = useState<Star[]>(
    GenerateStars(gridHeight, gridWidth, amountStars)
  );

  const [amountPlanets, setAmountPlanets] = useState<number>(10);
  const [planets, setPlanets] = useState<Planet[]>([]);

  const activeKeysRef = useRef<string[]>([]); // Para rastrear teclas activas
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const bulletIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const [firingSpeed, setFiringSpeed] = useState<number>(200); // Intervalo de tiempo de cada cuánto una bala enemiga se mueve un cuadrito
  const [firingSpeedPlayer, setFiringSpeedPlayer] = useState<number>(70); // Intervalo de tiempo de cada cuánto una bala se mueve un cuadrito
  const [intervalFiringPlane, setIntervalFiringPlane] = useState<number>(4000); // Distancia de tiempo de cada cuánto un avión dispara una bala
  const [intervalBetweenPlanesShoot, setIntervalBetweenPlanesShoot] =
    useState<number>(500); // Distancia de disparos entre dos aviones consecutivos

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
  }, [gridWidth, gridHeight, amountEnemies]);

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
  ]);

  //* Update positions of enemy planes every interval of time and detect collisions among them
  useEffect(() => {
    if (!gameIsStarted || gameIsPaused) return;

    const interval = setInterval(updateEnemyPlanes, enemySpeed);

    return () => clearInterval(interval);
  }, [gameIsStarted, gameIsPaused]);

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
  }, [gameIsStarted, gameIsPaused]);

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
  }, [gameIsStarted, gameIsPaused]);

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
  }, [amountKilledEnemies, currentLevel, gameIsStarted]);

  return (
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
          Killed enemies: {amountKilledEnemies} /{" "}
          {amountToKill[`L${currentLevel}`]}
        </p>
        <p>Level: {currentLevel}</p>
      </div>

      {levelIsPassed ? (
        <p>¡Felicidades!, pasaste el nivel {currentLevel}</p>
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

      <EnemyPlanesInfo enemyPlanes={enemyPlanes} />
    </div>
  );
}

export default PlaneBlockPage;
