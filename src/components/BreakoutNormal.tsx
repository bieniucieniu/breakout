import Game from "./breakoutNormal";
import { GameNavigation } from "./GameNavigation";
import { breakout, game } from "./styles/breakout.css";
import { useStorage } from "../storage";
import { PauseMenu } from "./GamePauseMenu";
import { StartMenu } from "./StartMenu";
import { GameOverMenu } from "./GameOverMenu";
import { useEffect, useRef } from "react";
import type { KeyboardEvent, TouchEvent } from "react";
import { gameControllsHints } from "./styles/gameControllsHints.css";
import { Keys } from "./Display";

export const BreakoutNormal = () => {
  const gameStage = useStorage((state) => state.gameStage);
  const paused = useStorage((state) => state.paused);
  const { resetGame, startGame, switchPaused, setPaddleControlls, setupGame } =
    useStorage((state) => ({
      startGame: state.startGame,
      resetGame: state.resetGame,
      switchPaused: state.switchPaused,
      setPaddleControlls: state.setPaddleControlls,
      setupGame: state.setupGame,
    }));

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
          case "KeyA":
          case "ArrowLeft":
            setPaddleControlls({ left: true });
            break;
          case "KeyS":
          case "ArrowDown":
            setPaddleControlls({ down: true });
            break;
          case "KeyW":
          case "ArrowUp":
            setPaddleControlls({ up: true });
            break;
          case "KeyD":
          case "ArrowRight":
            setPaddleControlls({ right: true });
            break;
        }
      },
      onKeyUp: (e: KeyboardEvent) => {
        switch (e.code) {
          case "KeyA":
          case "ArrowLeft":
            setPaddleControlls({ left: false });
            break;
          case "KeyS":
          case "ArrowDown":
            setPaddleControlls({ down: false });
            break;
          case "KeyW":
          case "ArrowUp":
            setPaddleControlls({ up: false });
          case "KeyD":
          case "ArrowRight":
            setPaddleControlls({ right: false });
            break;
        }
      },
      onTouchStart: (e: TouchEvent) => {
        const touch = e.touches[0];
        if (touch.clientX < window.innerWidth / 2) {
          setPaddleControlls({ left: true });
        } else {
          setPaddleControlls({ right: true });
        }
      },
      onTouchEnd: (e: TouchEvent) => {
        if (!e.touches.length) {
          setPaddleControlls({ left: false, right: false });
          return;
        }
        const touch = e.changedTouches[0];
        if (touch.clientX < window.innerWidth / 2) {
          setPaddleControlls({ left: false });
        } else {
          setPaddleControlls({ right: false });
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
          init: <StartMenu />,
          playing: <PauseMenu />,
          over: <GameOverMenu />,
        }[gameStage]
      }
      <GameNavigation />
      <Game className={game} />
    </div>
  );
};
