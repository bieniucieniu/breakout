import { useRef } from "react";
import { useStorage } from "@/storage";
import { Ball } from "./Ball";
import Bricks from "./Bricks";
import { Boarder } from "./Boarder";
import Paddle from "./Paddle";
import { useGameContext } from "./gameContext";

export const Scene = () => {
  const config = useStorage((state) => state.config.game);
  const { ballPosition, paddlePosition, bricks } = useGameContext();
  const groupRef = useRef<THREE.Group>(null!);

  return (
    <>
      {/* <OrbitControls /> */}
      <group ref={groupRef}>
        {config.lights.map((light, index) => (
          <pointLight key={index} {...light} />
        ))}
        <Paddle positionRef={paddlePosition} />
        <Boarder />
        <Bricks bricksRef={bricks} />
        <Ball positionRef={ballPosition} paddlePositionRef={paddlePosition} />
      </group>
    </>
  );
};
