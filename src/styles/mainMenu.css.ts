import { globalStyle, style } from "@vanilla-extract/css";

export const mainMenuWraper = style({
  position: "relative",
  overflow: "hidden",
  width: "100vw",
  height: "100vh",
});

export const mainMenu = style({
  display: "grid",
  width: "100%",
  height: "100%",

  gridTemplateColumns: "2fr 1fr",

  "@media": {
    "screen and (max-width: 1000px)": {
      gridTemplateColumns: "1fr",
    },
  },
});
export const mainMenuContent = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  margin: "auto",
  gap: "1rem",
  height: "fit-content",

  "@media": {
    "screen and (max-width: 1000px)": {
      gridColumn: "1 / 2",
      flexDirection: "column-reverse",
    },
  },
});

export const configButton = style({
  display: "flex",
  flexDirection: "column",
  justifySelf: "end",
  alignSelf: "end",
  height: "fit-content",
  width: "30rem",
  padding: "1.5rem",

  "@media": {
    "screen and (max-width: 1000px)": {
      justifySelf: "center",
      width: "100%",
    },
  },
});

globalStyle(`${configButton} > button`, {
  borderStyle: "solid",
  borderColor: "#00f",
});

export const configSideBar = style({
  zIndex: 100,
  position: "absolute",
  right: "0",
  width: "30rem",
  maxWidth: "100vw",
  backgroundColor: "black",
  borderLeft: "3px solid #00f",
  transition: "transform 0.3s ease-in-out, visibility 0.3s ease-in-out",

  "@media": {
    "screen and (max-width: 32rem)": {
      width: "100vw",
      borderLeft: "none",
    },
  },
});

export const configSideBarVisble = style([
  configSideBar,
  {
    visibility: "visible",
    transform: "translateX(0)",
  },
]);
export const configSideBarHidden = style([
  configSideBar,
  {
    visibility: "hidden",
    transform: "translateX(100%)",
  },
]);
