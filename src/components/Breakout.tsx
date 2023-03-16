import Game from "./game";
import { GameNavigation } from "./GameNavigation";
import { breakout, game } from "./styles/breakout.css";
import { useStorage } from "../hooks/useStorage";
import { PauseMenu } from "./PauseMenu";
import { StartMenu } from "./StartMenu";
import { useEffect } from "react";

const isTouchEnabled = () => {
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
};

export const Breakout = () => {
  const gameStage = useStorage((state) => state.gameStage);
  const SetIsTouchEnabled = useStorage((state) => state.setIsTouchEnabled);

  useEffect(() => {
    SetIsTouchEnabled(isTouchEnabled());
    return () => SetIsTouchEnabled(false);
  }, []);

  return (
    <div className={breakout}>
      {gameStage === "starting" ? <StartMenu /> : <PauseMenu />}
      <GameNavigation />
      <Game className={game} cameraPosition={[0, 0, 64]} />
    </div>
  );
};
