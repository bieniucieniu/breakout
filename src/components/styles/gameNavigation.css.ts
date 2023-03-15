import { globalStyle, style } from "@vanilla-extract/css";

export const navbar = style({
  borderWidth: ".4rem",
  borderStyle: "outset",
  borderColor: "blue",
  backgroundColor: "blue",

  margin: ".3rem",
  padding: ".3rem",

  display: "grid",
  alignItems: "center",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: ".5rem",

  height: "4rem",

  "@media": {
    "screen and (max-width: 600px)": {
      gridTemplateColumns: "repeat(2, 1fr)",
      height: "8rem",
    },
  },
});

globalStyle(`.${navbar} > *`, {
  fontSize: "1.3rem",
});

globalStyle(`.${navbar} > *:nth-child(3)`, {
  "@media": {
    "screen and (max-width: 600px)": {
      gridColumn: "1 / 3",
    },
  },
});
