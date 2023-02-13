import { useBox } from "@react-three/p2";
import { useEffect, useRef } from "react";
import { useStorage } from "../../hooks/useStorage";

export const Pad = ({
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

  const SubcribeControlls = () => {
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
  };
  useEffect(() => {
    const unSub = SubcribeControlls();
    return unSub;
  }, []);

  return (
    //@ts-expect-error
    <mesh ref={ref} castShadow receiveShadow>
      <boxGeometry args={args} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};
