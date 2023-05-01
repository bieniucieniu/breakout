import { useEffect } from "react";
import { useStorage } from "../../storage";
import { Ball } from "./Ball";
import { BricksGrid } from "./Bricks";
import { Boarder } from "./Boarder";
import { Paddle } from "./Paddle";
import { useThree } from "@react-three/fiber";

export const Scene = () => {
  const { config } = useStorage((state) => ({
    config: state.config.game,
  }));
  const bricks = useStorage((state) => state.bricks);
  const gameStage = useStorage((state) => state.gameStage);
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

  return (
    <>
      {/* <OrbitControls /> */}
      {config.lights.map((light, index) => (
        <pointLight key={index} {...light} />
      ))}
      <group>
        <Paddle position={config.paddle.defaultPosition} />
        {/* <Boarder />
        <BricksGrid bricks={bricks} />
        {gameStage === "playing" && (
          <Ball position={config.ball.defaultPosition} />
        )} */}
      </group>
    </>
  );
};
