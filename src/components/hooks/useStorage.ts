import { create } from "zustand";
import { Brick } from "../game/Bricks";
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
  PadControlls: { left: Boolean; right: Boolean };
  setPadControlls: ({ left, right }: { left: Boolean; right: Boolean }) => void;
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
  PadControlls: { left: false, right: false },
  setPadControlls: (args) => set({ PadControlls: args }),
  resetGame: () =>
    set(() => {
      return {
        paused: false,
        score: 0,
        lifes: 3,
        bricks: [],
        config: defaultConfig,
        PadControlls: { left: false, right: false },
      };
    }),
}));
