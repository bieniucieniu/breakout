import { useRef } from "react";
import { useStorage } from "../../storage";
import { Ball } from "./Ball";
import { BricksGrid } from "./Bricks";
import { Boarder } from "./Boarder";
import { Paddle } from "./Paddle";
import { useFrame, useThree } from "@react-three/fiber";
import { Vector3 } from "three";

export const Scene = () => {
  const config = useStorage((state) => state.config.game);
  const bricks = useStorage((state) => state.bricks);
  const { ballPosition, paddlePosition } = useStorage((state) => ({
    ballPosition: state.ballPosition,
    paddlePosition: state.paddlePosition,
  }));
  const groupRef = useRef<THREE.Group>(null!);

  const paddlePositionRef = useRef(new Vector3());

  return (
    <>
      {/* <OrbitControls /> */}
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
