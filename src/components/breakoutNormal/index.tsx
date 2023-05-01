import { Canvas } from "@react-three/fiber";
import { useState } from "react";
import { useStorage } from "../../storage";
import { useWindowFocus } from "../../functions/useWindowFocus";
import { Scene } from "./Scene";

export default ({ className }: { className?: string }) => {
  const config = useStorage((state) => state.config.game);

  return (
    <Canvas
      className={className}
      camera={{
        position: config.camera.position.default,
        fov: config.camera.fov,
        near: 70,
        far: 150,
      }}
    >
      <Scene />
    </Canvas>
  );
};
