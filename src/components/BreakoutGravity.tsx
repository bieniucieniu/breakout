import Game from "./breakoutGravity";
import { GameNavigation } from "./game/Navigation";
import { breakout, game, placeholder } from "./styles/breakout.css";
import { useStorage } from "../storage";
import { GamePauseMenu } from "./game/PauseMenu";
import { GameStartMenu } from "./game/StartMenu";
import { GameOverMenu } from "./game/OverMenu";
import { useEffect, useRef } from "react";
import type { KeyboardEvent, TouchEvent } from "react";
import { gameControllsHints } from "./styles/gameControllsHints.css";
import { Keys } from "./Display";

const GameControllsHints = () => {
  return (
    <div className={gameControllsHints}>
      <div>
        <Keys keys={["space", "esc"]} /> to pause
      </div>
      <div>
        <Keys keys={["<-", "A", "D", "->"]} /> movement
      </div>
    </div>
  );
};

export const BreakoutGravity = () => {
  const gameStage = useStorage((state) => state.gameStage);
  const paused = useStorage((state) => state.paused);
  const { resetGame, startGame, switchPaused, setupGame } = useStorage(
    (state) => ({
      startGame: state.startGame,
      resetGame: state.resetGame,
      switchPaused: state.switchPaused,
      setupGame: state.setupGame,
    })
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
      onKeyUp: (e: KeyboardEvent) => {
        switch (e.code) {
          case "KeyA":
          case "ArrowLeft":
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
};
