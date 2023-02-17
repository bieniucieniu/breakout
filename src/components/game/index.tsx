import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/p2";
import { useStorage } from "../../hooks/useStorage";
import { useWindowFocus } from "../../hooks/useWindowFocus";
import { Scene } from "./Scene";

export default ({
  style,
  cameraPosition,
}: {
  style?: React.CSSProperties;
  cameraPosition?: [number, number, number];
}) => {
  const { config, paused, setPaused } = useStorage((state) => ({
    config: state.config.game,
    paused: state.paused,
    setPaused: state.setPaused,
  }));

  useWindowFocus(
    () => setPaused(false),
    () => setPaused(true)
  );

  return (
    <Canvas style={style} camera={{ position: cameraPosition }}>
      <Physics
        normalIndex={2}
        stepSize={1 / config.tickRate}
        gravity={config.gravity}
        isPaused={paused}
      >
        <Scene />
      </Physics>
    </Canvas>
  );
};
