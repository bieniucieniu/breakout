import Game from "./components/game";
import { GameNavigation } from "./components/gameNavigation";

export const App = () => {
  return (
    <div
      style={{
        height: "100vh",
        backgroundColor: "black",
        overflow: "hidden",
      }}
    >
      <GameNavigation
        style={{
          position: "sticky",
          top: 0,
          zIndex: 2,
          height: "4rem",
        }}
      />
      {/* <div
        style={{
          zIndex: 2,
          display: "Grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          height: "100%",
        }}
      >
        <div
          style={{
            gridColumn: "1",
            backgroundColor: "red",
            zIndex: 2,
          }}
        ></div>
        <div
          style={{
            gridColumn: "2",
            zIndex: 2,
          }}
        ></div>
        <div
          style={{
            gridColumn: "3",
            zIndex: 2,
            backgroundColor: "red",
          }}
        ></div>
      </div> */}
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
