import React from "react";
import { useLanguage } from "@/hooks/useLanguage";

interface GridOrientationToggleProps {
  isGridHorizontal: boolean;
  onToggle: () => void;
}

const GridOrientationToggle: React.FC<GridOrientationToggleProps> = ({
  isGridHorizontal,
  onToggle,
}) => {
  const { myLanguage } = useLanguage();

  return (
    <button
      onClick={onToggle}
      className="my-2 p-2 bg-blue-500 text-white rounded"
    >
      {myLanguage === "eng"
        ? `Change to mode ${isGridHorizontal ? "Vertical" : "Horizontal"}`
        : `Cambiar a modo ${isGridHorizontal ? "Vertical" : "Horizontal"}`}
    </button>
  );
};

export default GridOrientationToggle;
