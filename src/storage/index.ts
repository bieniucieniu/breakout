import { create } from "zustand";
import defaultConfig from "@/defaultConfig";

import { persist } from "zustand/middleware";

type Storage = {
  paused: boolean;
  setPause: (paused: boolean) => void;
  switchPaused: () => void;

  score: number;
  increaseScore: (score: number) => void;

  time: number;
  setTime: (t: number) => void;

  lives: number;
  removeLive: () => void;
  resetlives: () => void;

  config: typeof defaultConfig;
  setConfig: (config: typeof defaultConfig) => void;
  setupGame: () => void;

  gameStage: "init" | "playing" | "over";
  startGame: () => void;
  endGame: () => void;
  resetGame: () => void;

  lastScore: {
    classic: number;
  };
  setLastScore: (prop: { classic: number }) => void;
};

export const useStorage = create<Storage>()(
  persist(
    (set) => ({
      paused: false,
      setPause: (paused) => set(() => ({ paused: paused })),
      switchPaused: () => set((state) => ({ paused: !state.paused })),

      score: 0,
      increaseScore: (score) =>
        set((state) => ({ score: state.score + score })),

      time: 0,
      setTime: (t) => set(() => ({ time: t })),

      lives: 3,
      removeLive: () =>
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

      gameStage: "init",
      setupGame: () =>
        set(() => ({
          paused: false,
          score: 0,
          lives: 3,
          gameStage: "init",
        })),
      startGame: () => {
        set((state) => {
          if (state.gameStage === "init") {
            return { gameStage: "playing", paused: false };
          }
          return {};
        });
      },
      endGame: () => {
        set((state) => {
          if (state.gameStage === "playing") {
            return {
              gameStage: "over",
              paused: true,
            };
          }
          return {};
        });
      },

      config: structuredClone(defaultConfig),
      setConfig: (config) => set({ config: config }),

      resetGame: () => {
        set((state) => {
          if (state.gameStage === "over" || state.gameStage === "playing") {
            state.setupGame();
            return { gameStage: "init" };
          }
          return {};
        });
      },

      lastScore: { classic: 0 },
      setLastScore: ({ classic }) =>
        set((state) => ({
          lastScore: {
            classic: classic,
          },
        })),
    }),
    { name: "breakout-store" },
  ),
);
