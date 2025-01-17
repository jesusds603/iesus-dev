import React, { useEffect, useRef, useState } from "react";
import "katex/dist/katex.min.css";

function Bernoulli() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [p, setP] = useState(0.5);
  const [circles, setCircles] = useState<
    { x: number; y: number; color: string }[]
  >([]);

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(0, Math.min(1, parseFloat(event.target.value)));
    setP(value);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseFloat(event.target.value);
    value = isNaN(value) ? 0 : Math.max(0, Math.min(1, value)); // Limitar el rango entre 0 y 1
    setP(Math.round(value * 100) / 100); // Asegurarse de que solo haya dos decimales
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions to window size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth - 15;
      canvas.height = 500;
    };

    // Initialize canvas size
    resizeCanvas();

    const rows = 10;
    const cols = 10;
    const totalCircles = rows * cols;

    const calculateCircles = () => {
      const circleRadius = Math.min(canvas.width / 20, 10);
      const blueCirclesCount = Math.round(p * totalCircles);
      const newCircles = [];

      for (let i = 0; i < totalCircles; i++) {
        const x =
          Math.floor(i / cols) * (2 * circleRadius) +
          circleRadius +
          (0.5 * canvas.width - 0.5 * rows * 2 * circleRadius); // Coordenada X
        const y = (i % cols) * (2 * circleRadius) + circleRadius; // Coordenada Y
        const color = i < blueCirclesCount ? "blue" : "purple";

        newCircles.push({ x, y, color });
      }

      setCircles(newCircles);
    };

    calculateCircles();

    // Update canvas size on window resize
    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [p]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw circles
      circles.forEach(({ x, y, color }) => {
        const circleRadius = Math.min(
          canvas.width / 20,
          canvas.height / 20,
          10
        );
        ctx.beginPath();
        ctx.arc(x, y, circleRadius, 0, 2 * Math.PI);
        ctx.fillStyle = color;
        ctx.fill();
      });

      // Draw bar chart
      const barWidth = 50;
      const chartHeight = 200;
      const chartX = canvas.width / 2 - barWidth;
      const chartY = canvas.height - chartHeight - 50;

      // Draw y-axis
      ctx.beginPath();
      ctx.moveTo(chartX - 20, chartY);
      ctx.lineTo(chartX - 20, chartY + chartHeight);
      ctx.strokeStyle = "white";
      ctx.stroke();

      // Draw x-axis
      ctx.beginPath();
      ctx.moveTo(chartX - 20, chartY + chartHeight);
      ctx.lineTo(chartX + 2 * barWidth + 20, chartY + chartHeight);
      ctx.stroke();

      // Draw bars
      const bar1Height = chartHeight * p;
      const bar2Height = chartHeight * (1 - p);

      ctx.fillStyle = "blue";
      ctx.fillRect(
        chartX,
        chartY + chartHeight - bar1Height,
        barWidth,
        bar1Height
      );

      ctx.fillStyle = "purple";
      ctx.fillRect(
        chartX + barWidth + 20,
        chartY + chartHeight - bar2Height,
        barWidth,
        bar2Height
      );

      // Draw labels
      ctx.fillStyle = "white";
      ctx.font = "16px Arial";
      ctx.fillText("0", chartX + barWidth / 2 - 5, chartY + chartHeight + 20);
      ctx.fillText(
        "1",
        chartX + (3 * barWidth) / 2 + 15,
        chartY + chartHeight + 20
      );
      ctx.fillText("X", chartX + barWidth / 2 + 30, chartY + chartHeight + 40);

      // Draw y-axis labels
      for (let i = 0; i <= 1; i += 0.1) {
        const y = chartY + chartHeight - i * chartHeight;
        ctx.fillText(i.toFixed(1), chartX - 50, y + 5);
      }
      ctx.fillText("p", chartX - 80, chartY + 0.5 * chartHeight);
    };

    draw();
  }, [circles, p]);

  return (
    <div>
      <h1>Bernoulli</h1>

      {/* Input y Slider para manejar la variable p */}
      <div className="mb-4">
        <input
          type="number"
          value={p}
          onChange={handleInputChange}
          step="0.01"
          min="0"
          max="1"
          className="border p-2 mr-2 text-black bg-fuchsia-400"
          style={{ width: "80px" }}
        />
        <input
          type="range"
          value={p}
          onChange={handleSliderChange}
          step="0.01"
          min="0"
          max="1"
          className="border"
          style={{ width: "200px" }}
        />
        <span>{p}</span>
      </div>

      {/* Canvas */}
      <canvas ref={canvasRef} className="border border-gray-300 bg-black" />
    </div>
  );
}

export default Bernoulli;
