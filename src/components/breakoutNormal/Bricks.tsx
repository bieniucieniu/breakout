import { Color } from "@react-three/fiber";
import { useStorage } from "../../storage";
import type { Brick } from "../../functions/createBricksGrid";

const Brick = ({
  args,
  position,
  color,
  name,
}: {
  args: [number, number, number?];
  position: [number, number];
  color?: Color;
  name?: string;
}) => {
  return (
    <mesh name={name} position={[...position, 0]}>
      <boxGeometry args={args} />
      <meshToonMaterial color={color || "hotpink"} />
    </mesh>
  );
};

export const BricksGrid = ({ bricks }: { bricks: Brick[] }) => {
  const colors = useStorage((state) => state.config.game.brick.colors);

  return (
    <>
      {bricks.map(
        (brick) =>
          brick.points > 0 && (
            <Brick
              {...brick}
              color={colors[brick.points ? brick.points - 1 : 0]}
            />
          )
      )}
    </>
  );
};
