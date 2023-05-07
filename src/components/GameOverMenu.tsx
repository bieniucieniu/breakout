import { menuBG } from "./styles/gameMenu.css";
import { centeredTitle } from "./styles/basicStyles.css";
import { useStorage } from "../storage";
import { Keys } from "./Display";

export const GameOverMenu = () => {
  const { lastScore, lastTime } = useStorage((state) => ({
    lastScore: state.lastScore,
    lastTime: state.lastTime,
  }));
  const gameType = useStorage((state) => state.gameType);
  return (
    <div className={menuBG}>
      <h1 className={centeredTitle}>
        Game Over <br />
        your score: {lastScore[gameType]}
        your time: {lastTime}
        <br />
        <Keys keys={["Space", "tap screen"]} />
        to restart
      </h1>
    </div>
  );
};
