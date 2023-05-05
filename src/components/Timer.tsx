import React, { useEffect, useState } from "react";
import { display } from "./styles/basicComponents.css";
import { useStorage } from "../storage";

type props = {
  start?: number;
  end?: number;
  delta?: number;
  onTime?: [onMs: number, func: (current: number, delta: number) => void][];
  onTick?: (current: number, delta: number) => void;
} & React.HTMLProps<HTMLDivElement>;

export const Timer = ({
  start = 0,
  end = Infinity,
  onTime = [],
  delta = 1,
  onTick,
  className,
}: props) => {
  const paused = useStorage((state) => state.paused);
  const [time, setTime] = useState(start);
  useEffect(() => {
    const interval = setInterval(() => {
      if (paused) return;
      if (time >= end) clearInterval(interval);

      onTick && onTick(time, delta);

      onTime.forEach(([onMs, func]) => {
        if (time === onMs) {
          func(time, delta);
        }
      });
      setTime(time + delta);
    }, delta);

    return () => clearInterval(interval);
  }, []);
  return <div className={`${display} ${className}`}>{time}</div>;
};
