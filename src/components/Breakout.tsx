import Game from "./game";
import { GameNavigation } from "./GameNavigation";
import { breakout, game } from "./styles/breakout.css";
import { useStorage } from "../hooks/useStorage";
import { PauseMenu } from "./PauseMenu";
import { StartMenu } from "./StartMenu";

export const Breakout = () => {
  const gameStage = useStorage((state) => state.gameStage);

  return (
    <div className={breakout}>
      {gameStage === "starting" ? <StartMenu /> : <PauseMenu />}
      <GameNavigation />
      <Game className={game} cameraPosition={[0, 0, 64]} />
    </div>
  );
};
