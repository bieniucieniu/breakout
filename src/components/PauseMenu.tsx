import {
  menuBG,
  menuButtons,
  pauseMenuTitle,
  pauseMenuContent,
} from "./styles/gameMenu.css";
import { Button } from "./basicComponents";
import { useStorage } from "../hooks/useStorage";
import { Link } from "wouter";
import { useEffect, useRef } from "react";

export const PauseMenu = () => {
  const setPause = useStorage((state) => state.setPause);
  const paused = useStorage((state) => state.paused);
  const gameStage = useStorage((state) => state.gameStage);

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
        visibility: gameStage === "playing" && paused ? "visible" : "hidden",
      }}
    >
      <div className={pauseMenuContent}>
        <h1 className={pauseMenuTitle}>Paused</h1>
        <div className={menuButtons}>
          <Button name="resume" onClick={() => setPause(false)} />
          <Link href="/">
            <Button name="quit" />
          </Link>
        </div>
      </div>
    </div>
  );
};
