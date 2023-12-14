import { Canvas } from "@react-three/fiber";
import { useStorage } from "../../storage";
import { Scene } from "./Scene";
import { BakeShadows, Preload } from "@react-three/drei";
import { Suspense } from "react";
import { Fallback } from "./Fallback";
import { useWindowFocus } from "../../functions/useWindowFocus";

export default ({ className }: { className?: string }) => {
  const config = useStorage((state) => state.config.game);
  const { paused, gameStage } = useStorage((state) => ({
    paused: state.paused,
    gameStage: state.gameStage,
  }));
  const setPause = useStorage((state) => state.setPause);

  useWindowFocus(undefined, () => setPause(true));

  return (
    <Suspense fallback={<Fallback />}>
      <Canvas
        className={className}
        camera={{
          position: config.camera.position,
          fov: config.camera.fov,
          near: 70,
          far: 150,
        }}
        frameloop={!paused && gameStage === "playing" ? "always" : "demand"}
      >
        <Preload all />
        <BakeShadows />
        <Scene />
      </Canvas>
    </Suspense>
  );
};
