import { OrbitControls } from "@react-three/drei";
import { useContactMaterial } from "@react-three/p2";
import { useEffect, useRef } from "react";
import { useStorage } from "../hooks/useStorage";
import { Ball } from "./Ball";
import { BricksGrid, createBricksGrid } from "./Bricks";
import { KinematicBox } from "./KinenaticBox";
import { Paddle } from "./Paddle";

export const Boarder = () => {
  const { boardArgs, border, materials } = useStorage((state) => ({
    config: state.config.game,
    border: state.config.game.border,
    boardArgs: state.config.game.args,
    materials: state.config.game.materials,
  }));

  return (
    <>
      <KinematicBox
        args={[border.tickness, boardArgs[1], border.depth]}
        position={[-(boardArgs[0] + border.tickness) / 2, 0]}
        color={border.color}
        material={materials.default}
      />
      <KinematicBox
        args={[
          boardArgs[0] + border.tickness * 2,
          border.tickness,
          border.depth,
        ]}
        position={[0, (boardArgs[1] + border.tickness) / 2]}
        color={border.color}
        material={materials.default}
      />
      <KinematicBox
        args={[border.tickness, boardArgs[1], border.depth]}
        position={[(boardArgs[0] + border.tickness) / 2, 0]}
        color={border.color}
        material={materials.default}
      />
    </>
  );
};

export const Scene = () => {
  const {
    bricks,
    setBricks,
    config,
    materials,
    setScore,
    score,
    initScore,
    setInitScore,
  } = useStorage((state) => ({
    bricks: state.bricks,
    setBricks: state.setBricks,
    config: state.config.game,
    materials: state.config.game.materials,
    setScore: state.setScore,
    score: state.score,
    initScore: state.initScore,
    setInitScore: state.setInitScore,
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

    setInitScore(
      (() => {
        if (config.brick.maxPoints)
          return (
            (Math.floor(
              (config.grid.gridSize[0] * config.grid.gridSize[1]) /
                config.brick.maxPoints
            ) *
              config.brick.maxPoints *
              (config.brick.maxPoints + 1)) /
            2
          );
        else return config.grid.gridSize[0] * config.grid.gridSize[1];
      })()
    );
  }, []);

  useEffect(() => {
    setScore(initScore - bricks.reduce((acc, brick) => acc + brick.points!, 0));
    console.log(score);
  }, [bricks]);

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
        <Boarder />
        <Ball position={config.ball.defaultPosition} />
        <Paddle position={[0, -config.args[1] / 2]} />
        {/* bricks */}
        <BricksGrid bricks={bricks} />
      </group>
    </>
  );
};
