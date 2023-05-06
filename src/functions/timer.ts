import { useEffect, useRef, useState } from "react";

type Props = {
  isRunning?: boolean;
  start?: number;
  end?: number;
  delta?: number;
  onTime?: [onMs: number, func: (current: number, delta: number) => void][];
  onTick?: (current: number, delta: number) => void;
};

export const msToTime = (milliseconds: number) => {
  const negative = milliseconds < 0;
  let s = Math.abs(milliseconds);
  const ms = s % 1000;
  s = (s - ms) / 1000;
  const secs = s % 60;
  const mins = (s - secs) / 60;

  return mins !== 0
    ? `${negative ? "-" : ""}${mins}:${secs}`
    : `${negative ? "-" : ""}${secs}.${ms}`;
};

export const useTimer = ({
  isRunning = true,
  start = 0,
  end = Infinity,
  onTime = [],
  delta = 10,
  onTick,
}: Props) => {
  const [time, setTime] = useState(start);
  const timeRef = useRef(start);
  const reset = () => {
    const t = timeRef.current;
    isRunning = false;
    setTime(start);
    timeRef.current = start;
    return t;
  };

  useEffect(() => {
    let interval: NodeJS.Timer;
    if (isRunning) {
      interval = setInterval(() => {
        timeRef.current += delta;
        setTime(timeRef.current);
        if (delta > 0 ? timeRef.current >= end : timeRef.current <= end)
          clearInterval(interval);

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

  return [time, reset] as const;
};
