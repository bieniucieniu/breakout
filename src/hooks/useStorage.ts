import { create } from "zustand";
import { Brick } from "../types";
import defaultConfig from "../defaultConfig";

type Storage = {
  Paused: boolean;
  switchPaused: () => void;
  score: number;
  increaseScore: (score?: number) => void;
  lifes: number;
  resetLifes: () => void;
  bricks: Brick[];
  setBricks: (bricks: Brick[]) => void;
  config: typeof defaultConfig;
  setConfig: (config: typeof defaultConfig) => void;
};

export const useStorage = create<Storage>((set) => ({
  Paused: false,
  switchPaused: () => set((state) => ({ Paused: !state.Paused })),
  score: 0,
  increaseScore: (score) => set({ score }),
  lifes: 3,
  resetLifes: () => set({ lifes: 3 }),
  bricks: [],
  setBricks: (bricks) => set({ bricks: bricks }),
  config: defaultConfig,
  setConfig: (config) => set({ config: config }),
}));
