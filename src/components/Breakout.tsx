import Game from "./game";
import { GameNavigation } from "./GameNavigation";
import { breakout, game } from "./styles/breakout.css";
import { useStorage } from "../hooks/useStorage";
import { PauseMenu } from "./PauseMenu";
import { StartMenu } from "./StartMenu";
import type { KeyboardEvent, TouchEvent } from "react";

export const Breakout = () => {
  const gameStage = useStorage((state) => state.gameStage);
  const { setGameStage, switchPaused, setPaddleControlls } = useStorage(
    (state) => ({
      setGameStage: state.setGameStage,
      switchPaused: state.switchPaused,
      setPaddleControlls: state.setPaddleControlls,
    })
  );
  const startMenuControlls = {
    onKeyDown: (e: KeyboardEvent) => {
      switch (e.code) {
        case "Space":
          switchPaused();
          if (gameStage === "starting") {
            setGameStage("playing");
          }
          break;
      }
    },
  };

  const gameControlls = {
    onKeyDown: (e: KeyboardEvent) => {
      switch (e.code) {
        case "Space":
        case "Escape":
          switchPaused();
          break;
        case "KeyA":
        case "ArrowLeft":
          setPaddleControlls({ left: true });
          break;
        case "KeyD":
        case "ArrowRight":
          setPaddleControlls({ right: true });
          break;
      }
    },
    onKeyUp: (e: KeyboardEvent) => {
      switch (e.code) {
        case "KeyA":
        case "ArrowLeft":
          setPaddleControlls({ left: false });
          break;
        case "KeyD":
        case "ArrowRight":
          setPaddleControlls({ right: false });
          break;
      }
    },
    onTouchStart: (e: TouchEvent) => {},
    onTouchEnd: (e: TouchEvent) => {},
  };
  return (
    <div
      className={breakout}
      tabIndex={0}
      {...(gameStage === "starting" ? startMenuControlls : gameControlls)}
    >
      {gameStage === "starting" ? <StartMenu /> : <PauseMenu />}
      <GameNavigation />
      <Game className={game} cameraPosition={[0, 0, 64]} />
    </div>
  );
};
