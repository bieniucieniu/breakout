import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/p2";
import { useEffect, useState } from "react";
import { useStorage } from "../../hooks/useStorage";
import { useWindowFocus } from "../../hooks/useWindowFocus";
import { Scene } from "./Scene";

export default ({
  cameraPosition,
  className,
}: {
  cameraPosition?: [number, number, number];
  className?: string;
}) => {
  const config = useStorage((state) => state.config.game);
  const paused = useStorage((state) => state.paused);
  const switchPaused = useStorage((state) => state.switchPaused);
  const gameStage = useStorage((state) => state.gameStage);
  const [windowFocused, setWindowFocused] = useState(true);

  useWindowFocus(
    () => setWindowFocused(true),
    () => setWindowFocused(false)
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameStage !== 2) return;
      e.key === " " && switchPaused();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

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
