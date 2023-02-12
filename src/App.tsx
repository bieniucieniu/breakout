import Game from "./components/game";

export const App = () => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "black",
        overflow: "hidden",
        display: "Grid",
        gridTemplateColumns: "1fr 1fr 1fr",
      }}
    >
      {/* <div
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
      ></div> */}
      <Game
        style={{
          width: "100vw",
          height: "100vh",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 1,
        }}
      />
    </div>
  );
};
