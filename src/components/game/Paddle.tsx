import { useFrame } from "@react-three/fiber";
import { useBox } from "@react-three/p2";
import { useEffect, useRef } from "react";
import { useStorage } from "../../hooks/useStorage";

export const Paddle = ({
  args,
  position,
  color = "white",
  material,
}: {
  position: [number, number];
  args: [number, number, number];
  color?: string;
  material?: p2.Material;
}) => {
  const [ref, api] = useBox(() => ({
    type: "Kinematic",
    args: [args[0], args[1]],
    position,
    material,
  }));

  const { config, PadControlls, setPadControlls } = useStorage((state) => ({
    config: state.config.game,
    PadControlls: state.PadControlls,
    setPadControlls: state.setPadControlls,
  }));

  const PadControllsRef = useRef({ left: false, right: false });

  const SubscribeControlls = () => {
    const keyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "a") {
        PadControllsRef.current = { ...PadControllsRef.current, left: true };
      }
      if (e.key === "ArrowRight" || e.key === "d") {
        PadControllsRef.current = { ...PadControllsRef.current, right: true };
      }
    };
    const keyUp = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "a") {
        PadControllsRef.current = { ...PadControllsRef.current, left: false };
      }
      if (e.key === "ArrowRight" || e.key === "d") {
        setPadControlls({ ...PadControlls, right: false });
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

  const allowVelocity = useRef(true);
  const allowAngularVelocity = useRef(true);

  useFrame(() => {
    //pos limits
    if (positionRef.current[0] < -config.args[0] / 2 + args[0] / 2) {
      api.position.set(
        -config.args[0] / 2 + args[0] / 2,
        positionRef.current[1]
      );
      allowVelocity.current = false;
    } else {
      allowVelocity.current = true;
    }

    if (positionRef.current[0] > config.args[0] / 2 - args[0] / 2) {
      api.position.set(
        config.args[0] / 2 - args[0] / 2,
        positionRef.current[1]
      );
      allowVelocity.current = false;
    } else {
      allowVelocity.current = true;
    }

    // angle limits
    if (angleRef.current > config.paddle.maxAngle) {
      api.angle.set(config.paddle.maxAngle);
      allowAngularVelocity.current = false;
    } else {
      allowAngularVelocity.current = true;
    }

    if (angleRef.current < -config.paddle.maxAngle) {
      api.angle.set(-config.paddle.maxAngle);
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
      api.velocity.set(-config.paddle.speed, 0);
      api.angularVelocity.set(config.paddle.angularSpeed);
    } else if (PadControllsRef.current.right) {
      //right
      api.velocity.set(config.paddle.speed, 0);
      api.angularVelocity.set(-config.paddle.angularSpeed);
    } else {
      //none
      api.velocity.set(0, 0);
      api.angularVelocity.set(0);
    }
  });

  return (
    //@ts-expect-error
    <mesh ref={ref}>
      <boxGeometry args={args} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};
