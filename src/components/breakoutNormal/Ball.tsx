import { useRef } from "react";
import { useStorage } from "../../storage";
import { useFrame } from "@react-three/fiber";

export const Ball = ({
  position,
  paddlePositionRef,
}: {
  position: [number, number];
  paddlePositionRef: React.MutableRefObject<THREE.Vector3>;
}) => {
  const { config, ball } = useStorage((state) => ({
    config: state.config,
    ball: state.config.game.ball,
  }));
  const bricks = useStorage((state) => state.bricks);
  const removeLife = useStorage((state) => state.removeLife);
  const ref = useRef<THREE.Mesh>(null!);
  const vector = useRef([0.1, 0.1] as [number, number]);

  useFrame(() => {
    const paddlePosition = paddlePositionRef.current;
    const paddleSize = config.game.paddle.args;
    const ballPosition = ref.current.position;
    const ballRadius = ball.radius;
    if (
      ballPosition.x > config.game.args[0] / 2 - ballRadius &&
      vector.current[0] > 0
    )
      vector.current[0] *= -1;

    if (
      ballPosition.x < -config.game.args[0] / 2 + ballRadius &&
      vector.current[0] < 0
    )
      vector.current[0] *= -1;

    if (
      ballPosition.y > config.game.args[1] / 2 - ballRadius &&
      vector.current[1] > 0
    )
      vector.current[1] *= -1;

    if (
      ballPosition.y < -config.game.args[1] / 2 + ballRadius &&
      vector.current[1] < 0
    )
      vector.current[1] *= -1;

    // ballPosition.x > paddlePosition.x - paddleSize[0] / 2 - ballRadius &&
    // ballPosition.x < paddlePosition.x + paddleSize[0] / 2 + ballRadius &&
    // ballPosition.y > paddlePosition.y - paddleSize[1] / 2 - ballRadius &&
    // ballPosition.y < paddlePosition.y + paddleSize[1] / 2 + ballRadius

    ref.current.position.x += vector.current[0];
    ref.current.position.y += vector.current[1];
  });

  return (
    <mesh ref={ref} name={"ball"} position={[...position, 0]}>
      <sphereGeometry args={[ball.radius]} />
      <meshToonMaterial color={ball.color} />
    </mesh>
  );
};
