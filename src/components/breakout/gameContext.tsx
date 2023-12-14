import { Brick } from "@/functions/createBricksGrid";
import { useStorage } from "@/storage";
import { createContext, useContext, useRef } from "react";

export type Context = {
  paused: React.MutableRefObject<boolean>;
  time: React.MutableRefObject<number>;
  ballPosition: React.MutableRefObject<[number, number]>;
  paddlePosition: React.MutableRefObject<[number, number]>;
  bricks: React.MutableRefObject<Brick[]>;
  onBrickHit: (brickName: string, score?: number) => void;
  onLiveLose: () => void;
};

const context = createContext<Context | undefined>(undefined);

export function GameContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const endGame = useStorage((s) => s.endGame);
  const score = useStorage((s) => s.score);
  const removeLive = useStorage((s) => s.removeLive);

  const paused = useRef<boolean>(false);
  const time = useRef<number>(0);
  const ballPosition = useRef<[number, number]>([0, 0]);
  const paddlePosition = useRef<[number, number]>([0, 0]);
  const bricks = useRef<Brick[]>([]);

  return (
    <context.Provider
      value={{
        paused,
        time,
        ballPosition,
        paddlePosition,
        bricks,
        onBrickHit: (brickName, s) => {
          const newBricks = bricks.current.map((e) => {
            if (e.name === brickName) {
              e.points = e.points - 1;
            }
            return e;
          });
          const totalScore = newBricks.reduce((sum, b) => sum + b.points, 0);

          if (totalScore <= 0) {
            endGame({
              score: score + (s || 1),
            });
          }

          return { bricks: newBricks, score: score + (s || 1) };
        },
        onLiveLose: () => removeLive(),
      }}
    >
      {children}
    </context.Provider>
  );
}

export function useGameContext() {
  const c = useContext(context);
  if (!c) {
    throw new Error("no in game context");
  }

  return c;
}
