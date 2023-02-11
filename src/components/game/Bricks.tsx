import { useBox } from "@react-three/p2";
import { Brick } from "../../types";

export const createCoordsGrid = ({
  gridSize,
  args,
  position,
}: {
  gridSize: [rows: number, columns: number];
  args: [width: number, height: number];
  position?: [number, number];
}): [number, number][] => {
  const [rows, columns] = gridSize;
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
}: {
  gridSize: [rows: number, columns: number];
  args: [width: number, height: number];
  position?: [number, number];
  brickSize?: [number, number];
}): Brick[] => {
  const coords = createCoordsGrid({
    gridSize,
    args,
    position,
  });

  const bricks = coords.map((coords) => ({
    args: brickSize || [1, 1],
    position: coords,
    name: `brick-${coords[0]}-${coords[1]}`,
  }));

  return bricks;
};

const Brick = ({
  args,
  position,
  material,
}: {
  args: [number, number];
  position: [number, number];
  material?: p2.Material;
}) => {
  const [ref, api] = useBox(() => ({
    mass: 0,
    args,
    position,
    material,
  }));
  return (
    // @ts-expect-error
    <mesh ref={ref}>
      <boxBufferGeometry args={args} />
      <meshStandardMaterial color="hotpink" />
    </mesh>
  );
};

export const BricksGrid = ({
  bricks,
  material,
}: {
  bricks: Brick[];
  material?: p2.Material;
}) => {
  return (
    <>
      {bricks.map((brick, i) => (
        <Brick key={i} {...brick} material={material} />
      ))}
    </>
  );
};
