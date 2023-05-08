import { useStorage } from "../../storage";
import type { Brick } from "../../functions/createBricksGrid";
import { Shape, Vector2 } from "three";
import { useMemo } from "react";

export const BricksGrid = ({ bricks }: { bricks: Brick[] }) => {
  const colors = useStorage((state) => state.config.game.brick.colors);
  const args = useStorage((state) => state.config.game.brick.args);

  const shape = useMemo(
    () =>
      new Shape([
        new Vector2(0, 0),
        new Vector2(0, 1),
        new Vector2(args[1] - 1, 1),
        new Vector2(args[1] - 1, 0),
        new Vector2(0, 0),
      ]),

    [args]
  );

  const extrudeSettings = {
    steps: 1,
    depth: args[0] - 1,
    bevelEnabled: true,
    bevelThickness: 0.5,
    bevelSize: 0.5,
    bevelOffset: 0,
    bevelSegments: 1,
  };

  return (
    <>
      {bricks.map(
        (brick) =>
          brick.points > 0 && (
            <mesh
              name={brick.name}
              position={[
                brick.position[0] - args[0] / 2 + 0.5,
                brick.position[1] - args[1] / 2,
                0,
              ]}
              key={brick.key}
              rotation={[0, Math.PI / 2, Math.PI / 2]}
            >
              {/* <boxGeometry args={brick.args} /> */}
              <extrudeGeometry args={[shape, extrudeSettings]} />
              <meshToonMaterial
                color={colors[brick.points ? brick.points - 1 : 0]}
              />
            </mesh>
          )
      )}
    </>
  );
};
