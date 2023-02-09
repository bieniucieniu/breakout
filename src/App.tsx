import { useState } from "react";
import { Scene } from "./components/game/Scene";

export const App = () => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "black",
        overflow: "hidden",
      }}
    >
      <Scene />
    </div>
  );
};
