import { useEffect, useRef, useState } from "react";
import { display } from "./styles/basicComponents.css";

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
  delta = 10,
  onTick,
  className,
}: props) => {
  const [time, setTime] = useState(start);
  const timeRef = useRef(start);

  useEffect(() => {
    let interval: NodeJS.Timer;
    if (isRunning) {
      interval = setInterval(() => {
        timeRef.current += delta;
        setTime(timeRef.current);
        if (timeRef.current >= end) clearInterval(interval);

        onTick && onTick(timeRef.current, delta);

        onTime.forEach(([onMs, func]) => {
          if (timeRef.current === onMs) {
            func(timeRef.current, delta);
          }
        });
      }, delta);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isRunning, start, end, delta, onTick, onTime]);

  return <div className={`${display} ${className}`}>{time}</div>;
};
