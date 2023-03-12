import { style } from "@vanilla-extract/css";

export const game = style({
  width: "100vw",
  height: "100vh",
  position: "absolute",
  top: 0,
  left: 0,
  zIndex: 1,
});

export const breakout = style({
  height: "100vh",
});
