import { useMemo, useRef } from "react";
import { useStorage } from "@/storage";
import { useFrame } from "@react-three/fiber";
import { Vector2 } from "three";
import { useGameContext, useTick } from "./gameContext";

export const Ball = ({
  positionRef,
  paddlePositionRef,
}: {
  positionRef: React.MutableRefObject<[number, number]>;
  paddlePositionRef: React.MutableRefObject<[number, number]>;
}) => {
  const { config, ball } = useStorage((state) => ({
    config: state.config,
    ball: state.config.game.ball,
  }));
  const { bricks, onBrickHit, onLiveLose } = useGameContext();
  const ref = useRef<THREE.Mesh>(null!);
  const vector = useRef(
    new Vector2(ball.speed / Math.sqrt(2), ball.speed / Math.sqrt(2)),
  );
  const { paused, gameStage } = useStorage((state) => ({
    paused: state.paused,
    gameStage: state.gameStage,
  }));

  const paddleSize = config.game.paddle.args;
  const ballRadius = ball.radius;
  const brickSize = config.game.brick.args;

  const minVerSpeed = useMemo(
    () => Math.sin(ball.minAngle) * ball.speed,
    [config],
  );
  const minHorSpeed = useMemo(
    () => Math.cos(ball.minAngle) * ball.speed,
    [config],
  );

  useTick(
    (delta) => {
      if (paused || gameStage !== "playing") return;

      if (
        positionRef.current[0] > config.game.args[0] / 2 - ballRadius &&
        vector.current.x > 0
      ) {
        vector.current.x *= -1;
      } else if (
        positionRef.current[0] < -config.game.args[0] / 2 + ballRadius &&
        vector.current.x < 0
      ) {
        vector.current.x *= -1;
      }

      if (
        positionRef.current[1] > config.game.args[1] / 2 - ballRadius &&
        vector.current.y > 0
      ) {
        vector.current.y *= -1;
      } else if (
        positionRef.current[1] < -config.game.args[1] / 2 + ballRadius &&
        vector.current.y < 0
      ) {
        vector.current.y *= -1;
        onLiveLose();
        positionRef.current = ball.defaultPosition;
      }

      if (
        positionRef.current[0] >
          paddlePositionRef.current[0] - paddleSize[0] / 2 - ballRadius &&
        positionRef.current[0] <
          paddlePositionRef.current[0] + paddleSize[0] / 2 + ballRadius &&
        positionRef.current[1] >
          paddlePositionRef.current[1] - paddleSize[1] / 2 - ballRadius &&
        positionRef.current[1] <
          paddlePositionRef.current[1] + paddleSize[1] / 2 + ballRadius &&
        vector.current.y < 0
      ) {
        const r =
          (positionRef.current[0] - paddlePositionRef.current[0]) /
          (paddleSize[0] / 2);

        vector.current.y *= -1;
        vector.current.rotateAround(new Vector2(0, 0), -r);

        if (vector.current.y < minVerSpeed && vector.current.y > 0) {
          vector.current.y = minVerSpeed;
          vector.current.x = vector.current.x > 0 ? minHorSpeed : -minHorSpeed;
        }
        if (vector.current.length() < ball.speed)
          vector.current.setLength(ball.speed);
      }

      for (const brick of bricks.current) {
        if (brick.points <= 0) continue;
        if (
          positionRef.current[0] >
            brick.position[0] - brickSize[0] / 2 - ballRadius &&
          positionRef.current[0] <
            brick.position[0] + brickSize[0] / 2 + ballRadius &&
          positionRef.current[1] >
            brick.position[1] - brickSize[1] / 2 - ballRadius &&
          positionRef.current[1] <
            brick.position[1] + brickSize[1] / 2 + ballRadius
        ) {
          if (
            positionRef.current[0] > brick.position[0] - brickSize[0] / 2 &&
            positionRef.current[0] < brick.position[0] + brickSize[0] / 2
          ) {
            vector.current.y *= -1;
            onBrickHit(brick.name);
          } else if (
            positionRef.current[1] > brick.position[1] - brickSize[1] / 2 &&
            positionRef.current[1] < brick.position[1] + brickSize[1] / 2
          ) {
            vector.current.x *= -1;
            onBrickHit(brick.name);
          } else {
            const v = [
              brick.position[0] - positionRef.current[0],
              brick.position[1] - positionRef.current[1],
            ];
            if (
              (v[0] > 0 == vector.current.x > 0) ==
              (v[1] > 0 == vector.current.y > 0)
            ) {
              vector.current.x *= -1;
              vector.current.y *= -1;
              onBrickHit(brick.name);
            }
          }
          break;
        }
      }

      positionRef.current[0] += vector.current.x * (delta / 1000);
      positionRef.current[1] += vector.current.y * (delta / 1000);
    },
    [paused, gameStage],
  );

  useFrame(() => {
    ref.current.position.setX(positionRef.current[0]);
    ref.current.position.setY(positionRef.current[1]);
  });

  return (
    <mesh ref={ref} name={"ball"} position={[...positionRef.current, 0]}>
      <sphereGeometry args={[ball.radius]} />
      <meshToonMaterial color={ball.color} />
    </mesh>
  );
};
