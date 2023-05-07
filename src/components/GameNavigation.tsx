import { useStorage } from "../storage";
import { gameNav } from "./styles/gameNavigation.css";
import { Button } from "./Buttons";
import { Display } from "./Display";
import { useTimer, msToTime } from "../functions/timer";
import { useEffect } from "react";

export const GameNavigation = () => {
  const paused = useStorage((state) => state.paused);
  const timerConfig = useStorage((state) => state.config.game.timer);
  const switchPaused = useStorage((state) => state.switchPaused);
  const endGame = useStorage((state) => state.endGame);
  const score = useStorage((state) => state.score);
  const lives = useStorage((state) => state.lives);
  const gameType = useStorage((state) => state.gameType);
  const gameStage = useStorage((state) => state.gameStage);
  const setLastTime = useStorage((state) => state.setLastTime);

  const [time] = useTimer({
    ...timerConfig[gameType],
    isRunning: !paused && gameStage === "playing",
    onEnd:
      gameType === "time"
        ? () => endGame({ push: true, time: time })
        : undefined,
  });

  useEffect(() => {
    if (gameStage === "over") {
      setLastTime(time);
    }
  }, [gameStage]);

  return (
    <nav className={gameNav}>
      <Button onClick={switchPaused} name={paused ? "start" : "stop"} />
      <Display text="score" value={score} />
      <Display text="lives" value={lives} />
      <Display text={msToTime(time)} />
    </nav>
  );
};
