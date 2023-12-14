import { globalStyle, style } from "@vanilla-extract/css";

export const gameControllsHints = style({
  position: "absolute",
  bottom: "0",
  left: "0",
  width: "100%",
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  alignContent: "space-around",
  justifyContent: "space-between",
});

globalStyle(`${gameControllsHints} > div`, {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});
