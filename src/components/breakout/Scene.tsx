import { useRef } from "react";
import { Ball } from "./Ball";
import Bricks from "./Bricks";
import { Boarder } from "./Boarder";
import Paddle from "./Paddle";
import { useGameContext } from "./gameContext";

export const Scene = () => {
  const { ballPosition, paddlePosition, bricks } = useGameContext();
  const groupRef = useRef<THREE.Group>(null!);

  return (
    <group ref={groupRef}>
      <pointLight intensity={500} position={[10, 10, 10]} />
      <pointLight intensity={500} position={[-10, 10, 10]} />
      <ambientLight />
      <Paddle positionRef={paddlePosition} />
      <Boarder />
      <Bricks bricksRef={bricks} />
      <Ball positionRef={ballPosition} paddlePositionRef={paddlePosition} />
    </group>
  );
};
