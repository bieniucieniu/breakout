import { useStorage } from "@/storage";

export const Boarder = () => {
  const { boardArgs, border } = useStorage((state) => ({
    config: state.config.game,
    border: state.config.game.border,
    boardArgs: state.config.game.args,
  }));

  return (
    <>
      <mesh position={[-(boardArgs[0] + border.tickness) / 2, 0, 0]}>
        <boxGeometry args={[border.tickness, boardArgs[1], border.depth]} />
        <meshStandardMaterial color={border.color} />
      </mesh>
      <mesh position={[0, (boardArgs[1] + border.tickness) / 2, 0]}>
        <boxGeometry
          args={[
            boardArgs[0] + border.tickness * 2,
            border.tickness,
            border.depth,
          ]}
        />
        <meshStandardMaterial color={border.color} />
      </mesh>
      <mesh position={[(boardArgs[0] + border.tickness) / 2, 0, 0]}>
        <boxGeometry args={[border.tickness, boardArgs[1], border.depth]} />
        <meshStandardMaterial color={border.color} />
      </mesh>
    </>
  );
};
