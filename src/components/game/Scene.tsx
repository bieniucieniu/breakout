import { OrbitControls } from "@react-three/drei";
import { useContactMaterial } from "@react-three/p2";
import { useEffect } from "react";
import { useStorage } from "../../hooks/useStorage";
import { Ball } from "./Ball";
import { BricksGrid, createBricksGrid } from "./Bricks";
import { KinematicBox } from "./KinenaticBox";
import { Paddle } from "./Paddle";

export const Scene = () => {
  const { bricks, setBricks, config, materials } = useStorage((state) => ({
    bricks: state.bricks,
    setBricks: state.setBricks,
    config: state.config.game,
    materials: state.config.game.materials,
  }));

  //ball bricks
  useContactMaterial(materials.ball, materials.brick, {
    friction: 0,
    restitution: 0.6,
  });
  //ball paddle
  useContactMaterial(materials.ball, materials.paddle, {
    friction: 0,
    restitution: 1.3,
  });
  //ball boarder aka defalult
  useContactMaterial(materials.ball, materials.default, {
    friction: 0,
    restitution: 1,
  });

  useEffect(() => {
    setBricks(
      createBricksGrid({
        gridSize: config.grid.gridSize,
        args: config.grid.args,
        position: [0, config.args[1] / 4],
        brickSize: config.brick.args,
        maxPoints: config.brick.maxPoints,
      })
    );
  }, []);

  return (
    <>
      <OrbitControls />
      {config.lights.map((light, index) => (
        <pointLight key={index} position={light.position} />
      ))}
      <group>
        {/* bg */}
        {/* <mesh position={[0, 0, -1]}>
          <planeGeometry args={config.args} />
          <meshStandardMaterial color="white" />
        </mesh> */}

        {/* border */}
        <KinematicBox
          args={[config.border.tickness, config.args[1], config.border.depth]}
          position={[-(config.args[0] + config.border.tickness) / 2, 0]}
          color={config.border.color}
          material={materials.default}
        />
        <KinematicBox
          args={[
            config.args[0] + config.border.tickness * 2,
            config.border.tickness,
            config.border.depth,
          ]}
          position={[0, (config.args[1] + config.border.tickness) / 2]}
          color={config.border.color}
          material={materials.default}
        />
        <KinematicBox
          args={[config.border.tickness, config.args[1], config.border.depth]}
          position={[(config.args[0] + config.border.tickness) / 2, 0]}
          color={config.border.color}
          material={materials.default}
        />

        <Ball
          radius={config.ball.radius}
          position={config.ball.defaultPosition}
          material={materials.ball}
        />

        <Paddle
          position={[0, -config.args[1] / 2]}
          args={config.paddle.args}
          color={"red"}
          material={materials.paddle}
        />

        {/* bricks */}
        <BricksGrid bricks={bricks} material={materials.brick} />
      </group>
    </>
  );
};
