import { useStorage } from "@/storage";
import type { Brick } from "@/functions/createBricksGrid";
import { Shape, Vector2 } from "three";
import { useMemo } from "react";

export const BricksGrid = ({ bricks }: { bricks: Brick[] }) => {
  const colors = useStorage((state) => state.config.game.brick.colors);
  const brickConf = useStorage((state) => state.config.game.brick);

  const shape = useMemo(
    () =>
      new Shape([
        new Vector2(0, 0),
        new Vector2(0, 1),
        new Vector2(brickConf.args[1] - brickConf.bevel.size * 2, 1),
        new Vector2(brickConf.args[1] - brickConf.bevel.size * 2, 0),
        new Vector2(0, 0),
      ]),

    [brickConf.args],
  );

  const extrudeSettings = {
    steps: 1,
    depth: brickConf.args[0] - brickConf.bevel.thickness * 2,
    bevelEnabled: true,
    bevelThickness: brickConf.bevel.thickness,
    bevelSize: brickConf.bevel.size,
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
                brick.position[0] -
                  brick.args[0] / 2 +
                  brickConf.bevel.thickness,
                brick.position[1] - brick.args[1] / 2,
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
          ),
      )}
    </>
  );
};
