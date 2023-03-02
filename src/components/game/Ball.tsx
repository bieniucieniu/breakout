import { useFrame } from "@react-three/fiber";
import { useCircle } from "@react-three/p2";
import { useEffect, useRef } from "react";
import { useStorage } from "../hooks/useStorage";

export const Ball = ({ position }: { position: [number, number] }) => {
  const { ball, materials } = useStorage((state) => ({
    ball: state.config.game.ball,
    materials: state.config.game.materials,
  }));

  const [ref, api] = useCircle(() => ({
    mass: 1,
    type: "Dynamic",
    position,
    material: materials.ball,
    args: [ball.radius],
  }));

  const velocity = useRef([0, 0]);
  const StuckCounter = useRef(0);

  useEffect(() => {
    const unsub = api.velocity.subscribe((v) => {
      velocity.current = v;
    });

    return unsub;
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      if (
        velocity.current[0] < 0.001 &&
        velocity.current[1] < 0.001 &&
        velocity.current[0] > -0.001 &&
        velocity.current[1] > -0.001
      ) {
        StuckCounter.current++;
      } else {
        StuckCounter.current = 0;
      }
      if (StuckCounter.current > 10) {
        api.velocity.set(Math.random() * 2 - 1, 1);
      }
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    // @ts-expect-error
    <mesh ref={ref} name={"ball"}>
      <sphereGeometry args={[ball.radius]} />
      <meshToonMaterial color={ball.color} />
    </mesh>
  );
};
