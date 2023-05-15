import { style } from "@vanilla-extract/css";
import { appearFromBottom } from "./animations.css";

export const game = style({
  animation: `${appearFromBottom} .3s ease-in-out`,
  touchAction: "none",
});

export const placeholder = style({
  touchAction: "none",
  "@media": {
    "screen and (max-width: 650px)": {
      height: "100vw",
    },
  },
});

export const breakout = style({
  display: "flex",
  flexDirection: "column",
  height: "100vh",
});
