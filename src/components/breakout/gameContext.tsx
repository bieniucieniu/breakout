import { Brick, createBricksGrid } from "@/functions/createBricksGrid";
import { useStorage } from "@/storage";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export type Context = {
  paused: React.MutableRefObject<boolean>;
  time: React.MutableRefObject<number>;
  ballPosition: React.MutableRefObject<[number, number]>;
  paddlePosition: React.MutableRefObject<[number, number]>;
  bricks: React.MutableRefObject<Brick[]>;
  onBrickHit: (brickName: string, score?: number) => void;
  onLiveLose: () => void;
  tickRate: number;
};

const context = createContext<Context | undefined>(undefined);

export function GameContextProvider({
  children,
  tickRate = 0,
}: {
  children: React.ReactNode;
  tickRate?: number;
}) {
  const endGame = useStorage((s) => s.endGame);
  const increaseScore = useStorage((s) => s.increaseScore);
  const removeLive = useStorage((s) => s.removeLive);
  const config = useStorage((s) => s.config);

  const paused = useRef<boolean>(false);
  const time = useRef<number>(0);
  const ballPosition = useRef<[number, number]>(
    config.game.ball.defaultPosition,
  );
  const paddlePosition = useRef<[number, number]>(
    config.game.paddle.defaultPosition,
  );
  const bricks = useRef<Brick[]>(
    createBricksGrid({
      gridSize: config.game.grid.gridSize,
      args: config.game.grid.args,
      position: [0, config.game.args[1] / 4],
      brickSize: config.game.brick.args,
      maxPoints: config.game.brick.maxPoints,
    }),
  );

  return (
    <context.Provider
      value={{
        paused,
        time,
        ballPosition,
        paddlePosition,
        bricks,
        onBrickHit: (brickName) => {
          let bricksPointsTotal = 0;
          bricks.current.forEach((e) => {
            if (e.name === brickName) {
              e.points = e.points - 1;
              increaseScore(1);
            }
            bricksPointsTotal += e.points;
            return e;
          });

          if (bricksPointsTotal <= 0) {
            endGame();
          }
        },
        onLiveLose: () => removeLive(),
        tickRate,
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

export function useTick(fn: (delta: number) => void, depArray?: any[]) {
  const { tickRate } = useGameContext();

  const delta = useMemo(
    () => (tickRate === 0 ? 0 : 1000 / tickRate),
    [tickRate],
  );

  const [iId, setIID] = useState<number | undefined>(undefined);

  useEffect(() => {
    let t0 = Date.now();
    const interval = window.setInterval(() => {
      const t = Date.now();
      const d = t - t0;
      t0 = t;
      fn(d);
    }, delta);
    setIID(interval);
    return () => window.clearInterval(interval);
  }, [delta, ...(depArray ?? [])]);

  return () => clearInterval(iId);
}
