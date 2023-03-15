import Game from "./game";
import { GameNavigation } from "./GameNavigation";
import { breakout, game } from "./styles/breakout.css";
import { useStorage } from "./hooks/useStorage";
import { PauseMenu } from "./PauseMenu";

export const Breakout = () => {
  console.log(breakout);
  const paused = useStorage((state) => state.paused);

  return (
    <div className={breakout}>
      <PauseMenu />
      <GameNavigation />
      <Game className={game} cameraPosition={[0, 15, 64]} />
    </div>
  );
};
