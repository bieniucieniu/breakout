import { useContactMaterial } from "@react-three/p2";
import { useEffect, useState } from "react";
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
  const setupGame = useStorage((state) => state.setupGame);

  useEffect(() => {
    setupGame();
  }, []);

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
      camera.position.set(0, 0, 120);
    } else if (width < 700) {
      camera.position.set(0, 0, 100);
    } else if (width < 1000) {
      camera.position.set(0, 0, 80);
    } else {
      camera.position.set(0, 0, 64);
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
        <Ball position={config.ball.defaultPosition} />
        <Paddle position={config.paddle.defaultPosition} />
        <BricksGrid bricks={bricks} />
      </group>
    </>
  );
};
