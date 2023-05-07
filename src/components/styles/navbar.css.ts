import { style } from "@vanilla-extract/css";
import { appearFromTop } from "./animations.css";

export const navbar = style({
  backgroundColor: "blue",

  padding: ".7rem",

  display: "grid",
  alignItems: "center",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: ".7rem",
  animation: `${appearFromTop} .3s ease-in-out`,

  "@media": {
    "screen and (max-width: 600px)": {
      gridTemplateColumns: "repeat(2, 1fr)",
      height: "160px",
    },
  },
});
