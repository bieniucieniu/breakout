import { style } from "@vanilla-extract/css";
import { center } from "./basicStyles.css";
import { navbar } from "./navbar.css";

export const scoreboardNav = style([navbar, {}]);

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
