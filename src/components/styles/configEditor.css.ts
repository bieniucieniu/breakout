import { globalStyle, style } from "@vanilla-extract/css";

export const configEditor = style({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  height: "100%",
  width: "100%",
  padding: "1rem",
});

export const primitivesModule = style({
  display: "flex",

  flexDirection: "row",
  width: "100%",
});

export const objectsModule = style({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  height: "100%",
  width: "100%",
  padding: "1rem",
});

export const submitButton = style({
  zIndex: 1,

  position: "fixed",
  bottom: "0",
  left: "0",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  padding: "1rem",
});

globalStyle(`${submitButton} > button`, {
  borderStyle: "solid",
  borderColor: "#00f",
});
