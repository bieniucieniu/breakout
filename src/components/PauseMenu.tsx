import {
  pauseMenu,
  pauseMenuButtons,
  pauseMenuContent,
  pauseMenuTitle,
} from "./styles/pauseMenu.css";
import { Button } from "./basicComponents";
import { useStorage } from "./hooks/useStorage";

export const PauseMenu = () => {
  const setPause = useStorage((state) => state.setPaused);

  return (
    <div className={pauseMenu}>
      <div className={pauseMenuContent}>
        <h1 className={pauseMenuTitle}>Paused</h1>
        <div className={pauseMenuButtons}>
          <Button name="resume" onClick={() => setPause(false)} />
          <Button name="quit" />
        </div>
      </div>
    </div>
  );
};
