import { style } from "@vanilla-extract/css";
import { center } from "./basicStyles.css";

export const scoreboardNav = style({
  zIndex: "1",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  backgroundColor: "blue",

  padding: ".3rem",

  gap: ".5rem",

  height: "4rem",
});

export const scoreboard = style([
  center,
  {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "blue",
  },
]);
