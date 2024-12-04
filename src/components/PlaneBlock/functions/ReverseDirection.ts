import { Direction } from "../constants";

// Function to choose a random new direction that is not the opposite
export const reverseDirection = (direction: Direction): Direction => {
  const directions: { [key in Direction]: Direction[] } = {
    "x+": ["x-", "y+", "y-"],
    "x-": ["x+", "y+", "y-"],
    "y+": ["y-", "x+", "x-"],
    "y-": ["y+", "x+", "x-"],
  };

  // Get an array of possible directions excluding the opposite
  const possibleDirections = directions[direction];

  // Randomly select one of the possible directions
  const randomIndex = Math.floor(Math.random() * possibleDirections.length);
  return possibleDirections[randomIndex];
};

// Function to reverse the direction of a plane (rotate 180 degrees)
// export const reverseDirection = (direction: Direction): Direction => {
//   switch (direction) {
//     case "x+":
//       return "x-";
//     case "x-":
//       return "x+";
//     case "y+":
//       return "y-";
//     case "y-":
//       return "y+";
//     default:
//       return direction;
//   }
// };
