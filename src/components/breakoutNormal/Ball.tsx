import { useRef } from "react";
import { useStorage } from "../../storage";
import { useFrame } from "@react-three/fiber";
import { Vector2 } from "three";

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
  const vector = useRef(
    new Vector2(ball.speed * Math.sqrt(2), ball.speed * Math.sqrt(2))
  );
  useFrame(() => {
    const paddlePosition = paddlePositionRef.current;
    const paddleSize = config.game.paddle.args;
    const ballPosition = ref.current.position;
    const ballRadius = ball.radius;
    if (
      ballPosition.x > config.game.args[0] / 2 - ballRadius &&
      vector.current.x > 0
    ) {
      vector.current.x *= -1;
    }

    if (
      ballPosition.x < -config.game.args[0] / 2 + ballRadius &&
      vector.current.x < 0
    ) {
      vector.current.x *= -1;
    }

    if (
      ballPosition.y > config.game.args[1] / 2 - ballRadius &&
      vector.current.y > 0
    ) {
      vector.current.y *= -1;
    }

    if (
      ballPosition.y < -config.game.args[1] / 2 + ballRadius &&
      vector.current.y < 0
    ) {
      removeLife();
    }

    if (
      ballPosition.x > paddlePosition.x - paddleSize[0] / 2 - ballRadius &&
      ballPosition.x < paddlePosition.x + paddleSize[0] / 2 + ballRadius &&
      ballPosition.y > paddlePosition.y - paddleSize[1] / 2 - ballRadius &&
      ballPosition.y < paddlePosition.y + paddleSize[1] / 2 + ballRadius &&
      vector.current.y < 0
    ) {
      const r = (ballPosition.x - paddlePosition.x) / (paddleSize[0] / 2);

      vector.current.y *= -1;
      vector.current.rotateAround(new Vector2(0, 0), r);
    }
    console.log(vector.current.length());
    ref.current.position.x += vector.current.x;
    ref.current.position.y += vector.current.y;
  });

  return (
    <mesh ref={ref} name={"ball"} position={[...position, 0]}>
      <sphereGeometry args={[ball.radius]} />
      <meshToonMaterial color={ball.color} />
    </mesh>
  );
};
