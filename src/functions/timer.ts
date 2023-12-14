import { useEffect, useRef } from "react";

type Props = {
  isRunning?: boolean;
  start?: number;
  end?: number;
  delta?: number;
  onStart?: () => void;
  onEnd?: () => void;
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
    ? `${negative ? "-" : ""}${mins} : ${secs}`
    : `${negative ? "-" : ""}${secs}.${ms}`;
};

export const useTimer = ({
  isRunning = true,
  start = 0,
  end,
  delta = 10,
  onEnd,
  onTick,
  onTime = [],
}: Props) => {
  const timeRef = useRef(start);
  const reset = () => {
    const t = timeRef.current;
    isRunning = false;
    timeRef.current = start;
    return t;
  };

  useEffect(() => {
    let interval: number;

    if (isRunning) {
      interval = window.setInterval(() => {
        timeRef.current += delta;
        if (end)
          if (delta > 0 ? timeRef.current >= end : timeRef.current <= end) {
            clearInterval(interval);
            onEnd && onEnd();
          }

        onTick && onTick(timeRef.current, delta);

        onTime.forEach(([onMs, func]) => {
          if (timeRef.current === onMs) {
            func(timeRef.current, delta);
          }
        });
      }, Math.abs(delta));
    }
    return () => {
      window.clearInterval(interval);
    };
  }, [isRunning, start, end, delta, onTick, onTime]);

  return [timeRef, reset] as [
    time: React.MutableRefObject<number>,
    reset: () => number,
  ];
};
