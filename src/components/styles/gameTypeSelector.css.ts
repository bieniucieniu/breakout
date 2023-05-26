import { style } from "@vanilla-extract/css";

export const wraper = style({
  containerType: "size",
  height: "100%",
  width: "100%",
});

export const gameTypeButtons = style({
  display: "grid",
  gridTemplateColumns: "repeat(3, minmax(100px, 1fr))",
  gap: "1rem",
  "@container": {
    "(max-width: 19rem)": {
      gridTemplateColumns: "repeat(2, minmax(100px, 1fr))",
    },
  },
});

export const gameTypeButton = style({
  fontWeight: 300,
  lineHeight: "2",
  color: "#fff",
  backgroundColor: "#0000ff",
  flexGrow: "1",
  flexBasis: "0",
  "@container": {
    "(max-width: 19rem)": {
      ":first-child": {
        gridColumn: "1 / span 2",
      },
    },
  },
});
