import Game from "./game";
import { GameNavigation } from "./GameNavigation";

export const Breakout = () => {
  return (
    <div
      style={{
        height: "100vh",
        backgroundColor: "black",
        overflow: "hidden",
      }}
    >
      <GameNavigation />
      <Game
        style={{
          width: "100vw",
          height: "100vh",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 1,
        }}
        cameraPosition={[0, 15, 64]}
      />
    </div>
  );
};
