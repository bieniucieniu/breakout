import Game from "./game";
import { GameNavigation } from "./GameNavigation";
import { breakout, game } from "./styles/breakout.css";
import { useStorage } from "../hooks/useStorage";
import { PauseMenu } from "./PauseMenu";
import { StartMenu } from "./StartMenu";
import { GameOverMenu } from "./GameOverMenu";
import { KeyboardEvent, TouchEvent, useEffect, useRef } from "react";

export const Breakout = () => {
  const gameStage = useStorage((state) => state.gameStage);
  const paused = useStorage((state) => state.paused);
  const { setGameStage, switchPaused, setPaddleControlls, setupGame } =
    useStorage((state) => ({
      setGameStage: state.setGameStage,
      switchPaused: state.switchPaused,
      setPaddleControlls: state.setPaddleControlls,
      setupGame: state.setupGame,
    }));

  const controlls = {
    starting: {
      onKeyDown: (e: KeyboardEvent) => {
        switch (e.code) {
          case "Space":
            setGameStage("playing");
            break;
        }
      },
      onTouchStart: () => {
        setGameStage("playing");
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
            setGameStage("starting");
            break;
        }
      },
      onTouchStart: () => {
        setGameStage("starting");
      },
    },
  };

  useEffect(() => {
    if (gameStage === "starting") setupGame();
  }, [gameStage]);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    if (!paused) {
      ref.current.focus();
    }
  }, [paused]);

  return (
    <div ref={ref} className={breakout} tabIndex={0} {...controlls[gameStage]}>
      {
        {
          starting: <StartMenu />,
          playing: <PauseMenu />,
          over: <GameOverMenu />,
        }[gameStage]
      }
      <GameNavigation />
      <Game className={game} cameraPosition={[0, 0, 64]} />
    </div>
  );
};
