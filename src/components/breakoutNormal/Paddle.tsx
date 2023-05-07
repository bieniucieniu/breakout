import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { useStorage } from "../../storage";

export const Paddle = ({
  positionRef,
}: {
  positionRef: React.MutableRefObject<THREE.Vector3>;
}) => {
  const { paddle, args } = useStorage((state) => ({
    paddle: state.config.game.paddle,
    args: state.config.game.args,
  }));
  const paddleControllsRef = useRef(useStorage.getState().paddleControlls);
  useEffect(() =>
    useStorage.subscribe(
      (state) => (paddleControllsRef.current = state.paddleControlls)
    )
  );

  const ref = useRef<THREE.Mesh>(null!);

  const { viewport } = useThree();
  const vector = useRef([0, 0, 0] as [number, number, number]);
  const maxSpeed = [paddle.maxSpeed.x, paddle.maxSpeed.y];
  useFrame(({ mouse }, delta) => {
    vector.current = [
      ((mouse.x * viewport.width) / 2 - ref.current.position.x) * maxSpeed[0],
      ((mouse.y * viewport.height) / 2 - ref.current.position.y) * maxSpeed[1],
      0,
    ];

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
    <mesh ref={ref} position={[...paddle.defaultPosition, 0]}>
      <boxGeometry args={paddle.args} />
      <meshToonMaterial color={"red"} />
    </mesh>
  );
};
