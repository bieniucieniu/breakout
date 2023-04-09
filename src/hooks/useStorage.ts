import { create } from "zustand";
import { Brick, createBricksGrid } from "./createBricksGrid";
import defaultConfig from "../defaultConfig";
import { addScore } from "../firebase";

type Storage = {
  paused: boolean;
  setPause: (paused: boolean) => void;
  switchPaused: () => void;
  score: number;
  increaseScore: (score: number) => void;
  lives: number;
  removeLife: () => void;
  resetlives: () => void;
  bricks: Brick[];
  setBricks: (bricks: Brick[]) => void;
  config: typeof defaultConfig;
  setConfig: (config: typeof defaultConfig) => void;
  setupGame: () => void;
  gameStage: "init" | "playing" | "over";
  startGame: () => void;
  endGame: () => void;
  resetGame: () => void;
  paddleControlls: {
    left: boolean;
    right: boolean;
  };
  setPaddleControlls: (controlls: { left?: boolean; right?: boolean }) => void;
};

export const useStorage = create<Storage>((set) => ({
  paused: false,
  score: 0,
  lives: 3,
  gameStage: "init",
  paddleControlls: { left: false, right: false },
  bricks: [],
  config: JSON.parse(JSON.stringify(defaultConfig)),
  setPause: (paused) => set(() => ({ paused: paused })),
  switchPaused: () => set((state) => ({ paused: !state.paused })),
  increaseScore: (score) => set((state) => ({ score: state.score + score })),
  removeLife: () =>
    set((state) => {
      if (state.lives <= 1) {
        state.endGame();
        return { lives: 0 };
      }
      if (state.lives > 0) {
        return { lives: state.lives - 1 };
      }
      return {};
    }),
  resetlives: () => set((state) => ({ lives: state.config.game.lives })),
  setBricks: (bricks) => set({ bricks: bricks }),
  setConfig: (config) => set({ config: config }),
  setupGame: () =>
    set((state) => ({
      paused: false,
      score: 0,
      lives: 3,
      gameStage: "init",
      paddleControlls: { left: false, right: false },
      bricks: createBricksGrid({
        gridSize: state.config.game.grid.gridSize,
        args: state.config.game.grid.args,
        position: [0, state.config.game.args[1] / 4],
        brickSize: state.config.game.brick.args,
        maxPoints: state.config.game.brick.maxPoints,
      }),
    })),
  startGame: () => {
    set((state) => {
      if (state.gameStage === "init") {
        return { gameStage: "playing" };
      }
      return {};
    });
  },
  endGame: () => {
    set((state) => {
      if (state.gameStage === "playing") {
        addScore({ score: state.score });
        return {
          gameStage: "over",
          paddleControlls: { left: false, right: false },
          paused: true,
        };
      }
      return {};
    });
  },
  resetGame: () => {
    set((state) => {
      if (state.gameStage === "over" || state.gameStage === "playing") {
        return { gameStage: "init" };
      }
      return {};
    });
  },
  setPaddleControlls: (controlls) =>
    set((state) => ({
      paddleControlls: { ...state.paddleControlls, ...controlls },
    })),
}));
