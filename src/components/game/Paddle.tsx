import { useFrame } from "@react-three/fiber";
import { useBox } from "@react-three/p2";
import { useEffect, useRef } from "react";
import { useStorage } from "../../hooks/useStorage";

export const Paddle = ({ position }: { position: [number, number] }) => {
  const { paddle, materials, boardArgs } = useStorage((state) => ({
    paddle: state.config.game.paddle,
    materials: state.config.game.materials,
    boardArgs: state.config.game.args,
  }));
  const lives = useStorage((state) => state.lives);

  const [ref, api] = useBox(() => ({
    type: "Kinematic",
    position,
    args: paddle.args,
    material: materials.paddle,
  }));

  useEffect(() => {
    if (lives === 0) {
      api.position.set(position[0], position[1]);
      api.angle.set(0);
      api.velocity.set(0, 0);
      api.angularVelocity.set(0);
    }
  }, [lives]);

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

    // angle limits
    if (angleRef.current > paddle.maxAngle) {
      api.angle.set(paddle.maxAngle);
    }

    if (angleRef.current < -paddle.maxAngle) {
      api.angle.set(-paddle.maxAngle);
    }

    //movement
    if (paddleControllsRef.current.left && paddleControllsRef.current.right) {
      //hold both keys
      api.velocity.set(0, 0);
      api.angularVelocity.set(0);
    } else if (paddleControllsRef.current.left) {
      //left
      api.velocity.set(-paddle.speed, 0);
      api.angularVelocity.set(paddle.angularSpeed);
    } else if (paddleControllsRef.current.right) {
      //right
      api.velocity.set(paddle.speed, 0);
      api.angularVelocity.set(-paddle.angularSpeed);
    } else {
      //none
      api.velocity.set(0, 0);
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
