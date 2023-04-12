import { useStorage } from "../storage";
import { navbar } from "./styles/gameNavigation.css";
import { Button } from "./Buttons";
import { Display } from "./Display";

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

  const easyMode = () => {
    setConfig({
      game: {
        ...config.game,
        brick: {
          ...config.game.brick,
          maxPoints: 1,
        },
      },
    });

    resetGame();
  };

  return (
    <nav className={navbar}>
      <Button onClick={switchPaused} name={paused ? "start" : "stop"} />
      <Button onClick={easyMode} name="easymode" />
      <Display name="score" value={score} />
      <Display name="lives" value={lives} />
    </nav>
  );
};
