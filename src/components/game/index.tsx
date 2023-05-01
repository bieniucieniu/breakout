import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/p2";
import { useState } from "react";
import { useStorage } from "../../storage";
import { useWindowFocus } from "../../functions/useWindowFocus";
import { Scene } from "./Scene";

export default ({ className }: { className?: string }) => {
  const config = useStorage((state) => state.config.game);
  const paused = useStorage((state) => state.paused);
  const [windowFocused, setWindowFocused] = useState(true);

  useWindowFocus(
    () => setWindowFocused(true),
    () => setWindowFocused(false)
  );
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
      <Physics
        normalIndex={2}
        stepSize={1 / config.tickRate}
        gravity={config.gravity}
        tolerance={0.000976562}
        isPaused={paused || !windowFocused}
      >
        <Scene />
      </Physics>
    </Canvas>
  );
};
