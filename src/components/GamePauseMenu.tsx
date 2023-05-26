import {
  menuBG,
  menuButtons,
  pauseMenuTitle,
  pauseMenuContent,
} from "./styles/gameMenu.css";
import { Button, LinkButton } from "./Buttons";
import { useStorage } from "../storage";

export const GamePauseMenu = () => {
  const setPause = useStorage((state) => state.setPause);
  const endGame = useStorage((state) => state.endGame);
  const paused = useStorage((state) => state.paused);

  return (
    <div
      className={menuBG}
      style={{
        visibility: paused ? "visible" : "hidden",
      }}
    >
      <div className={pauseMenuContent}>
        <h1 className={pauseMenuTitle}>Paused</h1>
        <div className={menuButtons}>
          <Button onClick={() => setPause(false)}>resume</Button>
          <LinkButton href="/" onClick={() => endGame()}>
            quit to menu
          </LinkButton>
        </div>
      </div>
    </div>
  );
};
