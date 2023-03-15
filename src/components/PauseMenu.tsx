import {
  menuBG,
  menuButtons,
  pauseMenuTitle,
  pauseMenuContent,
} from "./styles/gameMenu.css";
import { Button } from "./basicComponents";
import { useStorage } from "../hooks/useStorage";
import { useEffect } from "react";
import { Link } from "wouter";

export const PauseMenu = () => {
  const setPause = useStorage((state) => state.setPause);
  const paused = useStorage((state) => state.paused);
  const gameStage = useStorage((state) => state.gameStage);
  const switchPaused = useStorage((state) => state.switchPaused);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      e.key === " " && switchPaused();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div
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
