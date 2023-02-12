import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/p2";
import { Scene } from "./Scene";

export default ({
  style,
  cameraPosition,
}: {
  style?: React.CSSProperties;
  cameraPosition?: [number, number, number];
}) => {
  return (
    <Canvas style={style} camera={{ position: [0, 0, 64] }}>
      <Physics normalIndex={2}>
        <Scene />
      </Physics>
    </Canvas>
  );
};
