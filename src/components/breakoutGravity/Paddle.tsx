import { useFrame, useThree } from "@react-three/fiber";
import { useBox } from "@react-three/p2";
import { useEffect, useRef } from "react";
import { useStorage } from "../../storage";

export const Paddle = ({ position }: { position: [number, number] }) => {
  const { paddle, materials } = useStorage((state) => ({
    paddle: state.config.game.paddle,
    materials: state.config.game.materials,
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

  const vector = useRef([0, 0] as [number, number]);

  const movementHandler = () => {
    if (vector.current[0] > 1 || vector.current[0] < -1) {
      if (positionRef.current[0] <= paddle.bounds.x[0]) {
        api.position.set(paddle.bounds.x[0], positionRef.current[1]);

        if (vector.current[0] < 0) vector.current[0] = 0;
      } else if (positionRef.current[0] >= paddle.bounds.x[1]) {
        api.position.set(paddle.bounds.x[1], positionRef.current[1]);

        if (vector.current[0] > 0) vector.current[0] = 0;
      }

      if (positionRef.current[1] <= paddle.bounds.y[0]) {
        api.position.set(positionRef.current[0], paddle.bounds.y[0]);

        if (vector.current[1] < 0) vector.current[1] = 0;
      } else if (positionRef.current[1] >= paddle.bounds.y[1]) {
        api.position.set(positionRef.current[0], paddle.bounds.y[1]);

        if (vector.current[1] > 0) vector.current[1] = 0;
      }
      api.velocity.set(
        vector.current[0] * paddle.acceleration,
        vector.current[1] * paddle.acceleration
      );
      ////angle////angle////
      if (vector.current[0] > 0) {
        if (angleRef.current >= paddle.maxAngle) {
          api.angularVelocity.set(0);
          api.angle.set(paddle.maxAngle);
        } else {
          api.angularVelocity.set(vector.current[0] / 2);
        }
      } else {
        if (angleRef.current <= -paddle.maxAngle) {
          api.angularVelocity.set(0);
          api.angle.set(-paddle.maxAngle);
        } else {
          api.angularVelocity.set(vector.current[0] / 2);
        }
      }
    } else {
      api.velocity.set(0, 0);
      api.angularVelocity.set(0);
    }
  };

  const { viewport } = useThree();

  const maxSpeed = [paddle.maxSpeedG.x, paddle.maxSpeedG.y];

  useFrame(({ mouse }) => {
    vector.current = [
      (mouse.x * viewport.width) / 2 - positionRef.current[0],
      (mouse.y * viewport.height) / 2 - positionRef.current[1],
    ] as [number, number];
    // api.velocity.set(vec.current[0] * 10, vec.current[1] * 10);
    if (vector.current[0] > maxSpeed[0]) vector.current[0] = maxSpeed[0];
    if (vector.current[0] < -paddle.maxSpeed)
      vector.current[0] = -paddle.maxSpeed;
    if (vector.current[1] > maxSpeed[1]) vector.current[1] = maxSpeed[1];
    if (vector.current[1] < -maxSpeed[1]) vector.current[1] = -maxSpeed[1];
    movementHandler();
  });

  return (
    //@ts-expect-error
    <mesh ref={ref} position={position}>
      <boxGeometry args={paddle.args} />
      <meshToonMaterial color={paddle.color} />
    </mesh>
  );
};
