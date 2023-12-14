import { menuBG } from "@/styles/gameMenu.css";
import { centeredTitle } from "@/styles/basicStyles.css";
import { useStorage } from "@/storage";
import { Keys } from "@/components/Display";
import { msToTime } from "@/functions/timer";

export const GameOverMenu = () => {
  const { lastScore, time } = useStorage((state) => ({
    lastScore: state.lastScore,
    time: state.time,
  }));
  return (
    <div className={menuBG}>
      <h1 className={centeredTitle}>
        Game Over
        <br />
        your score: {lastScore["classic"]}
        <br />
        your time: {time ? msToTime(time) : "unknown"}
        <br />
        <Keys keys={["Space", "tap screen"]} />
        to restart
      </h1>
    </div>
  );
};
