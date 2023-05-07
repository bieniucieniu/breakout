import { useEffect, useRef } from "react";
import { useStorage } from "../../storage";
import { Ball } from "./Ball";
import { BricksGrid } from "./Bricks";
import { Boarder } from "./Boarder";
import { Paddle } from "./Paddle";
import { useThree } from "@react-three/fiber";
import { Vector3 } from "three";

export const Scene = () => {
  const config = useStorage((state) => state.config.game);
  const bricks = useStorage((state) => state.bricks);
  const { ballPosition, paddlePosition } = useStorage((state) => ({
    ballPosition: state.ballPosition,
    paddlePosition: state.paddlePosition,
  }));

  const { camera } = useThree();

  const handleCameraPosition = (e?: UIEvent) => {
    e && e.preventDefault();
    const width = window.innerWidth;
    if (width < 500) {
      camera.position.set(...config.camera.position["500"]);
    } else if (width < 700) {
      camera.position.set(...config.camera.position["750"]);
    } else {
      camera.position.set(...config.camera.position["default"]);
    }
  };

  useEffect(() => {
    handleCameraPosition();
    window.addEventListener("resize", handleCameraPosition);
    return () => window.removeEventListener("resize", handleCameraPosition);
  }, []);

  const paddlePositionRef = useRef(new Vector3());

  return (
    <>
      {/* <OrbitControls /> */}
      {config.lights.map((light, index) => (
        <pointLight key={index} {...light} />
      ))}
      <group>
        <Paddle position={paddlePosition} positionRef={paddlePositionRef} />
        <Boarder />
        <BricksGrid bricks={bricks} />
        <Ball position={ballPosition} paddlePositionRef={paddlePositionRef} />
      </group>
    </>
  );
};
