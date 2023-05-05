import { useStorage } from "../storage";
import { gameNav } from "./styles/gameNavigation.css";
import { Button } from "./Buttons";
import { Display } from "./Display";
import { Timer } from "./Timer";

export const GameNavigation = () => {
  const paused = useStorage((state) => state.paused);
  const switchPaused = useStorage((state) => state.switchPaused);
  const score = useStorage((state) => state.score);
  const lives = useStorage((state) => state.lives);
  const config = useStorage((state) => state.config);
  const setConfig = useStorage((state) => state.setConfig);
  const { resetGame } = useStorage((state) => ({
    resetGame: state.resetGame,
  }));

  return (
    <nav className={gameNav}>
      <Button onClick={switchPaused} name={paused ? "start" : "stop"} />
      <Display name="score" value={score} />
      <Display name="lives" value={lives} />
      <Timer />
    </nav>
  );
};
