import { pauseMenu, pauseMenuContent } from "./styles/pauseMenu.css";
import { Button } from "./basicComponents";

export const PauseMenu = () => {
  return (
    <div className={pauseMenu}>
      <div className={pauseMenuContent}>
        <h1>Paused</h1>
        <Button name="resume" />
        <Button name="quit" />
      </div>
    </div>
  );
};
