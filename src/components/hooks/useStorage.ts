import { create } from "zustand";
import { Brick } from "../game/Bricks";
import defaultConfig from "../../defaultConfig";

type Storage = {
  paused: boolean;
  setPaused: (paused: boolean) => void;
  switchPaused: () => void;
  score: number;
  setScore: (score: number) => void;
  initScore: number;
  setInitScore: (score: number) => void;
  lifes: number;
  resetLifes: () => void;
  bricks: Brick[];
  setBricks: (bricks: Brick[]) => void;
  config: typeof defaultConfig;
  setConfig: (config: typeof defaultConfig) => void;
  PadControlls: { left: Boolean; right: Boolean };
  setPadControlls: ({ left, right }: { left: Boolean; right: Boolean }) => void;
};

export const useStorage = create<Storage>((set) => ({
  paused: false,
  setPaused: (paused) => set(() => ({ paused: paused })),
  switchPaused: () => set((state) => ({ paused: !state.paused })),
  score: 0,
  setScore: (score) => set(() => ({ score: score })),
  initScore: 0,
  setInitScore: (score) => set(() => ({ initScore: score })),
  lifes: 3,
  resetLifes: () => set({ lifes: 3 }),
  bricks: [],
  setBricks: (bricks) => set({ bricks: bricks }),
  config: defaultConfig,
  setConfig: (config) => set({ config: config }),
  PadControlls: { left: false, right: false },
  setPadControlls: (args) => set({ PadControlls: args }),
}));
