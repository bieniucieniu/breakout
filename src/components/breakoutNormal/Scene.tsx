import { useRef } from "react";
import { useStorage, useStorageShallow } from "../../storage";
import { Ball } from "./Ball";
import { BricksGrid } from "./Bricks";
import { Boarder } from "./Boarder";
import { Paddle } from "./Paddle";
import { Vector3, type Group } from "three";

export const Scene = () => {
  const config = useStorage((state) => state.config.game);
  const bricks = useStorage((state) => state.bricks);
  const { ballPosition, paddlePosition } = useStorageShallow((state) => ({
    ballPosition: state.ballPosition,
    paddlePosition: state.paddlePosition,
  }));
  const groupRef = useRef<Group>(null!);

  const paddlePositionRef = useRef(new Vector3());

  return (
    <>
      <ambientLight intensity={0.8} />
      <group ref={groupRef}>
        {config.lights.map((light, index) => (
          <pointLight key={index} {...light} />
        ))}
        <Paddle position={paddlePosition} positionRef={paddlePositionRef} />
        <Boarder />
        <BricksGrid bricks={bricks} />
        <Ball position={ballPosition} paddlePositionRef={paddlePositionRef} />
      </group>
    </>
  );
};
