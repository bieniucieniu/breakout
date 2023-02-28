import { useCircle } from "@react-three/p2";

export const Ball = ({
  position,
  radius,
  material,
}: {
  position: [number, number];
  radius: number;
  material?: p2.Material;
}) => {
  const [ref] = useCircle(() => ({
    type: "Dynamic",
    mass: 1,
    position,
    material,
    args: [radius],
  }));

  return (
    // @ts-expect-error
    <mesh ref={ref} name={"ball"}>
      <sphereGeometry args={[radius]} />
      <meshToonMaterial color="white" />
    </mesh>
  );
};
