import { useEffect, useState } from "react";
import { display } from "./styles/basicComponents.css";
import { useStorage } from "../storage";

type props = {
  isRunning?: boolean;
  start?: number;
  end?: number;
  delta?: number;
  onTime?: [onMs: number, func: (current: number, delta: number) => void][];
  onTick?: (current: number, delta: number) => void;
} & React.HTMLProps<HTMLDivElement>;

export const Timer = ({
  isRunning = true,
  start = 0,
  end = Infinity,
  onTime = [],
  delta = 1000,
  onTick,
  className,
}: props) => {
  const [time, setTime] = useState(start);

  useEffect(() => {
    let interval: NodeJS.Timer;
    if (isRunning) {
      interval = setInterval(() => {
        setTime(time + delta);
        if (time >= end) clearInterval(interval);

        onTick && onTick(time, delta);

        onTime.forEach(([onMs, func]) => {
          if (time === onMs) {
            func(time, delta);
          }
        });
      }, delta);
    }
    return () => {
      clearInterval(interval);
    };
  }, [time, isRunning]);

  return <div className={`${display} ${className}`}>{time}</div>;
};
