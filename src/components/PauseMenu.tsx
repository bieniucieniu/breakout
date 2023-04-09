import {
  menuBG,
  menuButtons,
  pauseMenuTitle,
  pauseMenuContent,
} from "./styles/gameMenu.css";
import { Button, LinkButton } from "./Buttons";
import { useStorage } from "../hooks/useStorage";
import { useEffect, useRef } from "react";

export const PauseMenu = () => {
  const setPause = useStorage((state) => state.setPause);
  const endGame = useStorage((state) => state.endGame);
  const paused = useStorage((state) => state.paused);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    if (paused) {
      ref.current.focus();
    }
  }, [paused]);

  return (
    <div
      ref={ref}
      className={menuBG}
      style={{
        visibility: paused ? "visible" : "hidden",
      }}
    >
      <div className={pauseMenuContent}>
        <h1 className={pauseMenuTitle}>Paused</h1>
        <div className={menuButtons}>
          <Button name="resume" onClick={() => setPause(false)} />
          <LinkButton name="quit to menu" href="/" onClick={() => endGame()} />
        </div>
      </div>
    </div>
  );
};
