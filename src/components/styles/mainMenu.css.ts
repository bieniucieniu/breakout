import { globalStyle, style } from "@vanilla-extract/css";
import { center } from "./basicStyles.css";

export const mainMenu = style([
  center,
  {
    display: "grid",
    gridTemplateRows: "repeat(5, minmax(0, 1fr))",
    gap: "1rem",
  },
]);

export const gameTypeButtons = style({
  display: "grid",
  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  gap: "1rem",
  backgroundColor: "#0000ff",
  padding: "1rem",
  gridRow: "span 2",
});

globalStyle(`${gameTypeButtons} > button`, {
  fontWeight: 300,
  lineHeight: "2",
});
