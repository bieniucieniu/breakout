import { style } from "@vanilla-extract/css";

export const gameTypeButtons = style({
  // display: "grid",
  // gridTemplateColumns: "repeat(3, minmax(100px, 1fr))",
  display: "flex",
  flexWrap: "wrap",
  flexBasis: "1 1 auto",
  flexShrink: 1,
  gap: "1rem",
});

export const gameTypeButton = style({
  fontWeight: 300,
  lineHeight: "2",
  color: "#fff",
  backgroundColor: "#0000ff",
  flexGrow: "1",
  flexBasis: "0",
});
