import { create } from "zustand";
import { Brick } from "../components/game/Bricks";
import defaultConfig from "../defaultConfig";

type Storage = {
  paused: boolean;
  setPaused: (paused: boolean) => void;
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
  paused: false,
  setPaused: (paused) => set((state) => ({ paused: paused })),
  switchPaused: () => set((state) => ({ paused: !state.paused })),
  score: 0,
  increaseScore: (score) => set({ score }),
  lifes: 3,
  resetLifes: () => set({ lifes: 3 }),
  bricks: [],
  setBricks: (bricks) => set({ bricks: bricks }),
  config: defaultConfig,
  setConfig: (config) => set({ config: config }),
}));
