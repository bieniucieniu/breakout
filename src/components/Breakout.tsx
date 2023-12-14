import Game from "@/components/breakout";
import { GameNavigation } from "@/components/game/Navigation";
import { breakout, game, placeholder } from "@/styles/breakout.css";
import { useStorage } from "@/storage";
import { GamePauseMenu } from "@/components/game/PauseMenu";
import { GameStartMenu } from "@/components/game/StartMenu";
import { GameOverMenu } from "@/components/game/OverMenu";
import { useEffect, useRef } from "react";
import type { KeyboardEvent } from "react";

export default function BreakoutNormal() {
  const gameStage = useStorage((state) => state.gameStage);
  const paused = useStorage((state) => state.paused);
  const { resetGame, startGame, switchPaused, setupGame } = useStorage(
    (state) => ({
      startGame: state.startGame,
      resetGame: state.resetGame,
      switchPaused: state.switchPaused,
      setupGame: state.setupGame,
    }),
  );

  const controlls = {
    init: {
      onKeyDown: (e: KeyboardEvent) => {
        switch (e.code) {
          case "Space":
            startGame();
            break;
        }
      },
      onTouchStart: () => {
        startGame();
      },
    },

    playing: {
      onKeyDown: (e: KeyboardEvent) => {
        switch (e.code) {
          case "Space":
          case "Escape":
            switchPaused();
            break;
        }
      },
    },

    over: {
      onKeyDown: (e: KeyboardEvent) => {
        switch (e.code) {
          case "Space":
            resetGame();
            break;
        }
      },
      onTouchStart: () => {
        resetGame();
      },
    },
  };

  useEffect(() => {
    if (gameStage === "init") setupGame();
  }, [gameStage]);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    if (!paused) {
      ref.current.focus();
    }
  }, [paused, gameStage, undefined]);

  return (
    <div ref={ref} className={breakout} tabIndex={0} {...controlls[gameStage]}>
      {
        {
          init: <GameStartMenu />,
          playing: <GamePauseMenu />,
          over: <GameOverMenu />,
        }[gameStage]
      }
      <GameNavigation />
      <Game className={game} />
      <div className={placeholder}></div>
    </div>
  );
}
