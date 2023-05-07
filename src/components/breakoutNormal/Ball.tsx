import { useEffect, useRef } from "react";
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
  const gameStage = useStorage((state) => state.gameStage);
  const paused = useStorage((state) => state.paused);
  const ref = useRef<THREE.Mesh>(null!);
  const vector = useRef(new Vector2(0));
  const vecTemp = useRef(new Vector2(0));

  useEffect(() => {
    if (gameStage === "init") vector.current.set(0, 0);
    else if (gameStage === "playing")
      vector.current.set(ball.speed / Math.sqrt(2), ball.speed / Math.sqrt(2));
    else if (gameStage === "over") vector.current.set(0, 0);
  }, [gameStage]);

  useEffect(() => {
    if (paused) {
      if (vecTemp.current.x === 0 && vecTemp.current.y === 0) {
        vecTemp.current.copy(vector.current);
        vector.current.set(0, 0);
      }
    } else {
      if (vector.current.x === 0 && vector.current.y === 0) {
        vector.current.copy(vecTemp.current);
        vecTemp.current.set(0, 0);
      }
    }
  }, [paused]);

  const paddlePosition = paddlePositionRef.current;
  const paddleSize = config.game.paddle.args;
  const ballRadius = ball.radius;
  const brickSize = config.game.brick.args;

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
      if (vector.current.y < ball.minVerticalSpeed) {
        vector.current.y = ball.minVerticalSpeed;
        vector.current.x =
          vector.current.x > 0
            ? Math.sqrt((ball.speed ^ 2) - (ball.minVerticalSpeed ^ 2))
            : -Math.sqrt((ball.speed ^ 2) - (ball.minVerticalSpeed ^ 2));
        if (vector.current.length() < ball.speed)
          vector.current.setLength(ball.speed);
      }
    }
    ref.current.position.x += vector.current.x * delta;
    ref.current.position.y += vector.current.y * delta;

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
  });

  return (
    <mesh ref={ref} name={"ball"} position={[...position, 0]}>
      <sphereGeometry args={[ball.radius]} />
      <meshToonMaterial color={ball.color} />
    </mesh>
  );
};
