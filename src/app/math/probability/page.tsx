"use client";
import React, { useState } from "react";
import { Distribution } from "@/components/Probability/constants";
import Descriptions from "@/components/Probability/Descriptions";
import Bernoulli from "@/components/Probability/Bernoulli";
import Binomial from "@/components/Probability/Binomial";

function Page() {
  const [selected, setSelected] = useState<Distribution>("Binomial");

  const renderSelectedComponent = () => {
    switch (selected) {
      case "Bernoulli":
        return <Bernoulli />;
      case "Binomial":
        return <Binomial />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <h1 className="text-2xl font-bold font-sans text-center">
        Probability Distributions
      </h1>

      {/* Horizontal Menu */}
      <div className="flex space-x-4 p-4 overflow-x-auto">
        {["Bernoulli", "Binomial"].map((key) => (
          <button
            key={key}
            onClick={() => setSelected(key as Distribution)}
            className={`px-4 py-2 rounded-md font-semibold transition-colors ${
              selected === key
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-black hover:bg-gray-300"
            }`}
          >
            {key}
          </button>
        ))}
      </div>

      {/* Description Display */}
      <div className="flex-grow p-6">
        <Descriptions distribution={selected} />
      </div>

      <hr />
      {/* Render Selected Component */}
      <div className="mt-4">{renderSelectedComponent()}</div>
    </div>
  );
}

export default Page;
