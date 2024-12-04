import React from "react";

interface GridOrientationToggleProps {
  isGridHorizontal: boolean;
  onToggle: () => void;
}

const GridOrientationToggle: React.FC<GridOrientationToggleProps> = ({
  isGridHorizontal,
  onToggle,
}) => {
  return (
    <button
      onClick={onToggle}
      className="my-2 p-2 bg-blue-500 text-white rounded"
    >
      Cambiar a modo {isGridHorizontal ? "Vertical" : "Horizontal"}
    </button>
  );
};

export default GridOrientationToggle;
