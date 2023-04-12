import { style } from "@vanilla-extract/css";

export const navbar = style({
  backgroundColor: "blue",

  padding: "6px",

  display: "grid",
  alignItems: "center",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: "8px",

  height: "80px",

  "@media": {
    "screen and (max-width: 600px)": {
      gridTemplateColumns: "repeat(2, 1fr)",
      height: "160px",
    },
  },
});
