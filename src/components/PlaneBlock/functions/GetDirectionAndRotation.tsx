type Direction = "x+" | "x-" | "y+" | "y-";

// Function to rotate the direction randomly
export const getRandomDirection = (): Direction => {
  const directions: Direction[] = ["x+", "x-", "y+", "y-"];
  return directions[Math.floor(Math.random() * directions.length)];
};

export const getRotation = (direction: Direction): string => {
  switch (direction) {
    case "x+":
      return "rotate(90deg)";
    case "x-":
      return "rotate(270deg)";
    case "y+":
      return "rotate(0deg)";
    case "y-":
      return "rotate(180deg)";
    default:
      return "rotate(0deg)";
  }
};
