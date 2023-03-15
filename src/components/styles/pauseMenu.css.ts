import { globalStyle, style } from "@vanilla-extract/css";

export const pauseMenu = style({
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

export const pauseMenuContent = style({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",

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
});

export const pauseMenuButtons = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
  gap: "2rem",
});

globalStyle(`${pauseMenuButtons} button`, {
  width: "auto",
  maxWidth: "70vh",
  height: "3rem",
  fontSize: "1.5rem",
});

export const pauseMenuTitle = style({
  fontSize: "2rem",
  textAlign: "center",
  paddingBottom: "2rem",
  color: "white",
});
