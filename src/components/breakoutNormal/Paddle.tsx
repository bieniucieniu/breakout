import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { useStorage } from "../../storage";

export const Paddle = ({ position }: { position: [number, number] }) => {
  const { paddle } = useStorage((state) => ({
    paddle: state.config.game.paddle,
  }));
  const gameStage = useStorage((state) => state.gameStage);

  const paddleControllsRef = useRef(useStorage.getState().paddleControlls);
  useEffect(() =>
    useStorage.subscribe(
      (state) => (paddleControllsRef.current = state.paddleControlls)
    )
  );

  const ref = useRef<THREE.Mesh>(null!);

  const { viewport } = useThree();
  const vector = useRef([0, 0, 0] as [number, number, number]);
  useFrame(({ mouse }) => {
    vector.current = [
      (mouse.x * viewport.width) / 2 - ref.current.position.x,
      (mouse.y * viewport.height) / 2 - ref.current.position.y,
      0,
    ];
    ref.current.position.x += vector.current[0] * 0.1;
    ref.current.position.y += vector.current[1] * 0.1;
  });

  return (
    <mesh ref={ref} position={[...paddle.defaultPosition, 0]}>
      <boxGeometry args={paddle.args} />
      <meshToonMaterial color={"red"} />
    </mesh>
  );
};
