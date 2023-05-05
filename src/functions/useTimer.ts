import { useEffect, useState } from "react";

type props = {
  start?: number;
  delta?: number;
  end?: number;
  onTime?: [onMs: number, func: (current: number, delta: number) => void][];
  onTick?: (current: number, delta: number) => void;
};

export const useTimer = ({
  start = 0,
  end = Infinity,
  delta = 1,
  onTime = [],
  onTick,
}: props) => {
  const [time, setTime] = useState(start);

  useEffect(() => {
    const interval = setInterval(() => {
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

  return time;
};
