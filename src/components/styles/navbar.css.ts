import { style } from "@vanilla-extract/css";

export const container = style({
  borderStyle: "inset",
  borderColor: "white",
  backgroundColor: "white",
  borderWidth: "4px",
  height: "100%",
  width: "100%",
});

export const button = style([
  container,
  {
    zIndex: 1,
    ":hover": {
      transform: "scale(101%)",
    },
  },
]);

export const valueDisplay = style([
  container,
  {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
]);

export const navbar = style({
  borderWidth: ".4rem",
  borderStyle: "outset",
  borderColor: "blue",
  backgroundColor: "blue",

  margin: ".3rem",
  padding: ".3rem",

  display: "grid",
  alignItems: "center",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: ".5rem",

  height: "4rem",

  "@media": {
    "screen and (max-width: 600px)": {
      gridTemplateColumns: "repeat(2, 1fr)",
      height: "8rem",
    },
  },
});
