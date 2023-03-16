import { create } from "zustand";
import { Brick, createBricksGrid } from "./createBricksGrid";
import defaultConfig from "../defaultConfig";

type Storage = {
  paused: boolean;
  setPause: (paused: boolean) => void;
  switchPaused: () => void;
  score: number;
  increaseScore: (score: number) => void;
  resetScore: () => void;
  lives: number;
  removeLife: () => void;
  resetlives: () => void;
  bricks: Brick[];
  setBricks: (bricks: Brick[]) => void;
  config: typeof defaultConfig;
  setConfig: (config: typeof defaultConfig) => void;
  setupGame: () => void;
  gameStage: "starting" | "playing" | "over";
  resetGameStage: () => void;
  setGameStage: (stage: "starting" | "playing" | "over") => void;
  isTouchEnabled: boolean;
  setIsTouchEnabled: (enabled: boolean) => void;
};

export const useStorage = create<Storage>((set) => ({
  paused: false,
  setPause: (paused) => set(() => ({ paused: paused })),
  switchPaused: () => set((state) => ({ paused: !state.paused })),
  score: 0,
  increaseScore: (score) => set((state) => ({ score: state.score + score })),
  resetScore: () => set(() => ({ score: 0 })),
  lives: 3,
  removeLife: () =>
    set((state) => {
      if (state.lives > 0) {
        return { lives: state.lives - 1 };
      }
      return {};
    }),
  resetlives: () => set((state) => ({ lives: state.config.game.lives })),
  bricks: [],
  setBricks: (bricks) => set({ bricks: bricks }),
  config: JSON.parse(JSON.stringify(defaultConfig)),
  setConfig: (config) => set({ config: config }),
  setupGame: () =>
    set((state) => ({
      paused: true,
      score: 0,
      lives: 3,
      bricks: createBricksGrid({
        gridSize: state.config.game.grid.gridSize,
        args: state.config.game.grid.args,
        position: [0, state.config.game.args[1] / 4],
        brickSize: state.config.game.brick.args,
        maxPoints: state.config.game.brick.maxPoints,
      }),
    })),
  gameStage: "starting",
  setGameStage: (stage) => set(() => ({ gameStage: stage })),
  resetGameStage: () => set(() => ({ gameStage: "starting" })),
  isTouchEnabled: false,
  setIsTouchEnabled: (enabled) => set(() => ({ isTouchEnabled: enabled })),
}));
