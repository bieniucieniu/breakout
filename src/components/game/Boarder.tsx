import { useStorage } from "../hooks/useStorage";
import { KinematicBox } from "./KinenaticBox";

export const Boarder = () => {
  const { boardArgs, border, materials } = useStorage((state) => ({
    config: state.config.game,
    border: state.config.game.border,
    boardArgs: state.config.game.args,
    materials: state.config.game.materials,
  }));

  return (
    <>
      <KinematicBox
        args={[border.tickness, boardArgs[1], border.depth]}
        position={[-(boardArgs[0] + border.tickness) / 2, 0]}
        color={border.color}
        material={materials.default}
      />
      <KinematicBox
        args={[
          boardArgs[0] + border.tickness * 2,
          border.tickness,
          border.depth,
        ]}
        position={[0, (boardArgs[1] + border.tickness) / 2]}
        color={border.color}
        material={materials.default}
      />
      <KinematicBox
        args={[border.tickness, boardArgs[1], border.depth]}
        position={[(boardArgs[0] + border.tickness) / 2, 0]}
        color={border.color}
        material={materials.default}
      />
    </>
  );
};
