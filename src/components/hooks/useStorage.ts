import { create } from "zustand";
import { Brick, createBricksGrid } from "./createBricksGrid";
import defaultConfig from "../../defaultConfig";

type Storage = {
  paused: boolean;
  setPaused: (paused: boolean) => void;
  switchPaused: () => void;
  score: number;
  increaseScore: (score: number) => void;
  resetScore: () => void;
  lifes: number;
  removeLife: () => void;
  resetLifes: () => void;
  bricks: Brick[];
  setBricks: (bricks: Brick[]) => void;
  config: typeof defaultConfig;
  setConfig: (config: typeof defaultConfig) => void;
  setupGame: () => void;
  // 0 - not in game | 1 - starting | 2 - playing | 3 - over
  gameStage: number;
  increaseGameStage: () => void;
  resetGameStage: () => void;
  endGameStage: () => void;
};

export const useStorage = create<Storage>((set) => ({
  paused: false,
  setPaused: (paused) => set(() => ({ paused: paused })),
  switchPaused: () => set((state) => ({ paused: !state.paused })),
  score: 0,
  increaseScore: (score) => set((state) => ({ score: state.score + score })),
  resetScore: () => set(() => ({ score: 0 })),
  lifes: 3,
  removeLife: () =>
    set((state) => {
      if (state.lifes > 0) {
        return { lifes: state.lifes - 1 };
      }
      return {};
    }),
  resetLifes: () => set((state) => ({ lifes: state.config.game.lifes })),
  bricks: [],
  setBricks: (bricks) => set({ bricks: bricks }),
  config: JSON.parse(JSON.stringify(defaultConfig)),
  setConfig: (config) => set({ config: config }),
  setupGame: () =>
    set((state) => ({
      paused: true,
      score: 0,
      lifes: 3,
      bricks: createBricksGrid({
        gridSize: state.config.game.grid.gridSize,
        args: state.config.game.grid.args,
        position: [0, state.config.game.args[1] / 4],
        brickSize: state.config.game.brick.args,
        maxPoints: state.config.game.brick.maxPoints,
      }),
    })),
  gameStage: 0,
  increaseGameStage: () =>
    set((state) => {
      if (state.gameStage < 3) {
        return { gameStage: state.gameStage + 1 };
      }
      return {};
    }),
  resetGameStage: () => set(() => ({ gameStage: 0 })),
  endGameStage: () => set(() => ({ gameStage: 3 })),
}));
