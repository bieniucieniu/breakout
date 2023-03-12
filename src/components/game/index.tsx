import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/p2";
import { useState } from "react";
import { useStorage } from "../hooks/useStorage";
import { useWindowFocus } from "../hooks/useWindowFocus";
import { Scene } from "./Scene";

export default ({
  cameraPosition,
  className,
}: {
  cameraPosition?: [number, number, number];
  className?: string;
}) => {
  const { config, paused } = useStorage((state) => ({
    config: state.config.game,
    paused: state.paused,
  }));

  const [windowFocused, setWindowFocused] = useState(true);

  useWindowFocus(
    () => setWindowFocused(true),
    () => setWindowFocused(false)
  );

  return (
    <Canvas className={className} camera={{ position: cameraPosition }}>
      <Physics
        normalIndex={2}
        stepSize={1 / config.tickRate}
        gravity={config.gravity}
        isPaused={paused || !windowFocused}
      >
        <Scene />
      </Physics>
    </Canvas>
  );
};
