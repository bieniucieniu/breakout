import { OrbitControls } from "@react-three/drei";
import { useEffect } from "react";
import { useStorage } from "../../hooks/useStorage";
import { BricksGrid, createBricksGrid } from "./Bricks";
import { StaticBox } from "./StatickBox";

export const Scene = () => {
  const { bricks, setBricks, config } = useStorage((state) => ({
    bricks: state.bricks,
    setBricks: state.setBricks,
    config: state.config.game,
  }));

  useEffect(() => {
    setBricks(
      createBricksGrid({
        gridSize: config.grid.gridSize,
        args: config.grid.args,
        position: [0, config.args[1] / 4],
        brickSize: config.brick.args,
      })
    );
  }, []);

  return (
    <>
      <OrbitControls />
      {config.lights.map((light, index) => (
        <pointLight key={index} position={light.position} />
      ))}
      <group>
        {/* bg */}
        <mesh position={[0, 0, -1]}>
          <planeGeometry args={config.args} />
          <meshStandardMaterial color="white" />
        </mesh>

        {/* border */}
        <StaticBox
          args={[config.border.tickness, config.args[1], config.border.depth]}
          position={[-(config.args[0] + config.border.tickness) / 2, 0]}
        />
        <StaticBox
          args={[
            config.args[0] + config.border.tickness * 2,
            config.border.tickness,
            config.border.depth,
          ]}
          position={[0, (config.args[1] + config.border.tickness) / 2]}
        />
        <StaticBox
          args={[config.border.tickness, config.args[1], config.border.depth]}
          position={[(config.args[0] + config.border.tickness) / 2, 0]}
        />

        {/* bricks */}
        <BricksGrid bricks={bricks} />
      </group>
    </>
  );
};
