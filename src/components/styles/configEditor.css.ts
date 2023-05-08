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
  gap: "1rem",
  flexDirection: "row",
  width: "100%",
});

globalStyle(`${primitivesModule} > input`, {
  color: "white",
  borderStyle: "solid",
  borderColor: "#00f",
  backgroundColor: "black",
});

export const objectsModule = style({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  height: "100%",
  width: "100%",
  padding: "1rem",
  borderStyle: "none solid solid solid",
});

export const configButtons = style({
  zIndex: 1,

  position: "fixed",
  bottom: "0",
  left: "0",
  width: "100%",

  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "1rem",
  padding: "1rem",
});

globalStyle(`${configButtons} > button`, {
  borderStyle: "solid",
  borderColor: "#00f",
});
