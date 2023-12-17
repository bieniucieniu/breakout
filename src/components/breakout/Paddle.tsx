import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { useStorage } from "@/storage";
import { useGameContext, useTick } from "./gameContext";

function touchControls() {
  const ref = useRef<{ x: number | undefined; y: number | undefined }>({
    x: undefined,
    y: undefined,
  });

  const touch = {
    onTouchStart: (e: TouchEvent) => {
      ref.current.x = (e.touches[0].clientX * 2) / window.innerWidth - 1;
      ref.current.y = 1 - (e.touches[0].clientY * 2) / window.innerHeight;
    },

    onTouchMove: (e: TouchEvent) => {
      ref.current.x = e.touches[0].clientX / window.innerWidth - 0.5;
      ref.current.y = 0.5 - e.touches[0].clientY / window.innerHeight;
    },

    onTouchEnd: () => {
      ref.current.x = undefined;
      ref.current.y = undefined;
    },
  };

  useEffect(() => {
    window.addEventListener("touchstart", touch.onTouchStart);
    window.addEventListener("touchmove", touch.onTouchMove);
    window.addEventListener("touchend", touch.onTouchEnd);
    return () => {
      window.removeEventListener("touchstart", touch.onTouchStart);
      window.removeEventListener("touchmove", touch.onTouchMove);
      window.removeEventListener("touchend", touch.onTouchEnd);
    };
  }, []);

  return ref.current;
}

export default function Paddle({
  positionRef,
}: {
  positionRef: React.MutableRefObject<[number, number]>;
}) {
  const { paddle, args } = useStorage((state) => ({
    paddle: state.config.game.paddle,
    args: state.config.game.args,
  }));

  const { paused } = useGameContext();

  const touch = touchControls();

  const ref = useRef<THREE.Mesh>(null!);

  const vector = useRef([0, 0] as [number, number]);
  const maxSpeed = [paddle.maxSpeed.x, paddle.maxSpeed.y];

  const controllsType = useRef<"mouse" | "touch">("mouse");

  useEffect(() => {
    const keyEvent = () => (controllsType.current = "mouse");
    const touchEvent = () => (controllsType.current = "touch");
    window.addEventListener("keypress", keyEvent);
    window.addEventListener("touchstart", touchEvent);
    return () => {
      window.removeEventListener("keypress", keyEvent);
      window.removeEventListener("touchstart", touchEvent);
    };
  });

  useTick((delta) => {
    if (paused.current || paused.current === undefined) return;

    if (vector.current[1] > maxSpeed[1]) vector.current[1] = maxSpeed[1];
    if (vector.current[1] < -maxSpeed[1]) vector.current[1] = -maxSpeed[1];

    positionRef.current[0] += vector.current[0] * (delta / 1000);
    positionRef.current[1] += vector.current[1] * (delta / 1000);

    if (positionRef.current[0] >= args[0] / 2 - paddle.args[0] / 2) {
      positionRef.current[0] = args[0] / 2 - paddle.args[0] / 2;
    } else if (positionRef.current[0] <= -args[0] / 2 + paddle.args[0] / 2) {
      positionRef.current[0] = -args[0] / 2 + paddle.args[0] / 2;
    }

    if (positionRef.current[1] >= -2 - paddle.args[1] / 2) {
      positionRef.current[1] = -2 - paddle.args[1] / 2;
    } else if (positionRef.current[1] <= -args[1] / 2 + paddle.args[1] / 2) {
      positionRef.current[1] = -args[1] / 2 + paddle.args[1] / 2;
    }

    ref.current.position.setX(positionRef.current[0]);
    ref.current.position.setY(positionRef.current[1]);
  });

  useFrame(({ pointer, viewport }) => {
    if (paused.current || paused.current === undefined) return;

    if (controllsType.current === "touch") {
      if (touch.x !== undefined && touch.y !== undefined) {
        vector.current = [
          ((touch.x * 2 * viewport.width) / 2 - positionRef.current[0]) *
            maxSpeed[0],
          ((touch.y * 2 * viewport.height) / 2 - positionRef.current[1]) *
            maxSpeed[1],
        ];
      } else {
        vector.current = [0, 0];
      }
    } else {
      vector.current = [
        ((pointer.x * viewport.width) / 2 - positionRef.current[0]) *
          maxSpeed[0],
        ((pointer.y * viewport.height) / 2 - positionRef.current[1]) *
          maxSpeed[1],
      ];
    }
  });

  return (
    <mesh ref={ref} position={[...positionRef.current, 0]}>
      <boxGeometry args={paddle.args} />
      <meshToonMaterial color={"red"} />
    </mesh>
  );
}
