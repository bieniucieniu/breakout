import { style } from "@vanilla-extract/css";
import { appearFromBottom } from "./animations.css";

export const game = style({
  width: "100vw",
  height: "100vh",
  position: "absolute",
  top: 0,
  left: 0,
  animation: `${appearFromBottom} .3s ease-in-out`,
});

export const breakout = style({
  height: "100vh",
  position: "relative",
});
