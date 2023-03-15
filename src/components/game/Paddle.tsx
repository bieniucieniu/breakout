import { useFrame } from "@react-three/fiber";
import { useBox } from "@react-three/p2";
import { useEffect, useRef } from "react";
import { useStorage } from "../hooks/useStorage";

export const Paddle = ({ position }: { position: [number, number] }) => {
  const { paddle, materials, boardArgs } = useStorage((state) => ({
    paddle: state.config.game.paddle,
    materials: state.config.game.materials,
    boardArgs: state.config.game.args,
  }));

  const lifes = useStorage((state) => state.lifes);
  const gameStage = useStorage((state) => state.gameStage);

  const [ref, api] = useBox(() => ({
    type: "Kinematic",
    position,
    args: paddle.args,
    material: materials.paddle,
  }));

  useEffect(() => {
    if (lifes === 0) {
      api.position.set(position[0], position[1]);
      api.angle.set(0);
      api.velocity.set(0, 0);
      api.angularVelocity.set(0);
    }
  }, [lifes]);

  const PadControllsRef = useRef({ left: false, right: false });

  const SubscribeControlls = () => {
    const keyDown = (e: KeyboardEvent) => {
      if (gameStage !== 2) return;

      if (e.key === "ArrowLeft" || e.key === "a") {
        PadControllsRef.current = { ...PadControllsRef.current, left: true };
      }
      if (e.key === "ArrowRight" || e.key === "d") {
        PadControllsRef.current = { ...PadControllsRef.current, right: true };
      }
    };
    const keyUp = (e: KeyboardEvent) => {
      if (gameStage !== 2) return;

      if (e.key === "ArrowLeft" || e.key === "a") {
        PadControllsRef.current = { ...PadControllsRef.current, left: false };
      }
      if (e.key === "ArrowRight" || e.key === "d") {
        PadControllsRef.current = { ...PadControllsRef.current, right: false };
      }
    };
    window.addEventListener("keydown", keyDown);
    window.addEventListener("keyup", keyUp);

    return () => {
      window.removeEventListener("keydown", keyDown);
      window.removeEventListener("keyup", keyUp);
    };
  };
  useEffect(() => {
    const unSub = SubscribeControlls();
    return unSub;
  }, []);

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

  //limit pos and angle
  const allowVelocity = useRef(true);
  const allowAngularVelocity = useRef(true);

  useFrame(() => {
    //pos limits
    if (positionRef.current[0] < -boardArgs[0] / 2 + paddle.args[0] / 2) {
      api.position.set(
        -boardArgs[0] / 2 + paddle.args[0] / 2,
        positionRef.current[1]
      );
      allowVelocity.current = false;
    } else {
      allowVelocity.current = true;
    }

    if (positionRef.current[0] > boardArgs[0] / 2 - paddle.args[0] / 2) {
      api.position.set(
        boardArgs[0] / 2 - paddle.args[0] / 2,
        positionRef.current[1]
      );
      allowVelocity.current = false;
    } else {
      allowVelocity.current = true;
    }

    // angle limits
    if (angleRef.current > paddle.maxAngle) {
      api.angle.set(paddle.maxAngle);
      allowAngularVelocity.current = false;
    } else {
      allowAngularVelocity.current = true;
    }

    if (angleRef.current < -paddle.maxAngle) {
      api.angle.set(-paddle.maxAngle);
      allowAngularVelocity.current = false;
    } else {
      allowAngularVelocity.current = true;
    }

    //movement
    if (PadControllsRef.current.left && PadControllsRef.current.right) {
      //hold both keys
      api.velocity.set(0, 0);
      api.angularVelocity.set(0);
    } else if (PadControllsRef.current.left) {
      //left
      api.velocity.set(-paddle.speed, 0);
      api.angularVelocity.set(paddle.angularSpeed);
    } else if (PadControllsRef.current.right) {
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
