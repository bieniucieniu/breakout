import { useCircle } from "@react-three/p2";
import { useStorage } from "../hooks/useStorage";

export const Ball = ({ position }: { position: [number, number] }) => {
  const { ball, materials } = useStorage((state) => ({
    ball: state.config.game.ball,
    materials: state.config.game.materials,
  }));

  const [ref] = useCircle(() => ({
    mass: 1,
    type: "Dynamic",
    position,
    material: materials.ball,
    args: [ball.radius],
  }));

  return (
    // @ts-expect-error
    <mesh ref={ref} name={"ball"}>
      <sphereGeometry args={[ball.radius]} />
      <meshToonMaterial color={ball.color} />
    </mesh>
  );
};
