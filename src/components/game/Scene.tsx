import { Canvas } from "@react-three/fiber";

export const Scene = ({ style }: { style?: React.CSSProperties }) => {
  return (
    <div style={style}>
      <Canvas>
        <mesh>
          <boxBufferGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="hotpink" />
        </mesh>
      </Canvas>
    </div>
  );
};
