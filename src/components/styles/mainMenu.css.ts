import { style } from "@vanilla-extract/css";
import { center } from "./basicStyles.css";

export const mainMenu = style([
  center,
  {
    display: "flex",
    gap: "1rem",
    flexDirection: "column",
  },
]);
