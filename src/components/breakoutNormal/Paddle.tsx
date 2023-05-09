import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { useStorage } from "../../storage";

function isTouchDevice() {
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
}

const touchControls = () => {
  const ref = useRef<{ x: number | undefined; y: number | undefined }>({
    x: undefined,
    y: undefined,
  });

  const touch = {
    onTouchStart: (e: TouchEvent) => {
      e.preventDefault();

      ref.current.x = e.touches[0].clientX;
      ref.current.y = e.touches[0].clientY;
    },

    onTouchMove: (e: TouchEvent) => {
      e.preventDefault();

      ref.current.x = e.touches[0].clientX;
      ref.current.y = e.touches[0].clientY;
    },

    onTouchEnd: (e: TouchEvent) => {
      e.preventDefault();

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
};

export const Paddle = ({
  positionRef,
  position,
}: {
  positionRef: React.MutableRefObject<THREE.Vector3>;
  position: [number, number];
}) => {
  const { paddle, args } = useStorage((state) => ({
    paddle: state.config.game.paddle,
    args: state.config.game.args,
  }));
  const { paused, gameStage } = useStorage((state) => ({
    paused: state.paused,
    gameStage: state.gameStage,
  }));
  const touch = touchControls();

  const ref = useRef<THREE.Mesh>(null!);

  const { viewport } = useThree();
  const vector = useRef([0, 0, 0] as [number, number, number]);
  const maxSpeed = [paddle.maxSpeed.x, paddle.maxSpeed.y];
  useFrame(({ mouse }, delta) => {
    if (paused || gameStage !== "playing") return;
    console.log(touch);

    if (touch.x !== undefined && touch.y !== undefined) {
      vector.current = [
        ((touch.x * viewport.width) / 2 - ref.current.position.x) * maxSpeed[0],
        ((touch.y * viewport.height) / 2 - ref.current.position.y) *
          maxSpeed[1],
        0,
      ];
    } else {
      vector.current = [
        ((mouse.x * viewport.width) / 2 - ref.current.position.x) * maxSpeed[0],
        ((mouse.y * viewport.height) / 2 - ref.current.position.y) *
          maxSpeed[1],
        0,
      ];
    }
    if (vector.current[1] > maxSpeed[1]) vector.current[1] = maxSpeed[1];
    if (vector.current[1] < -maxSpeed[1]) vector.current[1] = -maxSpeed[1];

    ref.current.position.x += vector.current[0] * delta;
    ref.current.position.y += vector.current[1] * delta;

    if (ref.current.position.x >= args[0] / 2 - paddle.args[0] / 2) {
      ref.current.position.x = args[0] / 2 - paddle.args[0] / 2;
    } else if (ref.current.position.x <= -args[0] / 2 + paddle.args[0] / 2) {
      ref.current.position.x = -args[0] / 2 + paddle.args[0] / 2;
    }

    if (ref.current.position.y >= -2 - paddle.args[1] / 2) {
      ref.current.position.y = -2 - paddle.args[1] / 2;
    } else if (ref.current.position.y <= -args[1] / 2 + paddle.args[1] / 2) {
      ref.current.position.y = -args[1] / 2 + paddle.args[1] / 2;
    }

    positionRef.current = ref.current.position;
  });

  return (
    <mesh ref={ref} position={[...position, 0]}>
      <boxGeometry args={paddle.args} />
      <meshToonMaterial color={"red"} />
    </mesh>
  );
};
