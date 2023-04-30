import { useFrame, useThree } from "@react-three/fiber";
import { useBox } from "@react-three/p2";
import { useEffect, useRef } from "react";
import { useStorage } from "../../storage";

export const Paddle = ({ position }: { position: [number, number] }) => {
  const { paddle, materials, boardArgs } = useStorage((state) => ({
    paddle: state.config.game.paddle,
    materials: state.config.game.materials,
    boardArgs: state.config.game.args,
  }));
  const gameStage = useStorage((state) => state.gameStage);

  const [ref, api] = useBox(() => ({
    type: "Kinematic",
    position,
    args: paddle.args,
    material: materials.paddle,
  }));

  useEffect(() => {
    if (gameStage === "init") {
      api.position.set(position[0], position[1]);
      api.angle.set(0);
      api.velocity.set(0, 0);
      api.angularVelocity.set(0);
    }
  }, [gameStage]);

  const paddleControllsRef = useRef(useStorage.getState().paddleControlls);
  useEffect(() =>
    useStorage.subscribe(
      (state) => (paddleControllsRef.current = state.paddleControlls)
    )
  );

  const positionRef = useRef(position);
  const angleRef = useRef(0);

  const subscribePaddleTracker = () => {
    api.position.subscribe((pos) => {
      positionRef.current = pos;
    });
    api.angle.subscribe((angle) => {
      angleRef.current = angle;
    });
  };

  useEffect(() => {
    const unSub = subscribePaddleTracker();
    return unSub;
  }, []);

  useFrame(() => {
    //pos limits
    if (positionRef.current[0] < -boardArgs[0] / 2 + paddle.args[0] / 2) {
      api.position.set(
        -boardArgs[0] / 2 + paddle.args[0] / 2,
        positionRef.current[1]
      );
    }

    if (positionRef.current[0] > boardArgs[0] / 2 - paddle.args[0] / 2) {
      api.position.set(
        boardArgs[0] / 2 - paddle.args[0] / 2,
        positionRef.current[1]
      );
    }

    if (positionRef.current[1] < -boardArgs[1] / 2 + paddle.args[1] / 2) {
      api.position.set(
        positionRef.current[0],
        -boardArgs[1] / 2 + paddle.args[1] / 2
      );
    }

    // if (positionRef.current[1] > boardArgs[1] / 2 - paddle.args[1] / 2) {
    //   api.position.set(
    //     positionRef.current[0],
    //     boardArgs[1] / 2 - paddle.args[1] / 2
    //   );
    // }
    if (positionRef.current[1] > -10) {
      api.position.set(positionRef.current[0], -10);
    }
  });

  const { viewport } = useThree();

  useFrame(({ mouse }) => {
    const vec = [
      (mouse.x * viewport.width) / 2 - positionRef.current[0],
      (mouse.y * viewport.height) / 2 - positionRef.current[1],
    ] as [number, number];
    api.velocity.set(vec[0] * 10, vec[1] * 10);

    angleRef.current += vec[0] * 0.1;

    if (angleRef.current > paddle.maxAngle) {
      api.angle.set(paddle.maxAngle);
    }
    if (angleRef.current < -paddle.maxAngle) {
      api.angle.set(-paddle.maxAngle);
    }
    if (vec[0] > 1 || vec[0] < -1) {
      api.angularVelocity.set(vec[0] / 2);
    } else {
      api.angularVelocity.set(0);
    }
  });

  return (
    //@ts-expect-error
    <mesh ref={ref} position={position}>
      <boxGeometry args={paddle.args} />
      <meshToonMaterial color={paddle.color} />
    </mesh>
  );
};
