import { useBox } from "@react-three/p2";

export const StaticBox = ({
  args,
  position,
  material,
  color,
}: {
  args: [width: number, height: number, depth?: number];
  position: [x: number, y: number];
  material?: p2.Material;
  color?: THREE.Color;
}) => {
  const [ref] = useBox(() => ({
    type: "Static",
    args: [args[0], args[1]],
    position,
    material,
  }));

  return (
    // @ts-expect-error
    <mesh ref={ref}>
      <boxBufferGeometry args={args} />
      <meshStandardMaterial color={color ? color : "white"} />
    </mesh>
  );
};
