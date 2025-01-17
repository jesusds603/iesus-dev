import { useEffect, useRef, useState } from "react";

const NegativeBinomial: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [positions, setPositions] = useState(
    Array.from({ length: 10 }, (_, i) => ({
      x: 250, // Mitad del canvas
      y: 20,
      offset: i * 20, // Para separar las bolas en el eje x
    }))
  );
  const [animationId, setAnimationId] = useState<number | null>(null);

  const startAnimation = () => {
    const animate = () => {
      setPositions((prevPositions) =>
        prevPositions.map((ball) => {
          const nextY = Math.min(ball.y + 2, 600); // Movimiento hacia abajo
          const sinusoidalX = 250 + Math.sin((nextY + ball.offset) * 0.05) * 50;
          return { ...ball, y: nextY, x: sinusoidalX };
        })
      );

      const id = requestAnimationFrame(animate);
      setAnimationId(id);
    };

    animate();
  };

  const pauseAnimation = () => {
    if (animationId) {
      cancelAnimationFrame(animationId);
      setAnimationId(null);
    }
  };

  const stopAnimation = () => {
    pauseAnimation();
    setPositions(
      Array.from({ length: 10 }, (_, i) => ({
        x: 250, // Mitad del canvas
        y: 20,
        offset: i * 20,
      }))
    );
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    context.clearRect(0, 0, canvas.width, canvas.height);

    positions.forEach((ball) => {
      context.beginPath();
      context.arc(ball.x, ball.y, 10, 0, Math.PI * 2);
      context.fillStyle = "blue";
      context.fill();
      context.closePath();
    });
  }, [positions]);

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={500}
        height={600}
        style={{ border: "1px solid black" }}
      />
      <div style={{ marginTop: "10px" }}>
        {animationId === null && <button onClick={startAnimation}>Play</button>}
        {animationId !== null && (
          <button onClick={pauseAnimation}>Pause</button>
        )}
        <button onClick={stopAnimation}>Stop</button>
      </div>
    </div>
  );
};

export default NegativeBinomial;
