import { Color } from "@react-three/fiber";
import { useBox } from "@react-three/p2";
import { useStorage } from "../../storage";
import type { Brick } from "../../functions/createBricksGrid";

const Brick = ({
  args,
  position,
  material,
  color,
  name,
}: {
  args: [number, number, number?];
  position: [number, number];
  points: number;
  material?: p2.Material;
  color?: Color;
  name?: string;
}) => {
  const brickHit = useStorage((state) => state.brickHit);

  const [ref] = useBox(() => ({
    type: "Kinematic",
    args: [args[0], args[1]],
    position,
    material,

    //colision handling //colision handling //colision handling //colision handling
    onCollide: ({ body, target }) => {
      if (body.name === "ball") {
        brickHit(target.name);
      }
    },
    //colision handling //colision handling //colision handling //colision handling
  }));
  return (
    // @ts-expect-error
    <mesh ref={ref} name={name}>
      <boxGeometry args={args} />
      <meshToonMaterial color={color || "hotpink"} />
    </mesh>
  );
};

export const BricksGrid = ({ bricks }: { bricks: Brick[] }) => {
  const { colors, materials } = useStorage((state) => ({
    colors: state.config.game.brick.colors,
    materials: state.config.game.materials,
  }));

  return (
    <>
      {bricks.map(
        (brick, i) =>
          brick.points > 0 && (
            <Brick
              {...brick}
              material={materials.brick}
              color={colors[brick.points ? brick.points - 1 : 0]}
            />
          )
      )}
    </>
  );
};
