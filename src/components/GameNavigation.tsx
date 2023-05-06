import { useStorage } from "../storage";
import { gameNav } from "./styles/gameNavigation.css";
import { Button } from "./Buttons";
import { Display } from "./Display";
import { useTimer, msToTime } from "../functions/timer";

export const GameNavigation = () => {
  const paused = useStorage((state) => state.paused);
  const timerConfig = useStorage((state) => state.config.game.timer);
  const switchPaused = useStorage((state) => state.switchPaused);
  const endGame = useStorage((state) => state.endGame);
  const score = useStorage((state) => state.score);
  const lives = useStorage((state) => state.lives);
  const gameType = useStorage((state) => state.gameType);

  const [time] = useTimer({
    ...timerConfig[gameType],
    onEnd:
      gameType === "time"
        ? () => endGame({ push: true, time: time })
        : undefined,
  });

  return (
    <nav className={gameNav}>
      <Button onClick={switchPaused} name={paused ? "start" : "stop"} />
      <Display text="score" value={score} />
      <Display text="lives" value={lives} />
      <Display text={msToTime(time)} />
    </nav>
  );
};
