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
  resetGame: () => void;
};

export const useStorage = create<Storage>((set) => ({
  paused: false,
  setPaused: (paused) => set(() => ({ paused: paused })),
  switchPaused: () => set((state) => ({ paused: !state.paused })),
  score: 0,
  increaseScore: (score) => set((state) => ({ score: state.score + score })),
  resetScore: () => set(() => ({ score: 0 })),
  lifes: 3,
  removeLife: () => set((state) => ({ lifes: state.lifes - 1 })),
  resetLifes: () => set({ lifes: 3 }),
  bricks: [],
  setBricks: (bricks) => set({ bricks: bricks }),
  config: defaultConfig,
  setConfig: (config) => set({ config: config }),
  resetGame: () =>
    set((state) => {
      return {
        paused: false,
        score: 0,
        lifes: 3,
        bricks: createBricksGrid({
          gridSize: state.config.game.grid.gridSize,
          args: state.config.game.grid.args,
          position: [0, state.config.game.args[1] / 4],
          brickSize: state.config.game.brick.args,
          maxPoints: state.config.game.brick.maxPoints,
        }),
        PadControlls: { left: false, right: false },
      };
    }),
}));
