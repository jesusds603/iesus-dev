import Box from "./Box";

function RenderLetter({
  positions,
  xOffset,
  yOffset,
  colorBox,
}: {
  positions: [number, number, number][];
  xOffset: number;
  yOffset: number;
  colorBox: [string, string];
}) {
  return (
    <>
      {positions.map((pos, index) => (
        <Box
          key={index}
          position={[pos[0] + xOffset, pos[1] + yOffset, pos[2]]}
          colorBox={colorBox}
        />
      ))}
    </>
  );
}

export default RenderLetter;
