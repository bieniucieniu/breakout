import { globalStyle, style } from "@vanilla-extract/css";
import { center, title } from "./basicStyles.css";

export const menuBG = style({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  zIndex: 10,
  backgroundColor: "rgba(0, 0, 0, 0.7)",
});

export const invisible = style({
  visibility: "hidden",
});

export const pauseMenuContent = style([
  center,
  {
    backgroundColor: "blue",
    minWidth: "25rem",

    padding: "3rem",

    "@media": {
      "screen and (max-width: 410px)": {
        minWidth: "20rem",
        padding: "1.5rem",
      },
    },

    borderWidth: "1rem",
    borderStyle: "outset",
    borderColor: "blue",
  },
]);

export const menuButtons = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
  gap: "2rem",
});

globalStyle(`${menuButtons} > button`, {
  width: "auto",
  maxWidth: "70vh",
  height: "3rem",
  fontSize: "1.5rem",
});

export const pauseMenuTitle = style([
  title,
  {
    paddingBottom: "2rem",
  },
]);

export const key = style([
  {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    padding: "0.1rem 0.6rem",
    borderRadius: "1rem",
  },
]);
