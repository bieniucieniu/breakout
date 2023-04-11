import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/p2";
import { useState } from "react";
import { useStorage } from "../../hooks/useStorage";
import { useWindowFocus } from "../../hooks/useWindowFocus";
import { Scene } from "./Scene";
import type { KeyboardEvent, TouchEvent } from "react";

export default ({
  className,
  contorlls,
}: {
  className?: string;
  contorlls?: {
    onKeyDown?: (e: KeyboardEvent) => void;
    onKeyUp?: (e: KeyboardEvent) => void;
    onTouchStart?: (e: TouchEvent) => void;
    onTouchEnd?: (e: TouchEvent) => void;
  };
}) => {
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
      camera={{ position: config.camera.position.default }}
      {...contorlls}
      tabIndex={0}
    >
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
