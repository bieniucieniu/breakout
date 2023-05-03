import { useStorage } from "../../storage";
import type { Brick } from "../../functions/createBricksGrid";

export const BricksGrid = ({ bricks }: { bricks: Brick[] }) => {
  const colors = useStorage((state) => state.config.game.brick.colors);

  return (
    <>
      {bricks.map(
        (brick) =>
          brick.points > 0 && (
            <mesh
              name={brick.name}
              position={[...brick.position, 0]}
              key={brick.key}
            >
              <boxGeometry args={brick.args} />
              <meshToonMaterial
                color={colors[brick.points ? brick.points - 1 : 0]}
              />
            </mesh>
          )
      )}
    </>
  );
};
