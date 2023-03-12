import { useStorage } from "./hooks/useStorage";
import { navbar } from "./styles/navbar.css";
import { Button, ValueDisplay } from "./basicComponents";

export const GameNavigation = () => {
  const paused = useStorage((state) => state.paused);
  const switchPaused = useStorage((state) => state.switchPaused);
  const score = useStorage((state) => state.score);
  const lifes = useStorage((state) => state.lifes);
  const setGame = useStorage((state) => state.setGame);

  return (
    <nav className={navbar}>
      <Button onClick={switchPaused} name={paused ? "start" : "stop"} />
      <ValueDisplay name="score" value={score} />
      <ValueDisplay name="lifes" value={lifes} />
      <Button name="resetgame" onClick={setGame} />
    </nav>
  );
};
