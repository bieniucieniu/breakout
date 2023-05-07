import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export const Fallback = () => {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame((_, delta) => {
    ref.current.rotation.x += delta;
    ref.current.rotation.y += delta;
    ref.current.rotation.z += delta;
  });

  return (
    <mesh ref={ref}>
      <coneGeometry args={[7, 10, 3]} />
      <meshNormalMaterial />
    </mesh>
  );
};
