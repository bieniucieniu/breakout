import { style } from "@vanilla-extract/css";

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
