"use client";
import React, { Fragment, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useLanguage } from "@/hooks/useLanguage";
import { useTheme } from "@/hooks/useTheme";
import "tailwindcss/tailwind.css";
import Head from "next/head";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const isPrime = (n: number, primes: number[]): boolean => {
  if (n <= 1) return false;
  const limit = Math.sqrt(n);
  for (const prime of primes) {
    if (prime > limit) break; // No necesitamos verificar más allá de la raíz cuadrada
    if (n % prime === 0) return false;
  }
  return true;
};

const generatePrimesUpTo = (limit: number): number[] => {
  const primes: number[] = [];
  for (let num = 2; num <= limit; num++) {
    if (isPrime(num, primes)) {
      primes.push(num);
    }
  }
  return primes;
};

const generateFirstNPrimes = (count: number): number[] => {
  const primes: number[] = [];
  let num = 2; // Comenzar a verificar primos desde 2
  while (primes.length < count) {
    if (isPrime(num, primes)) {
      primes.push(num);
    }
    num++;
  }
  return primes;
};

const Page: React.FC = () => {
  const { myTheme } = useTheme();
  const { myLanguage } = useLanguage();
  const [upperLimit, setUpperLimit] = useState<number>(10);
  const [countPrimes, setCountPrimes] = useState<number>(5);
  const [primesUpTo, setPrimesUpTo] = useState<number[]>([]);
  const [firstNPrimes, setFirstNPrimes] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleCalculateUpTo = () => {
    if (upperLimit < 1) {
      setError(
        myLanguage === "eng"
          ? "Enter a number greater than 0."
          : "Ingrese un número mayor que 0."
      );
      setPrimesUpTo([]);
      return;
    }

    setError(null);
    const primes = generatePrimesUpTo(upperLimit);
    setPrimesUpTo(primes);
    setFirstNPrimes([]); // Clear the other results
  };

  const handleCalculateCount = () => {
    if (countPrimes < 1) {
      setError(
        myLanguage === "eng"
          ? "Enter a count greater than 0."
          : "Ingrese una cantidad mayor que 0."
      );
      setFirstNPrimes([]);
      return;
    }

    setError(null);
    const primes = generateFirstNPrimes(countPrimes);
    setFirstNPrimes(primes);
    setPrimesUpTo([]); // Clear the other results
  };

  const themeClasses =
    myTheme === "dark" ? "bg-gray-800 text-white" : "bg-gray-100 text-black";
  const borderClasses =
    myTheme === "dark" ? "border-teal-400" : "border-gray-400";
  const buttonClasses =
    myTheme === "dark" ? "bg-teal-400 text-white" : "bg-teal-700 text-white";

  const tableData = primesUpTo.length > 0 ? primesUpTo : firstNPrimes;

  const chartData = {
    labels: Array.from({ length: tableData.length }, (_, i) => i + 1),
    datasets: [
      {
        label: myLanguage === "eng" ? "Primes" : "Primos",
        data: tableData,
        borderColor:
          myTheme === "dark"
            ? "rgba(54, 162, 235, 0.6)"
            : "rgba(54, 162, 235, 1)",
        backgroundColor:
          myTheme === "dark"
            ? "rgba(54, 162, 235, 0.5)"
            : "rgba(234, 180, 247, 1)",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: myLanguage === "eng" ? "Index" : "Índice",
          color: myTheme === "dark" ? "#ffffff" : "#000000",
        },
      },
      y: {
        title: {
          display: true,
          text: myLanguage === "eng" ? "Prime Numbers" : "Números Primos",
          color: myTheme === "dark" ? "#ffffff" : "#000000",
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: myTheme === "dark" ? "#ffffff" : "#000000",
        },
      },
    },
  };

  return (
    <Fragment>
      <Head>
        <title>Prime Numbers - Iesus Dev</title>
        <meta
          name="description"
          content="Explore prime numbers interactively. Generate prime numbers up to a limit or find the first N primes with visual charts and tables."
        />
        <meta
          name="keywords"
          content="Prime Numbers, Mathematics, Primes, Charts, Graphs, Visualization, Iesus Dev"
        />
        <meta
          property="og:title"
          content="Prime Numbers - Interactive Visualization"
        />
        <meta
          property="og:description"
          content="An interactive way to explore prime numbers using charts and tables. Learn about prime sequences and their distribution visually."
        />
        <meta property="og:image" content="/primes.png" />
        <meta property="og:type" content="article" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className={`container mx-auto p-4 ${themeClasses} w-full`}>
        <h1 className="text-3xl font-bold text-center mb-4">
          {myLanguage === "eng"
            ? "Prime Number Generator"
            : "Generador de Números Primos"}
        </h1>

        <div className="flex flex-col items-center mb-4">
          <div className="flex space-x-2 mb-4">
            <input
              type="number"
              className={`p-2 border ${borderClasses} rounded ${themeClasses} w-full`}
              placeholder={
                myLanguage === "eng"
                  ? "Enter upper limit"
                  : "Ingrese límite superior"
              }
              value={upperLimit}
              onChange={(e) => setUpperLimit(Number(e.target.value))}
            />
            <button
              className={`${buttonClasses} p-2 rounded`}
              onClick={handleCalculateUpTo}
            >
              {myLanguage === "eng" ? "Generate Up To" : "Generar Hasta"}
            </button>
          </div>

          <div className="flex space-x-2">
            <input
              type="number"
              className={`p-2 border ${borderClasses} rounded ${themeClasses} w-full`}
              placeholder={
                myLanguage === "eng"
                  ? "Enter number of primes"
                  : "Ingrese número de primos"
              }
              value={countPrimes}
              onChange={(e) => setCountPrimes(Number(e.target.value))}
            />
            <button
              className={`${buttonClasses} p-2 rounded`}
              onClick={handleCalculateCount}
            >
              {myLanguage === "eng" ? "Generate First N" : "Generar Primeros N"}
            </button>
          </div>
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <div className="mt-4">
          <h2 className="text-xl font-bold text-center">
            {myLanguage === "eng" ? "Results" : "Resultados"}
          </h2>

          <div className="mt-4" style={{ height: "400px" }}>
            <Line data={chartData} options={chartOptions} />
          </div>

          {tableData.length > 0 && (
            <table className="min-w-full border border-gray-300 mt-2">
              <thead>
                <tr>
                  <th className={`border ${borderClasses} p-2`}>
                    {myLanguage === "eng" ? "Index" : "Índice"}
                  </th>
                  <th className={`border ${borderClasses} p-2`}>
                    {myLanguage === "eng" ? "Prime Number" : "Número Primo"}
                  </th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((prime, index) => (
                  <tr key={index}>
                    <td className={`border ${borderClasses} p-2`}>
                      {index + 1}
                    </td>
                    <td className={`border ${borderClasses} p-2`}>{prime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Page;
