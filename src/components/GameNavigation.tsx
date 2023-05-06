import { useStorage } from "../storage";
import { gameNav } from "./styles/gameNavigation.css";
import { Button } from "./Buttons";
import { Display } from "./Display";
import { useTimer, msToTime } from "../functions/timer";

export const GameNavigation = () => {
  const paused = useStorage((state) => state.paused);
  const timerConfig = useStorage((state) => state.config.game.timer);
  const switchPaused = useStorage((state) => state.switchPaused);
  const score = useStorage((state) => state.score);
  const lives = useStorage((state) => state.lives);
  const gameType = useStorage((state) => state.gameType);

  const [time] = useTimer(timerConfig[gameType]);

  return (
    <nav className={gameNav}>
      <Button onClick={switchPaused} name={paused ? "start" : "stop"} />
      <Display name="score" value={score} />
      <Display name="lives" value={lives} />
      <Display name={msToTime(time)} />
    </nav>
  );
};
