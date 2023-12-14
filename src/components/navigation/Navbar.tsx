import { useStorage } from "@/storage";
import { gameNav } from "@/styles/gameNavigation.css";
import { Button } from "@/components/Buttons";

import { Display } from "@/components/Display";
import { useTimer, msToTime } from "@/functions/timer";
import { useEffect } from "react";

export default function GameNavigatioe() {
  const paused = useStorage((state) => state.paused);
  const timerConfig = useStorage((state) => state.config.game.timer);
  const switchPaused = useStorage((state) => state.switchPaused);
  const endGame = useStorage((state) => state.endGame);
  const score = useStorage((state) => state.score);
  const lives = useStorage((state) => state.lives);
  const gameStage = useStorage((state) => state.gameStage);
  const time = useStorage((state) => state.time);
  const setTime = useStorage((state) => state.setTime);

  const [_, reset] = useTimer({
    ...timerConfig["classic"],
    isRunning: !paused && gameStage === "playing",
    onTick: (t) => setTime(t),
    onEnd: () => {
      endGame();
    },
  });

  useEffect(() => {
    if (gameStage === "init") reset();
  }, [gameStage]);

  return (
    <nav className={gameNav}>
      <Button onClick={switchPaused}>{paused ? "start" : "stop"}</Button>
      <Display text="score" value={score} />
      <Display text="lives" value={lives} />
      <Display text={msToTime(time)} />
    </nav>
  );
}