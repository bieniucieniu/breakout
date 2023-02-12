import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/p2";
import { useStorage } from "../../hooks/useStorage";
import { Scene } from "./Scene";

export default ({
  style,
  cameraPosition,
}: {
  style?: React.CSSProperties;
  cameraPosition?: [number, number, number];
}) => {
  const { config } = useStorage((state) => ({
    config: state.config.game,
  }));

  return (
    <Canvas style={style} camera={{ position: [0, 0, 64] }}>
      <Physics
        normalIndex={2}
        stepSize={1 / config.fps}
        gravity={config.gravity}
      >
        <Scene />
      </Physics>
    </Canvas>
  );
};
