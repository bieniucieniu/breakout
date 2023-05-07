import { useEffect, useRef } from "react";
import { useStorage } from "../../storage";
import { useFrame } from "@react-three/fiber";
import { Vector2 } from "three";
import { min } from "date-fns";

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
    new Vector2(ball.speed / Math.sqrt(2), ball.speed / Math.sqrt(2))
  );

  const paddlePosition = paddlePositionRef.current;
  const paddleSize = config.game.paddle.args;
  const ballRadius = ball.radius;
  const brickSize = config.game.brick.args;

  const minVerSpeed = Math.sin(ball.minAngle) * ball.speed;
  const minHorSpeed = Math.cos(ball.minAngle) * ball.speed;

  useFrame((_, delta) => {
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
      removeLife();
      ref.current.position.set(...ball.defaultPosition, 0);
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

      if (vector.current.y > -minVerSpeed) {
        vector.current.y = -minVerSpeed;
        vector.current.x = vector.current.x > 0 ? minHorSpeed : -minHorSpeed;

        if (vector.current.length() < ball.speed)
          vector.current.setLength(ball.speed);
      } else if (vector.current.y < -ball.speed) {
        vector.current.y = -ball.speed;
        vector.current.x = vector.current.x > 0 ? ball.speed : -ball.speed;

        if (vector.current.length() < ball.speed)
          vector.current.setLength(ball.speed);
      }
    }

    for (const brick of bricks) {
      if (brick.points <= 0) continue;
      if (
        ballPosition.x > brick.position[0] - brickSize[0] / 2 - ballRadius &&
        ballPosition.x < brick.position[0] + brickSize[0] / 2 + ballRadius &&
        ballPosition.y > brick.position[1] - brickSize[1] / 2 - ballRadius &&
        ballPosition.y < brick.position[1] + brickSize[1] / 2 + ballRadius
      ) {
        if (
          ballPosition.x > brick.position[0] - brickSize[0] / 2 &&
          ballPosition.x < brick.position[0] + brickSize[0] / 2
        ) {
          vector.current.y *= -1;
          brickHit(brick.name);
          break;
        } else if (
          ballPosition.y > brick.position[1] - brickSize[1] / 2 &&
          ballPosition.y < brick.position[1] + brickSize[1] / 2
        ) {
          vector.current.x *= -1;
          brickHit(brick.name);
          break;
        }
      }
    }

    ref.current.position.x += vector.current.x * delta;
    ref.current.position.y += vector.current.y * delta;
  });

  return (
    <mesh ref={ref} name={"ball"} position={[...position, 0]}>
      <sphereGeometry args={[ball.radius]} />
      <meshToonMaterial color={ball.color} />
    </mesh>
  );
};
