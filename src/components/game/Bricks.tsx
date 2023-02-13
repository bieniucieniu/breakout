import { Color } from "@react-three/fiber";
import { useBox } from "@react-three/p2";
import { useStorage } from "../../hooks/useStorage";
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

  const bricks = coords.map((coords) => ({
    args: brickSize || [1, 1, 1],
    position: coords,
    name: `brick-${coords[0]}-${coords[1]}`,
    points: maxPoints || 1,
  }));

  return bricks;
};

const Brick = ({
  args,
  position,
  material,
  color,
}: {
  args: [number, number, number?];
  position: [number, number];
  material?: p2.Material;
  color?: Color;
}) => {
  const [ref, api] = useBox(() => ({
    type: "Kinematic",
    args: [args[0], args[1]],
    position,
    material,
  }));
  return (
    // @ts-expect-error
    <mesh ref={ref}>
      <boxBufferGeometry args={args} />
      <meshStandardMaterial color={color || "hotpink"} />
    </mesh>
  );
};

export const BricksGrid = ({
  bricks,
  material,
  maxPoints = 1,
}: {
  bricks: Brick[];
  material?: p2.Material;
  maxPoints?: number;
}) => {
  const { colors } = useStorage((state) => ({
    colors: state.config.game.brick.colors,
  }));

  return (
    <>
      {bricks.map((brick, i) => (
        <Brick
          key={i}
          {...brick}
          material={material}
          color={colors[i % colors.length]}
        />
      ))}
    </>
  );
};
