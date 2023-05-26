import { style } from "@vanilla-extract/css";

export const gameTypeButtons = style({
  display: "grid",
  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  gap: "1rem",

  "@media": {
    "screen and (max-width: 768px)": {
      gridTemplateColumns: "repeat(1, minmax(0, 1fr))",
    },
  },
});

export const gameTypeButton = style({
  fontWeight: 300,
  lineHeight: "2",
  color: "#fff",
  backgroundColor: "#0000ff",
});
