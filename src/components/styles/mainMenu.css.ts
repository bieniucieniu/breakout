import { style } from "@vanilla-extract/css";
import { center } from "./basicStyles.css";

export const mainMenu = style([
  center,
  {
    display: "grid",
    gridTemplateRows: "repeat(5, minmax(0, 1fr))",
    gap: "1rem",
  },
]);
