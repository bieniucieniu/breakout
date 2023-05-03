import { useRef } from "react";
import { useStorage } from "../../storage";

export const Ball = ({ position }: { position: [number, number] }) => {
  const { config, ball } = useStorage((state) => ({
    config: state.config,
    ball: state.config.game.ball,
  }));
  const removeLife = useStorage((state) => state.removeLife);
  const ref = useRef<THREE.Mesh>(null!);
  // lastPosition.current[0] > config.game.args[0] / 2 ||
  // lastPosition.current[0] < -config.game.args[0] / 2 ||
  // lastPosition.current[1] > config.game.args[1] / 2 ||
  // lastPosition.current[1] < -config.game.args[1] / 2;

  return (
    <mesh ref={ref} name={"ball"} position={[...position, 0]}>
      <sphereGeometry args={[ball.radius]} />
      <meshToonMaterial color={ball.color} />
    </mesh>
  );
};
