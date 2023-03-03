import { Color } from "@react-three/fiber";
import { useBox } from "@react-three/p2";
import { useRef } from "react";
import { useStorage } from "../hooks/useStorage";
import { Brick } from "../hooks/createBricksGrid";

const Brick = ({
  args,
  position,
  points,
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
  const { bricks, setBricks } = useStorage((stage) => ({
    bricks: stage.bricks,
    setBricks: stage.setBricks,
  }));
  const { increaseScore } = useStorage((state) => ({
    increaseScore: state.increaseScore,
  }));
  const pointsRef = useRef(points);

  const [ref] = useBox(() => ({
    type: "Kinematic",
    args: [args[0], args[1]],
    position,
    material,

    //colision handling //colision handling //colision handling //colision handling
    onCollide: ({ body, target }) => {
      if (body.name === "ball") {
        if (pointsRef.current) {
          pointsRef.current -= 1;
          const newBricks = bricks.map((e) => {
            if (e.name === target.name) {
              e.points = pointsRef.current;
            }
            return e;
          });
          setBricks(newBricks);
          increaseScore(1);
        }
      }
    },
    //colision handling //colision handling //colision handling //colision handling
  }));
  return (
    // @ts-expect-error
    <mesh ref={ref} name={name} position={position}>
      <boxBufferGeometry args={args} />
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
              key={i}
              {...brick}
              material={materials.brick}
              color={colors[brick.points ? brick.points - 1 : 0]}
            />
          )
      )}
    </>
  );
};
