import {
  menuBG,
  menuButtons,
  pauseMenuTitle,
  pauseMenuContent,
} from "./styles/gameMenu.css";
import { Button } from "./basicComponents";
import { useStorage } from "../hooks/useStorage";
import { useLocation } from "wouter";
import { useEffect, useRef } from "react";

export const PauseMenu = () => {
  const setPause = useStorage((state) => state.setPause);
  const setuptGame = useStorage((state) => state.setupGame);
  const setGameStage = useStorage((state) => state.setGameStage);
  const paused = useStorage((state) => state.paused);
  const gameStage = useStorage((state) => state.gameStage);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    if (paused) {
      ref.current.focus();
    }
  }, [paused]);

  const [_location, setLocation] = useLocation();

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
          <Button
            name="quit"
            onClick={() => {
              setuptGame();
              setGameStage("starting");
              setLocation("/");
            }}
          />
        </div>
      </div>
    </div>
  );
};
