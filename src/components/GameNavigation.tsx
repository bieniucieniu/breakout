import { useStorage } from "../hooks/useStorage";
import { navbar } from "./styles/gameNavigation.css";
import { Button, ValueDisplay } from "./basicComponents";

export const GameNavigation = () => {
  const paused = useStorage((state) => state.paused);
  const switchPaused = useStorage((state) => state.switchPaused);
  const score = useStorage((state) => state.score);
  const lives = useStorage((state) => state.lives);

  return (
    <nav className={navbar}>
      <Button onClick={switchPaused} name={paused ? "start" : "stop"} />
      <ValueDisplay name="score" value={score} />
      <ValueDisplay name="lives" value={lives} />
    </nav>
  );
};
