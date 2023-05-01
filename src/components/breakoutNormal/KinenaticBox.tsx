import { Color } from "@react-three/fiber";
import { useBox } from "@react-three/p2";

export const KinematicBox = ({
  args,
  position,
  material,
  color,
}: {
  args: [width: number, height: number, depth?: number];
  position: [x: number, y: number];
  material?: p2.Material;
  color?: Color;
}) => {
  const [ref] = useBox(() => ({
    type: "Kinematic",
    args: [args[0], args[1]],
    position,
    material,
  }));

  return (
    // @ts-expect-error
    <mesh ref={ref} position={position}>
      <boxGeometry args={args} />
      <meshStandardMaterial color={color || "white"} />
    </mesh>
  );
};
