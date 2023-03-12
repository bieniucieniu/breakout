import Game from "./game";
import { GameNavigation } from "./GameNavigation";
import { breakout, game } from "./styles/breakout.css";

export const Breakout = () => {
  console.log(breakout);

  return (
    <div className={breakout}>
      <GameNavigation />
      <Game className={game} cameraPosition={[0, 15, 64]} />
    </div>
  );
};
