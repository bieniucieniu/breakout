import { useContactMaterial } from "@react-three/p2";
import { useEffect } from "react";
import { useStorage } from "../../hooks/useStorage";
import { Ball } from "./Ball";
import { BricksGrid } from "./Bricks";
import { Boarder } from "./Boarder";
import { Paddle } from "./Paddle";
import { useThree } from "@react-three/fiber";

export const Scene = () => {
  const { config, materials } = useStorage((state) => ({
    config: state.config.game,
    materials: state.config.game.materials,
  }));
  const bricks = useStorage((state) => state.bricks);
  const gameStage = useStorage((state) => state.gameStage);

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
    restitution: 0.6,
  });

  const { camera } = useThree();

  const handleCameraPosition = (e?: UIEvent) => {
    e && e.preventDefault();
    const width = window.innerWidth;
    if (width < 500) {
      camera.position.set(...config.camera.position["500"]);
    } else if (width < 700) {
      camera.position.set(...config.camera.position["700"]);
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
        <Boarder />
        <Paddle position={config.paddle.defaultPosition} />
        <BricksGrid bricks={bricks} />
        {gameStage === "playing" && (
          <Ball position={config.ball.defaultPosition} />
        )}
      </group>
    </>
  );
};
