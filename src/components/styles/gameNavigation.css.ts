import { globalStyle, style } from "@vanilla-extract/css";
import { navbar } from "./navbar.css";

export const gameNav = style([navbar]);

globalStyle(`.${gameNav} > *`, {
  fontSize: "1.3rem",
});

globalStyle(`.${gameNav} > *:nth-child(3)`, {
  "@media": {
    "screen and (max-width: 600px)": {
      gridColumn: "1 / 3",
    },
  },
});
