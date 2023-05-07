import { create } from "zustand";
import { Brick, createBricksGrid } from "../functions/createBricksGrid";
import defaultConfig from "../defaultConfig";
import { addScore } from "../firebase/scoreStorage";

type Storage = {
  paused: boolean;
  setPause: (paused: boolean) => void;
  switchPaused: () => void;
  score: number;
  increaseScore: (score: number) => void;
  brickHit: (brickName: string, score?: number) => void;
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
  endGame: (props?: { score?: number; push?: boolean; time?: number }) => void;
  resetGame: () => void;
  paddleControlls: {
    left: boolean;
    down: boolean;
    up: boolean;
    right: boolean;
  };
  setPaddleControlls: (controlls: {
    left?: boolean;
    down?: boolean;
    up?: boolean;
    right?: boolean;
  }) => void;
  lastScore: {
    classic: number;
    time: number;
    gravity: number;
  };
  setLastScore: (prop: {
    classic?: number;
    time?: number;
    gravity?: number;
  }) => void;
  gameType: "classic" | "time" | "gravity";
  setGameType: (type: "classic" | "time" | "gravity") => void;
  lastTime: number;
  setLastTime: (time: number) => void;
};

export const useStorage = create<Storage>((set) => ({
  paused: false,
  score: 0,
  lives: 3,
  gameStage: "init",
  paddleControlls: { left: false, down: false, up: false, right: false },
  bricks: [],
  lastScore: { classic: 0, time: 0, gravity: 0 },
  config: JSON.parse(JSON.stringify(defaultConfig)),
  gameType: "classic",
  lastTime: 0,
  setPause: (paused) => set(() => ({ paused: paused })),
  switchPaused: () => set((state) => ({ paused: !state.paused })),
  increaseScore: (score) => set((state) => ({ score: state.score + score })),
  brickHit: (brickName, score) =>
    set((state) => {
      const newBricks = state.bricks.map((e) => {
        if (e.name === brickName) {
          e.points = e.points - 1;
        }
        return e;
      });
      const n = newBricks.reduce((sum, b) => sum + b.points, 0);

      if (n <= 0) {
        state.endGame({ score: state.score + (score || 1) });
      }

      return { bricks: newBricks, score: state.score + (score || 1) };
    }),
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
      paddleControlls: {
        left: false,
        down: false,
        up: false,
        right: false,
      },
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
  endGame: (props) => {
    set((state) => {
      if (state.gameStage === "playing") {
        if (props?.push) {
          addScore({
            score: props?.score ?? state.score,
            ms: props?.time ?? 0,
          });
        }

        state.setLastScore({
          [state.gameType]: props?.score ?? state.score,
        });

        return {
          gameStage: "over",
          paddleControlls: {
            left: false,
            down: false,
            up: false,
            right: false,
          },
          paused: true,
        };
      }
      return {};
    });
  },
  resetGame: () => {
    set((state) => {
      if (state.gameStage === "over" || state.gameStage === "playing") {
        state.setupGame();
        return { gameStage: "init" };
      }
      return {};
    });
  },
  setPaddleControlls: (controlls) =>
    set((state) => ({
      paddleControlls: { ...state.paddleControlls, ...controlls },
    })),
  setLastScore: ({ classic, gravity, time }) =>
    set((state) => ({
      lastScore: {
        classic: classic ?? state.lastScore.classic,
        time: gravity ?? state.lastScore.time,
        gravity: time ?? state.lastScore.gravity,
      },
    })),
  setGameType: (type) => set(() => ({ gameType: type })),
  setLastTime: (time) => set(() => ({ lastTime: time })),
}));
