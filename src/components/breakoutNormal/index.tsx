import { Canvas, useThree } from "@react-three/fiber";
import { useStorage, useStorageShallow } from "../../storage";
import { Scene } from "./Scene";
import { Suspense, useEffect } from "react";
import { useWindowFocus } from "../../functions/useWindowFocus";

const RenderOnChange = ({
  paused,
  gameStage,
}: {
  paused: boolean;
  gameStage: "init" | "playing" | "over";
}) => {
  const invalidate = useThree((state) => state.invalidate);

  useEffect(() => {
    invalidate();
  }, [invalidate, paused, gameStage]);

  return null;
};

export default ({ className }: { className?: string }) => {
  const config = useStorage((state) => state.config.game);
  const { paused, gameStage } = useStorageShallow((state) => ({
    paused: state.paused,
    gameStage: state.gameStage,
  }));
  const setPause = useStorage((state) => state.setPause);

  useWindowFocus(undefined, () => setPause(true));

  return (
    <Canvas
      className={className}
      camera={{
        position: config.camera.position,
        fov: config.camera.fov,
        near: 0.1,
        far: 200,
      }}
      frameloop={!paused && gameStage === "playing" ? "always" : "demand"}
    >
      <RenderOnChange paused={paused} gameStage={gameStage} />
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  );
};
