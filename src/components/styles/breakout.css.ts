import { style } from "@vanilla-extract/css";
import { appearFromBottom } from "./animations.css";

export const game = style({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "100%",
  animation: `${appearFromBottom} .3s ease-in-out`,
  maxHeight: "100vw",
});

export const breakout = style({
  height: "100vh",
  overflow: "hidden",
});
