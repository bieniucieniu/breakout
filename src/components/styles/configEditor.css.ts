import { globalStyle, style } from "@vanilla-extract/css";

export const configEditor = style({
  display: "flex",
  height: "100vh",
  flexDirection: "column",
});
export const listWraper = style({
  overflowY: "auto",
  scrollbarGutter: "stable",
  padding: "0.5rem 0.5rem 0.5rem 1.5rem",
  height: "100%",
  "::-webkit-scrollbar": {
    backgroundColor: "rgba(0, 0, 0, 0)",
    width: "1rem",
  },
  "::-webkit-scrollbar-thumb": {
    backgroundColor: "#00f",
  },
});

export const configButtons = style({
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

export const primitivesModule = style({
  display: "flex",
  flexDirection: "row",
  gap: "1rem",
  maxWidth: "40rem",
});

globalStyle(`${primitivesModule} > input`, {
  color: "white",
  borderStyle: "solid",
  borderColor: "#00f",
  backgroundColor: "black",
  width: "100%",
});

globalStyle(`${primitivesModule} > span`, {
  color: "white",
  width: "min-content",
});

export const objectsModule = style({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  border: "none",
  marginTop: "0.5rem",
});

export const objectClosed = style({
  visibility: "hidden",
  height: "0",
  overflow: "hidden",
});

export const objectOpen = style({
  display: "flex",
  flexDirection: "column",
  visibility: "visible",
  height: "auto",
  overflow: "visible",
  padding: "0.5rem 0.5rem 0.5rem 1.5rem",
  borderStyle: "none solid solid solid",
  borderColor: "#fff",
});
