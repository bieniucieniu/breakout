import React, { useEffect, useState } from "react";
import { display } from "./styles/basicComponents.css";
import { useTimer } from "../functions/useTimer";

type props = {
  start?: number;
  delta?: number;
  end?: number;
  onTime?: [onMs: number, func: (current: number, delta: number) => void][];
  onTick?: (current: number, delta: number) => void;
} & React.HTMLProps<HTMLDivElement>;

export const Timer = ({
  start = 0,
  onTime,
  delta = 1,
  onTick,
  className,
}: props) => {
  const time = useTimer({ start, onTime, delta, onTick });
  return <div className={`${display} ${className}`}>{time}</div>;
};
