import React, { useEffect, useRef, useState } from "react";
import "katex/dist/katex.min.css";
import { InlineMath } from "react-katex";
import { useLanguage } from "@/hooks/useLanguage";
import { FaPlay, FaStop } from "react-icons/fa";
import { IoReload } from "react-icons/io5";

function Binomial() {
  const { myLanguage } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [n, setN] = useState(10);
  const [p, setP] = useState(0.5);
  const [obstacles, setObstacles] = useState<
    { x: number; y: number; color: string }[]
  >([]);
  const spaceXObs = 30;
  const spaceYObs = 35;
  const radiusObs = 3;
  const slopeVert = (0.5 * spaceXObs + radiusObs) / (spaceYObs + 2 * radiusObs);
  const maxObs = 10;
  const startY = 100;
  const [amountBalls, setAmountBalls] = useState<number>(n * 10);
  type Ball = {
    id: number;
    x: number;
    y: number;
    path: number[];
    active: boolean;
    isInBars: boolean;
  };
  const [balls, setBalls] = useState<Ball[]>([]);
  const radiusBalls = 6;
  const speedBalls = 5;
  const linesHeight = 300;
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isPaused, setisPaused] = useState<boolean>(false);
  const [animationId, setAnimationId] = useState<number | null>(null);
  const startBallsY = 10; // Posición inicial de las bolas (600 unidades hacia abajo)
  const interval = 100; // Tiempo entre bolas (100ms)
  const handleEndBallsY = (n: number) => {
    return startY + (n + 1) * (2 * radiusObs + spaceYObs) + linesHeight;
  };
  const [endBallsY, setEndBallsY] = useState<number>(handleEndBallsY(n)); // Posición final
  // const [lastTimestamp, setLastTimestamp] = useState<number | null>(null);
  const [barsWithBalls, setBarsWithBalls] = useState<number[][]>(
    Array.from({ length: n + 1 }, () => [])
  ); // ids de las bolas en cada barra
  // const [ballIsInBars, setBallsIsInBar] = useState<boolean[]>([]);

  const handleAmountBalls = (value: number) => {
    return value * 5;
  };

  const handleSliderPChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(0, Math.min(1, parseFloat(event.target.value)));
    setP(value);
  };

  const handleInputPChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseFloat(event.target.value);
    value = isNaN(value) ? 0 : Math.max(0, Math.min(1, value)); // Limitar el rango entre 0 y 1
    setP(Math.round(value * 100) / 100); // Asegurarse de que solo haya dos decimales
  };

  const handleSliderNChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(0, Math.min(maxObs, parseInt(event.target.value)));
    setN(value);
    setAmountBalls(handleAmountBalls(value));
    setEndBallsY(handleEndBallsY(value));
    setBarsWithBalls(() => Array.from({ length: value + 1 }, () => []));
  };

  const handleInputNChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(event.target.value);
    value = isNaN(value) ? 0 : Math.max(0, Math.min(maxObs, value)); // Limitar el rango entre 0 y 1
    setN(value); // Asegurarse de que solo haya dos decimales
    setAmountBalls(handleAmountBalls(value));
    setEndBallsY(handleEndBallsY(value));
    setBarsWithBalls(() => Array.from({ length: value + 1 }, () => []));
  };

  useEffect(() => {
    if (isPlaying && !isPaused) {
      const id = requestAnimationFrame(animate);
      setAnimationId(id);
    }
    return () => {
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [isPlaying, isPaused]);

  const calculateObstacles = () => {
    const newObstacles: { x: number; y: number; color: string }[] = [];
    const startX = canvasRef.current?.width ? canvasRef.current.width / 2 : 0;

    for (let row = 0; row < n; row++) {
      for (let col = 0; col <= row; col++) {
        const x =
          startX -
          0.5 * row * (radiusObs * 2 + spaceXObs) +
          col * (radiusObs * 2 + spaceXObs);
        const y = startY + row * (radiusObs * 2 + spaceYObs);
        newObstacles.push({ x, y, color: "#08b8a9" });
      }
    }
    setObstacles(newObstacles);
  };

  const initializeBalls = () => {
    const newBalls: Ball[] = [];
    const startX = canvasRef.current?.width ? canvasRef.current.width / 2 : 0;

    for (let i = 0; i < amountBalls; i++) {
      const path = Array.from({ length: n }, () => Math.random());
      newBalls.push({
        id: i,
        x: startX,
        y: startBallsY,
        path,
        active: false,
        isInBars: false,
      });
    }

    setBalls(newBalls);
  };

  const animate = () => {
    const startBarsX = canvasRef.current?.width
      ? canvasRef.current.width / 2 -
        0.5 * (n + 1) * (2 * radiusObs + spaceXObs)
      : 0;

    setBalls((prevBalls) =>
      prevBalls.map((ball) => {
        if (!ball.active) return ball; // Si no está activa, no la muevas.

        // Mover la bola hacia abajo.
        let newY = ball.y + speedBalls; // Velocidad vertical.
        let newX = ball.x;
        let isAtEnd = false;

        for (let i = 0; i < n; i++) {
          if (
            ball.y > startY + i * (2 * radiusObs + spaceYObs) &&
            ball.y < startY + (i + 1) * (2 * radiusObs + spaceYObs)
          ) {
            const direction = ball.path[i] < p ? 1 : -1;
            newX += direction * (slopeVert * speedBalls);
          }
        }

        if (ball.y > startY + n * (2 * radiusObs + spaceYObs) && ball.active) {
          const barNum = Math.floor(
            (ball.x - startBarsX) / (2 * radiusObs + spaceXObs)
          );

          const endBallY =
            endBallsY - barsWithBalls[barNum].length * (1 * radiusBalls);
          isAtEnd = newY >= endBallY;

          if (!barsWithBalls[barNum].includes(ball.id) && isAtEnd) {
            setBarsWithBalls((prevBarsWithBalls) => {
              // Copiar el estado actual
              const newBarsWithBalls = [...prevBarsWithBalls];

              // Verificar si la bola ya está en la barra
              if (!newBarsWithBalls[barNum].includes(ball.id)) {
                newBarsWithBalls[barNum].push(ball.id); // Agregar la bola a la barra
              }

              return newBarsWithBalls; // Retornar el nuevo estado
            });
          }
        }

        // Desactivar la bola si llega al final.
        return { ...ball, x: newX, y: newY, active: !isAtEnd };
      })
    );

    setAnimationId(requestAnimationFrame(animate));
    // console.log(animationId);
  };

  const startAnimation = () => {
    // if (animationId) return;
    initializeBalls();
    setIsPlaying(true);
    setisPaused(false);
    // animate();

    // Activamos cada bola
    balls.forEach((_, index) => {
      setTimeout(() => {
        setBalls((prevBalls) =>
          prevBalls.map((ball, i) =>
            i === index ? { ...ball, active: true } : ball
          )
        );
      }, index * interval);
    });
  };

  const pauseAnimation = () => {
    if (animationId) {
      cancelAnimationFrame(animationId);
    }

    setisPaused(true);
  };

  const stopAnimation = () => {
    pauseAnimation();
    if (animationId) {
      setAnimationId(null);
    }
    setIsPlaying(false);
    initializeBalls();
    // setBalls([]);
    setisPaused(false);
  };

  // Calculate obstacles positions for the pyramid
  useEffect(() => {
    calculateObstacles();
    initializeBalls();
    setIsPlaying(false);
    setisPaused(false);
    console.log(barsWithBalls);
    stopAnimation();
  }, [n, p]);

  const continueAnimation = () => {
    setisPaused(false);
    // setLastTimestamp(null);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions to window size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth - 15;
      canvas.height = 800 + n * (spaceYObs + 2 * radiusObs);
    };

    // Initialize canvas size
    resizeCanvas();

    // Update canvas size on window resize
    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [p, n]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      const startX = canvasRef.current?.width ? canvasRef.current.width / 2 : 0;
      const rowLabelsY = endBallsY - linesHeight;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw the upper of the piramid
      ctx.beginPath();
      ctx.moveTo(startX - 0.5 * spaceXObs, startY - spaceYObs);
      ctx.lineTo(
        startX - 3 * (2 * radiusObs + spaceXObs),
        startY - 3 * (2 * radiusObs + spaceYObs)
      );
      ctx.strokeStyle = "white";
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(startX + 0.5 * spaceXObs, startY - spaceYObs);
      ctx.lineTo(
        startX + 3 * (2 * radiusObs + spaceXObs),
        startY - 3 * (2 * radiusObs + spaceYObs)
      );
      ctx.strokeStyle = "white";
      ctx.stroke();

      // Draw the pyramid circles
      obstacles.forEach(({ x, y, color }) => {
        ctx.beginPath();
        ctx.arc(x, y, radiusObs, 0, 2 * Math.PI);
        ctx.fillStyle = color;
        ctx.fill();
      });

      // Draw balls
      balls.forEach((ball) => {
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, radiusBalls, 0, 2 * Math.PI);
        ctx.fillStyle = "red";
        ctx.fill();
      });

      // Draw X values
      ctx.fillStyle = "white";
      ctx.font = "16px Arial";
      ctx.fillText(
        "X =",
        startX - 0.5 * (n + 3) * (2 * radiusObs + spaceXObs),
        rowLabelsY
      );

      for (let i = 0; i <= n; i++) {
        ctx.fillText(
          i.toString(),
          startX -
            0.5 * n * (2 * radiusObs + spaceXObs) -
            2 * radiusObs +
            i * (2 * radiusObs + spaceXObs),
          rowLabelsY
        );
      }

      // Draw vertical separators
      for (let i = 0; i <= n + 1; i++) {
        const x =
          startX -
          0.5 * (n + 1) * (2 * radiusObs + spaceXObs) +
          i * (2 * radiusObs + spaceXObs);
        const y = startY + (n + 1) * (2 * radiusObs + spaceYObs);
        const init = [x, y];
        const end = [x, y + linesHeight];

        ctx.beginPath();
        ctx.moveTo(init[0], init[1]);
        ctx.lineTo(end[0], end[1]);
        ctx.strokeStyle = "white";
        ctx.stroke();
      }
      //Draw horizontal line
      ctx.beginPath();
      ctx.moveTo(
        startX - 0.5 * (n + 1) * (2 * radiusObs + spaceXObs),
        startY + (n + 1) * (2 * radiusObs + spaceYObs) + linesHeight
      );
      ctx.lineTo(
        startX + 0.5 * (n + 1) * (2 * radiusObs + spaceXObs),
        startY + (n + 1) * (2 * radiusObs + spaceYObs) + linesHeight
      );
      ctx.strokeStyle = "white";
      ctx.stroke();

      // Draw bar chart
      const barWidth = spaceXObs;
      const chartHeight = 200;
      const chartX = startX - 0.5 * (n + 1) * (2 * radiusObs + spaceXObs);
      const chartY =
        startY + (n + 2) * (2 * radiusObs + spaceYObs) + linesHeight;

      // Draw y-axis
      ctx.beginPath();
      ctx.moveTo(chartX - 20, chartY);
      ctx.lineTo(chartX - 20, chartY + chartHeight);
      ctx.strokeStyle = "white";
      ctx.stroke();

      // Draw x-axis
      ctx.beginPath();
      ctx.moveTo(chartX - 20, chartY + chartHeight);
      ctx.lineTo(
        chartX + (n + 2) * (2 + radiusObs + spaceXObs),
        chartY + chartHeight
      );
      ctx.stroke();

      // Calculate and draw bars
      const binomialCoefficient = (n: number, k: number) => {
        if (k === 0 || k === n) return 1;
        let coeff = 1;
        for (let i = 1; i <= k; i++) {
          coeff = (coeff * (n - i + 1)) / i;
        }
        return coeff;
      };

      for (let k = 0; k <= n; k++) {
        const probability =
          binomialCoefficient(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k);
        const barHeight = chartHeight * probability;

        ctx.fillStyle = `rgb(${Math.floor(
          255 * (1 - probability)
        )}, 0, ${Math.floor(255 * probability)})`;
        ctx.fillRect(
          chartX + k * (barWidth + 2 * radiusObs),
          chartY + chartHeight - barHeight,
          barWidth,
          barHeight
        );

        // Draw labels
        ctx.fillStyle = "white";
        ctx.font = "12px Arial";
        ctx.fillText(
          k.toString(),
          chartX + k * (barWidth + 2 * radiusObs) + 0.5 * barWidth,
          chartY + chartHeight + 20
        );
      }

      // Draw y-axis labels
      for (let i = 0; i <= 1; i += 0.1) {
        const y = chartY + chartHeight - i * chartHeight;
        ctx.fillText(i.toFixed(1), chartX - 50, y + 5);
      }
      ctx.fillText("P(X=x)", chartX - 100, chartY + 0.5 * chartHeight);
      ctx.fillText("x", startX, chartY + 1.2 * chartHeight);

      if (isPlaying && !isPaused) {
        requestAnimationFrame(draw);
      }
    };

    draw();
  }, [
    p,
    obstacles,
    radiusObs,
    isPlaying,
    balls,
    isPaused,
    barsWithBalls,
    animationId,
    endBallsY,
  ]);

  return (
    <div>
      <div className="p-4">
        {myLanguage === "eng" ? (
          <>
            <p>
              This animation consists of a pyramid with <InlineMath math="n" />{" "}
              rows, each containing obstacles. These obstacles cause the ball,
              when it hits them, to move to the left (failure) with a
              probability of <InlineMath math="1-p" /> or to the right (success)
              with a probability of <InlineMath math="p" />.
            </p>
            <p>
              In this way, the values of <InlineMath math="X=0,1,\ldots,n" />{" "}
              represent the number of successes obtained, that is, the number of
              times the ball moved to the right.
            </p>
            <p>(You might need to reload the page for each animation)</p>
          </>
        ) : (
          <>
            <p>
              Esta animación consiste de una pirámide de <InlineMath math="n" />{" "}
              filas, donde cada una de ellas tiene obstáculos. Estos obstáculos
              provocan que cuando una pelota las toque, la probabilidad de que
              dicha pelota se mueva a la izquierda (fracaso) es{" "}
              <InlineMath math="1-p" /> y de que se mueva a la derecha (éxito)
              es <InlineMath math="p" />.
            </p>
            <p>
              De esta forma los valores de <InlineMath math="X=0,1,\ldots,n" />{" "}
              representan la cantidad de éxitos obtenidos, es decir, la cantidad
              de veces que la pelota se movió a la derecha.
            </p>
            <p>
              (Es probable que necesites recargar la página para cada animación)
            </p>
          </>
        )}
      </div>

      {/* Input y Slider para manejar las variables n p */}
      <div className="mb-4 flex flex-col">
        <div className="">
          <input
            type="number"
            value={p}
            onChange={handleInputPChange}
            step="0.01"
            min="0"
            max="1"
            className="border p-2 mr-2 text-black bg-fuchsia-400"
            style={{ width: "80px" }}
          />
          <input
            type="range"
            value={p}
            onChange={handleSliderPChange}
            step="0.01"
            min="0"
            max="1"
            className="border"
            style={{ width: "200px" }}
          />
          <span>
            <InlineMath math="p = " /> {p}
          </span>
        </div>

        <div>
          <input
            type="number"
            value={n}
            onChange={handleInputNChange}
            step="1"
            min="0"
            max={maxObs}
            className="border p-2 mr-2 text-black bg-fuchsia-400"
            style={{ width: "80px" }}
          />
          <input
            type="range"
            value={n}
            onChange={handleSliderNChange}
            step="1"
            min="0"
            max={maxObs}
            className="border"
            style={{ width: "200px" }}
          />
          <span>
            <InlineMath math="n = " /> {n}
          </span>
        </div>

        <div className="mt-4 flex items-center justify-center">
          {!isPlaying && (
            <button
              onClick={startAnimation}
              className="flex items-center justify-center w-12 h-12 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-all duration-200"
            >
              <FaPlay />
            </button>
          )}
          {/* {isPlaying && isPaused && (
            <button onClick={continueAnimation}>Continue</button>
          )} */}
          {isPlaying && !isPaused && (
            <div>
              {/* <button onClick={pauseAnimation}>Pause</button> */}
              <button
                onClick={stopAnimation}
                className="flex items-center justify-center w-12 h-12 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-all duration-200"
              >
                <FaStop />
              </button>
            </div>
          )}
          <button
            onClick={() => window.location.reload()}
            className="flex items-center justify-center w-12 h-12 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-all duration-200"
          >
            <IoReload />
          </button>
        </div>
      </div>

      {/* Canvas */}
      <canvas ref={canvasRef} className="border border-gray-300 bg-black" />
    </div>
  );
}

export default Binomial;
