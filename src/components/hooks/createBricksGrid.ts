export type Brick = {
  name: string;
  args: [number, number, number?];
  position: [number, number];
  points?: number;
};

export const createCoordsGrid = ({
  gridSize,
  args,
  position,
}: {
  gridSize: [columns: number, rows: number];
  args: [width: number, height: number];
  position?: [number, number];
}): [number, number][] => {
  const [columns, rows] = gridSize;
  const [width, height] = args;
  const cords: [number, number][] = [];
  const xStep = width / columns;
  const yStep = height / rows;
  const [x, y] = position || [0, 0];

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      cords.push([
        x - width / 2 + xStep / 2 + j * xStep,
        y - height / 2 + yStep / 2 + i * yStep,
      ]);
    }
  }

  return cords;
};

export const createBricksGrid = ({
  gridSize,
  args,
  position,
  brickSize,
  maxPoints,
}: {
  gridSize: [columns: number, rows: number];
  args: [width: number, height: number];
  position?: [x: number, y: number];
  brickSize?: [width: number, height: number, depth?: number];
  maxPoints?: number;
}): Brick[] => {
  const coords = createCoordsGrid({
    gridSize,
    args,
    position,
  });

  const bricks = coords.map((coords, i) => ({
    args: brickSize || [1, 1, 1],
    position: coords,
    name: `brick[${coords[0].toFixed(2)},${coords[1].toFixed(2)}]`,
    points: maxPoints ? (i % maxPoints) + 1 : 1,
  }));

  return bricks;
};
