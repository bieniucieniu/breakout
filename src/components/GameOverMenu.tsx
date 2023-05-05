import { menuBG } from "./styles/gameMenu.css";
import { centeredTitle } from "./styles/basicStyles.css";
import { useStorage } from "../storage";
import { Keys } from "./Display";

export const GameOverMenu = () => {
  const lastScore = useStorage((state) => state.lastScore);
  const gameType = useStorage((state) => state.gameType);
  return (
    <div className={menuBG}>
      <h1 className={centeredTitle}>
        Game Over <br />
        your score: {lastScore[gameType]}
        <br />
        <Keys keys={["Space", "tap screen"]} />
        to restart
      </h1>
    </div>
  );
};
