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
  const brickHit = useStorage((state) => state.brickHit);
  const removeLife = useStorage((state) => state.removeLife);
  const ref = useRef<THREE.Mesh>(null!);
  const vector = useRef(
    new Vector2(ball.speed * Math.sqrt(2), ball.speed * Math.sqrt(2))
  );

  const paddlePosition = paddlePositionRef.current;
  const paddleSize = config.game.paddle.args;
  const ballRadius = ball.radius;
  const brickSize = config.game.brick.args;

  useFrame(() => {
    const ballPosition = ref.current.position;

    if (
      ballPosition.x > config.game.args[0] / 2 - ballRadius &&
      vector.current.x > 0
    ) {
      vector.current.x *= -1;
    } else if (
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
    } else if (
      ballPosition.y < -config.game.args[1] / 2 + ballRadius &&
      vector.current.y < 0
    ) {
      vector.current.y *= -1;
      // removeLife();
      // ref.current.position.set(...ball.defaultPosition, 0);
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
      vector.current.rotateAround(new Vector2(0, 0), -r);
    }
    console.log(vector.current.length());
    ref.current.position.x += vector.current.x;
    ref.current.position.y += vector.current.y;

    for (const brick of bricks) {
      if (
        ballPosition.x > brick.position[0] - brickSize[0] / 2 - ballRadius &&
        ballPosition.x < brick.position[0] + brickSize[0] / 2 + ballRadius &&
        ballPosition.y > brick.position[1] - brickSize[1] / 2 - ballRadius &&
        ballPosition.y < brick.position[1] + brickSize[1] / 2 + ballRadius
      ) {
        if (brick.points <= 0) continue;
        if (
          (ballPosition.y - brick.position[0] >= 0 && vector.current.y < 0) ||
          (ballPosition.y - brick.position[0] < 0 && vector.current.y > 0)
        ) {
          vector.current.y *= -1;
          brickHit(brick.name);
        }
        if (
          (ballPosition.x - brick.position[0] >= 0 && vector.current.x < 0) ||
          (ballPosition.x - brick.position[0] < 0 && vector.current.x > 0)
        ) {
          vector.current.x *= -1;
          brickHit(brick.name);
        }
      }
    }
  });

  return (
    <mesh ref={ref} name={"ball"} position={[...position, 0]}>
      <sphereGeometry args={[ball.radius]} />
      <meshToonMaterial color={ball.color} />
    </mesh>
  );
};
