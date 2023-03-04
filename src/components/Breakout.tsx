import Game from "./game";
import { GameNavigation } from "./GameNavigation";

export const Breakout = () => {
  return (
    <>
      <GameNavigation
        style={{
          bottom: 0,
          height: "4rem",
        }}
      />
      <Game
        style={{
          width: "100vw",
          height: "100vh",
          position: "absolute",
          top: 0,
          left: 0,
        }}
        cameraPosition={[0, 15, 64]}
      />
    </>
  );
};
